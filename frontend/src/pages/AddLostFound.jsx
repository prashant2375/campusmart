import { useEffect, useRef, useState } from "react";
import API from "../api/api";
import "./AddProduct.css";
import ChatPopup from "./ChatPopup";

function LostFound() {
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [items, setItems] = useState([]);

  const [showChat, setShowChat] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "",
    location: "",
    description: "",
  });

  const [error, setError] = useState("");
  const imageInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 🔹 FETCH LOST & FOUND ITEMS
  useEffect(() => {
    API.get("/lostfound")
      .then((res) => setItems(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setError("");

    if (!imageInputRef.current?.files[0]) {
      setError("Please upload an image");
      return;
    }

    if (!formData.name || !formData.status || !formData.location) {
      setError("Name, Status and Location are required");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      data.append("image", imageInputRef.current.files[0]);

      await API.post("/lostfound", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // reset form
      setFormData({
        name: "",
        category: "",
        status: "",
        location: "",
        description: "",
      });
      setImagePreview(null);
      imageInputRef.current.value = null;

      setShowForm(false);
      setShowPopup(true);
    } catch (err) {
      setError("Failed to submit report");
    }
  };

  return (
    <div className="page">
      <h1>Lost & Found</h1>

      {/* 🔹 REPORT CARD */}
      <div className="sell-item-card" onClick={() => setShowForm(true)}>
        <h2>➕ Report Lost / Found</h2>
        <p>Click to report an item</p>
      </div>

      {/* 🔹 ITEMS LIST */}
      <div className="lostfound-list">
        {items.map((item) => {
          const imageUrl = `http://localhost:5000/${item.image.replaceAll(
            "\\",
            "/"
          )}`;

          console.log("FINAL IMAGE URL:", imageUrl);

          return (
            <div key={item.id} className="lostfound-card">
              <div className="lf-details">
                <h3>{item.name}</h3>

                <span className={`lf-status ${item.status}`}>
                  {item.status.toUpperCase()}
                </span>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="lf-desc">{item.description}</p>

                <button
                  className="contact-btn"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowChat(true);
                  }}
                >
                  💬 Contact Owner
                </button>
              </div>

              <div className="lf-image">
                <img src={imageUrl} alt={item.name} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal product-form">
            <h2>Report Item</h2>

            <div className="image-picker">
              <div
                className="image-circle"
                onClick={() => imageInputRef.current.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <span>Add Image</span>
                )}
              </div>
              <input
                type="file"
                hidden
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </div>

            <input
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Category</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>ID Cards</option>
              <option>Others</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Lost / Found</option>
              <option>Lost</option>
              <option>Found</option>
            </select>

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="modal-actions">
              <button onClick={handleSubmit} className="submit-btn">
                Submit
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 SUCCESS POPUP */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⏳ Waiting for admin approval</h3>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* 🔹 CHAT POPUP */}
      {showChat && selectedItem && (
        <ChatPopup
          item={selectedItem}
          onClose={() => {
            setShowChat(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}

export default LostFound;
