import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (!product.name) return <div className="container" style={{padding: '50px 20px'}}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <Link to="/" className="btn" style={{ marginBottom: '20px', background: 'var(--surface-color)' }}>
        Go Back
      </Link>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--border-color)' }}
          />
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.name}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Brand: {product.brand}</p>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '20px' }}>
            ${product.price}
          </div>
          <p style={{ marginBottom: '30px', lineHeight: '1.8' }}>{product.description}</p>
          
          <div style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Status:</span>
              <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
            </div>

            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span>Quantity:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  style={{ padding: '8px', borderRadius: '4px', background: 'var(--bg-color)', color: '#fff', border: '1px solid var(--border-color)', outline: 'none' }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {product.countInStock > 0 && (
              <button onClick={addToCartHandler} className="btn" style={{ width: '100%', marginTop: '10px' }}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
