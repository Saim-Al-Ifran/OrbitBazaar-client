import { PencilIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Typography, IconButton, Tooltip, Chip } from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["Order ID", "User Email", "Total Quantity", "Total Price", "Status", "Action"];
const TABLE_ROWS = [
    {
      orderId: "60b9f1c0d1c6e9a8f5e33f9e",
      userEmail: "user1@example.com",
      totalQuantity: 3,
      totalPrice: 120.99,
      status: "confirmed",
      items: [
        { orderId: "60b9f1c0d1c6e9a8f5e33f9e", quantity: 1, price: 40.33, total: 40.33 },
        { orderId: "60b9f1c0d1c6e9a8f5e33f9f", quantity: 2, price: 40.33, total: 80.66 },
      ]
    },
    {
      orderId: "60b9f1c0d1c6e9a8f5e33f9g",
      name: "Bluetooth Headphones",
      userEmail: "user2@example.com",
      totalQuantity: 2,
      totalPrice: 99.98,
      status: "processing",
      items: [
        { orderId: "60b9f1c0d1c6e9a8f5e33f9g", quantity: 2, price: 49.99, total: 99.98 },
      ]
    },
    {
      orderId: "60b9f1c0d1c6e9a8f5e33f9h",
      userEmail: "user3@example.com",
      totalQuantity: 1,
      totalPrice: 29.99,
      status: "delivered",
      items: [
        { orderId: "60b9f1c0d1c6e9a8f5e33f9h", quantity: 1, price: 29.99, total: 29.99 },
      ]
    },
    {
      orderId: "60b9f1c0d1c6e9a8f5e33f9i",
      userEmail: "user4@example.com",
      totalQuantity: 1,
      totalPrice: 799.99,
      status: "cancelled",
      items: [
        { orderId: "60b9f1c0d1c6e9a8f5e33f9i", quantity: 1, price: 799.99, total: 799.99 },
      ]
    }
  ];

interface Order {
  orderId: string;
  userEmail: string;
  totalQuantity: number;
  totalPrice: number;
  status: string;
  items: any[];
}

const OrdersTable = ( ) => {
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");

  const handleEditOpen = (): void => {
    setEditOpen(true);
  };

  const handleViewOpen = (order: Order) => {
    setSelectedOrder(order);
    setViewOpen(true);
  };

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
        {TABLE_ROWS.map((order, index) => {
            const { orderId,  userEmail, totalQuantity, totalPrice, status } = order;
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
                <tr key={userEmail}>
                <td className={classes}>
                    <div className="flex items-center gap-3">

                    <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                        {orderId}
                        </Typography>
                    </div>
                    </div>
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
                    {/* View Order Button */}
                    <Tooltip content="View Order">
                        <IconButton color="blue" variant="filled" onClick={() => handleViewOpen(order)} {...(undefined as any)}>
                        <EyeIcon className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>

                    {/* Edit Order Button */}
                    <Tooltip content="Edit Order">
                        <IconButton variant="filled" onClick={handleEditOpen} {...(undefined as any)}>
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
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Order Status</h3>
            <div className="mt-4">
              <label className="block font-medium">Order Status</label>
              <select className="select select-bordered w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setEditOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setEditOpen(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {viewOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Order Details</h3>
            <div className="mt-4">
              <p><strong>Product:</strong> {selectedOrder.orderId}</p>
              <p><strong>User Email:</strong> {selectedOrder.userEmail}</p>
              <p><strong>Total Quantity:</strong> {selectedOrder.totalQuantity}</p>
              <p><strong>Total Price:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              {/* Add any other details you want to show here */}
            </div>
            <div className="modal-action">
              <button className="btn btn-secondary" onClick={() => setViewOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersTable;
