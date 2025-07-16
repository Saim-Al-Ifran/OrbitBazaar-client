import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
  initialRating: number;
  initialComment: string;
  isUpdating: boolean;
  onSubmit: (payload: { reviewId: string; rating: number; comment: string }) => void;
}

const EditReviewModal = ({
  isOpen,
  onClose,
  reviewId,
  initialRating,
  initialComment,
  isUpdating,
  onSubmit,
}: EditReviewModalProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(initialComment);
  const [error, setError] = useState("");
 
  useEffect(() => {
    setRating(initialRating);
    setComment(initialComment);
    setError("");
  }, [initialRating, initialComment, isOpen]);

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      setError("Rating and comment are required.");
      return;
    }

    onSubmit({ reviewId, rating, comment });
   
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Your Review</h3>

        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`w-6 h-6 cursor-pointer ${
                (hover || rating) >= star ? "text-[#ff8036]" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Update your review..."
          rows={4}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setError("");
          }}
        />

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isUpdating}
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
            disabled={isUpdating}
            onClick={handleSubmit}
            className={`px-4 py-2 rounded text-white bg-[#123458] 
                        hover:bg-[#144364] 
                        disabled:bg-[#8da1b8] 
                        disabled:cursor-not-allowed 
                        disabled:opacity-80 
                        transition-all duration-300`}
          >
            {isUpdating? "Updatting..." : "Update Review"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditReviewModal;
