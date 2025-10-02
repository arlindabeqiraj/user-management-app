import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Plus, Home } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-blue-600 shadow-sm border-b border-blue-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Users className="app-icon" />
            <h1 className="app-title">User Management</h1>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/"
                  ? "bg-white text-blue-600"
                  : "text-white hover:text-blue-100 hover:bg-blue-500"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/add-user"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === "/add-user"
                  ? "bg-white text-blue-600"
                  : "text-white hover:text-blue-100 hover:bg-blue-500"
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
