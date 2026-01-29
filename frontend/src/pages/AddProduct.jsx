import { useRef, useState } from "react";
import "./AddProduct.css";
import API from "../api/api";



function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    source: "",
    price: "",
    description: "",
  });



  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const imageInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  // const [videoPreview, setVideoPreview] = useState(null);
  const videoInputRef = useRef(null);
  const [videoPreview, setVideoPreview] = useState(null);


  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    console.log("Sell Item clicked");

    setError("");
    setSuccess("");

    if (!imageInputRef.current?.files[0]) {
      setError("Please upload a product image");
      console.log("Validation failed: image");
      return;
    }

    if (!formData.name || !formData.category || !formData.price) {
      setError("Please fill all required fields");
      console.log("Validation failed: fields");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("source", formData.source);
      data.append("price", formData.price);
      data.append("description", formData.description);

      if (imageInputRef.current.files[0]) {
        data.append("image", imageInputRef.current.files[0]);
      }

      // if (videoPreview) {
      //   const videoInput = document.querySelector(
      //     'input[type="file"][accept="video/*"]'
      //   );
      //   if (videoInput?.files[0]) {
      //     data.append("video", videoInput.files[0]);
      //   }
      // }

      if (videoInputRef.current?.files[0]) {
        data.append("video", videoInputRef.current.files[0]);
      }


      await API.post("/products", data);

      setSuccess("Product added successfully. Awaiting admin approval.");

      // Reset form
      setFormData({
        name: "",
        category: "",
        source: "",
        price: "",
        description: "",
      });
      setImagePreview(null);
      setVideoPreview(null);
      imageInputRef.current.value = null;
      videoInputRef.current.value = null;

    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };


  return (
    <div className="page">
      {/* WHITE CARD START */}
      <div className="product-form">
        <div className="text_center_prop">
          <h1>Sell an Item</h1>
          <p>Add product details to sell within campus</p>
        </div>

        {/* IMAGE PICKER INSIDE CARD */}
        <div className="image-picker">
          <div className="image-circle" onClick={handleImageClick}>
            {imagePreview ? (
              <img src={imagePreview} alt="Product" />
            ) : (
              <span className="placeholder-text">Add Image</span>
            )}
            <div className="edit-icon">✏️</div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
            hidden
          />


        </div>

        {/* FORM FIELDS */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>


        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Hostel Items</option>
            <option>Stationery</option>
            <option>Others</option>
          </select>

        </div>

        <div className="form-group">
          <label>Source of Item</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="">Select source</option>
            <option>Created by me</option>
            <option>Bought</option>
            <option>Rented</option>
            <option>Second-hand</option>
          </select>

        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            name="description"
            placeholder="Describe your product"
            value={formData.description}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">
          <label>Product Video (optional)</label>
          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={handleVideoChange}
          />

        </div>

        {videoPreview && (
          <video src={videoPreview} controls className="video-preview" />
        )}

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: "green", textAlign: "center", marginBottom: "10px" }}>
            {success}
          </p>
        )}


        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
        >
          Sell Item
        </button>


      </div>
      {/* WHITE CARD END */}
    </div>
  );
}

export default AddProduct;
