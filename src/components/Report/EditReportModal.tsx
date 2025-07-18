import { useState, useEffect } from "react";
interface EditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    _id: string;
    reason: string;
    comment: string;
  };
  isUpdating: boolean;
  onUpdate: (reportId: string, payload: {
    reason: string;
    comment: string;
  }) => void;
}

const EditReportModal = ({ isOpen, onClose, report,isUpdating, onUpdate }: EditReportModalProps) => {
  const [reason, setReason] = useState("");
  const [comment, setComments] = useState("");
  const [error, setError] = useState("");

  console.log(report);
  
  // Prefill when modal opens
  useEffect(() => {
    if (report) {
      setReason(report.reason);
      setComments(report.comment || "");
    }
  }, [report]);

  const handleUpdate = async () => {
    if (!reason.trim()) {
      setError("Reason is required.");
      return;
    }
 
      onUpdate(report._id, { reason, comment});
      setError("");
    //  onClose();

  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Edit Report</h3>

        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="reason"
            className="input input-bordered w-full"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <textarea
            id="comments"
            className="textarea textarea-bordered w-full"
            rows={4}
            value={comment}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
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
            onClick={handleUpdate}
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

export default EditReportModal;
