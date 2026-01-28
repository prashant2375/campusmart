import { useRef, useState } from "react";
import "./AddProduct.css";

function AddProduct() {
  const imageInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoPreview(URL.createObjectURL(file));
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
            capture="environment"
            ref={imageInputRef}
            onChange={handleImageChange}
            hidden
          />
        </div>

        {/* FORM FIELDS */}
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" placeholder="Enter product name" />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select>
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
          <select>
            <option value="">Select source</option>
            <option>Created by me</option>
            <option>Bought</option>
            <option>Rented</option>
            <option>Second-hand</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" placeholder="Enter price" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea rows="4" placeholder="Describe your product"></textarea>
        </div>

        <div className="form-group">
          <label>Product Video (optional)</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </div>

        {videoPreview && (
          <video src={videoPreview} controls className="video-preview" />
        )}

        <button className="submit-btn">Sell Item</button>
      </div>
      {/* WHITE CARD END */}
    </div>
  );
}

export default AddProduct;
