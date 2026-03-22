import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Shipping = () => {
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '500px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Shipping</h1>
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Postal Code</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff' }} required />
        </div>
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>Continue to Payment</button>
      </form>
    </div>
  );
};
export default Shipping;
