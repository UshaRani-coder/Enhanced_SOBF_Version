import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Hamburger Menu Icon */}
      <button
        className="text-2xl md:text-lg"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="text-white p-2 px-4 rounded-md bg-red-700 hover:bg-red-800 font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
