import React, { useEffect, useState } from "react";
import { useGetUserProfileQuery } from "../../features/user/userApi";
import avatar from '../../assets/userAvatar.png'

const UpdateProfile: React.FC = () => {
  const { data: userData, isLoading } = useGetUserProfileQuery();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(avatar);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("User Data:", userData?.data);
  
  // Populate user data into state once fetched
  useEffect(() => {
    if (userData?.data) {
      const { name, email, phoneNumber, image } = userData.data;
      setUsername(name || "");
      setEmail(email || "");
      setPhoneNumber( phoneNumber|| "");
      setProfileImage(image || avatar);
    }
  }, [userData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSaveImage = () => {
    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage);
      setProfileImage(imageUrl);
      setIsModalOpen(false);
      // TODO: upload image to server here
    }
  };

  const handleUpdateProfile = () => {
    const updatedData = {
      username,
      phoneNumber,
      // image: newImage (or profileImage URL if uploading separately)
    };
    console.log("Updated data to submit:", updatedData);

    // TODO: Call mutation to update profile
  };

  if (isLoading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

      <div className="flex justify-center mb-4">
        <img
          src={newImage ? URL.createObjectURL(newImage) : profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#061931] text-white px-4 py-1 rounded shadow"
        >
          Change Image
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleUpdateProfile}
          className="bg-[#123458] text-white px-4 py-2 rounded hover:bg-[#134a85] w-full"
        >
          Update
        </button>
      </div>

      {/* Modal for Image Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md p-6 shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Change Profile Image</h3>
            <div className="flex justify-center mb-4">
              <img
                src={newImage ? URL.createObjectURL(newImage) : profileImage}
                alt="New"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveImage}
                className="bg-[#123458] text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
