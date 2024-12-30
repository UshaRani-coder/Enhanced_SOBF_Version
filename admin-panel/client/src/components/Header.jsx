
const Header = ({ toggleSidebar, setIsAuthenticated }) => {
  const handleLogout = () => {
    // Clear authentication state
    setIsAuthenticated(false);
    navigate('/login');
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

      <button onClick={handleLogout} className="text-white p-2 px-4 rounded-md bg-red-700 hover:bg-red-800 font-semibold">
        Logout
      </button>
    </div>
  );
};

export default Header;
