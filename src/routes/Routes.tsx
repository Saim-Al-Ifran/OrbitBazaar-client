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
import Main from '../layouts/Main';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import Contact from '../pages/Contact/Contact';
import AboutUs from '../pages/AboutUs/AboutUs';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Checkout from '../pages/CheckOut/CheckOut';
import CartDetails from '../pages/Cart/CartDetails';
import Wishlist from '../pages/WishList/WishList';
import UserLogin from '../pages/Auth/UserLogin';
import UserRegister from '../pages/Auth/UserRegister';
import AdminLogin from '../pages/Auth/AdminLogin';
import SearchPage from '../pages/Search/SearchPage';
import SellerRegister from '../pages/Auth/SellerRegister';
 


// Main Router Component
const AppRouter = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Main/>}>
                   <Route index element={<Home/>} />
                   <Route path='/shop' element={<Shop/>} />
                   <Route path='/shop/:id' element={<ProductDetails/>} />
                   <Route path='/contact' element={<Contact/>} />
                   <Route path='/about' element={<AboutUs/>} />
                   <Route path='/checkout' element={<Checkout/>} />
                   <Route path='/cart' element={<CartDetails/>} />
                   <Route path='/wishlist' element={<Wishlist/>} />
                   <Route path='/search' element={<SearchPage/>} />
               
          </Route>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/register' element={<UserRegister/>}/>
          <Route path='/seller_login' element={<SellerRegister/>} />
      </Routes>
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
