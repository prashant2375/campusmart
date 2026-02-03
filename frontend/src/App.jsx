import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import AdminNavbar from "./components/AdminNavbar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRedirect from "./components/RoleRedirect";

import AddLostFound from "./pages/AddLostFound";
import AddProduct from "./pages/AddProduct";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <BrowserRouter>
      {/* 🔥 ROLE BASED NAVBAR */}
      {user?.role === "admin" ? (
        <AdminNavbar />
      ) : user ? (
        <Navbar />
      ) : null}

      <Routes>
        {/* ROOT */}
        <Route path="/" element={<RoleRedirect />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-products"
          element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lost-found"
          element={
            <ProtectedRoute>
              <AddLostFound />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        {/* 🔐 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
