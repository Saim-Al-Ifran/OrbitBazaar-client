import { useEffect, useState } from 'react';
import { useGetCartQuery } from '../../features/cart/cartApi';  
import { useGetUserProfileQuery } from '../../features/user/userApi'; // <-- your profile API
import { DotLoader } from 'react-spinners';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentModal from '../../components/Payment/PaymentModal';
import { Tooltip } from '@material-tailwind/react';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    postalCode: '',
    countryCode: '',
    address: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const { data: userData,   } = useGetUserProfileQuery();
  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery();

  const cartItems = cartData?.items || [];
  const total = cartData?.totalPrice || 0;
  const subtotal = total;
  const totalQuantity = cartData?.totalQuantity || 0;
  console.log(formData)
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        fullName: userData?.data.name || '',
        phoneNumber: userData?.data.phoneNumber || '',
        email: userData?.data.email || '',
      }));
    }  
  }, [userData, cartData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== '');

  const handleClick = () => {
    setOpenModal(true);
  };

  const handlePaymentSubmit = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Delivery Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium capitalize">Name</label>
                <input
                  id="name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium capitalize">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium capitalize">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  placeholder="Email"
                  className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="city" className="block mb-1 text-sm font-medium capitalize">City</label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block mb-1 text-sm font-medium capitalize">Postal Code</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="countryCode" className="block mb-1 text-sm font-medium">Country Code (e.g., US)</label>
                <input
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  placeholder="Country Code"
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block mb-1 text-sm font-medium">Full Address</label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            {isCartLoading ? (
              <div className="flex justify-center items-center py-6">
                <DotLoader size={30} />
              </div>
            ) : cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.productID._id} className="flex items-center justify-between border-b pb-2 gap-4">
                      <img src={item.productID.images[0]} alt={item.productID.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4>{item.productID.name}</h4>
                        <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                      </div>
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>—</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total (USD)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}

            {!isFormValid || cartItems.length === 0 ? (
              <Tooltip
                content={
                  !isFormValid
                    ? "Please fill in all delivery details"
                    : "Cart is empty"
                }
                placement="top"
              >
                <div>
                  <button
                    onClick={handleClick}
                    disabled
                    className="w-full py-3 rounded transition text-white bg-gray-400 cursor-not-allowed"
                  >
                    Confirm Order
                  </button>
                </div>
              </Tooltip>
            ) : (
              <div>
                <button
                  onClick={handleClick}
                  className="w-full py-3 rounded transition text-white bg-green-600 hover:bg-green-700"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stripe Payment Modal */}
      <Elements stripe={stripePromise}>
        <PaymentModal 
          openModal={openModal}
          setOpenModal={setOpenModal}
          handlePaymentSubmit={handlePaymentSubmit}
          formData={formData}
        />
      </Elements>
    </>
  );
};

export default CheckoutPage;
