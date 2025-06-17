import {
  PencilIcon,
  TrashIcon,
  ArchiveBoxIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/solid";
import {
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { ProductInfo } from "../../../types/api-types/products/products.type";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useMarkProductAsArchivedMutation,
} from "../../../features/products/productsApi";
import { ClipLoader } from "react-spinners";

const TABLE_HEAD = ["Product", "Category", "Price", "Stock", "Action"];

const ProductTable = ({ products }: { products: ProductInfo[] }) => {
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const [archivingProductId, setArchivingProductId] = useState<string | null>(
    null
  );
  const [wasArchivedBefore, setWasArchivedBefore] = useState<boolean | null>(
    null
  );

  const [deleteProduct, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteProductMutation();
  const [markArchived, { isLoading: isArchiving, isSuccess: isArchiveSuccess }] =
    useMarkProductAsArchivedMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      Swal.fire({
        title: "<span>Deleted!</span>",
        html: "<span>The product has been successfully deleted!</span>",
        icon: "success",
        confirmButtonColor: "#21324A",
      });
    }
    if (isDeleteError) {
      Swal.fire("Error!", "Failed to delete the product.", "error");
    }
    if (isArchiveSuccess) {
      Swal.fire({
        title: wasArchivedBefore
          ? "<span>Unarchived!</span>"
          : "<span>Archived!</span>",
        html: wasArchivedBefore
          ? "<span>The product has been successfully unarchived!</span>"
          : "<span>The product has been successfully archived!</span>",
        icon: "success",
        confirmButtonColor: "#21324A",
      });
      setWasArchivedBefore(null);
    }
  }, [isDeleteSuccess, isDeleteError, isArchiveSuccess]);

  const handleDeleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "The product will be permanently deleted and can't be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#21324A",
      cancelButtonColor: "#F44336",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      setDeletingProductId(id);
      await deleteProduct({ productId: id }).unwrap();
    }
  };

  const handleArchive = async (product: ProductInfo) => {
    const { _id: id, isArchived } = product;
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `The product will be ${
          isArchived ? "unarchived" : "archived"
        } and won't be visible in the active products list.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#21324A",
        cancelButtonColor: "#F44336",
        confirmButtonText: `Yes, ${isArchived ? "unarchive" : "archive"} it!`,
      });
      if (result.isConfirmed) {
        setWasArchivedBefore(isArchived);
        setArchivingProductId(id);
        await markArchived({ id, isArchived: !isArchived }).unwrap();
      }
    } catch (err) {
      console.error("Failed to archive product:", err);
    }
  };

  const activeProducts = products.filter((p) => !p.isArchived);

  return (
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
          const {
            _id,
            images,
            name,
            category,
            price,
            stock,
            isArchived,
          } = product;
          const categoryName = category.name;
          const isLast = index === products.length - 1;
          const classes = isLast
            ? "p-4"
            : "p-4 border-b border-blue-gray-50";

          const isDeleteProcessing =
            isDeleteLoading && deletingProductId === _id;
          const isArchiveProcessing =
            isArchiving && archivingProductId === _id;

          const isOnlyActiveProduct =
            !isArchived && activeProducts.length === 1;

          return (
            <tr key={_id}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <Avatar src={images[0]} alt={name} size="sm" {...(undefined as any)}/>
                  <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray" {...(undefined as any)}>
                      {name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="opacity-70"
                      {...(undefined as any)}
                    >
                      {categoryName}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" {...(undefined as any)}>
                  {categoryName}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" {...(undefined as any)}>
                  {price}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" {...(undefined as any)}>
                  {stock}
                </Typography>
              </td>
              <td className={classes}>
                <div className="flex items-center gap-4">
                  {/* Edit */}
                  {isDeleteProcessing || isArchiveProcessing ? (
                    <Tooltip content="Edit Product">
                      <IconButton variant="filled" disabled {...(undefined as any)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <NavLink to={`edit/${_id}`}>
                      <Tooltip content="Edit Product">
                        <IconButton variant="filled" {...(undefined as any)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </NavLink>
                  )}

                  {/* Archive / Unarchive */}
                  <Tooltip
                    content={
                      isOnlyActiveProduct
                        ? "Cannot archive the only active product"
                        : isArchived
                        ? "Unarchive Product"
                        : "Archive Product"
                    }
                  >
                    <span>
                      <IconButton
                        variant="filled"
                        className="bg-[#666666] hover:bg-gray-600 text-white p-2 rounded-md"
                        disabled={
                          isOnlyActiveProduct ||
                          isDeleteProcessing ||
                          isArchiveProcessing
                        }
                        onClick={() => handleArchive(product)}
                        {...(undefined as any)}
                      >
                        {isArchiveProcessing ? (
                          <ClipLoader color="white" size={15} />
                        ) : isArchived ? (
                          <ArrowUpOnSquareIcon className="h-4 w-4" />
                        ) : (
                          <ArchiveBoxIcon className="h-4 w-4" />
                        )}
                      </IconButton>
                    </span>
                  </Tooltip>

                  {/* Delete */}
                  <Tooltip content="Delete Product">
                    <IconButton
                      variant="filled"
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                      onClick={() => handleDeleteProduct(_id)}
                      disabled={isDeleteProcessing || isArchiveProcessing}
                      {...(undefined as any)}
                    
                    >
                      {isDeleteProcessing ? (
                        <ClipLoader color="white" size={15} />
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;
