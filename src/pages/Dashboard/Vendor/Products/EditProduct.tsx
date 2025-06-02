import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../../../../features/products/productsApi";
import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApi";
import { ClipLoader, ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
 

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Separate states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number | string>('');
  const [price, setPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const { data: productData, isLoading: productLoading } = useGetSingleProductQuery(id ?? "");
  const { data: categoryData } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: isUpdating, isSuccess: updatingSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (updatingSuccess) {
      toast.success("Product updated successfully!");
      navigate("/dashboard/vendor/products");
    }
  }, [updatingSuccess]);

  useEffect(() => {
    if (productData?.product) {
      const { name, description, category, price, isFeatured, images,stock } = productData.product;
      setName(name);
      setDescription(description);
      setCategory(category?._id);
      setPrice(price.toString());
      setIsFeatured(isFeatured);
      setStock(stock);  
      setExistingImages(images); // Store as URLs
    }
  }, [productData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExistingImage = (index: number) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const handleRemoveNewImage = (index: number) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("isFeatured", isFeatured.toString());

    existingImages.forEach((url) => formData.append("existingImages", url));
    newImages.forEach((file) => formData.append("images", file));

    try {
      await updateProduct({ productId: id!, productData: formData }).unwrap();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      {productLoading ? (
        <div className="flex justify-center mb-4">
          <ScaleLoader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categoryData?.data?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">Price ($)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e)=> setStock(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />

            {/* Previews */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {/* Existing Image Previews */}
              {existingImages.map((src, idx) => (
                <div key={`existing-${idx}`} className="relative">
                  <img src={src} className="w-full h-24 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(idx)}
                    className="absolute top-1 right-1 text-white bg-black p-1 rounded-full hover:bg-red-600"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}

              {/* New Image Previews */}
              {newImages.map((file, idx) => (
                <div key={`new-${idx}`} className="relative">
                  <img src={URL.createObjectURL(file)} className="w-full h-24 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(idx)}
                    className="absolute top-1 right-1 text-white bg-black p-1 rounded-full hover:bg-red-600"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <label className="text-sm">Featured Product</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full text-[15px] bg-[#425E85] hover:bg-[#102e50e8] text-white font-semibold py-3 px-2 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
              isUpdating ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? (
              <>
                <ClipLoader size={20} color="#e8e7e7" />
                <span>Updating...</span>
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
