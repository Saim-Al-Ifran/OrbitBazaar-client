import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import {
  useGetCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveFromCartMutation,
} from "../../features/cart/cartApi";
import CartSkeleton from "../../components/SkeletonLoader/CartSkeleton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAddToWishlistMutation } from "../../features/wishlist/wishlistApi";

const CartDetails = () => {
  const { data: cartData, isLoading } = useGetCartQuery();
  const [updateQuantity] = useUpdateCartQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const items = cartData?.items || [];
  const totalPrice = cartData?.totalPrice || 0;
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [addingToWishlistId, setAddingToWishlistId] = useState<string | null>(null);
  const [
    addToWishlist,
    {
      isSuccess: isAddingWishListSuccess,
      isLoading: isAddingToWishlist,
      error: wishListError,
    },
  ] = useAddToWishlistMutation();
  
useEffect(() => {
  if (isAddingWishListSuccess) {
    toast.success("Product added to wishlist successfully!");
  }

  if (
    (wishListError as any)?.data?.message === "Product already in wishlist"
  ) {
    toast('Product already exists in the wishlist!', {
      icon: '⚠️',
      style: {
        borderRadius: '10px',
        background: '#fef3c7',
        color: '#92400e',
        border: '1px solid #facc15',
      },
    });
  }
}, [isAddingWishListSuccess, wishListError]);

const handleIncrease = async (productId: string, currentQuantity: number) => {
  try {
    setLoadingProductId(productId);
    await updateQuantity({ productId, quantity: currentQuantity + 1 }).unwrap();
    toast.success("Quantity increased");
  } catch (error: any) {
    console.log(error?.data);
    
    const errorMessage =
      error?.data?.message || "Failed to increase quantity. Please try again.";
    toast.error(errorMessage);
  } finally {
    setLoadingProductId(null);
  }
};

const handleDecrease = async (productId: string, currentQuantity: number) => {
  if (currentQuantity <= 1) return;
  try {
    setLoadingProductId(productId);
    await updateQuantity({ productId, quantity: currentQuantity - 1 }).unwrap();
    toast.success("Quantity decreased");
  } catch {
    toast.error("Failed to decrease quantity");
  } finally {
    setLoadingProductId(null);
  }
};


const handleRemove = async (productId: string, productName: string) => {
  const result = await Swal.fire({
    title: `Remove "${productName}" from cart?`,
    text: "This item will be removed from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#0D1216",
    confirmButtonText: "Yes, remove it!",
  });

  if (result.isConfirmed) {
    try {
      setDeletingProductId(productId);
      await removeFromCart(productId).unwrap();
       
      toast.success("Product has been removed from your cart.");
      
    } catch (error) {
      Swal.fire("Failed!", "Something went wrong.", "error");
    } finally {
      setDeletingProductId(null);
    }
  }
};
 

const handleAddToWishlist = async (productId: string) => {
  try {
    setAddingToWishlistId(productId);
    await addToWishlist({ productId }).unwrap();
    
  } catch (error) {
    console.log("Failed to add to wishlist.");
  } finally {
    setAddingToWishlistId(null);
  }
};

  return (
    <>
      <Helmet>
        <title>OrbitBazaar - Cart Details</title>
      </Helmet>
      <div className="px-6 mt-[3rem]">
        <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>
        <div className="divider"></div>
      </div>

      {isLoading ? (
        <CartSkeleton />
      ) : items.length === 0 ? (
        <div className="text-center mt-20 mb-20 text-gray-600">
          <div className="text-6xl mb-4">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <h2 className="text-2xl font-bold text-red-500">Your cart is empty!</h2>
          <p className="mt-2 text-gray-500">Looks like you haven’t added anything yet.</p>
          <NavLink to="/shop">
            <button className="btn bg-[#3A70B5] text-white mt-6">
              <i className="fas fa-shopping-bag"></i> Continue Shopping
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
                    <button
                      onClick={() => handleDecrease(item.productID._id, item.quantity)}
                      disabled={loadingProductId === item.productID._id}
                      className={`w-6 h-6 flex items-center justify-center text-gray-600 rounded-full transition duration-200 ${
                        loadingProductId === item.productID._id ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
                      }`}
                    >
                      <i className="fas fa-minus text-sm"></i>
                    </button>

                    <span
                      className={`mx-4 text-base font-semibold transition-transform duration-200 ${
                        loadingProductId === item.productID._id ? "opacity-50" : "scale-110"
                      }`}
                    >
                      {loadingProductId === item.productID._id ? (
                        <i className="fas fa-spinner fa-spin text-sm"></i>
                      ) : (
                        item.quantity
                      )}
                    </span>

                    <button
                      onClick={() => handleIncrease(item.productID._id, item.quantity)}
                      disabled={loadingProductId === item.productID._id}
                      className={`w-6 h-6 flex items-center justify-center text-gray-600 rounded-full transition duration-200 ${
                        loadingProductId === item.productID._id ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
                      }`}
                    >
                      <i className="fas fa-plus text-sm"></i>
                    </button>
                  </div>

                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleRemove(item.productID._id, item.productID.name)}
                    disabled={deletingProductId === item.productID._id}
                    className={`text-red-500 cursor-pointer ${
                      deletingProductId === item.productID._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {deletingProductId === item.productID._id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-trash"></i>
                    )}
                  </button>

                  <button
                    onClick={() => handleAddToWishlist(item.productID._id)}
                    disabled={addingToWishlistId === item.productID._id || isAddingToWishlist}
                    className={`text-pink-500 cursor-pointer ${
                      addingToWishlistId === item.productID._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {addingToWishlistId === item.productID._id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-heart"></i>
                    )}
                  </button>
                </div>


              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 h-fit">
            <h3 className="font-bold text-lg">Checkout Summary</h3>
            <div className="text-sm flex justify-between">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)} TK.</span>
            </div>
            <div className="text-sm flex justify-between">
              <span>Online Fee</span>
              <span>0 TK.</span>
            </div>
            <div className="text-sm flex justify-between font-bold">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} TK.</span>
            </div>
            <div className="text-sm flex justify-between font-bold">
              <span>Payable Total</span>
              <span>{totalPrice.toFixed(2)} TK.</span>
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
