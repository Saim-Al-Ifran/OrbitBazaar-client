import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import Main from '../layouts/Main';
import Dashboard from '../layouts/Dashboard';

// Pages - Public
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import Contact from '../pages/Contact/Contact';
import AboutUs from '../pages/AboutUs/AboutUs';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Checkout from '../pages/CheckOut/CheckOut';
import CartDetails from '../pages/Cart/CartDetails';
import Wishlist from '../pages/WishList/WishList';
import SearchPage from '../pages/Search/SearchPage';

// Pages - Auth
import UserLogin from '../pages/Auth/UserLogin';
import UserRegister from '../pages/Auth/UserRegister';
import AdminLogin from '../pages/Auth/AdminLogin';
import SellerRegister from '../pages/Auth/SellerRegister';

// Pages - Admin
import AllUsers from '../pages/Dashboard/Admin/User/AllUsers';
import AllSellers from '../pages/Dashboard/Admin/Sellers/AllSellers';
import AllDeactiveSellers from '../pages/Dashboard/Admin/DeactiveSellers/AllDeactiveSellers';
import AllSellerRequest from '../pages/Dashboard/Admin/SellerRequest/AllSellerRequest';
import AllCategories from '../pages/Dashboard/Admin/Category/AllCategories';
import AddCategory from '../pages/Dashboard/Admin/Category/AddCategory';
import EditCategory from '../pages/Dashboard/Admin/Category/EditCategory';

// Pages - Vendor
import AddProduct from '../pages/Dashboard/Vendor/Products/AddProduct';
import AllProducts from '../pages/Dashboard/Vendor/Products/AllProducts';
import EditProduct from '../pages/Dashboard/Vendor/Products/EditProduct';
import AllReports from '../pages/Dashboard/Vendor/Reports/AllReports';
import AllOrders from '../pages/Dashboard/Vendor/Orders/AllOrders';

// Pages - User
import ProfileForm from '../components/Profile/ProfileForm';
import ChangePassword from '../components/Profile/ChangePassword';


// Guards
import AdminOrSuperAdmin from './AdminOrSuperAdmin';
import VendorRoute from './VendorRoute';
import PrivateRoute from './PrivateRoute';
import AddUser from '../pages/Dashboard/Admin/User/AddUser';
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard/AdminDashboard';
import VendorDashboard from '../pages/Dashboard/Vendor/VendorDashboard/VendorDashboard';
import FeaturedProducts from '../pages/Featured/Featured';
import Greetings from '../pages/Greetings/Greetings';

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        {/* Public Layout */}
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ProductDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={
              <PrivateRoute>
                <CartDetails /> 
              </PrivateRoute> 
          } />
          <Route path="wishlist" element={
             <PrivateRoute>
                <Wishlist />
             </PrivateRoute>      
            } />
          <Route path="search" element={<SearchPage />} />
          <Route path="/products/featured" element={<FeaturedProducts/>} />
          <Route path="/greetings" element={
            <PrivateRoute>
              <Greetings/>
            </PrivateRoute>
            
           } />
          
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/seller_login" element={<SellerRegister />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />}>

          {/* Admin Routes */}
          <Route
            index
            element={
              <AdminOrSuperAdmin>
                   <AdminDashboard />
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
            path="users/add-user"
            element={
              <AdminOrSuperAdmin>
                 <AddUser/>
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

          {/* Vendor Routes */}
          <Route
            path="vendor"
            element={
              <VendorRoute>
                <VendorDashboard />
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

          {/* User Routes */}
          <Route
            path="user/home"
            element={
              <PrivateRoute>
                <h1>Hello user</h1>
              </PrivateRoute>
            }
          />
          <Route
            path="user/profile"
            element={
              <PrivateRoute>
                 <ProfileForm/>
              </PrivateRoute>
            }
          />
          <Route
            path="user/change-password"
            element={
              <PrivateRoute>
                  <ChangePassword/>
              </PrivateRoute>
            }
          />
          <Route
            path="user/orders"
            element={
              <PrivateRoute>
                  <h1>My Orders</h1>
              </PrivateRoute>
            }
          />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
