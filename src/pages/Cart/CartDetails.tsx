import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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


  const CartDetails = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    return (
      <>
      <Helmet>
        <title>OrbitBazaar - Cart Details</title>
      </Helmet>
        <div className="px-6 mt-[3rem]">
            <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>
            <div className="divider"></div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-[5rem]">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 items-center border rounded-xl shadow">
                <input type="checkbox" className="checkbox" />
                <img src={item.image} alt={item.name} className="w-[60px] h-[90px] object-cover" />
                <div className="flex-1">
                  <h2 className="font-bold text-md">{item.name}</h2>
  
                  <div className="mt-2 flex gap-2 items-center">
                    <span className="text-lg font-semibold">${item.price} </span>
                  </div>
  
                  <div className="mt-2 flex items-center justify-center border border-gray-300 rounded-full px-3 py-1 w-fit shadow-sm">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full transition duration-200">
                      <i className="fas fa-minus text-sm"></i>
                    </button>
                    <span className="mx-4 text-base font-semibold">{item.quantity}</span>
                    <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full transition duration-200">
                      <i className="fas fa-plus text-sm"></i>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <i className="fas fa-trash text-red-500 cursor-pointer"></i>
                  <i className="fas fa-heart text-pink-500 cursor-pointer"></i>
                </div>
              </div>
            ))}
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 h-fit">
            <h3 className="font-bold text-lg">Checkout Summary</h3>
            <div className="text-sm flex justify-between">
              <span>Subtotal</span>
              <span>0 TK.</span>
            </div>
            <div className="text-sm flex justify-between">
              <span>Online Fee</span>
              <span>0 TK.</span>
            </div>
            <div className="text-sm flex justify-between font-bold">
              <span>Total</span>
              <span>{total} TK.</span>
            </div>
            <div className="text-sm flex justify-between font-bold">
              <span>Payable Total</span>
              <span>{total} TK.</span>
            </div>
            <Link to="/checkout">
               <button className="btn btn-neutral w-full">Proceed to Checkout</button>
            </Link>
            
          </div>
        </div>
      </>
    );
  };
  
  export default CartDetails;
  
  
