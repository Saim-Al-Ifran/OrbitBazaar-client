import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography, IconButton, Tooltip, Chip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { OrderInfo, OrdersTableProps } from "../../../types/types";
import { useEditOrderStatusMutation } from "../../../features/orders/ordersApi";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const TABLE_HEAD = ["Order ID", "User Email", "Total Quantity", "Total Price", "Status", "Action"];

const getStatusChipColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-blue-500 text-white";
    case "processing":
      return "bg-yellow-500 text-black";
    case "delivered":
      return "bg-green-500 text-white";
    case "cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-black";
  }
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderInfo | null>(null);
  const [editableStatus, setEditableStatus] = useState<string>("");
  const [editOpen, setEditOpen] = useState(false);
  const [editOrderStatus, { isLoading,isSuccess,isError}] = useEditOrderStatusMutation();

  useEffect(()=>{
    if (isSuccess) {
      toast.success("Order status updated successfully");
      setEditOpen(false);
    }
    if (isError) {
      toast.error("Failed to update order status");
    }
  },[isSuccess,isError])

  const handleEditOpen = (order: OrderInfo): void => {
    setSelectedOrder(order);
    setEditableStatus(order.status);
    setEditOpen(true);
  };

  const handleStatusSave = async() => {
    if (selectedOrder) {
          await editOrderStatus({ orderId: selectedOrder._id, status:editableStatus }).unwrap();
          console.log({ id: selectedOrder._id, data: editableStatus });
    }
  };

  return (
    <>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70" {...(undefined as any)}>
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const { _id, userEmail, totalQuantity, totalPrice, status } = order;
            const isLast = index === orders.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={_id}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {userEmail}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {totalQuantity}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </td>
                <td className={classes}>
                  <Chip value={status} className={getStatusChipColor(status)} variant="filled" size="sm" />
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Tooltip content="Edit Order">
                      <IconButton variant="filled" onClick={() => handleEditOpen(order)} {...(undefined as any)}>
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

      {/* Edit Order Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="font-bold text-lg mb-4">Edit Order Status</h3>
            <label className="block font-medium mb-1">Order Status</label>
            <select
              className="select select-bordered w-full mb-4"
              value={editableStatus}
              onChange={(e) => setEditableStatus(e.target.value)}
            >
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setEditOpen(false)}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || (editableStatus === selectedOrder?.status)}
                className={`text-[14px] bg-[#21324A] hover:bg-[#102e50e8] text-white font-semibold px-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
                  isLoading || (editableStatus === selectedOrder?.status) ? "opacity-60 cursor-not-allowed" : ""
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
    </>
  );
};

export default OrdersTable;
