import { useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const EditProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    images: [] as File[],
    isFeatured: false,
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imagePreviews]);
  };

  // Remove selected image
  const handleRemoveImage = (index: number) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setProduct({ ...product, images: updatedImages });
    setPreviewImages(updatedPreviews);

    // Update the file input field
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      updatedImages.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data:", product);
    alert("Product Created Successfully!");
  };
  console.log(previewImages);


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="name" placeholder="Enter product name" value={product.name} onChange={handleChange} className="input input-bordered w-full" required />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" placeholder="Enter product description" value={product.description} onChange={handleChange} className="textarea textarea-bordered w-full" rows={3} required />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" value={product.category} onChange={handleChange} className="select select-bordered w-full" required>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input type="number" name="price" placeholder="Enter price" value={product.price} onChange={handleChange} className="input input-bordered w-full" required />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-neutral file-input-bordered w-full"
          />

          {/* Image Previews */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img src={src} alt="Preview" className="w-full h-24 object-cover rounded-md border shadow-sm" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600 transition">
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isFeatured" checked={product.isFeatured} onChange={handleChange} className="checkbox" />
          <label className="text-sm font-medium text-gray-700">Featured Product</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
