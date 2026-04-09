import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        💖 MedReminder 💕
      </div>
      
      <div className="navbar-menu">
        {isLoggedIn ? (
          <>
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              👤 Profile
            </Link>
            <button onClick={handleLogout} className="logout-btn" aria-label="Logout">
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}


