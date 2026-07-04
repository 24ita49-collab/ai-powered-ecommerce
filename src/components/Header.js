// components/Header.js
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({
  cart,
  wishlist,
  userRole,
  handleLogout,
  darkMode,
  setDarkMode,
}) {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    toast.success("👋 Logout Successful");
    navigate("/login");
  };

  return (
    <header className="navbar">

      {/* Logo */}
      <div className="logo">
        ShopEasy
      </div>

      {/* Navigation */}
      <nav className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart ({cart.length})
        </Link>

        <Link to="/wishlist">
          Wishlist ({wishlist.length})
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        {userRole === "admin" && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/adminorders">
              Manage Orders
            </Link>
          </>
        )}

        <Link to="/profile">
          Profile
        </Link>

        {userRole === "" ? (
          <Link to="/login">
            Login
          </Link>
        ) : (
          <>
            <button
  className="dark-btn"
  onClick={() => {
    console.log("Dark Mode:", darkMode);
    setDarkMode(!darkMode);
  }}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

      </nav>

    </header>
  );
}

export default Header;