import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { FadeLoader } from "react-spinners";
import ReportModal from "../Report/ReportModal";
import SubmitReviewModal from "../Reviews/SubmitReviewModal";
 
type Order = {
  _id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
};

interface UsersOrdersTableProps {
  orders: Order[];
  isLoading: boolean;
}

const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "processing":
      return "bg-yellow-100 text-yellow-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const UsersOrdersTable = ({ orders, isLoading }: UsersOrdersTableProps) => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleView = (id: string) => {
    navigate(`/dashboard/user/orders/${id}`);
  };
 

  const handleReview = (orderId: string) => {
  setSelectedOrderId(orderId);
  setShowReviewModal(true);
};


  const handleReport = (productId: string) => {
    setSelectedProductId(productId);
    setShowReportModal(true);
  };

  const handleReportSubmit = (payload: {
    productId: string;
    reason: string;
    comments: string;
  }) => {
    console.log("Submitted report:", payload);
    // TODO: integrate with API here
  };

  const handleReviewSubmit = (payload: { orderId: string; rating: number; comment: string }) => {
  console.log("Review submitted:", payload);
  // TODO: Call API to submit the review
};

  if (isLoading)
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <FadeLoader />
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600 tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Order ID</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Total</th>
            <th className="px-6 py-4 text-left">Ordered On</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-mono text-sm text-gray-700">
                #{order._id.slice(-6).toUpperCase()}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
              <td className="px-6 py-4 text-gray-600">
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(order._id)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View
                  </button>

                  {/* {order.status === "delivered" && ( */}
                    <button
                      onClick={() => handleReview(order._id)}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      Review
                    </button>
                  {/* )} */}

                  <button
                    onClick={() => handleReport(order._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                  >
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    Report
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Report Modal */}
      {showReportModal && selectedProductId && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          productId={selectedProductId}
          onSubmit={handleReportSubmit}
        />
      )}
      {/* Review Modal */}
    {showReviewModal && selectedOrderId && (
      <SubmitReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        orderId={selectedOrderId}
        onSubmit={handleReviewSubmit}
      />
    )}

    </div>
  );
};

export default UsersOrdersTable;
