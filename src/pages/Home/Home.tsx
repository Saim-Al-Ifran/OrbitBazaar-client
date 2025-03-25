
import React from "react";

interface ProductProps {
  image: string;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductProps> = ({ image, title, price }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-emerald-600 font-bold">{price}</p>
      <button className="mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
        Add to Cart
      </button>
    </div>
  );
};

 

const Home = () => {
  return (
    <div className="h-screen">
        <ProductCard
            image="https://via.placeholder.com/300"
            title="Product 1"
            price="$19.99"
         />
    </div>
  )
}

export default Home