import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import CategoriesTable from "../../../../components/Admin/Category/CategoriesTable";
import { NavLink } from "react-router-dom";

const Category = () => {
  const [sortOrder, setSortOrder] = useState("asc");

  return (
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

          {/* Search Input */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              {...(undefined as any)}
            />
          </div>
        </div>
      </CardHeader>
 
      <CardBody className="overflow-scroll px-0" {...(undefined as any)}>
        {/* Pass sortOrder to your UserTable if needed */}
          <CategoriesTable/>
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

export default Category;
