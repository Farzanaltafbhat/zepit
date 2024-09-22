import logo from '../assets/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../pages/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { token, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='header'>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Zepit" />
        </Link>
        <nav ref={sidebarRef} className={`nav-links ${isOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={closeSidebar}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeSidebar}>About</Link>
            </li>
            <li>
              <Link to="/services" onClick={closeSidebar}>Services</Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeSidebar}>Contact</Link>
            </li>
            {token ? (
              <li>
                <Link to="#" onClick={handleLogoutAndRedirect}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={closeSidebar}>Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className={`breadcrumb ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
