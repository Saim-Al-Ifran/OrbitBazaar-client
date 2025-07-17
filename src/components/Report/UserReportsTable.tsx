import { NavLink } from "react-router-dom";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
 
import EditReportModal from "./EditReportModal";
import { useDeleteReportMutation } from "../../features/reports/reportsApi";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export interface Report {
  _id: string;
  productID: {
    _id: string;
    name: string;
    images: string[];
  };
  userEmail: string;
  reason: string;
  comment: string;
  status: "pending" | "resolved" | "rejected";
  createdAt: string;
}

interface ReportsTableProps {
  reports: Report[];
}
const ReportsTable: React.FC<ReportsTableProps> = ({ reports }) => {
 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [deletingReportId, setDeletingReportId] = useState<string | null>(null);
  const [deleteReport] = useDeleteReportMutation();

  const handleEditReport = (report: any) => {
    setSelectedReport(report);
    setShowEditModal(true);
  };
  const handleReportUpdate = (reportId: string, payload: { reason: string; comments: string }) => {
    console.log("Update report:", reportId, payload);
    // TODO: call update mutation here
  };

  const handleDeleteReport = async (reportId: string) => {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Once deleted, you won’t be able to recover this review!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#123458",
          confirmButtonText: "Yes, delete it!",
        });
    if (result.isConfirmed) {
      setDeletingReportId(reportId);
      try {
        await deleteReport(reportId).unwrap();
        toast.success("Report deleted successfully!");
      } catch (error) {
        console.error("Failed to delete report:", error);
        Swal.fire("Error!", "Failed to delete the report. Please try again.", "error");
      } finally {
        setDeletingReportId(null);
      }
    }
  }

  return (
    <div className="overflow-x-auto shadow border rounded bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3 text-left">User Email</th>
            <th className="px-6 py-3 text-left">Reason</th>
            <th className="px-6 py-3 text-left">Comment</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Reported On</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id} className="border-t hover:bg-gray-50">
              {/* Product */}
              <td className="flex items-center gap-3 px-6 py-4">
                <img
                  src={report.productID.images?.[0]}
                  alt={report.productID.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{report.productID.name}</span>
              </td>

              {/* User Email */}
              <td className="px-6 py-4">{report.userEmail}</td>

            <td className="px-6 py-2 text-red-600 max-w-[150px] truncate" title={report.reason}>
              {report.reason}
            </td>
            <td className="px-6 py-2 max-w-[200px] truncate" title={report.comment}>
              {report.comment}
            </td>


              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    report.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : report.status === "resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {report.status}
                </span>
              </td>

              {/* Created At */}
              <td className="px-6 py-4">
                {new Date(report.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            <td className="px-6 py-4">
                <div className="flex flex-col  gap-2">
                    {/* View Button (Always visible) */}
                      <NavLink
                        to={`/dashboard/user/reports/${report._id}`}
                        onClick={(e) => {
                          if (deletingReportId === report._id) {
                            e.preventDefault(); // prevent navigation while deleting
                          }
                        }}
                      >
                        <button
                          disabled={deletingReportId === report._id}
                          className={`flex items-center gap-1 text-white px-3 py-1 text-sm rounded text-center ${
                            deletingReportId === report._id
                              ? "bg-indigo-400 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          }`}
                        >
                          <EyeIcon className="w-4 h-4 mt-[2px] mr-1" />
                          View
                        </button>
                      </NavLink>


                    {/* Edit & Delete only for pending status */}
                    {report.status === "pending" && (
                    <>
                        <button 
                          disabled={deletingReportId === report._id}
                          className={`flex items-center gap-1 text-white px-3 py-1 text-sm rounded ${
                            deletingReportId === report._id
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          onClick={() => handleEditReport(report._id)}
                        > 
                          <PencilSquareIcon className="w-4 h-4 mt-[2px] mr-1" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReport(report._id)}
                          disabled={deletingReportId === report._id}
                          className={`flex items-center justify-center gap-2 px-3 py-1 text-sm rounded text-white ${
                            deletingReportId === report._id
                              ? "bg-red-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                          aria-label="Delete Review"
                        >
                          {deletingReportId === report._id ? (
                            <>
                              <ClipLoader color="#ffffff" size={16} />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <TrashIcon className="w-4 h-4" />
                              Delete
                            </>
                          )}
                        </button>
                    </>
                    )}
                </div>
            </td>
 
            </tr>
          ))}
        </tbody>
      </table>
            {/* Report Modal */}
{showEditModal && selectedReport && (
  <EditReportModal
    isOpen={showEditModal}
    onClose={() => setShowEditModal(false)}
    report={selectedReport}
    onUpdate={handleReportUpdate}
  />
)}
    </div>
  );
};

export default ReportsTable;
