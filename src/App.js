// App.js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

import Header from "./components/Header";

import Footer from "./components/Footer";

import Home from "./pages/Home";

import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";

import Wishlist from "./pages/Wishlist";

import About from "./pages/About";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import ChatBot from "./components/ChatBot";
function App() {

  const [cart, setCart] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
  const saved = localStorage.getItem("darkMode");

  if (saved !== null) {
    setDarkMode(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);
  const [userRole, setUserRole] =
useState("");
const [, setUser] = useState(null);
const removeFromCart = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id));
};
const handleLogout = () => {
  setUserRole("");
};

  return (

    <BrowserRouter>
    <div
  className={darkMode ? "dark-mode" : ""}
  style={{
    background: darkMode ? "#121212" : "#f5f7fb",
    color: darkMode ? "white" : "black",
    minHeight: "100vh",
  }}
>
      <Header
        cart={cart}
        wishlist={wishlist}
        userRole={userRole}
        handleLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
  path="/products"
  element={
    <Products
      cart={cart}
      setCart={setCart}
      wishlist={wishlist}
      setWishlist={setWishlist}
      userRole={userRole}
    />
  }
/>
          
        

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
<Route
  path="/cart"
  element={
    <Cart
      cart={cart}
      setCart={setCart}
      removeFromCart={removeFromCart}
    />
  }
/>
        

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />
        <Route
  path="/checkout"
  element={
    <Checkout
      cart={cart}
      setCart={setCart}
      setOrders={setOrders}
    />
  }
/>
<Route
  path="/login"
  element={
    <Login
      setUserRole={setUserRole}
      setUser={setUser}
    />
  }
/>
        
          
      
        <Route
          path="/success"
          element={<Success />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
  path="/orders"
  element={
    <Orders
      orders={orders}
      setOrders={setOrders}
    />
  }
/>

<Route
  path="/orderdetails"
  element={<OrderDetails />}
/>
<Route
  path="/adminorders"
  element={
    <AdminOrders
      orders={orders}
      setOrders={setOrders}
    />
    
  }
/>
<Route
  path="/dashboard"
  element={
    <AdminDashboard
      
      orders={orders}
      wishlist={wishlist}
    />
  }
/>
<Route
  path="/profile"
  element={
    <Profile
      userRole={userRole}
      handleLogout={handleLogout}
    />
  }
/>


      </Routes>
<ChatBot />

      <Footer />
      <ToastContainer
  position="top-right"
  autoClose={2000}
  theme="colored"
/>
</div>
    </BrowserRouter>

  );
}

export default App;