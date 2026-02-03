import { useEffect, useState } from "react";
import API from "../api/api";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH MY PRODUCTS
  useEffect(() => {
    API.get("/products/mine")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔥 DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1>My Products</h1>
      <p>Manage items you have listed for sale.</p>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="my-product-list">
          {products.map((product) => (
            <div key={product.id} className="my-product-card">
              <div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>₹ {product.price}</p>
                
                {product.status !== "approved" && (
  <small className="approval-caption">
    ⏳ Waiting for admin approval
  </small>
)}


                {product.image_url && (
                  <img
                    src={`http://localhost:5000/${product.image_url}`}
                    alt={product.name}
                    width="120"
                  />
                )}
              </div>

              <div className="actions">
                <button className="edit-btn">Edit</button>
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

export default MyProducts;
