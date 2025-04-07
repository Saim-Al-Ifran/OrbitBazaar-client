 
const wishlistData  = [
    {
      id: 1,
      name: 'Beanie with Logo',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHT8rozoSpYFxQAZSDtzkfT9iesl7Xm0hVfA&s',
      price: 20,
      discountedPrice: 18,
      stockStatus: 'In Stock',
      addedOn: 'December 5, 2019',
    },
    {
      id: 2,
      name: 'Classy shirt',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/3/399695706/JH/PS/RP/188411299/-08a7949-500x500.jpg',
      price: 16,
      stockStatus: 'In Stock',
      addedOn: 'December 6, 2019',
    },
    {
      id: 3,
      name: 'Iphone 14 Pro Max',
      image: 'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-14-Pro-Deep-Purple-7300.jpg',
      price: 20,
      discountedPrice: 18,
      stockStatus: 'In Stock',
      addedOn: 'December 6, 2019',
    },
    {
      id: 3,
      name: 'Beanie',
      image: 'https://i5.walmartimages.com/asr/23c67df7-ba25-4308-afde-3d13b72e5a1e.337cc3e3f9d54a8ae96ed7bdb67983b6.jpeg',
      price: 20,
      discountedPrice: 18,
      stockStatus: 'In Stock',
      addedOn: 'December 6, 2019',
    },
  ];
const WishlistPage = () => {
 
 

  return (
    <div className="p-6 mb-[4rem] mt-[1rem]">
      <h2 className="text-2xl font-bold mb-4 text-center">My Wishlist</h2>
      <div className="divider"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlistData .map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[80px] h-[110px] object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-md font-semibold">{item.name}</h3>
 
              <div className="flex gap-2 items-center">
                <span className="font-bold text-lg">${item.price}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button className="btn btn-sm btn-neutral">
                  <i className="fas fa-cart-plus mr-2"></i> Add to Cart
                </button>
                <button className="btn btn-sm btn-outline btn-error">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
