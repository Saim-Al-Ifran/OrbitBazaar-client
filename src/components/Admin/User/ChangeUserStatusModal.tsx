import React from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  status: string;
  onClose: () => void;
  onSave: () => void;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const ChangeUserStatusModal: React.FC<Props> = ({
  status,
  onClose,
  onSave,
  setStatus,
  isLoading,
}) => {
  return (
    <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">Change User Status</h3>

        <div className="mb-4">
          <label className="block font-medium mb-1">User Status</label>
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="block">Blocked</option>
          </select>
        </div>

        <div className="modal-action flex justify-end gap-3">
          <button className="btn rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`  text-[14px] bg-[#21324A] hover:bg-[#102e50e8] text-white font-semibold px-3  rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={onSave}
          >
            {isLoading ? (
              <>
                <ClipLoader size={20} color="#e8e7e7" />
                <span>Savings...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserStatusModal;
