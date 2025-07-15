import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import { useGetPurchasedProductsQuery } from "../../../../features/products/productsApi";
import PurchasedProductsTable from "../../../../components/User/PurchasedProductTable";
import { ClipLoader, FadeLoader } from "react-spinners";
import Pagination from "../../../../components/Pagination/Pagination";
import { useGetUserReviewsIDsQuery  } from "../../../../features/reviews/reviewsApi";
import { useGetUserReportIDsQuery  } from "../../../../features/reports/reportsApi";
import { NavLink } from "react-router-dom";
 

const PurchasedProducts: React.FC = () => {
  const [sort, setSort] = useState<string>(""); 
  const [page, setPage] = useState(1);
  const limit = 5; // You can adjust this as needed
  const [paginationLoading, setPaginationLoading] = useState(false);
  const { data, isLoading:isPurchasedProductLoading} = useGetPurchasedProductsQuery({
    page,
    limit,
    sort
  });
 
  const { data: reportedProductIDs  } = useGetUserReportIDsQuery(); 
  const { data: reviewedProductIDs  } = useGetUserReviewsIDsQuery();
 
  const [sortingLoading, setSortingLoading] = useState(false);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setSortingLoading(true);
    setPage(1);
  };

  useEffect(()=>{
     if(data?.pagination) {
          setSortingLoading(false);
      setPaginationLoading(false);
    }
  }, [data]);

   if (isPurchasedProductLoading){
      return (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <FadeLoader />
          </div>
  )
};


  const products = data?.data || [];

  return (
  <div className="overflow-x-auto p-4">
    {/* Show heading and sorting only if products exist */}
    {products.length > 0 && (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Purchased Products</h2>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-sort mr-1"></i>
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            className="select bg-[#F5F5F5] select-neutral"
            value={sort}
            onChange={handleSortChange}
            disabled={isPurchasedProductLoading || paginationLoading || sortingLoading}
          >
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    )}

    {isPurchasedProductLoading || paginationLoading || sortingLoading ? (
      <div className="w-full flex justify-center py-10">
        <ClipLoader size={50} />
      </div>
    ) : products.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-600 flex flex-col items-center">
            <ShoppingCartIcon className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-lg font-semibold mb-2">You haven’t purchased anything yet.</p>
            <p className="text-sm mb-4">Explore our products and find something you'll love.</p>
            <NavLink
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r bg-[#123458] hover:bg-[#1a4e85] text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Go to Shop
            </NavLink>
          </div>
        </div>

    
    ) : (
      <PurchasedProductsTable
        products={products}
        reviewedProductIDs={reviewedProductIDs?.data ?? []}
        reportedProductIDs={reportedProductIDs?.data ?? []}
      />
    )}

    {/* Show pagination only if products exist */}
    {products.length > 0 && (
      <div className="mt-6">
        <Pagination
          pagination={data?.pagination}
          isLoading={isPurchasedProductLoading}
          paginationLoading={paginationLoading}
          sortingLoading={sortingLoading}
          setPage={setPage}
          setPaginationLoading={setPaginationLoading}
          label="Purchased Products"
        />
      </div>
    )}
  </div>
  );
};
 
export default PurchasedProducts;