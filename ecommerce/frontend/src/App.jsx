import { Routes, Route } from "react-router-dom";

// Layouts
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

// Routes guards
import RequireAuth from "./routes/RequireAuth";
import AdminRoute from "./routes/AdminRoute";

// Pages client
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import Conseils from "./pages/Conseils";
import OAuthSuccess from "./pages/oauth-success";
import Search from "./pages/Search";

// Pages admin
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/ordersAdmin";
import AdminConseils from "./pages/admin/Conseils";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import EditAdvice from "./pages/admin/EditAdvice";

function App() {
  return (
    <Routes>

      {/* ================= CLIENT ================= */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/conseils" element={<Conseils />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />

        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />

        <Route
          path="/orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
      
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
        <Route path="conseils" element={<AdminConseils />} />
        <Route path="conseils/:id/edit" element={<EditAdvice />} />
        
      </Route>

    </Routes>
  );
}

export default App;
