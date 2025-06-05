import { PencilIcon, TrashIcon, ArchiveBoxIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
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
import { useDeleteProductMutation, useMarkProductAsArchivedMutation } from "../../../features/products/productsApi";
import { ClipLoader } from "react-spinners";

const TABLE_HEAD = ["Product", "Category", "Price", "Stock", "Action"];

const ProductTable = ({ products }: { products: ProductInfo[] }) => {
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [archivingProductId, setArchivingProductId] = useState<string | null>(null);
  const [wasArchivedBefore, setWasArchivedBefore] = useState<boolean | null>(null);

  const [deleteProduct, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError }] = useDeleteProductMutation();
  const [markArchived, { isLoading: isArchiving,isSuccess:isArchiveSuccess,error }] = useMarkProductAsArchivedMutation();
  console.log(error)
  useEffect(() => {
      if (isDeleteSuccess) {
            Swal.fire({
              title: '<span>Deleted!</span>',
              html: '<span>The product has been successfully deleted!</span>',
              icon: 'success',
              confirmButtonColor:'#21324A'
            });
  
      }
      if(isDeleteError){
              Swal.fire(
                'Error!',
                'Failed to delete the product.',
                'error'
              );
      }
      if (isArchiveSuccess) {
        Swal.fire({
          title: wasArchivedBefore
            ? '<span>Unarchived!</span>'
            : '<span>Archived!</span>',
          html: wasArchivedBefore
            ? '<span>The product has been successfully unarchived!</span>'
            : '<span>The product has been successfully archived!</span>',
          icon: 'success',
          confirmButtonColor: '#21324A',
        });
        setWasArchivedBefore(null);  
      }

    }, [isDeleteSuccess,isDeleteError,isArchiveSuccess]);

  const handleDeleteProduct = async(id: string) => {
         const result = await Swal.fire({
           title: 'Are you sure?',
           text: "The product will be permanently deleted and can't be undone!",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#21324A',
           cancelButtonColor: '#F44336',
           confirmButtonText: 'Yes, delete it!'
         });
         if(result.isConfirmed){  
           setDeletingProductId(id);
           await deleteProduct({productId: id}).unwrap();
         }
   };

 const handleArchive = async (product:ProductInfo) => {
  const {_id:id,isArchived} = product;
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `The product will be ${product.isArchived ? "unarchived" : "archived" } and won't be visible in the active products list.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#21324A',
      cancelButtonColor: '#F44336',
      confirmButtonText: `Yes, ${product.isArchived ? "unarchived" : "archived" } it!`
    });
    if(result.isConfirmed){
        setWasArchivedBefore(product.isArchived); 
        setArchivingProductId(id);
        await markArchived({id,isArchived:!isArchived}).unwrap();
       
    }
    
  } catch (err) {
    console.error("Failed to archive product:", err);
  }
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
          {products.map((product, index) => {
            const { images, name, category, price, stock } = product;
            const {name: categoryName} = category;
            const isLast = index === products.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const isDeleteProcessing = isDeleteLoading && deletingProductId === product._id;
            const isArchiveProcessing = isArchiving && archivingProductId === product._id;
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
                  {/* Conditionally disable the edit button and prevent navigation while the current product is being deleted */}
                  {isDeleteProcessing|| isArchiveProcessing ? (
                    <Tooltip content="Edit Product">
                      <IconButton variant="filled" disabled {...(undefined as any)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <NavLink to={`edit/${product._id}`}>
                      <Tooltip content="Edit Product">
                        <IconButton variant="filled" {...(undefined as any)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </NavLink>
                  )}

                    <Tooltip content={`${product.isArchived ? "Unarchive Product" : "Archive Product"}`}>
                      <IconButton
                       variant="filled"
                       className="bg-[#666666] hover:bg-gray-600 text-white p-2 rounded-md"
                       disabled={isDeleteProcessing|| isArchiveProcessing}
                        onClick={() => handleArchive(product)}
                       {...(undefined as any)}
                       >
                        {isArchiveProcessing ? (
                          <span><ClipLoader color="white" size={15} /></span>
                        ):(
                             
                            product.isArchived ? (
                              <ArrowUpOnSquareIcon className="h-4 w-4" />
                            ) : (
                              <ArchiveBoxIcon className="h-4 w-4" />
                            )
                            
                        )}
                      </IconButton>
                    </Tooltip>

                    <Tooltip content="Delete Product">
                      <IconButton
                        variant="filled"
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                        {...(undefined as any)}
                        onClick={() => handleDeleteProduct(product._id)}
                        disabled={isDeleteProcessing|| isArchiveProcessing}
                       >
                       {isDeleteProcessing ? (
                            <span><ClipLoader color="white" size={15} /></span>
                        ):(
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
    </>
  );
};

export default ProductTable;
