import { useRef, useState } from "react";
import API from "../api/api";
import "./AddProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    source: "",
    price: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
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
    setError("");

    if (!imageInputRef.current?.files[0]) {
      setError("Please upload a product image");
      return;
    }

    if (!formData.name || !formData.category || !formData.price) {
      setError("Please fill all required fields");
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

      if (videoInputRef.current?.files[0]) {
        data.append("video", videoInputRef.current.files[0]);
      }

      await API.post("/products", data);

      // ✅ SHOW POPUP
      setShowApprovalPopup(true);

      // ✅ RESET FORM
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
      <div className="product-form">
        <div className="text_center_prop">
          <h1>Sell an Item</h1>
          <p>Add product details to sell within campus</p>
        </div>

        {/* IMAGE PICKER */}
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

        {/* FORM */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
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
          <select name="source" value={formData.source} onChange={handleChange}>
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
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Product Video (optional)</label>
          <input type="file" accept="video/*" ref={videoInputRef} onChange={handleVideoChange} />
        </div>

        {videoPreview && (
          <video src={videoPreview} controls className="video-preview" />
        )}

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <button className="submit-btn" onClick={handleSubmit}>
          Sell Item
        </button>
      </div>

      {/* ✅ APPROVAL POPUP */}
      {showApprovalPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2>⏳ Waiting for Admin Approval</h2>
            <p>Your product has been submitted successfully.</p>
            <p>Please wait until admin approves it.</p>

            <button
              className="ok-btn"
              onClick={() => {
                setShowApprovalPopup(false);
                window.location.href = "/";
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
