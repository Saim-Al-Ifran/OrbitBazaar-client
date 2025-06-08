import { useEffect, useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useAddProductMutation } from "../../../../features/products/productsApi";
import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApi";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>('');
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [addProduct, { isLoading,isSuccess,isError}] = useAddProductMutation();
  const { data: categories } = useGetCategoriesQuery();

  useEffect(()=>{
    if (isError) {
      toast.error("Failed to create product. Please try again.");
    }
    if (isSuccess) {
      toast.success("Product created successfully!");
      // Reset all states
      setName('');
      setDescription('');
      setCategory('');
      setPrice('');
      setStock('');
      setIsFeatured(false);
      setImages([]);
      setPreviewImages([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      navigate("/dashboard/vendor/products");
    }
  },[isSuccess,isError]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
 ) => {
      const { name, value, type } = e.target;

      if (type === "checkbox") {
        setIsFeatured((e.target as HTMLInputElement).checked);
      } else if (name === "name") {
        setName(value);
      } else if (name === "description") {
        setDescription(value);
      } else if (name === "category") {
        setCategory(value);
      } else if (name === "price") {
         if (value === "") {
            setPrice("");
          } else {
            const parsed = Number(value);
            if (!isNaN(parsed)) setPrice(parsed);
          }
      } else if (name === "stock") {
          if (value === "") {
            setStock("");
          } else {
            const parsed = Number(value);
            if (!isNaN(parsed)) setStock(parsed);
          }
      }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imagePreviews]);
  };

  // Remove selected image
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setImages(updatedImages);
    setPreviewImages(updatedPreviews);

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      updatedImages.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("isFeatured", isFeatured.toString());
    images.forEach((file) => formData.append("images", file));

    try {
      await addProduct(formData).unwrap();
    } catch (err) {
      console.error("Product creation failed:", err);
    }
  };

  return (
    <>
        <Helmet>
          <title>Add New Product</title>
        </Helmet>
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Category</option>
            {categories?.data?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            value={stock}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-neutral w-full"
            required
          />
          {/* Preview */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img src={src} alt="Preview" className="w-full h-24 object-cover rounded-md border shadow-sm" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={isFeatured}
            onChange={handleChange}
            className="checkbox"
             
          />
          <label className="text-sm font-medium text-gray-700">Featured Product</label>
        </div>

        {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-[15px] bg-[#425E85] hover:bg-[#102e50e8] text-white font-semibold py-3 px-2 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <ClipLoader size={20} color="#e8e7e7" />
                <span>Adding..</span>
              </>
            ) : (
              "Add Product"
            )}
          </button>
      </form>
        </div>
    </>

  );
};

export default AddProduct;
