 
import UserReportsTable from '../../../../components/Report/UserReportsTable'
import { useGetPurchasedProductsQuery } from '../../../../features/products/productsApi'

const UserReports = () => {
  const{data} = useGetPurchasedProductsQuery({
    page: 1,
    limit: 5,
    sort: 'createdAt:desc'
  });
  console.log(data);
  return (
    <>
        <div className="w-full px-4 py-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Reports</h1>
            {/* Replace with actual reports table component */}
             <UserReportsTable />
            </div>
        
    </>
  )
}

export default UserReports