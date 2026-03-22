import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={product.name} className="product-img" />
      </Link>
      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-title">
          {product.name}
        </Link>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
