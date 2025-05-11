import { useEffect, useState } from "react";
 
import { toast } from "react-hot-toast";
import { useCreateUserMutation } from "../../../../features/user/userApi";
import { CreateUserInput } from "../../../../types/api-types";
import useUserRoles from "../../../../hooks/auth/useCheckRoles";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState<CreateUserInput>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });
  const navigate = useNavigate();
  const {isSuperAdmin} = useUserRoles();
  const [addUser, { isLoading,isError,isSuccess,error }] = useCreateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if (isError) {
      toast.error((error as any)?.data?.message || "Failed to add user");
    }
    if (isSuccess) {
      navigate("/dashboard/users");
      toast.success("User added successfully");
      setFormData({ name: "", email: "", password: "", phoneNumber:"", role: "user" });
    }

  },[isError,isSuccess,error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser({
         name:formData.name,
         email:formData.email,
         password:formData.password,
         phoneNumber:formData.phoneNumber,
         role:formData.role,
      }).unwrap();
      setFormData({ name: "", email: "", password: "", phoneNumber:"", role: "user" });
    } catch (err: any) {
       console.log(err)
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-base-200 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
        Add New User
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="form-control">
          <label className="label font-medium text-sm">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label font-medium text-sm">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label font-medium text-sm">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div className="form-control">
          <label className="label font-medium text-sm">Role</label>
          <select
            name="role"
            className="select select-bordered w-full"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            {isSuperAdmin &&  <option value="admin">Admin</option>}
           
          </select>
        </div>

      {/* Phone number*/}
       <div className="form-control">
          <label className="label font-medium text-sm">Phone number</label>
          <input
            type="number"
            name="phoneNumber"
            placeholder="Enter password"
            className="input input-bordered w-full"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-[15px] bg-[#21324A] hover:bg-[#102e50e8] text-white font-semibold py-3 px-2 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <ClipLoader size={20} color="#e8e7e7" />
                <span>Creating...</span>
              </>
            ) : (
              "Create User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
