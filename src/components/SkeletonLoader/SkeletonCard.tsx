const SkeletonCard = () => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-gray-200 rounded-t-xl"></div>

      {/* Details Skeleton */}
      <div className="p-4 text-center space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>

        <div className="flex justify-center items-center gap-2 mt-2">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>

        <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>

        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>

        <div className="space-y-2 mt-4">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
