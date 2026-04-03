import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiMenu, HiX, HiUser, HiLogout, HiChevronDown, HiCog, HiSupport, HiChat } from 'react-icons/hi';
import { LogoFull } from './Logo';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin, isOfficer, isCitizen } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdown(false);
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (isAdmin) return '/admin';
    if (isOfficer) return '/officer';
    return '/dashboard';
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-200 py-1 ${
      isActive
        ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:rounded-full'
        : 'text-gray-400 hover:text-blue-400'
    }`;

  return (
    <nav className={`bg-gray-900/95 backdrop-blur-lg border-b sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/30 border-gray-800' : 'shadow-sm border-blue-600 border-b-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <LogoFull size="default" variant="light" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              <span className="px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block">Home</span>
            </NavLink>
            <NavLink to="/feedbacks" className={navLinkClass}>
              <span className="px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block">Feedbacks</span>
            </NavLink>
            <NavLink to="/track-complaint" className={navLinkClass}>
              <span className="px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block">Track</span>
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to={getDashboardLink()} className={navLinkClass}>
                  <span className="px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block">Dashboard</span>
                </NavLink>
                {isCitizen && (
                  <>
                    <NavLink to="/submit-complaint" className={navLinkClass}>
                      <span className="px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-block">Complaint</span>
                    </NavLink>
                  </>
                )}

                {/* Profile Dropdown */}
                <div className="relative ml-2" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-800 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-white text-xs font-bold">{user?.name?.charAt(0)}</span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-xs font-semibold text-gray-200 leading-tight">{user?.name?.split(' ')[0]}</p>
                      <p className="text-[10px] text-gray-500 capitalize leading-tight">{user?.role}</p>
                    </div>
                    <HiChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 py-2 z-50 animate-scale-in">
                      <div className="px-4 py-3 border-b border-gray-800">
                        <p className="text-sm font-semibold text-gray-100">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/profile" onClick={() => setProfileDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-100 transition-colors">
                          <HiUser className="w-4 h-4" /> My Profile
                        </Link>
                        {isCitizen && (
                          <>
                            <Link to="/feedback" onClick={() => setProfileDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-100 transition-colors">
                              <HiChat className="w-4 h-4" /> Give Feedback
                            </Link>
                            <Link to="/support" onClick={() => setProfileDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-100 transition-colors">
                              <HiSupport className="w-4 h-4" /> Help & Support
                            </Link>
                          </>
                        )}
                      </div>
                      <div className="border-t border-gray-800 pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/30 transition-colors">
                          <HiLogout className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-blue-400 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all">
                  Sign In
                </Link>
                <Link to="/signup" className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl hover:bg-gray-800 transition-colors">
              {mobileMenuOpen ? <HiX className="w-6 h-6 text-gray-300" /> : <HiMenu className="w-6 h-6 text-gray-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {isAuthenticated && (
              <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-gray-800 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user?.name?.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            )}

            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Home</Link>
            <Link to="/feedbacks" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Feedbacks</Link>
            <Link to="/track-complaint" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Track Complaint</Link>

            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Dashboard</Link>
                {isCitizen && (
                  <>
                    <Link to="/submit-complaint" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Submit Complaint</Link>
                    <Link to="/feedback" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Give Feedback</Link>
                    <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Help & Support</Link>
                  </>
                )}
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-xl font-medium text-sm transition-colors">Profile</Link>
                <div className="pt-2 border-t border-gray-800 mt-2">
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 text-red-400 hover:bg-red-900/30 rounded-xl font-medium text-sm transition-colors">Sign Out</button>
                </div>
              </>
            ) : (
              <div className="pt-3 space-y-2 border-t border-gray-800 mt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-center px-4 py-2.5 text-blue-400 border-2 border-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-900/30 transition-colors">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block text-center px-4 py-2.5 text-white bg-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-500 transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
