import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onSubmit: (review: { orderId: string; rating: number; comment: string }) => void;
}

const SubmitReviewModal = ({ isOpen, onClose, orderId, onSubmit }: SubmitReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Rating is required.");
      return;
    }
    if (!comment.trim()) {
      setError("Comment is required.");
      return;
    }

   onSubmit({ orderId, rating, comment });
   console.log("Review submitted:", { orderId, rating, comment });
    setRating(0);
    setComment("");
    setError("");
    onClose();
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
            className="btn bg-[#AF2525]  hover:bg-[#8c1e1e] text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn bg-[#123458]  hover:bg-[#144364] text-white"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default SubmitReviewModal;
