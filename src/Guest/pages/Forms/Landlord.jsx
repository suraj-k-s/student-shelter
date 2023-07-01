import React, { useState } from "react";
import Modal from "react-modal";
import "./Landlord.css";

export default function Landlord({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [proof, setProof] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };

  const handleProofChange = (e) => {
    setProof(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Name:", name);
    console.log("Contact:", contact);
    console.log("Email:", email);
    console.log("Address:", address);
    console.log("Photo:", photo);
    console.log("Proof:", proof);
    console.log("Password:", password);
    // Reset the form
    setName("");
    setContact("");
    setEmail("");
    setAddress("");
    setPhoto("");
    setProof("");
    setPassword("");
    // Close the modal
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="registration-modal"
      >
        <h2>Landlord Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={handleContactChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Photo:</label>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={handlePhotoChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Proof:</label>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={handleProofChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <button onClick={onClose} className="close-button"></button>
      </Modal>
    </div>
  );
}
