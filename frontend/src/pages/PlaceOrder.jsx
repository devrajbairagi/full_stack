import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const PlaceOrder = () => {
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      if (!userInfo) {
        alert('Please login to place an order');
        navigate('/login');
        return;
      }

      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }, config);

      alert(`Order Placed Successfully! Your Order ID: ${data._id}`);
      clearCart();
      navigate('/');
    } catch (error) {
      alert('Error placing order: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Place Order</h1>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '12px' }}>
            <h2 style={{ marginBottom: '10px' }}>Shipping Summary</h2>
            <p><strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}</p>
          </div>
          <div style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '12px' }}>
            <h2 style={{ marginBottom: '10px' }}>Payment Used</h2>
            <p><strong>Method:</strong> {paymentMethod}</p>
          </div>
          <div style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '12px' }}>
            <h2 style={{ marginBottom: '10px' }}>Order Checkout Review</h2>
            {cartItems.length === 0 ? <p>Your cart is empty</p> : (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '15px', padding: '10px 0', borderBottom: index !== cartItems.length - 1 ? '1px solid var(--border-color)' : 'none'}}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '4px' }}/>
                    <div style={{ flex: 1 }}><Link to={`/product/${item.product}`} style={{color: '#fff', textDecoration:'none'}}>{item.name}</Link></div>
                    <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h2 style={{ marginBottom: '20px' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Items</span><span>${itemsPrice}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Shipping</span><span>${shippingPrice}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span>Tax</span><span>${taxPrice}</span></div>
            <hr style={{ borderColor: 'var(--border-color)', margin: '15px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}><span>Total</span><span>${totalPrice}</span></div>
            <button className="btn" style={{ width: '100%' }} disabled={cartItems.length === 0} onClick={placeOrderHandler}>Lock In & Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
