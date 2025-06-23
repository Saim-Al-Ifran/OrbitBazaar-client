 
const BreadcrumbSkeleton = () => {
  return (
    <div className="pl-5 lg:pl-16 mt-4 mb-4 bg-gray-100 py-3 rounded-md animate-pulse">
      <div className="flex items-center space-x-2 text-sm">
        {/* Home Icon + Text */}
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>

        {/* Separator */}
        <div className="text-gray-400">/</div>

        {/* Shop Icon + Text */}
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>

        {/* Separator */}
        <div className="text-gray-400">/</div>

        {/* Product Name */}
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default BreadcrumbSkeleton;
