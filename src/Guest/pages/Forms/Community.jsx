import React, { useState } from "react";
import Modal from "react-modal";
import "./form.css";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db, storage } from "../../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Community({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const communityCollectionRef = collection(db, "communities");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const uid = auth?.currentUser?.uid;
      let imageUrl = "";
      const imageRef = ref(storage, `community/${uid}`);

      await uploadBytes(imageRef, photo);

      const url = await getDownloadURL(imageRef);
      imageUrl = url;

      await addDoc(communityCollectionRef, {
        community_id: uid,
        community_name: name,
        community_contact: contact,
        community_email: email,
        community_photo: imageUrl
      });

      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="registration-modal community"
      >
        <h2>Community Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Photo:</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <button onClick={onClose} className="close-button"></button>
      </Modal>
    </div>
  );
}
