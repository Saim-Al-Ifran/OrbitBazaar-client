import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';
import AllUsers from '../pages/Dashboard/Admin/User/AllUsers';
import AllSellers from '../pages/Dashboard/Admin/Sellers/AllSellers';
import AllDeactiveSellers from '../pages/Dashboard/Admin/DeactiveSellers/AllDeactiveSellers';
import AllSellerRequest from '../pages/Dashboard/Admin/SellerRequest/AllSellerRequest';
import AllCategories from '../pages/Dashboard/Admin/Category/AllCategories';
import AddCategory from '../pages/Dashboard/Admin/Category/AddCategory';
import EditCategory from '../pages/Dashboard/Admin/Category/EditCategory';
import AddProduct from '../pages/Dashboard/Vendor/Products/AddProduct';
import AllProducts from '../pages/Dashboard/Vendor/Products/AllProducts';
import EditProduct from '../pages/Dashboard/Vendor/Products/EditProduct';
import AllReports from '../pages/Dashboard/Vendor/Reports/AllReports';
import AllOrders from '../pages/Dashboard/Vendor/Orders/AllOrders';


// Main Router Component
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="admin" element={<h1>Hello admin</h1>} />
          
          {/* Users route with a simple button */}
          <Route 
            path="users" 
            element={
               <AllUsers/>
            }
          />
          
          <Route path="sellers" element={<AllSellers/>} />
          <Route path="sellers/request" element={<AllSellerRequest/>} />
          <Route path="sellers/deactive" element={<AllDeactiveSellers/>} />
          <Route path="categories" element={<AllCategories/>} />
          <Route path="category/add" element={<AddCategory/>} />
          <Route path="category/edit/:id" element={<EditCategory/>} />

          {/* vendor routes */}
          <Route path="vendor/product/add" element={<AddProduct/>} />
          <Route path="vendor" element={<h1>Welcome to dashboard</h1>} />
          <Route path="vendor/products" element={<AllProducts/>} />
          <Route path="vendor/products/edit/:id" element={<EditProduct/>} />
          <Route path="vendor/reports" element={<AllReports/>} />
          <Route path="vendor/orders" element={<AllOrders/>} />

 
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
