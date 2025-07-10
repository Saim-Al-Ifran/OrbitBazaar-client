import React from "react";

// Pagination info type
export type PaginationInfo = {
  totalRecords: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
};

// Props type for reusable pagination component
type PaginationProps = {
  pagination: PaginationInfo | undefined;
  isLoading: boolean;
  paginationLoading: boolean;
  sortingLoading?: boolean;
  setPage: (page: number) => void;
  setPaginationLoading: (loading: boolean) => void;
  label?: string; // Optional label like "Featured Products", "Reviews", etc.
};

const generatePagination = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range: (number | string)[] = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) range.unshift("...");
  if (currentPage + delta < totalPages - 1) range.push("...");

  range.unshift(1);
  if (totalPages > 1) range.push(totalPages);

  return range;
};

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  isLoading,
  paginationLoading,
  sortingLoading,
  setPage,
  setPaginationLoading,
  label = "Items", // default label
}) => {
  if (isLoading || !pagination) return null;
 
  const { currentPage, totalPages, totalRecords, prevPage, nextPage } =
    pagination;

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setPage(pageNumber);
      setPaginationLoading(true);
    }
  };

  const handlePrevClick = () => {
    if (prevPage !== null) {
      setPage(prevPage);
      setPaginationLoading(true);
    }
  };

  const handleNextClick = () => {
    if (nextPage !== null) {
      setPage(nextPage);
      setPaginationLoading(true);
    }
  };

  return (
    <div className="flex justify-between items-center mt-6 border-t pt-4">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Previous */}
        <button
          className="btn btn-sm btn-outline"
          onClick={handlePrevClick}
          disabled={prevPage === null || paginationLoading || sortingLoading}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {generatePagination(currentPage, totalPages).map((pg, idx) =>
          pg === "..." ? (
            <span key={idx} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => handlePageClick(pg as number)}
              className={`btn btn-sm ${
                currentPage === pg ? "btn-neutral" : "btn-outline"
              }`}
              disabled={ paginationLoading || sortingLoading }
            >
              {pg}
            </button>
          )
        )}

        {/* Next */}
        <button
          className="btn btn-sm btn-outline"
          onClick={handleNextClick}
          disabled={nextPage === null || paginationLoading || sortingLoading}
        >
          Next
        </button>
      </div>

      <p className="text-sm text-gray-500 hidden md:block">
        Page {currentPage} of {totalPages} ({totalRecords} {label})
      </p>
    </div>
  );
};

export default Pagination;
