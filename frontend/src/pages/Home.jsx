import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Discover Premium Products</h1>
          <p>Experience the best quality hardware and electronics crafted for enthusiasts, by enthusiasts.</p>
          <a href="#products" className="btn">Shop Now</a>
        </div>
      </section>
      
      <section id="products" className="container">
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Latest Arrivals</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
          {products.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
              No products available right now. Connect to MongoDB and seed the database!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
