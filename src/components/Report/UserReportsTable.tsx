import { NavLink } from "react-router-dom";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
 
import EditReportModal from "./EditReportModal";
 
//import { FadeLoader } from "react-spinners";
export const dummyReports = [
  {
    _id: "rpt001",
    userEmail: "jane.doe@gmail.com",
    reason: "Damaged product",
    comment: "The product arrived with a torn sleeve.",
    status: "pending",
    createdAt: "2025-06-01T10:30:00.000Z",
    productID: {
      _id: "prd001",
      name: "Casual Denim Jacket",
      images: [
        "https://res.cloudinary.com/dobzvjjld/image/upload/v1737276197/obritBazaar/uploads/demin_jacket.jpg"
      ],
    },
  },
  {
    _id: "rpt002",
    userEmail: "john.smith@gmail.com",
    reason: "Misleading description",
    comment: "Product doesn’t match the features listed in the description.",
    status: "resolved",
    createdAt: "2025-06-05T12:15:00.000Z",
    productID: {
      _id: "prd002",
      name: "Wireless Headphones",
      images: [
        "https://m.media-amazon.com/images/I/61N+WhybTZL._UF894,1000_QL80_.jpg"
      ],
    },
  },
  {
    _id: "rpt003",
    userEmail: "emily.watson@gmail.com",
    reason: "Inappropriate content",
    comment: "The product image contains offensive text.",
    status: "rejected",
    createdAt: "2025-06-10T08:00:00.000Z",
    productID: {
      _id: "prd003",
      name: "Graphic T-Shirt",
      images: [
        "https://i4.cloudfable.net/styles/550x550/8.51/Black/palm-tree-pastel-sunset-scene-t-shirt-20240605061044-ullmkoh0-s4.jpg"
      ],
    },
  },
];

const ReportsTable = () => {
//   const { data, isLoading } = useGetReportsQuery();
const [showEditModal, setShowEditModal] = useState(false);
const [selectedReport, setSelectedReport] = useState(null);
  const reports = dummyReports|| [];

  const handleEditReport = (report: any) => {
    setSelectedReport(report);
    setShowEditModal(true);
  };
  const handleReportUpdate = (reportId: string, payload: { reason: string; comments: string }) => {
    console.log("Update report:", reportId, payload);
    // TODO: call update mutation here
  };
//   if (isLoading)
//     return (
//       <div className="flex justify-center py-10">
//         <FadeLoader />
//       </div>
//     );

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

              {/* Reason */}
              <td className="px-6 py-4 text-red-600">{report.reason}</td>

              {/* Comment */}
              <td className="px-6 py-4">{report.comment}</td>

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
                    >
                    <button  className="flex bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm rounded text-center">
                      <EyeIcon className="w-4 h-4 mt-[2px] mr-1" />
                      View
                    </button>

                    </NavLink>

                    {/* Edit & Delete only for pending status */}
                    {report.status === "pending" && (
                    <>
                        <button 
                          className="flex bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded text-center"
                          onClick={() => handleEditReport(report._id)}
                        > 
                          <PencilSquareIcon className="w-4 h-4 mt-[2px] mr-1" />
                          Edit
                        </button>
                        <button
                          className="flex bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                        >
                            <TrashIcon className="w-4 h-4 mt-[2px] mr-1" />
                            Delete
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
