import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["Product", "Category", "Price", "Stock", "Action"];

const TABLE_ROWS = [
  {
    img: "https://via.placeholder.com/150",
    name: "Product 1",
    category: "Electronics",
    price: "$100",
    stock: 50,
    status: "Active",
  },
  {
    img: "https://via.placeholder.com/150",
    name: "Product 2",
    category: "Clothing",
    price: "$40",
    stock: 150,
    status: "Active",
  },
  {
    img: "https://via.placeholder.com/150",
    name: "Product 3",
    category: "Home",
    price: "$80",
    stock: 30,
    status: "Out of Stock",
  },
  {
    img: "https://via.placeholder.com/150",
    name: "Product 4",
    category: "Books",
    price: "$20",
    stock: 0,
    status: "Out of Stock",
  },
  {
    img: "https://via.placeholder.com/150",
    name: "Product 5",
    category: "Electronics",
    price: "$150",
    stock: 70,
    status: "Active",
  },
];

const ProductTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  console.log(selectedProduct);

  interface Product {
    img: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    status: string;
  }

  const handleOpen = (product: Product): void => {
    setSelectedProduct(product);
    setPrice(product.price);
    setStock(String(product.stock));
    setOpen(true);
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
          {TABLE_ROWS.map((product, index) => {
            const { img, name, category, price, stock } = product;
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={img} alt={name} size="sm" {...(undefined as any)}/>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(undefined as any)}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                        {...(undefined as any)}
                      >
                        {category}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    {...(undefined as any)}
                  >
                    {category}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    {...(undefined as any)}
                  >
                    {price}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    {...(undefined as any)}
                  >
                    {stock}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-4">
                    <Tooltip content="Edit Product">
                      <IconButton
                        variant="filled"
                        onClick={() => handleOpen(product)}
                        {...(undefined as any)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Product">
                      <IconButton
                        variant="filled"
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
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

      {/* Modal */}
      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>

            {/* Price Input */}
            <div className="mt-4">
              <label className="block font-medium">Product Price</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Stock Input */}
            <div className="mt-4">
              <label className="block font-medium">Stock Quantity</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setOpen(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
