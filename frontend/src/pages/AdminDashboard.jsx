import API from "../api/api";

import { useEffect, useState } from "react";


function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.put(`/products/${id}/approve`);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "approved" } : p
        )
      );
    } catch {
      alert("Approval failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">
        Review and approve products submitted by users
      </p>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="admin-grid">
          {products.map((product) => (
            <div key={product.id} className="admin-card">
              {product.image_url && (
                <img
                  src={`http://localhost:5000/${product.image_url}`}
                  alt={product.name}
                  className="product-img"
                />
              )}

              <h3>{product.name}</h3>
              <p className="price">₹ {product.price}</p>
              <p className="category">{product.category}</p>

              <span
                className={`status ${
                  product.status === "approved"
                    ? "approved"
                    : "pending"
                }`}
              >
                {product.status === "approved"
                  ? "Approved"
                  : "Pending"}
              </span>

              <div className="actions">
                {product.status !== "approved" && (
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(product.id)}
                  >
                    Approve
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
