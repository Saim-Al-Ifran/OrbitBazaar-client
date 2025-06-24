import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useGetSingleProductQuery } from "../../features/products/productsApi";
import ProductDetailsSkeleton from "../../components/SkeletonLoader/ProductDetailsSkeleton";
import BreadcrumbSkeleton from "../../components/SkeletonLoader/BreadcrumbSkeleton";
import ReviewSection from "./Sections/Review";
import ReviewsSkeleton from "../../components/SkeletonLoader/ReviewsSkeleton";
import { Tooltip } from "@material-tailwind/react";
import useCheckRoles from "../../hooks/auth/useCheckRoles";

 // Add this to your public folder or adjust accordingly

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: productData, isLoading } = useGetSingleProductQuery(id ?? "");
  const {isAdmin,isVendor,isSuperAdmin} = useCheckRoles();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productData?.product?.images?.length) {
      setSelectedImage(productData.product.images[0]);
    }
  }, [productData]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

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
            <Link to="/shop" className="flex items-center gap-1 hover:text-blue-600 font-medium text-[16px]">
              <i className="fa-solid fa-bag-shopping"></i>
              <span>Shop</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#47698F] font-medium text-[16px]">{productData?.product?.name}</span>
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
                  src={selectedImage }
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
                    onClick={() => {
                      setSelectedImage(img);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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
                <Tooltip
                  content={
                    isAdmin || isVendor || isSuperAdmin
                      ? "Only customers can add products to the wishlist"
                      : "Add to Wishlist"
                  }
                  placement="top"
                >
                  <span>
                    <button
                      className={`bg-white hover:bg-[#E2E2E2] hover:border-[#E2E2E2] border border-black text-black font-medium px-6 py-2 rounded-md transition ${
                        isAdmin || isVendor || isSuperAdmin
                          ? "bg-gray-300 cursor-not-allowed text-gray-600"
                          : ""
                      }`}
                      disabled={isAdmin || isVendor || isSuperAdmin}
                    >
                      <i className="fa-solid fa-heart"></i> Add to Wishlist
                    </button>
                  </span>
                </Tooltip>

 
                  <Tooltip
                    content={
                      isAdmin || isVendor || isSuperAdmin
                        ? "Only customers can add products to the cart"
                        : "Add to Cart"
                    }
                    placement="top"
                  >
                    <span>
                      <button
                        className={`bg-black hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-md transition ${
                          isAdmin || isVendor || isSuperAdmin
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-gray-900 hover:bg-gray-700 text-white"
                        }`}
                        disabled={isAdmin || isVendor || isSuperAdmin}
                      >
                        <i className="fa-solid fa-cart-plus"></i> Add to Cart
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
        <ReviewSection productId={id ?? ""}/>
      )}
    </>
  );
};

export default ProductDetails;
