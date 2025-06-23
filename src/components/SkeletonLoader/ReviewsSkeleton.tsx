 

const ReviewsSkeleton = ({ cards = 3 }: { cards?: number }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 mt-10 border-t pt-6 animate-pulse">
      {/* Heading */}
      <div className="h-8 w-40 bg-gray-200 rounded mb-6" />

      {/* Review cards */}
      <div className="space-y-6">
        {[...Array(cards)].map((_, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 shadow-sm space-y-3 bg-white"
          >
            {/* Rating row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((__, star) => (
                  <div
                    key={star}
                    className="h-4 w-4 bg-gray-200 rounded"
                  />
                ))}
                <div className="h-4 w-8 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>

            {/* Comment */}
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />

            {/* Author */}
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded" />
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-8 w-8 bg-gray-200 rounded" />
          ))}
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-32 bg-gray-200 rounded hidden md:block" />
      </div>
    </div>
  );
};

export default ReviewsSkeleton;
