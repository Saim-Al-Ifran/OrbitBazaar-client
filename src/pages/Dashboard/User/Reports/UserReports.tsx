import { NavLink } from "react-router-dom";
import UserReportsTable, { Report } from "../../../../components/Report/UserReportsTable";
import { useGetUserReportsDataQuery } from "../../../../features/reports/reportsApi";
import { FadeLoader, PulseLoader } from "react-spinners";
import Pagination from "../../../../components/Pagination/Pagination";
import { useEffect, useState } from "react";

const UserReports = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const [paginationLoading, setPaginationLoading] = useState(false);
  const{data: userReports,isLoading:isReportLoading} = useGetUserReportsDataQuery(
    {
      page,
      limit
    }
  );
  const reports = userReports?.data || [];
  console.log("User Reports:", userReports);
  useEffect(() => {
    setPaginationLoading(false);
  }, [userReports]);
  if (isReportLoading) {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <FadeLoader />
        </div>
    );
  }
  return (
    <div className="w-full px-4 py-6">
      {reports.length > 0 ? (
<>
  <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Reports</h1>
  {paginationLoading ? (
    <div className="flex justify-center items-center h-32">
      <PulseLoader color="#123458" />
    </div>
  ) : (
    <UserReportsTable reports={reports as unknown as Report[]} />
  )}
</>

      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-600 flex flex-col items-center">
            <i className="fa-solid fa-flag text-gray-400 text-5xl mb-4"></i>
            <p className="text-lg font-semibold mb-2">You haven’t submitted any reports yet.</p>
            <p className="text-sm mb-4">If you find an issue with a product, you can report it here.</p>
            <NavLink
              to="/dashboard/user/purchased-products"
              className="inline-flex items-center gap-2 bg-gradient-to-r bg-[#123458] hover:bg-[#1a4e85] text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
             
               My Purchased Products
            </NavLink>
          </div>
        </div>
      )}

         {/* Show pagination only if data is available */}
            {userReports?.data && userReports?.data.length > 0 && (
              <div className="mt-6">
                <Pagination
                  pagination={userReports?.pagination}
                  isLoading={isReportLoading}
                  paginationLoading={paginationLoading}
                  setPage={setPage}
                  setPaginationLoading={setPaginationLoading}
                  label="Reviews"
                />
              </div>
            )}
    </div>
  );
};

export default UserReports;
