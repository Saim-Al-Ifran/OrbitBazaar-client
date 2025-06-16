const SidebarSkeleton = () => {
  return (
    <div className="w-full md:w-1/4 bg-base-100 p-4 shadow-lg rounded-lg animate-pulse space-y-6">
      {/* Category Skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-300 rounded w-32" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="w-24 h-4 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Price Range Skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-300 rounded w-32" />
        <div className="w-full h-2 bg-gray-300 rounded" />
        <div className="w-full h-2 bg-gray-300 rounded" />
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
      </div>

      {/* Clear Filter Button Skeleton */}
      <div className="h-10 w-full bg-gray-300 rounded" />
    </div>
  );
};

export default SidebarSkeleton;
