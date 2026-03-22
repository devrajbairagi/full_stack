import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Payment = () => {
  const { shippingAddress, savePaymentMethod } = useContext(CartContext);
  const navigate = useNavigate();

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '500px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Payment Method</h1>
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', cursor: 'pointer' }}>
            <input type="radio" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} />
            PayPal or Credit Card
          </label>
        </div>
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>Continue to Review Order</button>
      </form>
    </div>
  );
};
export default Payment;
