import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-xl font-bold text-purple-400">
          Coding Platform
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-purple-400 transition duration-200"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;