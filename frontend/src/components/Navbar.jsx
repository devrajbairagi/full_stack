import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          MERN<span>Commerce</span>
        </Link>
        <div className="nav-links">
          <Link to="/cart" className="nav-link" style={{ position: 'relative' }}>
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-10px',
                right: '-15px',
                background: 'var(--accent-color)',
                color: '#fff',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Hi, {userInfo.name}</span>
              <button onClick={logoutHandler} className="btn" style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-color)', color: '#fff' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link btn" style={{ color: '#fff', marginLeft: '10px' }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
