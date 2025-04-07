
interface Vendor {
  id: number;
  name: string;
  category: string;
  image: string;
}

const featuredVendors: Vendor[] = [
  {
    id: 1,
    name: "Vendor One",
    category: "Fashion & Apparel",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Vendor Two",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1624797494322-2b7693c54a12?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Vendor Three",
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1612717880672-2609d3aceec1?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FeaturedVendors = () => {
  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Our Featured Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition"
          >
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />

            <h3 className="font-semibold">{vendor.name}</h3>
            <p className="text-gray-600 text-sm">{vendor.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedVendors;
