import {
  StarIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import EditReviewModal from "./EditReviewModal";
import ReviewDetailsModal from "./ReviewDetailsModal";
import toast from "react-hot-toast";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../features/reviews/reviewsApi";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDetailsReview, setSelectedDetailsReview] =
    useState<ReviewedProduct | null>(null);
  const [updateReview, { isLoading: isUpdating, isSuccess }] =
    useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [selectedReview, setSelectedReview] = useState<{
    id: string;
    rating: number;
    comment: string;
  } | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review updated successfully!");
      setShowEditModal(false);
      setSelectedReview(null);
    }
  }, [isSuccess]);

  const handleEdit = (id: string, rating: number, comment: string) => {
    setSelectedReview({ id, rating, comment });
    setShowEditModal(true);
  };

  const handleUpdate = async (updated: {
    reviewId: string;
    rating: number;
    comment: string;
  }) => {
    const { reviewId, rating, comment } = updated;
    try {
      await updateReview({
        reviewId,
        data: { rating, comment },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you won’t be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#123458",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setDeletingReviewId(reviewId);
        const response = await deleteReview(reviewId).unwrap();
        toast.success((response as any)?.message || "Review deleted successfully!");
      } catch (error) {
        console.error("Failed to delete review:", error);
        toast.error("Failed to delete review.");
      } finally {
        setDeletingReviewId(null);
      }
    }
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
                      type="button"
                      onClick={() => {
                        setSelectedDetailsReview(review);
                        setShowDetailsModal(true);
                      }}
                      disabled={deletingReviewId === review._id}
                      className={`flex bg-indigo-600 text-white px-3 py-1 text-sm rounded text-center ${
                        deletingReviewId === review._id
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "hover:bg-indigo-700"
                      }`}
                      aria-label="View Details"
                    >
                      <EyeIcon className="w-4 h-4 mt-[2px] mr-1" />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(review._id, review.rating, review.comment)
                      }
                      disabled={deletingReviewId === review._id}
                      className={`flex items-center gap-1 text-white px-3 py-1 text-sm rounded ${
                        deletingReviewId === review._id
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      aria-label="Edit Review"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(review._id)}
                      disabled={deletingReviewId === review._id}
                      className={`flex items-center justify-center gap-2 px-3 py-1 text-sm rounded text-white ${
                        deletingReviewId === review._id
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      aria-label="Delete Review"
                    >
                      {deletingReviewId === review._id ? (
                        <>
                          <ClipLoader color="#ffffff" size={16} />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </>
                      )}
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Review Modal */}
      {showEditModal && selectedReview && (
        <EditReviewModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          reviewId={selectedReview.id}
          initialRating={selectedReview.rating}
          initialComment={selectedReview.comment}
          isUpdating={isUpdating}
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
