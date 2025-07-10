import { useState, useEffect } from "react";
import UsersOrdersTable from "../../../../components/User/UsersOrdersTable";
import { useGetAllUserOrdersQuery } from "../../../../features/orders/ordersApi";
import Pagination from "../../../../components/Pagination/Pagination";
import { ClipLoader, FadeLoader } from "react-spinners";
 

const UserOrders = () => {
  const [sortKey, setSortKey] = useState("createdAt:desc"); 
  const [page, setPage] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [sortingLoading, setSortingLoading] = useState(false);
  const { data:ordersData, isLoading:isOrderDataLoading  } = useGetAllUserOrdersQuery({
    page,
    limit: 5,  
    sort: sortKey
  });

  useEffect(() => {
    if (ordersData?.pagination) {
      setPaginationLoading(false);
      setSortingLoading(false);
    }
  }, [ordersData]);
 
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
    setSortingLoading(true);
    setPage(1);
  };

    if (isOrderDataLoading){
      return (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <FadeLoader />
          </div>
      );
    }

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">My Orders</h1>

        <div className="flex items-center gap-2">
          <i className="fa-solid fa-sort mr-1"></i>
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            className="select bg-[#F5F5F5] select-neutral"
            value={sortKey}
            onChange={handleSortChange}
            disabled={isOrderDataLoading || paginationLoading || sortingLoading}
          >
          <option value="createdAt:desc">Newest First</option>
          <option value="createdAt:asc">Oldest First</option>
          <option value="totalPrice:asc">Price: Low to High</option>
          <option value="totalPrice:desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {isOrderDataLoading || paginationLoading || sortingLoading ? (
        <div className="w-full flex justify-center py-10">
         
           <ClipLoader size={50}/>
          </div>
          ) : 
          ordersData?.data.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-lg">No orders found.</p>
            </div>
          ) : 
            <UsersOrdersTable orders={ordersData?.data || []} isLoading={isOrderDataLoading} />
       }




      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          pagination={ordersData?.pagination}
          isLoading={isOrderDataLoading}
          paginationLoading={paginationLoading}
          sortingLoading={sortingLoading}
          setPage={setPage}
          setPaginationLoading={setPaginationLoading}
          label="Orders"
        />
      </div>
    </div>
  );
};

export default UserOrders;
