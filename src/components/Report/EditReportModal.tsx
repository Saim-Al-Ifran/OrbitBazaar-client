import { useState, useEffect } from "react";
interface EditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    _id: string;
    reason: string;
    comment: string;
  };
  onUpdate: (reportId: string, payload: {
    reason: string;
    comments: string;
  }) => void;
}

const EditReportModal = ({ isOpen, onClose, report, onUpdate }: EditReportModalProps) => {
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000)); // Simulate API call
      onUpdate(report._id, { reason, comments });
      setError("");
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="btn bg-[#af2525] hover:bg-[#8c1e1e] text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`btn bg-[#123458] hover:bg-[#144364] text-white ${loading ? "loading" : ""}`}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Report"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditReportModal;
