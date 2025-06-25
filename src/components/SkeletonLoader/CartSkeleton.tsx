const CartSkeleton = () => {
  return (
    <>
    <h2 className="text-2xl font-bold mt-4 mb-4 text-center bg-gray-300 w-1/3 h-6 mx-auto rounded"></h2>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-[5rem] animate-pulse">

      {/* Skeleton Cart Items */}
      <div className="md:col-span-2 space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 items-center border rounded-xl shadow bg-white"
          >
            <div className="w-4 h-4 bg-gray-300 rounded-sm" />
            <div className="w-[60px] h-[90px] bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="w-2/3 h-4 bg-gray-300 rounded" />
              <div className="w-1/3 h-4 bg-gray-200 rounded mt-2" />
              <div className="flex gap-3 mt-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="w-6 h-4 bg-gray-200 rounded" />
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="w-4 h-4 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton Checkout Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4 h-fit">
        <div className="w-1/2 h-4 bg-gray-300 rounded" />
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-full h-10 bg-gray-300 rounded" />
      </div>
    </div>
    </>

  );
};

export default CartSkeleton;
