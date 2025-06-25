import { Helmet } from "react-helmet";
import WishlistSkeleton from "../../components/SkeletonLoader/WishlistSkeleton";
import { useGetWishlistQuery } from "../../features/wishlist/wishlistApi";

 
 
const WishlistPage = () => {
  const {data:wishlistData , isLoading} = useGetWishlistQuery(); // Simulating data fetching, replace with actual data  
  if (isLoading) {
    return (
        <WishlistSkeleton />
    );
  }
  return (
    <>
    <Helmet>
      <title>OrbitBazaar - Wishlist</title>
    </Helmet>
        <div className="p-6 mb-[4rem] mt-[1rem]">
      <h2 className="text-2xl font-bold mb-4 text-center">My Wishlist</h2>
      <div className="divider"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlistData?.items.map((item) => (
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
                <button className="btn btn-sm btn-neutral">
                  <i className="fas fa-cart-plus mr-2"></i> Add to Cart
                </button>
                <button className="btn btn-sm btn-outline btn-error">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>

  );
};

export default WishlistPage;
