import ReviewTable from "../../../../components/Reviews/ReviewTable";
import { NavLink } from "react-router-dom";

const UserReviews = () => {
  const reviews = []; // Replace this with real data from Redux or API

  return (
    <div className="container mx-auto px-4 py-8">
      {reviews.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-6">User Reviews</h1>
          <p className="text-gray-700 mb-4">
            Here you can view and manage your reviews.
          </p>
          <ReviewTable   />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-600 flex flex-col items-center">
            <i className="fa-solid fa-star text-gray-400 text-5xl mb-4"></i>
            <p className="text-lg font-semibold mb-2">You haven’t written any reviews yet.</p>
            <p className="text-sm mb-4">Purchase a product and share your experience with others.</p>
            <NavLink
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r bg-[#123458] hover:bg-[#1a4e85] text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Go to Shop
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
