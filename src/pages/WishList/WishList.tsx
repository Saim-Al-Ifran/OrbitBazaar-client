import { Helmet } from "react-helmet";
import { useState } from "react";
import WishlistSkeleton from "../../components/SkeletonLoader/WishlistSkeleton";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useRemoveAllFromWishlistMutation,
} from "../../features/wishlist/wishlistApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const WishlistPage = () => {
  const { data: wishlistData, isLoading } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [removeAllFromWishlist] = useRemoveAllFromWishlistMutation();
  console.log("Wishlist Data:", wishlistData);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [clearingAll, setClearingAll] = useState(false);

  const handleRemove = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0F1418",
      confirmButtonText: "Yes, remove it!",
    });

    if (!result.isConfirmed) return;

    try {
      setRemovingId(productId);
      await removeFromWishlist(productId).unwrap();
      toast.success("Product removed from wishlist!");
    } catch (error) {
      toast.error("Failed to remove product from wishlist.");
      console.error("Wishlist delete error:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleClearAll = async () => {
    const result = await Swal.fire({
      title: "Clear All?",
      text: "Are you sure you want to remove all items from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0F1418",
      confirmButtonText: "Yes, clear all",
    });

    if (!result.isConfirmed) return;

    try {
      setClearingAll(true);
      await removeAllFromWishlist({}).unwrap();
      toast.success("All wishlist items cleared!");
    } catch (error) {
      toast.error("Failed to clear wishlist.");
    } finally {
      setClearingAll(false);
    }
  };

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>OrbitBazaar - Wishlist</title>
      </Helmet>

      <div className="p-6 mb-[4rem] mt-[1rem]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-center">My Wishlist</h2>
          {(wishlistData?.items?.length ?? 0) > 0 && (
            <button
              onClick={handleClearAll}
              className="btn btn-sm btn-outline btn-error"
              disabled={clearingAll}
            >
              {clearingAll ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-1"></i> Clearing...
                </>
              ) : (
                <>
                  <i className="fas fa-trash mr-1"></i> Clear All
                </>
              )}
            </button>
          )}
        </div>

        <div className="divider"></div>

        {!wishlistData?.items?.length ? (
          <div className="text-center mt-20 text-gray-600">
            <div className="text-6xl mb-4">
              <i className="fa-regular fa-heart"></i>
            </div>
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven’t added anything yet.</p>
            <NavLink to="/shop">
                <button
                  className="btn bg-[#3A70B5] text-white mt-6"
                >
                  <i className="fas fa-store mr-2"></i> Browse Products
                </button>
            </NavLink>

          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlistData?.items.map((item) => {
              const isDeleting = removingId === item.productID._id;
              return (
                <div
                  key={item.productID._id}
                  className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-white"
                >
                  <img
                    src={item.productID.images[0]}
                    alt={item.productID.name}
                    className="w-[80px] h-[110px] object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-md font-semibold">{item.productID.name}</h3>
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-lg">${item.productID.price}</span>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <button
                        className="btn btn-sm btn-neutral"
                        disabled={isDeleting || clearingAll}
                      >
                        <i className="fas fa-cart-plus mr-2"></i> Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(item.productID._id)}
                        className="btn btn-sm btn-outline btn-error"
                        disabled={isDeleting || clearingAll}
                      >
                        {isDeleting ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          <i className="fas fa-trash-alt"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
