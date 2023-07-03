import React, { useState } from 'react';
import {v4} from 'uuid'
import 'leaflet/dist/leaflet.css';
import './styles.css';
import { addDoc, collection ,serverTimestamp} from 'firebase/firestore'
import { auth, db, storage } from "../../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const AddPost= () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [photo, setPhoto] = useState(null);


    const postCollectionRef = collection(db, "posts");
    const [isLoading, setIsLoading] = useState(false);




    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const imageRef = ref(storage, `postPhoto/${v4()}`);
        await uploadBytes(imageRef, photo);
        const url = await getDownloadURL(imageRef);

        await addDoc(postCollectionRef, {
            community_id: sessionStorage.getItem("cid"),
            post_title: name,
            post_details: details,
            post_image: url,
            timestamp:serverTimestamp()
        });

        setIsLoading(false);


    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };



    return (
        <div className="form-container">
            <h1 align="center">Add New Post</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col">
                        <label>Title:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Details:</label>
                        <textarea value={details} onChange={(e) => setDetails(e.target.value)} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Photo:</label>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
           
        </div>
    );
};

export default AddPost;
