import React, { useEffect } from 'react'
import './ViewProperty.css';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useState } from "react";

export default function ViewProperty() {
    const [landlordId, setLandlordId] = useState("");
    const [propertyList, setPropertyList] = useState([]);

    useEffect(() => {
        setLandlordId(sessionStorage.getItem("lid"));
        getCount();
    }, []);


    const getCount = async () => {
        const propertyCountQuerySnapshot = await getDocs(
            query(collection(db, "properties"), where("landlord_id", "==", landlordId))
        );
        if (propertyCountQuerySnapshot.docs.length > 0) {
            const data = propertyCountQuerySnapshot.docs.map((doc) => doc.data());
            setPropertyList(data);
        }
    };
    return (
        <table className="property-table">
            <thead>
                <tr>
                    <th> Name</th>
                    <th> Details</th>
                    <th>Image</th>
                    <th> Price</th>
                    <th> Rooms</th>
                    <th> Bathrooms</th>
                    <th> Kitchen</th>
                    <th> Furnished</th>
                    <th> Place</th>
                </tr>
            </thead>
            <tbody>
                {propertyList.map((item, key) => (
                    <tr key={key}>
                        <td>{item.property_name}</td>
                        <td>{item.property_details}</td>
                        <td>
                            <img
                                src={item.property_photo}
                                alt="Property"
                                className="property-image"
                            />
                        </td>
                        <td>£{item.property_price}</td>
                        <td>{item.property_rooms}</td>
                        <td>{item.property_bathrooms}</td>
                        <td>{item.property_kitchen}</td>
                        <td>{item.property_furnished?"Yes":"No"}</td>
                        <td>{item.property_place}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
