import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';


// Main Router Component
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="admin" element={<h1>Hello admin</h1>} />
          <Route path="sellers" element={<h1>Hello sellers</h1>} />
          <Route path="sellers/request" element={<h1>Sellers request</h1>} />
          <Route path="sellers/deactive" element={<h1>Deactive Sellers</h1>} />
          <Route path="categories" element={<h1>All Categories</h1>} />
          <Route path="category/add" element={<h1>Add Category</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
