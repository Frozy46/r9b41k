import React, { useState } from "react"; 
import "./EditCustomerModal.scss";

const EditCustomerModal = ({ customer, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    phone: customer.phone || "",
    address: {
      street: customer.address?.street || "",
      city: customer.address?.city || "",
      state: customer.address?.state || "",
      zip: customer.address?.zip || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (["street", "city", "state", "zip"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...customer, ...formData });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.address.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
            <button className="submit-btn" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;
