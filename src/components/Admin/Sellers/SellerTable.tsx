import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { SellerInfo, SellerTableProps } from "../../../types/types";
import avatar from '../../../assets/userAvatar2.png';
import toast from "react-hot-toast";
import {  useDeleteUserMutation, useUpdateUserStatusMutation  } from "../../../features/user/userApi";
import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2';
const TABLE_HEAD = ["User", "Phone-Number", "Status", "Role", "Action"];

 
const SellerTable = ({sellers}:SellerTableProps) => {
  
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SellerInfo | null>(null);
  const [status, setStatus] = useState("");
  const [updateUserStatus, { isLoading: isUserStatusLoading, isSuccess: isUserStatusSuccess }] =
      useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess,isError:isDeleteError}] = useDeleteUserMutation();
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
 
  useEffect(() => {
    if (isUserStatusSuccess) {
      setOpen(false);
    }
  }, [isUserStatusSuccess]);
    useEffect(() => {
      if (isDeleteSuccess) {
            Swal.fire({
              title: '<span>Deleted!</span>',
              html: '<span>The user has been deleted.</span>',
              icon: 'success',
              confirmButtonColor:'#21324A'
            });
  
      }
      if(isDeleteError){
              Swal.fire(
                'Error!',
                'Failed to delete the user.',
                'error'
              );
      }
    }, [isDeleteSuccess,isDeleteError]);
 
  const handleOpen = (seller: SellerInfo): void => {
    setSelectedUser(seller);
    setStatus(seller.status);
    setOpen(true);
  };

  const handleStatusSave = async () => {
    if (!selectedUser) return;
    await updateUserStatus({ id: selectedUser._id, data: { status } }).unwrap();
    toast.success("Vendor status updated!");
  };
  const handleDeleteSeller = async(id: string) => {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#21324A',
            cancelButtonColor: '#F44336',
            confirmButtonText: 'Yes, delete it!'
          });
          if(result.isConfirmed){  
            setDeletingUserId(id)
            await deleteUser(id)
          }
      
  }
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
           {sellers.map((seller, index) => {
            const { image, name, email, status, role, phoneNumber } = seller;
            const isLast = index === sellers.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={seller._id}>
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
                        onClick={() => handleOpen(seller)}
                        {...(undefined as any)}
                         disabled={isDeleteLoading && deletingUserId === seller._id}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
            
                    {/* Delete User */}
                    <Tooltip content="Delete User">
                      <IconButton
                        variant="filled"
                        aria-label="Delete User"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleDeleteSeller (seller._id)}
                        {...(undefined as any)}
                        disabled={isDeleteLoading && deletingUserId === seller._id}
                      >
                        {isDeleteLoading && deletingUserId === seller._id ? (
                            <span><ClipLoader color="white" size={15} /></span>
                        ):(
                            <TrashIcon className="h-4 w-4" />
                        )}
                      
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
            <h3 className="font-bold text-lg">Edit Seller</h3>
 

            {/* Status Selection */}
            <div className="mt-4">
              <label className="block font-medium">Seller Status</label>
              <select className="select select-bordered w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="block">Blocked</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
          <button
            type="submit"
            disabled={isUserStatusLoading}
            className={`  text-[14px] bg-[#21324A] hover:bg-[#102e50e8] text-white font-semibold px-3  rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
             isUserStatusLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={handleStatusSave}
          >
            {isUserStatusLoading ? (
              <>
                <ClipLoader size={20} color="#e8e7e7" />
                <span>Savings...</span>
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

export default SellerTable;
