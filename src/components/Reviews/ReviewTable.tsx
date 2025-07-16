import { StarIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import EditReviewModal from "./EditReviewModal";
import { EyeIcon } from "@heroicons/react/24/solid";
import ReviewDetailsModal from "./ReviewDetailsModal";
export interface ReviewedProduct {
  _id: string;
  productID: {
    _id: string;
    name: string;
    images: string[];
  };
  rating: number;
  comment: string;
  createdAt: string;
}
export interface ReviewTableProps {
  reviews: ReviewedProduct[];
}
 

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews }) => {
  console.log(reviews);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDetailsReview, setSelectedDetailsReview] = useState<ReviewedProduct | null>(null);

  const [selectedReview, setSelectedReview] = useState<{
    id: string;
    rating: number;
    comment: string;
  } | null>(null);

const handleEdit = (id: string, rating: number, comment: string) => {
  setSelectedReview({ id, rating, comment });
  setShowEditModal(true);
};
const handleUpdate = (updated: { reviewId: string; rating: number; comment: string }) => {
  console.log("Updated review:", updated);
  // TODO: Send PATCH/PUT request to backend
};

  const handleDelete = (reviewId: string) => {
    console.log("Delete review:", reviewId);
    // TODO: Confirm + call delete API
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Rating</th>
              <th className="px-6 py-4 text-left">Comment</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.productID.images?.[0]}
                      alt={review.productID.name}
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <span className="font-medium text-gray-800">
                      {review.productID.name}
                    </span>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-[#ff8036] font-semibold">
                    {review.rating}
                    <StarIcon className="w-5 h-5 text-[#ff8036]" />
                  </div>
                </td>

                {/* Comment */}
                <td className="px-6 py-4 text-gray-700">{review.comment}</td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2 w-fit">
                    <button 
                      onClick={() => {
                          setSelectedDetailsReview(review);
                          setShowDetailsModal(true);
                      }}
                      className="flex bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm rounded text-center"
                    >
                      <EyeIcon className="w-4 h-4 mt-[2px] mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(review._id, review.rating, review.comment)}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(review._id)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit  Review Modal*/}
        {showEditModal && selectedReview && (
          <EditReviewModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            reviewId={selectedReview.id}
            initialRating={selectedReview.rating}
            initialComment={selectedReview.comment}
            onSubmit={handleUpdate}
          />
        )}
      {/* Review Details Modal */}
        {showDetailsModal && selectedDetailsReview && (
          <ReviewDetailsModal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            review={selectedDetailsReview}
          />
        )}
    </div>
  );
};

export default ReviewTable;
