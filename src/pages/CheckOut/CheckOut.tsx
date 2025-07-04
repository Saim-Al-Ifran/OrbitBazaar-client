import { useState, useMemo } from 'react';
import { useGetCartQuery } from '../../features/cart/cartApi'; // adjust path if needed
import {  DotLoader } from 'react-spinners';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    postalCode: '',
    countryCode: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { data:cartData, isLoading:isCartLoading } = useGetCartQuery();
  const cartItems = cartData?.items || [];

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const total = subtotal;

  const isFormValid = Object.values(formData).every((val) => val.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Delivery Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Delivery Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {['name', 'email', 'city', 'postalCode', 'countryCode'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block mb-1 text-sm font-medium capitalize">
                  {field === 'countryCode' ? 'Country Code (e.g., US)' : field}
                </label>
                <input
                  id={field}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  placeholder={field}
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}
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

          {isCartLoading? (
              <div className="flex justify-center items-center py-6">
                 <DotLoader  size={30} />
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

          <button
            disabled={!isFormValid || cartItems.length === 0}
            className={`w-full py-3 rounded transition text-white ${
              isFormValid && cartItems.length > 0
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
