import ProductCard from "../components/ProductCard";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "Engineering Mathematics Book",
      category: "Books",
      price: 350,
      status: "Available",
    },
    {
      id: 2,
      name: "Scientific Calculator",
      category: "Electronics",
      price: 800,
      status: "Available",
    },
    {
      id: 3,
      name: "Study Table",
      category: "Hostel Items",
      price: 1200,
      status: "Sold",
    },
  ];

  return (
    <div className="page">
      <h1>Available Products</h1>
      <p>Browse items listed by students within the campus.</p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
