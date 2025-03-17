import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';
import AllUsers from '../pages/Dashboard/Admin/User/AllUsers';
import AllSellers from '../pages/Dashboard/Admin/Sellers/AllSellers';
import AllDeactiveSellers from '../pages/Dashboard/Admin/DeactiveSellers/AllDeactiveSellers';
import AllSellerRequest from '../pages/Dashboard/Admin/SellerRequest/AllSellerRequest';


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
          <Route path="categories" element={<h1>All Categories</h1>} />
          <Route path="category/add" element={<h1>Add Category</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
