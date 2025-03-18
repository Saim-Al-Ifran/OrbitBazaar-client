import { useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const EditCategory = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState({
    name: "",
    image: null as File | null,
    description: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setPreviewImage(null);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setCategory({ ...category, image: null });
    setPreviewImage(null);

    // Reset the file input field using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Category Data:", category);
    alert("Category Created Successfully!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
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
            placeholder="Enter category description"
            value={category.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Create Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
