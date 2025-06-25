const WishlistSkeleton = () => {
  return (
    <div className="p-6 mb-[4rem] mt-[1rem] animate-pulse">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gray-300 w-1/3 h-6 mx-auto rounded"></h2>
      <div className="divider"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-white"
          >
            <div className="w-[80px] h-[110px] bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="flex gap-2 mt-4">
                <div className="h-8 w-24 bg-gray-300 rounded" />
                <div className="h-8 w-10 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistSkeleton;
