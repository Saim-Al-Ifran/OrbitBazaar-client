import { ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import SubmitReviewModal from "../Reviews/SubmitReviewModal";
import ReportModal from "../Report/ReportModal";
 
 
interface PurchasedProduct {
  _id: string;
  name: string;
  price: number;
  totalRevenue: number;
  ratings: {
    average: number;
    count: number;
  };
  images: string[];
}

interface PurchasedProductsTableProps {
  products: PurchasedProduct[];
  reviewedProductIDs: string[];
  reportedProductIDs: string[];
}

const PurchasedProductsTable: React.FC<PurchasedProductsTableProps> = ({ products ,reviewedProductIDs, reportedProductIDs }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
 

  const handleReview = (productId: string) => {
    setSelectedProductId(productId);
    setShowReviewModal(true);
  };

  const handleReport = (productId: string) => {
    setSelectedProductId(productId);
    setShowReportModal(true);
  };

    const handleReviewSubmit = (payload: { productId: string; rating: number; comment: string }) => {
      console.log("Review submitted:", payload);
      // TODO: Call API to submit the review
    };
    const handleReportSubmit = (payload: {
    productId: string;
    reason: string;
    comments: string;
  }) => {
    console.log("Submitted report:", payload);
    // TODO: integrate with API here
  };

 return (
   <div className="overflow-x-auto shadow border rounded bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 text-left">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
             
            <th className="py-2 px-4 border-b">Ratings</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className="border-t hover:bg-gray-50">
              <td className="flex items-center gap-3 px-6 py-4">
                <img src={product.images[0]} alt={product.name} className="h-12 w-12 object-cover rounded" />
              </td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">${product.price}</td>
          
          <td className="px-6 py-4">
            {product.ratings.count > 0 ? (
              <>
                {product.ratings.average}
                <i className="fa-solid fa-star text-[#ff8036] mx-1"></i>
                ({product.ratings.count})
              </>
            ) : (
              "N/A"
            )}
          </td>

              <td className="px-6 py-4">
                 <div  >
                    {reviewedProductIDs.includes(product._id) ? (
                      <button className="mr-2 mb-2 bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed" disabled>
                        Already Reviewed
                      </button>
                    ) : (
                      <button
                          onClick={() => handleReview(product._id)}
                          className=" flex mb-2 mr-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded "
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4 mt-[2px] mr-1" />
                          Review
                      </button>
                    )}


                     {reportedProductIDs.includes(product._id) ? (
                      <button className="flex bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed" disabled>
                        Already Reported
                      </button>
                    ) : (
                        <button
                          onClick={() => handleReport(product._id)}
                          className="flex bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          <ExclamationTriangleIcon className="w-4 h-4 mt-[2px] mr-1" />
                          Report
                        </button> 
                    )}
                                    
                   
                 </div>

 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* submit Review Modal */}
        {showReviewModal && selectedProductId && (
            <SubmitReviewModal
              isOpen={showReviewModal}
              onClose={() => setShowReviewModal(false)}
              productId={selectedProductId}
              onSubmit={handleReviewSubmit}
            />
          )}
      {/* Report Modal */}
      {showReportModal && selectedProductId && (
           <ReportModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            productId={selectedProductId}
            onSubmit={ handleReportSubmit}
           />
      )} 
       </div>
    )
}

export default PurchasedProductsTable;