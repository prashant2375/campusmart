import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import ProductCard from "../components/ProductCard";
import SellItemCard from "../components/SellItemCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // only approved products
        const res = await API.get("/products?status=approved");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page">
      <h1>Sell & Browse Items</h1>

      <div className="product-grid">
        {/* 🔹 SELL ITEM CARD */}
        <SellItemCard onClick={() => navigate("/add-product")} />

        {/* 🔹 APPROVED PRODUCTS */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
