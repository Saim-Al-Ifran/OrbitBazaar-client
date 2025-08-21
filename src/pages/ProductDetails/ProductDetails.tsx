import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useGetSingleProductQuery, useRecordProductViewMutation } from "../../features/products/productsApi";
import ProductDetailsSkeleton from "../../components/SkeletonLoader/ProductDetailsSkeleton";
import BreadcrumbSkeleton from "../../components/SkeletonLoader/BreadcrumbSkeleton";
import ReviewSection from "./Sections/Review";
import ReviewsSkeleton from "../../components/SkeletonLoader/ReviewsSkeleton";
import { Tooltip } from "@material-tailwind/react";
import useCheckRoles from "../../hooks/auth/useCheckRoles";
import { useAddToWishlistMutation } from "../../features/wishlist/wishlistApi";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../../features/cart/cartApi";

const ProductDetails = () => {
  const { id = "" } = useParams();
  const { data: productData, isLoading } = useGetSingleProductQuery(id);
  const { isAdmin, isVendor, isSuperAdmin } = useCheckRoles();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [
    addToWishlist,
    {
      isSuccess: isAddingWishListSuccess,
      isLoading: isAddingToWishlist,
      error: wishListError,
    },
  ] = useAddToWishlistMutation();
  const [addToCart] = useAddToCartMutation();
  const [recordProductView] = useRecordProductViewMutation()

  const isPrivilegedUser = isAdmin || isVendor || isSuperAdmin;

useEffect(() => {
  const handleProductView = async () => {
   const viewedProducts = JSON.parse(sessionStorage.getItem("viewedProducts") || "[]");

    if (!viewedProducts.includes(id)) {
      await recordProductView(id);
      console.log("Recording product view for ID:", id);
      viewedProducts.push(id);
      sessionStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
    }
  };
  handleProductView();
}, [id]);
 
  useEffect(() => {
    if (productData?.product?.images?.length) {
      setSelectedImage(productData.product.images[0]);
    }
  }, [productData]);

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


  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };
  

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist({ productId: id }).unwrap();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };


    const handleAddToCart = async (productId: string, price: number) => {
      try {
        setLoadingProductId(productId);
  
        const res = await addToCart({ productId, price, quantity: 1 }).unwrap();
  
        if (res.message === "Added to cart") {
          toast.success("Product added to cart!");
        } else if (res.message === "Quantity updated") {
          toast.success("Quantity updated");
        } else {
          toast.success("Cart updated");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to add product to cart");
      } finally {
        setLoadingProductId(null);
      }
    };
  console.log("clicked product id", id);
  return (
    <>
      <Helmet>
        <title>{productData?.product?.name || "Loading..."} - Product Details</title>
      </Helmet>

      {/* Breadcrumbs */}
      {isLoading ? (
        <div className="pl-5 lg:pl-16 mt-4 mb-4">
          <BreadcrumbSkeleton />
        </div>
      ) : (
        <div className="pl-5 lg:pl-16 mt-4 mb-4 bg-gray-100 py-3 rounded-md">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="flex items-center gap-1 text-[16px] hover:text-blue-600">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              to="/shop"
              className="flex items-center gap-1 hover:text-blue-600 font-medium text-[16px]"
            >
              <i className="fa-solid fa-bag-shopping"></i>
              <span>Shop</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#47698F] font-medium text-[16px]">
              {productData?.product?.name}
            </span>
          </div>
        </div>
      )}

      {/* Product Info */}
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Images */}
            <div className="w-full md:w-1/2">
              <div className="border rounded-lg overflow-hidden shadow-sm mb-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-[400px] object-contain"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto">
                {productData?.product?.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setSelectedImage(img)}
                    className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${
                      selectedImage === img ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 space-y-4">
              <h1 className="text-3xl font-semibold">{productData?.product?.name}</h1>

              <div className="flex items-center gap-2 text-[#ff943d] text-[15px]">
                <i className="fas fa-star"></i>
                <span>
                  {productData?.product?.ratings?.average ?? "0"} (
                  {productData?.product?.ratings?.count ?? "0"} ratings)
                </span>
              </div>

              <div className="text-3xl font-bold text-gray-800">
                ${productData?.product?.price?.toLocaleString?.() ?? "N/A"}
              </div>

              <div
                className={`${
                  (productData?.product?.stock ?? 0) > 0 ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {(productData?.product?.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {productData?.product?.description}
              </p>

              <div className="flex items-center gap-3">
                <span className="font-medium">Quantity:</span>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 border border-gray-300 rounded px-2 py-1"
                />
              </div>

              <div className="flex gap-4 mt-6">
                {/* Add to Wishlist */}
                <Tooltip
                  content={
                    isPrivilegedUser
                      ? "Only customers can add products to the wishlist"
                      : "Add to Wishlist"
                  }
                  placement="top"
                >
                  <span>
                    <button
                      onClick={handleAddToWishlist}
                      disabled={isPrivilegedUser || isAddingToWishlist  }
                      className={`bg-white border border-black text-black font-medium px-6 py-2 rounded-md transition ${
                        isPrivilegedUser || isAddingToWishlist 
                          ? "bg-gray-300 cursor-not-allowed text-gray-600 border-[#747474] "
                          : "hover:bg-[#E2E2E2] hover:border-[#E2E2E2]"
                      }`}
                    >
                      {isAddingToWishlist   ? (
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                      ) : (
                        <i className="fa-solid fa-heart mr-2"></i>
                      )}
                      {isAddingToWishlist   ? "Adding..." : "Add to Wishlist"}
                    </button>

                  </span>
                </Tooltip>

                {/* Add to Cart */}
<Tooltip
  content={
    isPrivilegedUser
      ? "Only customers can add products to the cart"
      : (productData?.product?.stock ?? 0) === 0
      ? "Out of Stock"
      : "Add to Cart"
  }
  placement="top"
>
  <span>
    <button
      onClick={() => {
        if (productData?.product?._id && productData?.product?.price !== undefined) {
          handleAddToCart(productData.product._id, productData.product.price);
        }
      }}
      className={`font-medium px-6 py-2 rounded-md transition w-full md:w-auto ${
        isPrivilegedUser || loadingProductId === productData?.product?._id || (productData?.product?.stock ?? 0) === 0
          ? "bg-gray-300 cursor-not-allowed text-gray-600"
          : "bg-gray-900 hover:bg-gray-700 text-white"
      }`}
      disabled={
        isPrivilegedUser ||
        loadingProductId === productData?.product?._id ||
        (productData?.product?.stock ?? 0) === 0
      }
    >
      {loadingProductId === productData?.product?._id ? (
        <>
          <i className="fa-solid fa-spinner fa-spin mr-2"></i> Adding...
        </>
      ) : (
        <>
          <i className="fa-solid fa-cart-plus mr-2"></i> Add to Cart
        </>
      )}
    </button>
  </span>
</Tooltip>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {isLoading ? (
        <ReviewsSkeleton />
      ) : productData?.product?.ratings?.count === 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">No Reviews Yet</h2>
          <p className="text-gray-500">Be the first to review this product!</p>
        </div>
      ) : (
        <ReviewSection productId={id} />
      )}
    </>
  );
};

export default ProductDetails;
