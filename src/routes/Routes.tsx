import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';
import AllUsers from '../pages/Dashboard/Admin/User/AllUsers';
import AllSellers from '../pages/Dashboard/Admin/Sellers/AllSellers';
import AllDeactiveSellers from '../pages/Dashboard/Admin/DeactiveSellers/AllDeactiveSellers';
import AllSellerRequest from '../pages/Dashboard/Admin/SellerRequest/AllSellerRequest';
import AllCategories from '../pages/Dashboard/Admin/Category/AllCategories';
import AddCategory from '../pages/Dashboard/Admin/Category/AddCategory';
import EditCategory from '../pages/Dashboard/Admin/Category/EditCategory';


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
 
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
