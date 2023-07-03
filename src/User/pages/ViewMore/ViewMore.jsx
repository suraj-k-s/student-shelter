import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ViewMore.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewMore() {
    const { id } = useParams();
    const [allData, setAllData] = useState([]);
    const [call, setCall] = useState("");
    const [email, setEmail] = useState("");
    const [propID, setPropID] = useState("");
    const uid = sessionStorage.getItem("uid");
    const [isSaved, setIsSaved] = useState(false);
    const saveCollectionRef = collection(db, "favorites");

    const addtoSave = async () => {
        try {
            const querySnapshot = await getDocs(
                query(
                    saveCollectionRef,
                    where('property_id', '==', propID),
                    where('user_id', '==', uid)
                )
            );

            if (querySnapshot.empty) {
                await addDoc(saveCollectionRef, {
                    property_id: propID,
                    user_id: uid,
                });
                setIsSaved(true);
                toast.success('Added successfully to favorites', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                const docRef = doc(saveCollectionRef, querySnapshot.docs[0].id);
                await deleteDoc(docRef);
                setIsSaved(false);
                toast.info('Removed from favorites', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error adding/removing property:', error);
            toast.error('An error occurred. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };





    useEffect(() => {
        fetchDocument();
    }, []);


    const fetchDocument = async () => {
        try {
            const docRef = doc(db, "properties", id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const landId = data.landlord_id;
                const docRefLand = doc(db, "landlords", landId);
                const docSnapshotLand = await getDoc(docRefLand);
                setPropID(docSnapshot.id);
                if (docSnapshotLand.exists()) {

                    const dataLand = docSnapshotLand.data();
                    setCall(dataLand.landlord_contact);
                    setEmail(dataLand.landlord_email);
                }

                setAllData(data);
                const map = L.map('map').setView([data.property_latitude, data.property_longitude], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                }).addTo(map);
                L.marker([data.property_latitude, data.property_longitude]).addTo(map);
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    return (
        <div className="view-container">
            <div className='view-row'>
                <div className="view-coloumn">
                    <img src={allData.property_photo} alt="" className='view-image' />
                </div>
                <div className="view-coloumn">
                    <table className='view-table'>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{allData.property_name}</td>
                            </tr>
                            <tr>
                                <td>Rooms</td>
                                <td>{allData.property_rooms} nos</td>
                            </tr>
                            <tr>
                                <td>Bath Rooms</td>
                                <td>{allData.property_bathrooms} nos</td>
                            </tr>
                            <tr>
                                <td>Kitchen</td>
                                <td>{allData.property_kitchen} nos</td>
                            </tr>
                            <tr>
                                <td>Furnished</td>
                                <td>{allData.property_furnished ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Details</td>
                                <td>{allData.property_details}</td>
                            </tr>
                            <tr>
                                <td>Pincode</td>
                                <td>{allData.property_pincode}</td>
                            </tr>
                            <tr>
                                <td>Place</td>
                                <td>{allData.property_place}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>${allData.property_price}</td>
                            </tr>
                            <tr>
                                <td>Rent Type</td>
                                <td>{allData.property_renttype}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="view-row">
                <div className="view-coloumn">
                    <table className='view-table'>
                        <tbody>
                            <tr>
                                <td colSpan={2} align='center'>
                                    <i class="material-icons">phone</i><a href={`tel:${call}`} className='view-link'>Call Agent</a>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align='center'>
                                    <i class="material-icons">email</i> <a href={`mailto:${email}`} className='view-link'>Email Agent</a>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <i className="material-icons">save</i>{' '}
                                    <button
                                        onClick={addtoSave}
                                        className={`view-button ${isSaved ? 'saved' : ''}`}
                                        disabled={!uid} 
                                    >
                                        {isSaved ? 'Saved' : 'Save'}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="view-coloumn">
                    <div id='map' className='view-map'></div>
                </div>
            </div>
        </div>
    );
}
