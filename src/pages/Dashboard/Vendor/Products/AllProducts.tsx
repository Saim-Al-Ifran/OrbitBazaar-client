import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ProductTable from "../../../../components/Vendor/Product/ProductsTable";
import { NavLink } from "react-router-dom";
import { useGetVendorProductsQuery } from "../../../../features/products/productsApi";
import { ClockLoader, ScaleLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { useGetUserProfileQuery } from "../../../../features/user/userApi";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [sortingLoading, setSortingLoading] = useState(false);
  const [filteringLoading, setFilteringLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("createdAt:desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const limit = 10;
  const { data: products, isLoading, isError:isProductError, error } = useGetVendorProductsQuery({
    page,
    limit,
    search: searchQuery,
    sort: sortOrder,
    filter: filterStatus,
  });
  const {data:vendorData} = useGetUserProfileQuery();
  console.log("Vendor Data:", vendorData);
  

  useEffect(() => {
    setPaginationLoading(false);
    setSortingLoading(false);
    setSearchLoading(false);
    setFilteringLoading(false);
    if(isProductError) {
      setSearchLoading(false);
      setPaginationLoading(false);
      setSortingLoading(false);
    }

    if ((error as any)?.status === 404 && (products?.pagination?.currentPage ?? 0) > 1) {
      setPage((products?.pagination?.currentPage ?? 1) - 1);
    }
  }, [products,isProductError]);

// Show "No products found. Please add a product."
const noProductsFound =
   products?.data?.length === 0 &&
   products?.message === "No products found!";

// Show "No matching products found for..."
const searchNotFound =
   products?.data?.length === 0 &&
   products?.message === "No products matched your search!";

const archivedProducts =
   products?.data?.length === 0 &&
   products?.message === "No archived products found!";
const featuredProducts =
   products?.data?.length === 0 &&
   products?.message === "No featured products found!";




  const handlePrevious = () => {
    if (page > 1) {
      setPaginationLoading(true);
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (products?.pagination?.totalPages && page < products.pagination.totalPages) {
      setPaginationLoading(true);
      setPage(page + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClockLoader />
      </div>
    );
  }


 const isPrevDisabled = (page === 1) || paginationLoading || sortingLoading;
 const isNextDisabled = (page === products?.pagination?.totalPages) || paginationLoading || sortingLoading;
 const isInteractionDisabled = paginationLoading || sortingLoading || filteringLoading;
 
  return (
    <>
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <Card className="h-full w-full" {...(undefined as any)}>
          <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray" {...(undefined as any)}>
                  Product list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
                  See information about all products
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {vendorData?.data?.status === "active" && vendorData?.data?.vendorRequestStatus === "approved" ? (
                  <NavLink to="/dashboard/vendor/product/add">
                    <Button className="flex items-center gap-3" size="sm" {...(undefined as any)}>
                      <i className="fa-solid fa-bag-shopping"></i> Add product
                    </Button>
                  </NavLink>
                ) : (
                <Tooltip 
                  content={
                    vendorData?.data?.status === "blocked"
                      ? "Your vendor account is blocked."
                      : vendorData?.data?.vendorRequestStatus === "declined"
                      ? "Your vendor request has been declined."
                      : "Wait for admin approval to add products."
                  }
                 >
                  <span className="inline-block cursor-not-allowed">
                    <Button
                      className="flex items-center gap-3 pointer-events-none"
                      size="sm"
                      disabled
                      {...(undefined as any)}
                    >
                      <i className="fa-solid fa-bag-shopping"></i> Add product
                    </Button>
                  </span>
                </Tooltip>

 
                )}
              </div>

            </div>

            {/* Only show search and sort if products exist */}
            {!noProductsFound && (
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                {/* Sorting */}
                <div className="w-full md:w-72">
                  <i className="fa-solid fa-sort mr-2"></i>
                  <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
                    Sort by
                  </label>
                  <div className="relative">
                    <select
                      id="sortOrder"
                      name="sortOrder"
                      value={sortOrder}
                      onChange={(e) => {
                        setSortOrder(e.target.value);
                        setSortingLoading(true);
                        setPage(1);
                      }}
                      disabled={isInteractionDisabled || searchLoading || archivedProducts || featuredProducts || searchNotFound}
                      className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="createdAt:desc">Newest First</option>
                        <option value="createdAt:asc">Oldest First</option>
                        <option value="price:asc">Price: Low to High</option>
                        <option value="price:desc">Price: High to Low</option>
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
                {/* Filtering */}
                <div className="w-full md:w-72">
                  <i className="fa-solid fa-filter mr-2"></i>
                  <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
                    Filter by
                  </label>
                  <div className="relative">
                  <select
                    id="filterStatus"
                    name="filterStatus"
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value);
                      setFilteringLoading(true);  
                      setPage(1);
                    }}
                    disabled={isInteractionDisabled || searchNotFound || searchLoading}
                    className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All Products</option>
                    <option value="featured">Featured Products</option>
                    <option value="archived">Archived Products</option>
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

                {/* Search */}
                <div className="w-full md:w-72 mt-[2rem] md:mt-0">
                  <i className="fa-solid fa-magnifying-glass mr-2"></i>
                  <label htmlFor="search" className="text-sm font-medium text-gray-700">
                    Search Products
                  </label>
                  <Input
                    id="search"
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchLoading(true);
                      setPage(1);
                    }}
                    disabled={isInteractionDisabled || archivedProducts || featuredProducts }
                    {...(undefined as any)}
                  />
                </div>
              </div>
            )}
          </CardHeader>


          {!noProductsFound && (
                  <>
                    <CardBody className="overflow-scroll px-0" {...(undefined as any)}>
                      {searchNotFound && (
                        <Typography color="red" className="text-center py-8 font-semibold" {...(undefined as any)}>
                          No matching products found for "{searchQuery}".
                        </Typography>
                      )}
                      {archivedProducts && (
                        <Typography color="red" className="text-center py-8 font-semibold" {...(undefined as any)}>
                          No archived products found.
                        </Typography>
                      )}
                      {featuredProducts && (
                        <Typography color="red" className="text-center py-8 font-semibold" {...(undefined as any)}>
                          No featured products found.
                        </Typography>
                      )}

                  {paginationLoading || sortingLoading || searchLoading || filteringLoading ? (
                    <div className="flex justify-center">
                      <ScaleLoader />
                    </div>
                  ) : (
                    !searchNotFound && !archivedProducts && !featuredProducts && (
                      <ProductTable key={page} products={products?.data || []} />
                    )
                  )}

                    </CardBody>
                    {!searchNotFound && !archivedProducts && !featuredProducts && (
                      <CardFooter
                        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
                        {...(undefined as any)}
                      >
                        <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                          Page {page} of {products?.pagination?.totalPages || 1}
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


                  </>
          )}

          {/* This part stays outside */}
          {noProductsFound && (
            <Typography color="red" className="text-center py-8 font-semibold" {...(undefined as any)}>
              No products found. Please add a product.
            </Typography>
          )}
      </Card>
    </>

  );
};

export default AllProducts;
