import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import Footer
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/DashBoard";
import UsersPage from "./pages/UserPage";
import AddResortPage from "./pages/AddResortPage";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ResortDetailsPage from "./pages/ResortDetailsPage";
import CartPage from "./pages/CartPage";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {


  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* Header (Navbar) */}
        <Header />

        {/* Main Content Area (Expands to push Footer down) */}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resort/:id" element={<ResortDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="users" element={<UsersPage />} />
              <Route path="add-resort" element={<AddResortPage />} />
            </Route>
          </Routes>
        </Box>

        {/* Footer (Always at Bottom) */}
        <Footer />
      </Box>
    </>
  );
}

export default App;
