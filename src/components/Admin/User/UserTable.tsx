import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useUserRoles from "../../../hooks/auth/useCheckRoles";
import {   useUpdateUserStatusMutation } from "../../../features/user/userApi";
import toast from "react-hot-toast";

const TABLE_HEAD = ["User", "Phone-Number", "Status", "Role", "Action"];

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  role: string;
  img?: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const { isSuperAdmin,isAdmin } = useUserRoles();
  const [updateUserStatus, { isLoading, isSuccess, isError  }] =
    useUpdateUserStatusMutation();
 

  const handleOpen = (user: User): void => {
    setSelectedUser(user);
    setRole(user.role);
    setStatus(user.status);
    setOpen(true);
    
  };
  console.log(selectedUser)
  
 useEffect(()=>{
        if(isSuccess){
          toast.success("Updated user status successfully!");
          setOpen(false);
        }
       
 },[isSuccess,isError]);

  const handleSaveChanges = async () => {
    if (!selectedUser) return;

    try {
      if(isAdmin){
        await updateUserStatus({
          id: selectedUser._id,
          data: {status }
        }).unwrap();
      }      
    } catch (err) {
      console.error("Failed to update user:", err);
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
                  {...(undefined as any)}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const { img, name, email, status, role, phoneNumber } = user;
            const isLast = index === users.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={user._id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={img} alt={name} size="sm" {...(undefined as any)}/>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                        {name}
                      </Typography>
                      <Typography variant="small" color="blue-gray" className="font-normal opacity-70" {...(undefined as any)}>
                        {email}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {phoneNumber}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status}
                        color={status === "active" ? "green" : "red"}
                      />
                    </div>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)} >
                    {role}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-4">
                    <Tooltip content="Edit User">
                      <IconButton variant="filled" onClick={() => handleOpen(user)} {...(undefined as any)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete User">
                      <IconButton
                        variant="filled"
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                        {...(undefined as any)}
                      >
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

      {/* Modal */}
      {open && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Edit User</h3>

            {/* Role Selection */}
            {isSuperAdmin && (
              <div className="mb-4">
                <label className="block font-medium mb-1">User Role</label>
                <select
                  className="select select-bordered w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            )}

            {/* Status Selection */}
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

 
            {/* Buttons */}
            <div className="modal-action flex justify-end gap-3">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className={`btn btn-primary ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
