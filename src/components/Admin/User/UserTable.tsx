import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useUserRoles from "../../../hooks/auth/useCheckRoles";
import {
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "../../../features/user/userApi";
import ChangeUserStatusModal from "./ChangeUserStatusModal";
import ChangeUserRoleModal from "./ChangeUserRoleModal";

const TABLE_HEAD = ["User", "Phone-Number", "Status", "Role", "Action"];
import avatar from '../../../assets/userAvatar2.png';
interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  role: "user" | "admin" | "vendor" | "super-admin";
  image?: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState<"user" | "admin" | "vendor" | "super-admin">("user");

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

 
  const { isSuperAdmin  } = useUserRoles();

  const [updateUserStatus, { isLoading: isUsersStatusLoading, isSuccess: isUserStatusSuccess }] =
    useUpdateUserStatusMutation();

  const [updateUserRole, { isLoading: isUpdateRoleLoading, isSuccess: isUpdateRoleSuccess }] =
    useUpdateUserRoleMutation();

  useEffect(() => {
    if (isUserStatusSuccess) {
      setShowStatusModal(false);
    }
    if (isUpdateRoleSuccess) {
      setShowRoleModal(false);
    }
  }, [isUserStatusSuccess, isUpdateRoleSuccess]);

  const openStatusModal = (user: User) => {
    setSelectedUser(user);
    setStatus(user.status);
    setShowStatusModal(true);
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setRole(user.role);
    setShowRoleModal(true);
  };

  const handleStatusSave = async () => {
    if (!selectedUser) return;
    await updateUserStatus({ id: selectedUser._id, data: { status } }).unwrap();
    toast.success("User status updated!");
  };

  const handleRoleSave = async () => {
    if (!selectedUser) return;
    await updateUserRole({ id: selectedUser._id, data: { role } }).unwrap();
    toast.success("User role updated!");
  };

  const handleDeleteUser = (userId: string) => {
    // You can implement delete logic here
    toast.success(`User with ID ${userId} deleted (not implemented)`);
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
            const { image, name, email, status, role, phoneNumber } = user;
            const isLast = index === users.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={user._id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={image || avatar}
                      alt={name}
                      size="sm"  {...(undefined as any)}
                      referrerPolicy="no-referrer"  
                    />
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
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {role}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-4">
                    <Tooltip content="Edit Status">
                      <IconButton
                        variant="filled"
                        aria-label="Edit Status"
                        onClick={() => openStatusModal(user)}
                        {...(undefined as any)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                     {isSuperAdmin && (
                      <Tooltip content="Edit Role">
                          <IconButton
                            variant="filled"
                            aria-label="Edit Role"
                            onClick={() => openRoleModal(user)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white"
                            {...(undefined as any)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                  )}

                    <Tooltip content="Delete User">
                      <IconButton
                        variant="filled"
                        aria-label="Delete User"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleDeleteUser(user._id)}
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

      {/* Modals */}
      {showStatusModal && (
        <ChangeUserStatusModal
          status={status}
          setStatus={setStatus}
          onClose={() => setShowStatusModal(false)}
          onSave={handleStatusSave}
          isLoading={isUsersStatusLoading}
        />
      )}
      {showRoleModal && (
        <ChangeUserRoleModal
          role={role}
          setRole={setRole}
          onClose={() => setShowRoleModal(false)}
          onSave={handleRoleSave}
          isLoading={isUpdateRoleLoading}
        />
      )}
    </>
  );
};

export default UserTable;
