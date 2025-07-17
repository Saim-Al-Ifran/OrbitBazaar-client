import ReviewTable, { ReviewedProduct } from "../../../../components/Reviews/ReviewTable";
import { NavLink } from "react-router-dom";
import { useGetUserReviewsQuery } from "../../../../features/reviews/reviewsApi";
import { FadeLoader, PulseLoader } from "react-spinners";
import Pagination from "../../../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
 

const UserReviews = () => {
  const [page, setPage] = useState(1);
  const limit = 5;  
  const [paginationLoading, setPaginationLoading] = useState(false);
  const {data:reviewsData,isLoading:isReviewLoading} = useGetUserReviewsQuery({
     page,
     limit 
 });
  useEffect(() => {
      setPaginationLoading(false);
  },[reviewsData])
 
  if (isReviewLoading){
      return (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <FadeLoader />
          </div>
      );
   }
  return (
    <div className="container mx-auto px-4 py-8">
      {reviewsData?.data && reviewsData.data.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-6">User Reviews</h1>
          <p className="text-gray-700 mb-4">
            Here you can view and manage your reviews.
          </p>
            {paginationLoading ? (
              <div className="flex justify-center items-center h-32">
                <PulseLoader color="#123458" />
              </div>
            ) : (
                 <ReviewTable reviews={reviewsData?.data as unknown as ReviewedProduct[]} />
            )}
 

        </>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-600 flex flex-col items-center">
            <i className="fa-solid fa-star text-gray-400 text-5xl mb-4"></i>
            <p className="text-lg font-semibold mb-2">You haven’t written any reviews yet.</p>
            <p className="text-sm mb-4">Purchase a product and share your experience with others.</p>
            <NavLink
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r bg-[#123458] hover:bg-[#1a4e85] text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Go to Shop
            </NavLink>
          </div>
        </div>
      )}
          {/* Show pagination only if data is available */}
      {reviewsData?.data && reviewsData?.data.length > 0 && (
        <div className="mt-6">
          <Pagination
            pagination={reviewsData?.pagination}
            isLoading={isReviewLoading}
            paginationLoading={paginationLoading}
            setPage={setPage}
            setPaginationLoading={setPaginationLoading}
            label="Reviews"
          />
        </div>
      )}
    </div>
  );
};

export default UserReviews;
