import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div style={{ padding: '40px', background: 'var(--surface-color)', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Your cart is empty.</p>
          <Link to="/" className="btn">Go Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 600px' }}>
            {cartItems.map((item) => (
              <div key={item.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '10px' }}>
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <Link to={`/product/${item.product}`} style={{ flex: '1', margin: '0 20px', fontSize: '1.2rem', color: '#fff', textDecoration: 'none' }}>
                  {item.name}
                </Link>
                <div style={{ margin: '0 20px', color: 'var(--text-muted)' }}>Qty: {item.qty}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>${item.price}</div>
                <button onClick={() => removeFromCart(item.product)} style={{ marginLeft: '20px', background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '20px 0', color: 'var(--primary-color)' }}>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </div>
              <button className="btn" style={{ width: '100%' }}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
