import { useState } from 'react';

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

  const cartItems = [
    {
      id: 1,
      name: 'Portable Stereo Speaker',
      price: 230.49,
      quantity: 1,
      image: 'https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/50/5041662/1.jpg?8699',
    },
    {
      id: 2,
      name: 'i-Type Instant Camera',
      price: 630.20,
      quantity: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvM2ddBe3H5pfQa8xro2R1WdU70VZvKCTtg&s',
    },
    {
      id: 3,
      name: 'Positive Vibration ANC',
      price: 330.0,
      quantity: 1,
      image: 'https://www.techhive.com/wp-content/uploads/2023/04/hom-pv-xl-anc-black-100892421-orig.jpg?quality=50&strip=all',
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Delivery Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Delivery Information</h2>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium">Full Name</label>
                <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium">Email Address</label>
                <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1 text-sm font-medium">City</label>
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
              <label htmlFor="postalCode" className="block mb-1 text-sm font-medium">Postal Code</label>
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
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2 gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4>{item.name}</h4>
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

          <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
