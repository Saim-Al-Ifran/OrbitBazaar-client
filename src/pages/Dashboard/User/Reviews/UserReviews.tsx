import ReviewTable from "../../../../components/Reviews/ReviewTable"

 

const UserReviews = () => {
  return (
    <>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">User Reviews</h1>
            <p className="text-gray-700 mb-4">
            Here you can view and manage your reviews.
            </p>
            <ReviewTable/>
        </div>
    </>
  )
}

export default UserReviews