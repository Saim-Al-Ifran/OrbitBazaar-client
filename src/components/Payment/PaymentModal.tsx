import { 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useElements, 
  useStripe 
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import  {usePaymentIntentMutation } from '../../features/payment/paymentApi';
import Swal from 'sweetalert2';
import { CustomModalProps } from '../../types/types';
import { useGetCartQuery, useRemoveAllItemsFromCartMutation } from '../../features/cart/cartApi';
import { useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '../../features/orders/ordersApi';
import { PlaceOrderRequest } from '../../types/api-types/orders/orders.type';


const PaymentModal: React.FC<CustomModalProps> = ({ openModal, setOpenModal, handlePaymentSubmit,formData }) => {
  if (!openModal) return null;
 
  const [clientSecret, setClientSecret] = useState('');
  const [paymentLoading,setPaymentLoading] = useState(false);
  const {data:cartData} = useGetCartQuery();
  const [paymentIntent,{isSuccess:isPaymentIntentSuccess,data}] = usePaymentIntentMutation();
  const [placeOrder,{data:orderData,isSuccess:isOrderPlacedSuccess}] = usePlaceOrderMutation()
  const [removeAllItemsFromCart ] = useRemoveAllItemsFromCartMutation();
  const navigate = useNavigate();
 
  const stripe = useStripe();
  const elements = useElements();
  

  useEffect(()=>{
      console.log(orderData);
  },[isOrderPlacedSuccess])
 
  useEffect(()=>{
       paymentIntent({price: cartData?.totalPrice ?? 0})
  },[cartData?.totalPrice])
  
  useEffect(()=>{
         setClientSecret(data?.clientSecret ?? '');                
  },[isPaymentIntentSuccess])

  const handleSubmitPayment  = async()=>{
    setPaymentLoading(true);
 
    if (!stripe || !elements) {
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          email: formData.email,
          name: formData.fullName,
        }
      }
    });


    if (confirmError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      console.log(confirmError)
      setPaymentLoading(false);
      handlePaymentSubmit();  
    } else {
      if (paymentIntent.status === 'succeeded') {
 
            const formattedOrder: PlaceOrderRequest = {
            items: cartData?.items?.map((item) => ({
              productID: item.productID._id,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity
            })) || [],
            totalQuantity: cartData?.totalQuantity ?? 0,
            totalPrice: cartData?.totalPrice ?? 0,
            shippingAddress: {
              fullName: formData.fullName,
              address: formData.address,
              phoneNumber:formData.phoneNumber,
              city: formData.city,
              postalCode: formData.postalCode,
              countryCode: formData.countryCode
            }
          };

          console.log('Formatted Order:', formattedOrder); 
          await placeOrder(formattedOrder);
          await removeAllItemsFromCart();
          handlePaymentSubmit();
          navigate("/greetings");

  
      }
    }

  }

const cardElementOptions = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

        {/* Card Number */}
        <div className="mb-4">
        <label className="block text-gray-700 mb-1">Card Number</label>
        <div className="border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
            <CardNumberElement options={cardElementOptions} />
        </div>
        </div>

        {/* Expiration Date */}
        <div className="mb-4">
        <label className="block text-gray-700 mb-1">Expiration Date</label>
        <div className="border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
            <CardExpiryElement options={cardElementOptions} />
        </div>
        </div>

        {/* CVC */}
        <div className="mb-4">
        <label className="block text-gray-700 mb-1">CVC</label>
        <div className="border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
            <CardCvcElement options={cardElementOptions} />
        </div>
        </div>


        {/* Modal Actions */}
        <div className="flex justify-end">
        <button
            className="btn text-white bg-red-600 hover:bg-red-700 mr-4"
            onClick={() => setOpenModal(false)}
            disabled={paymentLoading}
        >
            Cancel
        </button>
        <button
            className={`btn text-white bg-[#0A400C] hover:bg-green-700 ${paymentLoading ? 'loading' : ''}`}
            onClick={handleSubmitPayment}
            disabled={paymentLoading}
        >
            {paymentLoading ? 'Processing...' : 'Confirm Payment'}
        </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentModal;
 

