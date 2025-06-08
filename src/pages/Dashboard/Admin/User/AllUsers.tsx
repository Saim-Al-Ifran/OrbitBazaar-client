import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../../../features/user/userApi";
import { PacmanLoader, ScaleLoader } from "react-spinners";
import UserTable from "../../../../components/Admin/User/UserTable";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [sortingLoading, setSortingLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("createdAt:desc");
  const limit = 10;

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery({ page, limit, search: searchQuery, sort: sortOrder });
 
  
useEffect(() => {
  setPaginationLoading(false);  
  setSearchLoading(false);
  setSortingLoading(false);

  if (isError) {
    setPaginationLoading(false);
    setSearchLoading(false);
    setSortingLoading(false);
  }

  //  Handle page shift if current page has no users but previous pages exist
  if ((error as any)?.status === 404 && (users?.pagination?.currentPage ?? 0) > 1) {
    setPage((users?.pagination?.currentPage ?? 1) - 1);
  }
}, [users, isError]);


  const noUsersFound =
    isError &&
    (error as any)?.status === 404 &&
    (error as any)?.data?.message === "No users found";
 
  const handlePrevious = () => {
    setPaginationLoading(true);
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (users?.pagination?.totalPages && page < users.pagination.totalPages) {
      setPaginationLoading(true);
      setPage(page + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader />
      </div>
    );
  }

  if (isError && !noUsersFound) {
    return <div className="text-red-500 text-center mt-10">Error fetching users</div>;
  }

  const isPrevDisabled = (page === 1) || paginationLoading || sortingLoading;
  const isNextDisabled = (page === users?.pagination?.totalPages) || paginationLoading || sortingLoading;

  return (
    <>
       <Helmet>
        <title>User List - Admin</title>
       </Helmet>
      <Card className="h-full w-full" {...(undefined as any)}>
        <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" {...(undefined as any)}>
                Users List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
                See information about all users
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <NavLink to="/dashboard/users/add-user">
                  <Button className="flex items-center gap-3" size="sm" {...(undefined as any)}>
                      <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Member
                  </Button>
              </NavLink>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-72">
              <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
                Sort by
              </label>
              <div className="relative">
                <select
                  id="sortOrder"
                  name="sortOrder"
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value)
                    setSortingLoading(true)
                    setPage(1)
                  }}
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="createdAt:asc">Ascending</option>
                  <option value="createdAt:desc">Descending</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
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
          {paginationLoading || sortingLoading || (searchLoading && !noUsersFound) ? (
                    <div className="flex justify-center">
                        <ScaleLoader />
                    </div>
                ) : noUsersFound ? (
                    <div className="text-center p-4">
                      <Typography variant="h6" color="red" className="font-normal" {...(undefined as any)}> 
                        No user found for the search term "{searchQuery}"
                      </Typography>
                    </div>
                ) : (
                  <UserTable
                    key={page}
                    users={users?.data || []}
                  />
            )}

        </CardBody>

        {!noUsersFound && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
            <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
              Page {page} of {users?.pagination?.totalPages || 1}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={handlePrevious}
                disabled={isPrevDisabled}
                {...(undefined as any)}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={handleNext}
                disabled={isNextDisabled}
                {...(undefined as any)}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </>

  );
};

export default AllUsers;
