import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, User, Home, Info, LogOut } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#735DA5] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">ResearchCollab</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#D3C5E5] hover:text-[#735DA5] transition-colors flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#D3C5E5] hover:text-[#735DA5] transition-colors flex items-center">
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#D3C5E5] hover:text-[#735DA5] transition-colors flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-[#D3C5E5] text-[#735DA5] hover:bg-white transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-3 py-2 rounded-md text-sm font-medium bg-[#D3C5E5] text-[#735DA5] hover:bg-white transition-colors"
              >
                Login/Signup
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#D3C5E5] hover:text-[#735DA5] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#735DA5]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#D3C5E5] hover:text-[#735DA5] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#D3C5E5] hover:text-[#735DA5] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#D3C5E5] hover:text-[#735DA5] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[#D3C5E5] text-[#735DA5] hover:bg-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#D3C5E5] text-[#735DA5] hover:bg-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;