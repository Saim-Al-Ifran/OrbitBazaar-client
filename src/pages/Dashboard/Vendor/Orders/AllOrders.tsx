import { Card, CardHeader, Typography, CardBody, CardFooter, Button } from "@material-tailwind/react";
import  { useState } from "react";
import OrdersTable from "../../../../components/Vendor/Order/OrdersTable"; // Adjust the path based on the actual location of OrdersTable
 

const AllOrders = () => {
  const [sortOrder, setSortOrder] = useState("asc");

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
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
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
         <OrdersTable/>
      </CardBody>

         <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
           <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
             Page 1 of 10
           </Typography>
           <div className="flex gap-2">
             <Button variant="outlined" size="sm" {...(undefined as any)}>
               Previous
             </Button>
             <Button variant="outlined" size="sm" {...(undefined as any)}>
               Next
             </Button>
           </div>
         </CardFooter>
       </Card>
    
  );
};

export default AllOrders;
