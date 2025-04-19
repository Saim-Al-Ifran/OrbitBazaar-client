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
import AdminOrSuperAdmin from './AdminOrSuperAdmin';
import VendorRoute from './VendorRoute';


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
          {/* Auth Routes */}
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/register' element={<UserRegister/>}/>
          <Route path='/seller_login' element={<SellerRegister/>} />
      </Routes>
      <Routes>

         {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Admin & Super Admin Protected Routes */}
          <Route
            index
            element={
              <AdminOrSuperAdmin>
                <h1>Hello Admin</h1>
              </AdminOrSuperAdmin>
            }
          />
          <Route
            path="users"
            element={
              <AdminOrSuperAdmin>
                <AllUsers />
              </AdminOrSuperAdmin>
            }
          />
          <Route
            path="sellers"
            element={
              <AdminOrSuperAdmin>
                <AllSellers />
              </AdminOrSuperAdmin>
            }
          />
          <Route
            path="sellers/request"
            element={
              <AdminOrSuperAdmin>
                <AllSellerRequest />
              </AdminOrSuperAdmin>
            }
          />
          <Route
            path="sellers/deactive"
            element={
              <AdminOrSuperAdmin>
                <AllDeactiveSellers />
              </AdminOrSuperAdmin>
            }
          />
          <Route
            path="categories"
            element={
              <AdminOrSuperAdmin>
                <AllCategories />
              </AdminOrSuperAdmin>
            }
          />
          <Route
            path="category/add"
            element={
              <AdminOrSuperAdmin>
                <AddCategory />
              </AdminOrSuperAdmin>
            }
          />
          <Route
            path="category/edit/:id"
            element={
              <AdminOrSuperAdmin>
                <EditCategory />
              </AdminOrSuperAdmin>
            }
          />

          {/* Vendor Protected Routes */}
          <Route
            path="vendor"
            element={
              <VendorRoute>
                <h1>Welcome Vendor</h1>
              </VendorRoute>
            }
          />
          <Route
            path="vendor/product/add"
            element={
              <VendorRoute>
                <AddProduct />
              </VendorRoute>
            }
          />
          <Route
            path="vendor/products"
            element={
              <VendorRoute>
                <AllProducts />
              </VendorRoute>
            }
          />
          <Route
            path="vendor/products/edit/:id"
            element={
              <VendorRoute>
                <EditProduct />
              </VendorRoute>
            }
          />
          <Route
            path="vendor/reports"
            element={
              <VendorRoute>
                <AllReports />
              </VendorRoute>
            }
          />
          <Route
            path="vendor/orders"
            element={
              <VendorRoute>
                <AllOrders />
              </VendorRoute>
            }
          />
        </Route>

 
      
      </Routes>
   
    </Router>
  );
};

export default AppRouter;
