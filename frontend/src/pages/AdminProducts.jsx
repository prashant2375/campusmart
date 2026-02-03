import axios from "axios";
import { useEffect, useState } from "react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products/admin/pending",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProducts(res.data);
  };

  const approveProduct = async (id) => {
    await axios.put(
      `http://localhost:5000/api/products/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchPendingProducts();
  };

  const rejectProduct = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchPendingProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pending Products</h2>

      {products.length === 0 && <p>No pending products</p>}

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>

          {product.image_url && (
            <img
              src={`http://localhost:5000/${product.image_url}`}
              alt={product.name}
              style={{ width: "200px", marginBottom: "10px" }}
            />
          )}

          <div>
            <button
              onClick={() => approveProduct(product.id)}
              style={{ marginRight: "10px", background: "green", color: "white" }}
            >
              Approve
            </button>

            <button
              onClick={() => rejectProduct(product.id)}
              style={{ background: "red", color: "white" }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
