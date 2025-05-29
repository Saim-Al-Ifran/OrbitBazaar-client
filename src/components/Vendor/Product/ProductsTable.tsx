import { PencilIcon, TrashIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { ProductInfo } from "../../../types/api-types/products/products.type";

const TABLE_HEAD = ["Product", "Category", "Price", "Stock", "Action"];

const ProductTable = ({ products }: { products: ProductInfo[] }) => {
console.log(products);
  
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
          {products.map((product, index) => {
            const { images, name, category, price, stock } = product;
            const {name: categoryName} = category;
            const isLast = index === products.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={images[0]} alt={name} size="sm" {...(undefined as any)} />
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                        {name}
                      </Typography>
                      <Typography variant="small" color="blue-gray" className="font-normal opacity-70" {...(undefined as any)}>
                        {categoryName}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {categoryName}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {price}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                    {stock}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-4">
                    <NavLink to="edit/1">
                      <Tooltip content="Edit Product">
                        <IconButton variant="filled" {...(undefined as any)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </NavLink>

                    <Tooltip content="Archive Product">
                      <IconButton
                       variant="filled"
                       className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md"
                       {...(undefined as any)}
                       >
                        <ArchiveBoxIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip content="Delete Product">
                      <IconButton
                       variant="filled"
                       className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                       {...(undefined as any)}>
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
    </>
  );
};

export default ProductTable;
