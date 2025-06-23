import { useEffect, useState } from "react";
import { useGetProductsReviewsQuery } from "../../../features/reviews/reviewsApi";
import { Review } from "../../../types/api-types/reviews/reviews.types";
import Pagination from "../../../components/Pagination/Pagination";
import { BarLoader } from "react-spinners";
 

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const [paginationLoading, setPaginationLoading] = useState(false);
  const { data, isLoading, isError } = useGetProductsReviewsQuery({
      productId,
      page: page,
      limit: limit,
    });

  const reviews = data?.data || [];
  
 
  useEffect(() => {
      setPaginationLoading(false);
  }, [data,isError]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 mt-10 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

{isLoading && (
  <div className="flex flex-col items-center justify-center py-6">
    <BarLoader color="#FF943D" />
    <p className="text-gray-500 mt-2">Loading reviews...</p>
  </div>
)}

      {isError && <p className="text-red-500">Failed to load reviews.</p>}

      {!isLoading && reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      {!isLoading && reviews.length > 0 && (
        <>
          <div className="space-y-6">
            {reviews.map((review:Review) => (
              <div key={review._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#FF943D] text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < Math.round(review.rating) ? "" : "text-gray-300"}`}
                      ></i>
                    ))}
                    <span className="text-gray-600 text-sm ml-2">{review.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
                <div className="mt-2 text-sm text-gray-500">— {review.user?.name || "Anonymous"}</div>
              </div>
            ))}
          </div>

          {/* Pagination */}
           <Pagination
             pagination={data?.pagination}
             isLoading={isLoading}
             paginationLoading={paginationLoading}
             setPage={setPage}
             setPaginationLoading={setPaginationLoading}
             label="Reviews"
          />
        </>
      )}
    </div>
  );
};

export default ReviewSection;
