import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography, IconButton, Tooltip, Chip } from "@material-tailwind/react";
import { useState } from "react";
 

const TABLE_HEAD = ["Order ID", "User Email", "Total Quantity", "Total Price", "Status", "Action"];
 

 interface Order {
  _id: string;
  userEmail: string;
  totalQuantity: number;
  totalPrice: number;
  status: string;
}

interface OrdersTableProps {
  orders: Order[];
}
 

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [status, setStatus] = useState("");
  
  const handleEditOpen = (): void => {
    setEditOpen(true);
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
        {orders.map((order, index) => {
            const { _id,  userEmail, totalQuantity, totalPrice, status } = order;
            const isLast = index === orders.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                              <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                        {_id}
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


                   {/* Edit Order Button */}
                    <Tooltip content="Edit Order">
                       <IconButton variant="filled" onClick={handleEditOpen} {...(undefined as any)}>
                       <PencilIcon className="h-4 w-4" />
                         </IconButton>
                   </Tooltip>
 
                     </div>
                </td>
              </tr>
            )
 
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

 
    </>
  );
};

export default OrdersTable;
