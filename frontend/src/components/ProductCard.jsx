import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span>No Image</span>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">₹ {product.price}</p>
        <p className="status">{product.status}</p>

        <button className="view-btn">View Details</button>
      </div>
    </div>
  );
}

export default ProductCard;
