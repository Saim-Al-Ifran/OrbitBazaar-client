import { useState } from "react";

const mockReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing iPhone! Battery and camera are excellent.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Very sleek and smooth performance. A bit pricey though.",
    date: "4 days ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    comment: "Loving the new Dynamic Island feature. Super useful!",
    date: "6 days ago",
  },
  {
    id: 4,
    name: "Emily Clark",
    rating: 4,
    comment: "Switched from Android. Best decision ever!",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Daniel Kim",
    rating: 5,
    comment: "Top-notch camera quality. Totally worth it.",
    date: "2 weeks ago",
  },
  {
    id: 6,
    name: "Laura Benson",
    rating: 4,
    comment: "Battery could be better, but everything else is 🔥.",
    date: "3 weeks ago",
  },
];
 

const ReviewSection = () => {
    const reviewsPerPage = 3;
    const totalPages = Math.ceil(mockReviews.length / reviewsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = mockReviews.slice(indexOfFirstReview, indexOfLastReview);
  
  return (
    <>
         {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 pb-10 mt-10 border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FF943D] text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < review.rating ? "" : "text-gray-300"}`}
                    ></i>
                  ))}
                  <span className="text-gray-600 text-sm ml-2">{review.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{review.date}</span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <div className="mt-2 text-sm text-gray-500">— {review.name}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${currentPage === index + 1 ? "btn-neutral" : "btn-outline"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
          <p className="text-sm text-gray-500 hidden md:block">
            Page {currentPage} of {totalPages} ({mockReviews.length} reviews)
          </p>
        </div>
      </div>
    </>
  )
}

export default ReviewSection 