
const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section Skeleton */}
        <div className="w-full md:w-1/2">
          <div className="border rounded-lg overflow-hidden shadow-sm mb-4 bg-gray-200 h-[400px]" />
          <div className="flex gap-3 overflow-x-auto">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-20 w-20 bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>

        {/* Details Section Skeleton */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded w-1/4" />
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-24 bg-gray-200 rounded" />

          <div className="flex items-center gap-3">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-16 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-4 mt-6">
            <div className="h-10 w-36 bg-gray-200 rounded" />
            <div className="h-10 w-36 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
