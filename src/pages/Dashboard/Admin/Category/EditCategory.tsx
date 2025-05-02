import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../../../../features/categories/categoriesApi";
import toast from "react-hot-toast";
import { ClipLoader, ScaleLoader } from "react-spinners";
 

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  console.log(id);
  const { data, isLoading: isFetching } = useGetSingleCategoryQuery(id ?? "");
  
  const [updateCategory, { isLoading: isUpdating,isSuccess:isCategoryUpdateSuccess,isError:isCategoryUpdateError,error}] = useUpdateCategoryMutation();

  const [category, setCategory] = useState({
    name: "",
    image: null as File | null,
    description: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(error);
  
  // Set fetched data
  useEffect(() => {
    if (data?.data) {
      setCategory({
        name: data.data.name || "",
        image: null,
        description: data.data.description || "",
      });
      setPreviewImage(data.data.image || null);
    }
  }, [data]);

  useEffect(()=>{
   if(isCategoryUpdateSuccess){
    navigate("/dashboard/categories")
    toast.success("Category updated successfully!");
   }
   if(isCategoryUpdateError){
    toast.error("Failed to update category!");    
   }
  },[isCategoryUpdateSuccess,isCategoryUpdateError,navigate]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCategory({ ...category, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(data?.data.image || null);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setCategory({ ...category, image: null });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      toast.error("Category ID is missing!");
      return;
    }
    const formData = new FormData();
   
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image) {
      formData.append("image", category.image);
    }

    try {
  
      await updateCategory({id,category:formData}).unwrap();

    } catch (err) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Category</h2>

      {isFetching ? (
          <div className="flex justify-center">
              <ScaleLoader />
          </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-neutral file-input-bordered w-full"
            />

            {/* Image Preview Section */}
            {previewImage ? (
              <div className="relative mt-4 w-full">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md border shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                <span className="text-gray-400 text-sm">No image selected</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={category.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows={3}
              required
            />
          </div>

          {/* Submit Button */}
          <button
          type="submit"
          disabled={isUpdating}
          className={`w-full text-[15px] bg-[#21324A] hover:bg-[#102e50e8] text-white font-semibold py-3 px-2 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
            isUpdating ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isUpdating ? (
            <>
              <ClipLoader size={20} color="#e8e7e7" />
              <span>Updating...</span>
            </>
          ) : (
            "Update Category"
          )}
        </button>
        </form>
      )}
    </div>
  );
};

export default EditCategory;
