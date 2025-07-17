import { useParams } from "react-router-dom";
import { useGetUserSingleReportDataQuery } from "../../../../features/reports/reportsApi";
import { FadeLoader} from "react-spinners";

const ReportDetailsPage = () => {
  const { id } = useParams();
  const {
    data: reportDetails,
    isLoading,
    isError,
  } = useGetUserSingleReportDataQuery(id ?? "");

  const report = reportDetails?.report;

  if (isLoading) {
    return (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <FadeLoader />
          </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="text-center text-red-600 mt-20">
        Failed to load report details. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Report Details</h1>

      {/* Product Info */}
      <div className="flex gap-4 items-start mb-6">
        <img
          src={report.productID.images?.[0]}
          alt={report.productID.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h2 className="text-xl font-semibold">{report.productID.name}</h2>
          <p className="text-gray-600 text-sm">
            Reported by: {report.userEmail}
          </p>
        </div>
      </div>

      {/* Report Info */}
      <div className="space-y-3">
        <p>
          <strong>Reason:</strong> {report.reason}
        </p>
        <p>
          <strong>Comment:</strong> {report.comment}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 text-sm rounded ${
              report.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : report.status === "resolve"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {report.status}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Reported on: {new Date(report.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ReportDetailsPage;
