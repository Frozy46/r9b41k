import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/customerSlice";
import "./AddCustomer.scss";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Добавляем id для нового клиента
    const newCustomer = {
      ...formData,
      id: Date.now(), // Временное решение для генерации id
      name: `${formData.firstName} ${formData.lastName}`, // Добавляем поле name
      address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}` // Формируем полный адрес
    };
    dispatch(addCustomer(newCustomer));
    navigate("/customers");
  };

  return (
    <div className="add-customer-container">
      <div className="header">
        <div className="avatar">
          <span className="edit-icon">✎</span>
        </div>
        <button className="delete-btn">🗑</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-field">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-group">
          <div className="input-field">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="input-field full-width">
          <label>Address</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>

        <div className="input-group">
          <div className="input-field">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>State / Province</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Zip Code</label>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Customer</button>
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
