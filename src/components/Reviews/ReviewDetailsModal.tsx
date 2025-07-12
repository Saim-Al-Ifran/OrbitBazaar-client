import { StarIcon } from "@heroicons/react/24/solid";

interface ReviewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
    productID: {
      name: string;
      images: string[];
    };
  };
}

const ReviewDetailsModal = ({ isOpen, onClose, review }: ReviewDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Review Details
        </h3>

        {/* Product Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={review.productID.images?.[0]}
            alt={review.productID.name}
            className="w-16 h-16 rounded object-cover"
          />
          <span className="text-lg font-medium">{review.productID.name}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-5 h-5 ${
                review.rating >= star ? "text-[#ff8036]" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({review.rating})</span>
        </div>

        {/* Comment */}
        <p className="text-gray-700 text-sm whitespace-pre-line mb-4">
          {review.comment}
        </p>

        {/* Date */}
        <p className="text-xs text-gray-400">
          Reviewed on{" "}
          {new Date(review.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {/* Close button */}
        <div className="flex justify-end mt-6">
          <button className="btn bg-[#AF2525] hover:bg-[#8c1e1e] text-white" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReviewDetailsModal;
