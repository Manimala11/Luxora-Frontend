import CategoryPage from './pages/CategoryPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import SearchProvider from './context/SearchProvider';
import MyOrders from './pages/MyOrders';
import ChangePassword from './pages/ChangePassword';
import AddToCart from './pages/AddToCart';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './pages/Checkout';
import HeaderFooterLayout from './pages/layouts/HeaderFooterLayout';
import AdminHeaderFooterLayout from './pages/layouts/AdminHeaderFooterLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import HomeRedirect from './components/HomeRedirect';
import ManageProducts from './pages/Admin/ManageProducts';
import ManageOrders from './pages/Admin/ManageOrders';
import ManageUsers from './pages/Admin/ManageUsers';
import OrderDetails from './pages/Admin/OrderDetails';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <SearchProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/changePassword'
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />

              <Route element={<HeaderFooterLayout />}>
                <Route path='/' element={<HomeRedirect />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route
                  path='/category/:categoryName'
                  element={<CategoryPage />}
                />
                <Route
                  path='/myOrders'
                  element={
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/addToCart'
                  element={
                    <ProtectedRoute>
                      <AddToCart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/checkout'
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route element={<AdminHeaderFooterLayout />}>
                <Route
                  path='/admin/dashboard'
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/admin/products'
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/admin/orders'
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/admin/users'
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <ManageUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/admin/orders/:orderId'
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <OrderDetails />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} /> 
            </Routes>
            <ToastContainer
              position='top-center'
              autoClose={1500}
              theme='dark'
            />
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
