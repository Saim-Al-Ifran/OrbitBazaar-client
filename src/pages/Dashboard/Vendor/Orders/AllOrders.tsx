import { Card, CardHeader, Typography, CardBody, CardFooter, Button } from "@material-tailwind/react";
import  { useEffect, useState } from "react";
import OrdersTable from "../../../../components/Vendor/Order/OrdersTable"; 
import { useGetVendorOrdersQuery } from "../../../../features/orders/ordersApi";
import { ClockLoader,  ScaleLoader } from "react-spinners";
 

const AllOrders = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [sortingLoading, setSortingLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("createdAt:desc");
    const {
      data: orders,
      isLoading,
      isError,
      error,
    } = useGetVendorOrdersQuery({ page, limit, sort: sortOrder })
    console.log(orders);
 
  useEffect(() => {
    setPaginationLoading(false);  
    setSortingLoading(false);
    if (isError) {
      setPaginationLoading(false);
      setSortingLoading(false);
    }
},[orders, isError, isLoading, page]);
  const noOrdersFound =
    isError &&
    (error as any)?.status === 404 &&
    (error as any)?.data?.message === "No orders found!";

  const handlePrevious = () => {
    setPaginationLoading(true);
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (orders?.pagination?.totalPages && page < orders.pagination.totalPages) {
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
  

  return (
    <Card className="h-full w-full" {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" {...(undefined as any)}>
              Order List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
              See all the orders and their statuses
            </Typography>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Sorting Option */}
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
                onChange={(e) => setSortOrder(e.target.value)}
                className="
                  block w-full appearance-none rounded-md border 
                  border-gray-300 bg-white px-3 py-2 pr-10 
                  text-gray-700 shadow-sm focus:border-blue-500 
                  focus:outline-none focus:ring-1 focus:ring-blue-500
                "
              >
                <option value="createdAt:asc">Ascending</option>
                <option value="createdAt:desc">Descending</option>
              </select>

              {/* Dropdown Arrow Icon */}
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
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0" {...(undefined as any)}>
                {paginationLoading || sortingLoading ? (
                          <div className="flex justify-center">
        
                              <ScaleLoader />
                          </div>
                      ) : noOrdersFound ? (
                          <div className="text-center p-4">
                            <Typography variant="h6" color="red" className="font-normal" {...(undefined as any)}> 
                              No Order found! 
                            </Typography>
                          </div>
                      ) : (
                        <OrdersTable
                          key={page}
                          orders={orders?.data || []}
                        />
                   )}
         
      </CardBody>

      {!noOrdersFound && (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
          <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
            Page {page} of {orders?.pagination?.totalPages || 1}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePrevious}
              disabled={page === 1 || paginationLoading}
              {...(undefined as any)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNext}
              disabled={page === orders?.pagination?.totalPages || paginationLoading }
              {...(undefined as any)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      )}
     </Card>
    
  );
};

export default AllOrders;
