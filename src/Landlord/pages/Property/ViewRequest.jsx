import React, { useEffect } from 'react'
import './ViewProperty.css';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useState } from "react";

export default function ViewRequest() {
    const [landlordId, setLandlordId] = useState(sessionStorage.getItem("lid"));
    const [requestList, setPropertyList] = useState([]);

    useEffect(() => {
        // getCount();
    }, []);


    // const getCount = async () => {
    //     const requestCountQuerySnapshot = await getDocs(
    //         query(collection(db, "properties"), where("landlord_id", "==", landlordId))
    //     );
    //     if (requestCountQuerySnapshot.docs.length > 0) {
    //         const data = requestCountQuerySnapshot.docs.map((doc) => doc.data());
    //         setPropertyList(data);
    //     }
    // };
    return (
        <table className="request-table">
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
                {requestList.map((item, key) => (
                    <tr key={key}>
                        <td>{item.request_name}</td>
                        <td>{item.request_details}</td>
                        <td>
                            <img
                                src={item.request_photo}
                                alt="Property"
                                className="request-image"
                            />
                        </td>
                        <td>£{item.request_price}</td>
                        <td>{item.request_rooms}</td>
                        <td>{item.request_bathrooms}</td>
                        <td>{item.request_kitchen}</td>
                        <td>{item.request_furnished?"Yes":"No"}</td>
                        <td>{item.request_place}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
