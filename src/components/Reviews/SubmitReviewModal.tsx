import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useSubmitReviewMutation } from "../../features/reviews/reviewsApi";
import toast from "react-hot-toast";

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  onSubmit: (review: { productId: string; rating: number; comment: string }) => void;
}

const SubmitReviewModal = ({ isOpen, onClose, productId }: SubmitReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [submitReview, { isLoading,error:reviewError}] = useSubmitReviewMutation();
  console.log(reviewError)
  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Rating is required.");
      return;
    }
    if (!comment.trim()) {
      setError("Comment is required.");
      return;
    }

    try {
      const result = await submitReview({ productId, rating, comment }).unwrap();
      console.log("Review submitted:", result);

      // Reset form
      setRating(0);
      setComment("");
      setError("");

      // Close modal
      onClose?.();
      toast.success("Review submitted successfully!");
      // Navigate to reviews page
      navigate("/dashboard/user/reviews");
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("Failed to submit review. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Submit Review</h3>

        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                (hoverRating || rating) >= star ? "text-[#ff8036]" : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Comment box */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            rows={4}
            placeholder="Write your thoughts about the product..."
            className="textarea textarea-bordered w-full"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white 
                        bg-[#AF2525] 
                        hover:bg-[#8c1e1e] 
                        disabled:!bg-[#d49a9a] 
                        disabled:cursor-not-allowed 
                        disabled:opacity-80 
                        transition-all duration-300`}
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className={`px-4 py-2 rounded text-white bg-[#123458] 
                        hover:bg-[#144364] 
                        disabled:bg-[#8da1b8] 
                        disabled:cursor-not-allowed 
                        disabled:opacity-80 
                        transition-all duration-300`}
          >
            {isLoading? "Submitting..." : "Submit Review"}
          </button>


        </div>
      </div>
    </dialog>
  );
};


export default SubmitReviewModal;
