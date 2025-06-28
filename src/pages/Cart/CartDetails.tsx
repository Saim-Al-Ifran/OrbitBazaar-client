import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { useGetCartQuery } from "../../features/cart/cartApi";
import CartSkeleton from "../../components/SkeletonLoader/CartSkeleton";
 

const CartDetails = () => {
  const {
    data:cartData,
    isLoading
  } = useGetCartQuery();

  // Handle loading
  if (isLoading) return <CartSkeleton />;
 
  const items = cartData?.items || [];
  const totalPrice = cartData?.totalPrice || 0;

  return (
    <>
      <Helmet>
        <title>OrbitBazaar - Cart Details</title>
      </Helmet>
      <div className="px-6 mt-[3rem]">
        <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>
        <div className="divider"></div>
      </div>


        {cartData?.items?.length === 0 ? (
          <div className="text-center mt-20 mb-20 text-gray-600">
            <div className="text-6xl mb-4">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
             <h2 className="text-2xl font-bold text-red-500">Your cart is empty!</h2>
            <p className="mt-2 text-gray-500">Looks like you haven’t added anything yet.</p>
            <NavLink to="/shop">
                <button
                  className="btn bg-[#3A70B5] text-white mt-6"
                >
                 <i className="fas fa-shopping-bag"></i>Continue Shopping
                </button>
            </NavLink>

          </div>
        ) : (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-[5rem]">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productID._id}
              className="flex gap-4 p-4 items-center border rounded-xl shadow"
            >
              <input type="checkbox" className="checkbox" />
              <img
                src={item.productID.images?.[0]}
                alt={item.productID.name}
                className="w-[60px] h-[90px] object-cover"
              />
              <div className="flex-1">
                <h2 className="font-bold text-md">{item.productID.name}</h2>
                <div className="mt-2 flex gap-2 items-center">
                  <span className="text-lg font-semibold">${item.price}</span>
                </div>
                <div className="mt-2 flex items-center justify-center border border-gray-300 rounded-full px-3 py-1 w-fit shadow-sm">
                  <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full transition duration-200">
                    <i className="fas fa-minus text-sm"></i>
                  </button>
                  <span className="mx-4 text-base font-semibold">
                    {item.quantity}
                  </span>
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
            <span>{totalPrice?.toFixed(2)} TK.</span>
          </div>
          <div className="text-sm flex justify-between">
            <span>Online Fee</span>
            <span>0 TK.</span>
          </div>
          <div className="text-sm flex justify-between font-bold">
            <span>Total</span>
            <span>{totalPrice?.toFixed(2)} TK.</span>
          </div>
          <div className="text-sm flex justify-between font-bold">
            <span>Payable Total</span>
            <span>{totalPrice?.toFixed(2)} TK.</span>
          </div>
          <Link to="/checkout">
            <button className="btn btn-neutral w-full">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
        )}
    </>
  );
};

export default CartDetails;
