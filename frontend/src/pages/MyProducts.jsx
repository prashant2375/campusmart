import { useState } from "react";

function MyProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Engineering Mathematics Book",
      price: 350,
      category: "Books",
    },
    {
      id: 2,
      name: "Scientific Calculator",
      price: 800,
      category: "Electronics",
    },
  ]);

  const handleDelete = (id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );
    setProducts(updatedProducts);
  };

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
