import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";

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
 
  
  const handleOpen = (user: User): void => {
    setSelectedUser(user);
    setRole(user.role);
    setStatus(user.status);
    setOpen(true);
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
            const { img, name, email ,status, role ,phoneNumber} = user;
            const isLast = index === users.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={img} alt={name} size="sm" {...(undefined as any)} />
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(undefined as any)}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                        {...(undefined as any)}
                      >
                        {email}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      {...(undefined as any)}
                    >
                      {phoneNumber}
                    </Typography>
 
                  </div>
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
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    {...(undefined as any)}
                  >
                    {role}
                  </Typography>
                </td>
                <td className={classes}>
                    <div className="flex items-center gap-4">
                      <Tooltip content="Edit User" >  
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
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit User</h3>

            {/* Role Selection */}
            <div className="mt-4">
              <label className="block font-medium">User Role</label>
              <select className="select select-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Status Selection */}
            <div className="mt-4">
              <label className="block font-medium">User Status</label>
              <select className="select select-bordered w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="block">Blocked</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setOpen(false)}>Save Changes</button>
 
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
