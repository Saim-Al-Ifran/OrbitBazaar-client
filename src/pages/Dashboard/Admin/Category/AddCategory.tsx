import { useEffect, useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useCreateCategoryMutation } from "../../../../features/categories/categoriesApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const AddCategory = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState({
    name: "",
    image: null as File | null,
    description: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [createCategory, { isLoading, isError, isSuccess, error }] = useCreateCategoryMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully created category");
      navigate("/dashboard/categories");
      setCategory({ name: "", description: "", image: null });
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }

    if (isError) {
      toast.error((error as any)?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, error, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCategory({ ...category, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRemoveImage = () => {
    setCategory({ ...category, image: null });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image) {
      formData.append("image", category.image);
    }

    try {
      await createCategory(formData).unwrap(); 
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter category name"
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
            required
          />

          {/* Preview */}
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
            placeholder="Enter category description"
            value={category.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />
        </div>

        {/* Submit */}
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
            "Create Category"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
