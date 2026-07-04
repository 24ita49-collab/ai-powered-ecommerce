import { useNavigate } from "react-router-dom";

function Profile({ userRole, handleLogout }) {

  const navigate = useNavigate();

  const user =
    userRole === "admin"
      ? {
          name: "Admin",
          email: "admin@gmail.com",
          role: "Admin"
        }
      : {
          name: "Customer",
          email: "customer@gmail.com",
          role: "Customer"
        };

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>👤 My Profile</h1>
        <h3>Name : {user?.name}</h3>
        <p>Email : {user?.email}</p>
        <p>Role : {user?.role}</p>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;