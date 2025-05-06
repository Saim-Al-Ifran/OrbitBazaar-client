import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  Tooltip,
  IconButton,
 
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
 
import { Link, NavLink } from "react-router-dom";
import { useDeleteCategoryMutation, useGetAdminCategoriesQuery } from "../../../../features/categories/categoriesApi";
import Swal from 'sweetalert2';
import {   ClipLoader, PacmanLoader, ScaleLoader } from "react-spinners";
import { Category } from "../../../../types/api-types";

const TABLE_HEAD = ["Category-image", "Category-name", "Actions"];

const AllCategories = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const limit = 5;
  const { data: categories, isLoading, isError:categoriesIsError, error } = useGetAdminCategoriesQuery({ page, limit, search: searchQuery });
  const [deleteCategory,{isSuccess:delSuccess,isError:isDelError,error:delError}] = useDeleteCategoryMutation();
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
 
 
 
  useEffect(()=>{
    if(delSuccess){
      Swal.fire({
        title: '<span>Deleted!</span>',
        html: '<span>The category has been deleted.</span>',
        icon: 'success',
        confirmButtonColor:'#21324A'
      });
    }

    if(isDelError){
      console.log("Error deleting category: ",delError);
      Swal.fire(
        'Error!',
        'Failed to delete the application.',
        'error'
      );
    }

},[delSuccess,isDelError]);

useEffect(() => {
  setPaginationLoading(false);  
  setSearchLoading(false);
  if (categoriesIsError) {
    setPaginationLoading(false);
    setSearchLoading(false);
  }  
}, [categories,categoriesIsError]);

const noCategoriesFound = categoriesIsError && (error as any)?.status === 404 && (error as any)?.data?.message === "No categories data found!";
 

if (isLoading) {
  return (
    <div className="flex justify-center items-center h-screen"> 
      <PacmanLoader />
    </div>
  );
}

if (categoriesIsError && !noCategoriesFound) return <div>Error fetching categories</div>;

const handlePrevious = () => {
  setPaginationLoading(true);
  if (page > 1) setPage(page - 1);
};

const handleNext = () => {
  if (categories?.pagination?.totalPages && page < categories?.pagination?.totalPages) {
    setPaginationLoading(true);
    setPage(page + 1);
  }
};
const handleDeleteCategory = async (id:string)=>{
    
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#21324A',
    cancelButtonColor: '#F44336',
    confirmButtonText: 'Yes, delete it!'
  });
  if(result.isConfirmed){  
    setDeletingCategoryId(id)
    await deleteCategory(id)
  }
}
 


return (
  <>
 
  {( (error as any)?.status   === 404 && !searchQuery) ? (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-500 mb-4">No categoires found!</h1>
      <Link to="/dashboard/category/add">
      <Button
        className="flex items-center gap-3  text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-300"
        size="sm"
        {...(undefined as any)}
      >
        <i className="fa-solid fa-folder-plus"></i>
        Add Category
      </Button>
      </Link>

  </div>
): (
     <Card className="h-full w-full" {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" {...(undefined as any)}>
              Category list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
              See information about all categories
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
             <NavLink to="/dashboard/category/add">
                <Button className="flex items-center gap-3" size="sm" {...(undefined as any)}>
                <i className="fa-solid fa-layer-group"></i>Add category
                </Button>
             </NavLink>
   
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Sorting Option (better styling and labels) */}
          <div className="w-72">
 
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) =>{
                setSearchQuery(e.target.value)
                setSearchLoading(true)
                setPage(1)
              }}
              {...(undefined as any)}
            />
          </div>
        </div>
      </CardHeader>
 
      <CardBody className="overflow-scroll px-0" {...(undefined as any)}>
        {paginationLoading || (searchLoading && !noCategoriesFound) ? (
                      <div className="flex justify-center">

                          <ScaleLoader />
                      </div>
                  ) : noCategoriesFound ? (
                      <div className="text-center p-4">
                        <Typography variant="h6" color="red" className="font-normal" {...(undefined as any)}> 
                          No categories found for the search term "{searchQuery}"
                        </Typography>
                      </div>
                  ) : (
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
                {categories?.data?.map((category:Category, index) => {
                  const { image, name } = category;
                  const isLast = index === categories.data.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={image} alt={name} size="lg" {...(undefined as any)} />
       
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            {...(undefined as any)}
                          >
                            {name}
                          </Typography>
       
                        </div>
                      </td>
       
                      <td className={classes}>
                          <div className="flex items-center gap-4">
                            <NavLink to={`/dashboard/category/edit/${category._id}`}>
                              <Tooltip content="Edit Category" >  
                                <IconButton variant="filled"   {...(undefined as any)}>
                                  <PencilIcon  className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </NavLink>
      
                            <Tooltip content="Delete Category">
                                <IconButton
                                  variant="filled"
                                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                                  onClick={() => handleDeleteCategory(category._id)}
                                  disabled={deletingCategoryId === category._id} 
                                  {...(undefined as any)}
                                >
                                {deletingCategoryId === category._id ? (
                                    <span><ClipLoader color="white" size={15} /></span>
                                  ) : (
                                    <TrashIcon className="h-4 w-4" /> 
                                  )}
                                  {/* <TrashIcon className="h-4 w-4" /> */}
                                </IconButton>
                              </Tooltip>
                          </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            )}

      </CardBody>

      {!noCategoriesFound && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
            <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
              Page {page} of {categories?.pagination?.totalPages || 1}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={handlePrevious}
                disabled={page === 1}
                {...(undefined as any)}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={handleNext}
                disabled={page === categories?.pagination?.totalPages}
                {...(undefined as any)}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
    </Card>   
)}
 
    </>
  );

};

export default AllCategories;
