import { PencilIcon,  EyeIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ReportsInfo, ReportsTableProps } from "../../../types/types";
import { useUpdateVendorReportStatusMutation } from "../../../features/reports/reportsApi";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const TABLE_HEAD = ["Product", "User Email", "Reason", "Status", "Action"];

const ReportTable = ({ reports }: ReportsTableProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editableStatus, setEditableStatus] = useState<"pending" | "resolve" | "reject">("pending");
  const [selectedReport, setSelectedReport] = useState<ReportsInfo | null>(null);
  const [updateVendorReportStatus,{isLoading,isSuccess,isError}] = useUpdateVendorReportStatusMutation();

  useEffect(()=>{
    if (isSuccess) {
      toast.success("Report status updated successfully");
      setEditOpen(false);
    }
    if (isError) {
      toast.error("Failed to update report status");
    }
  },[isSuccess,isError]);

  const handleEditOpen = (report:ReportsInfo): void => {
      setSelectedReport(report);
      setEditableStatus(report?.status || "");
      setEditOpen(true);


  };

  const handleViewOpen = (report:ReportsInfo) => {
    setSelectedReport(report);
    setViewOpen(true);
  };
  const handleStatusSave = async() => {
    if (selectedReport) {
        await updateVendorReportStatus({
          reportId: selectedReport._id,
          status: editableStatus,
        }).unwrap();
 
    }
  };
  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-black";
      case "resolve":
        return "bg-green-500 text-black";
      case "reject":
        return "bg-red-500 text-black";
      default:
        return "bg-gray-500 text-black text-center";
    }
  };

  return (
    <>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  {...undefined as any}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => {
            const { productID, userEmail, reason, status } = report;
            const { name, images } = productID;
            const isLast = index === reports.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={report._id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={images[0]} alt={name} size="sm" {...undefined as any}/>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...undefined as any}
                      >
                        {name}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    {...undefined as any}
                  >
                    {userEmail}
                  </Typography>
                </td>
                <td className={classes}>
                  <Tooltip content={reason}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal truncate max-w-[200px]"
                      {...undefined as any}
                    >
                      {reason.length > 40 ? `${reason.slice(0, 40)}...` : reason}
                    </Typography>
                  </Tooltip>
                </td>
                <td className={classes}>
                  <Chip
                    value={status}
                    className={getStatusChipColor(status)}
                    variant="filled"
                    size="sm"
                  />
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Tooltip content="View Report">
                      <IconButton
                        color="blue"
                        variant="filled"
                        onClick={() => handleViewOpen(report)}
                        {...undefined as any}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit Report">
                      <IconButton variant="filled" onClick={() => handleEditOpen(report)} {...undefined as any}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
 
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Report Modal */}
      {editOpen && (
        
        <div className="modal modal-open">
          
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Report Status</h3>
            <div className="mt-4">
           <label className="block font-medium">Report Status</label>
          <select
            className="select select-bordered w-full"
            value={editableStatus}
            onChange={(e) => setEditableStatus(e.target.value as "pending" | "resolve" | "reject")}
          >
            <option value="pending">Pending</option>
            <option value="resolve">Resolved</option>
            <option value="reject">Rejected</option>
          </select>

            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setEditOpen(false)}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || (editableStatus === selectedReport?.status)}
                className={`text-[14px] bg-[#21324A] hover:bg-[#102e50e8] text-white font-semibold px-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
                  isLoading || (editableStatus === selectedReport?.status) ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={handleStatusSave}
              >
                {isLoading ? (
                  <>
                    <ClipLoader size={20} color="#e8e7e7" />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Report Modal */}
      {viewOpen && selectedReport && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Report Details</h3>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Product Name:</strong> {selectedReport.productID?.name}
              </p>
              <p>
                <strong>User Email:</strong> {selectedReport.userEmail}
              </p>
              <p>
                <strong>Reason:</strong> {selectedReport.reason}
              </p>
              <p>
                <strong>Comment:</strong> {selectedReport.comment || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedReport.status}
              </p>
              {selectedReport.productID?.images?.length > 0 && (
                <img
                  src={selectedReport.productID.images[0]}
                  alt="Product"
                  className="w-32 h-32 object-cover rounded mt-2"
                />
              )}
            </div>
            <div className="modal-action">
              <button className="btn bg-[#002039] text-white" onClick={() => setViewOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportTable;
