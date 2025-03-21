import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["Product", "User Email", "Reason",  "Status", "Action"];

const TABLE_ROWS = [
  {
    image: "https://res.cloudinary.com/dobzvjjld/image/upload/v1737276680/obritBazaar/uploads/81JUxqQr4bL.jpg",
    name: "Stainless Steel Cookware Set",
    userEmail: "user1@example.com",
    reason: "Damaged",
    comment: "The screen is cracked.",
    status: "Pending",
  },
  {
    image: "https://static-01.daraz.com.bd/p/f015f327a445c485271c857c6c4c8b21.jpg",
    name: "Bluetooth Headphones",
    userEmail: "user2@example.com",
    reason: "Defective",
    comment: "Audio is distorted during calls.",
    status: "Resolved",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt-nX_GKUcIHJ_t-d2Ti3Yssncfk0gZiPmw&s",
    name: "Electric Kettle",
    userEmail: "user3@example.com",
    reason: "Missing Parts",
    comment: "The lid is missing.",
    status: "Pending",
  },
  {
    image: "https://images-cdn.ubuy.com.sa/63b46431ffafdf2f462e84a6-christmas-gifts-clearance-cbcbtwo-smart.jpg",
    name: "Smartphone",
    userEmail: "user4@example.com",
    reason: "Cracked Screen",
    comment: "The screen was cracked during shipping.",
    status: "Rejected",
  }
];

const ReportTable = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleEditOpen = (): void => {
    setEditOpen(true);
  };

  const handleViewOpen = (report: any) => {
    setSelectedReport(report);
    setViewOpen(true);
  };

  // Function to get chip color based on status
  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-black";
      case "Resolved":
        return "bg-green-500 text-black";
      case "Rejected":
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
              <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70"  {...(undefined as any)}>
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((report, index) => {
            const {  name, image,userEmail, reason, status } = report;
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={userEmail}>
                <td className={classes}>
                       <div className="flex items-center gap-3">
                       <Avatar src={image} alt={name} size="sm" {...(undefined as any)} />
                       <div className="flex flex-col">
                       <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(undefined as any)}
                      >
                        {name}
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
                    {reason}
                  </Typography>
                </td>
 
                <td className={classes}>
                  <Chip value={status} className={getStatusChipColor(status)} variant="filled" size="sm" />
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    {/* View Report Button */}
                    <Tooltip content="View Report">
                      <IconButton color="blue" variant="filled" onClick={() => handleViewOpen(report)} {...(undefined as any)}>
                        <EyeIcon className="h-4 w-4  " />
                      </IconButton>
                    </Tooltip>

                    {/* Edit Report Button */}
                    <Tooltip content="Edit Report">
                      <IconButton variant="filled" onClick={handleEditOpen}  {...(undefined as any)}>
                        <PencilIcon className="h-4 w-4  " />
                      </IconButton>
                    </Tooltip>

                    {/* Delete Report Button */}
                    <Tooltip content="Delete Report">
                      <IconButton 
                          variant="filled"
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                          {...(undefined as any)}>
                        <TrashIcon className="h-4 w-4" />
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
              <select className="select select-bordered w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setEditOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setEditOpen(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* View Report Modal */}
      {viewOpen && selectedReport && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Report Details</h3>
            <div className="mt-4">
              <p><strong>Product:</strong> {selectedReport.productID}</p>
              <p><strong>User Email:</strong> {selectedReport.userEmail}</p>
              <p><strong>Reason:</strong> {selectedReport.reason}</p>
              <p><strong>Comment:</strong> {selectedReport.comment}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>
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

export default ReportTable;
