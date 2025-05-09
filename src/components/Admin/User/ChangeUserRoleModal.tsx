import React from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  role: "user" | "admin" | "vendor" | "super-admin";
  onClose: () => void;
  onSave: () => void;
  setRole: React.Dispatch<React.SetStateAction<"user" | "admin" | "vendor" | "super-admin">>;
  isLoading: boolean;
}

const ChangeUserRoleModal: React.FC<Props> = ({
  role,
  onClose,
  onSave,
  setRole,
  isLoading,
}) => {
  return (
    <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">Change User Role</h3>

        <div className="mb-4">
          <label className="block font-medium mb-1">User Role</label>
          <select
            className="select select-bordered w-full"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
     
          </select>
        </div>

        <div className="modal-action flex justify-end gap-3">
          <button className="btn" onClick={onClose}>
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

export default ChangeUserRoleModal;
