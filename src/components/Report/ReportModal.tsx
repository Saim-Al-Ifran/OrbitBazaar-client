import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubmitReportMutation } from "../../features/reports/reportsApi";
import toast from "react-hot-toast";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  onSubmit: (payload: {
    productId: string;
    reason: string;
    comments: string;
  }) => void;
}

const ReportModal = ({ isOpen, onClose, productId  }: ReportModalProps) => {
  const [reason, setReason] = useState("");
  const [comment, setComments] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [submitReport, { isLoading }] = useSubmitReportMutation();

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError("Reason is required.");
      return;
    }
 
    try {
      await submitReport({ productId, reason, comment }).unwrap();
    
      setReason("");
      setComments("");
      setError("");
      onClose();
      toast.success("Report submitted successfully!");
      navigate("/dashboard/user/reports");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } 
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Report Issue</h3>
        <p className="text-sm text-gray-500 mb-4">
          Let us know why you're reporting this product. We'll review it shortly.
        </p>

        {/* Reason Input */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="reason"
            placeholder="e.g. Misleading description or wrong product sent"
            className="input input-bordered w-full"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
          />
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Comments <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="comments"
            rows={4}
            placeholder="Provide additional context..."
            className="textarea textarea-bordered w-full"
            value={comment}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            disabled={isLoading}
            className="px-4 py-2 rounded text-white 
                        bg-[#AF2525] 
                        hover:bg-[#8c1e1e] 
                        disabled:!bg-[#d49a9a] 
                        disabled:cursor-not-allowed 
                        disabled:opacity-80 
                        transition-all duration-300"
            onClick={() => {
              setReason("");
              setComments("");
              setError("");
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white bg-[#123458] 
                        hover:bg-[#144364] 
                        disabled:bg-[#8da1b8] 
                        disabled:cursor-not-allowed 
                        disabled:opacity-80 
                        transition-all duration-300`}
            onClick={handleSubmit}
            disabled={isLoading }
          >
            {isLoading  ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReportModal;
