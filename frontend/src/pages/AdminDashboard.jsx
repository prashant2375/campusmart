import { useState } from "react";

function AdminDashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Engineering Mathematics Book",
      seller: "Rahul",
      price: 350,
      status: "Pending",
    },
    {
      id: 2,
      name: "Scientific Calculator",
      seller: "Amit",
      price: 800,
      status: "Pending",
    },
  ]);

  const handleApprove = (id) => {
    const updated = products.map((product) =>
      product.id === id
        ? { ...product, status: "Approved" }
        : product
    );
    setProducts(updated);
  };

  const handleReject = (id) => {
    const updated = products.filter(
      (product) => product.id !== id
    );
    setProducts(updated);
  };

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p>Manage product listings submitted by users.</p>

      {products.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        <div className="admin-product-list">
          {products.map((product) => (
            <div key={product.id} className="admin-product-card">
              <div>
                <h3>{product.name}</h3>
                <p>Seller: {product.seller}</p>
                <p>₹ {product.price}</p>
                <p>Status: {product.status}</p>
              </div>

              <div className="admin-actions">
                {product.status === "Pending" && (
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(product.id)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="reject-btn"
                  onClick={() => handleReject(product.id)}
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
