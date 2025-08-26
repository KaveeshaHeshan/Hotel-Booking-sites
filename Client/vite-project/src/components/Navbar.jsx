import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "700" : "500",
    textDecoration: "none",
    color: "#111",
  });

  return (
    <nav
      style={{
        padding: "10px 16px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{ fontWeight: 800, fontSize: 18, textDecoration: "none", color: "#111" }}
      >
        HotelBook
      </Link>
      <div style={{ display: "flex", gap: 16 }}>
        <NavLink to="/" style={linkStyle} end>
          Home
        </NavLink>
        <NavLink to="/my-bookings" style={linkStyle}>
          My Bookings
        </NavLink>
        <NavLink to="/admin" style={linkStyle}>
          Admin
        </NavLink>
        {!user ? (
          <>
            <NavLink to="/login" style={linkStyle}>
              Login
            </NavLink>
            <NavLink to="/register" style={linkStyle}>
              Register
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              border: "1px solid #e5e7eb",
              background: "#fff",
              padding: "4px 10px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Logout ({user.name})
          </button>
        )}
      </div>
    </nav>
  );
}
