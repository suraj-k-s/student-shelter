import { useNavigate } from "react-router-dom";
import "./Favourite.css";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const Favourite = () => {

    const [favorites, setFavorites] = useState([]);
    const [id, setID] = useState([]);
    const favoritesRef = collection(db, "favorites");
    const navigate = useNavigate();
    const viewProperty = (propertyId) => {
        navigate(`/User/ViewMore/${propertyId}`);
    };
    useEffect(() => {
        const properties = [];
        const userId = sessionStorage.getItem("uid");
        const getData = async () => {
            const querySnapshot = await getDocs(
                query(
                    favoritesRef,
                    where('user_id', '==', userId)
                )
            );
            const data = querySnapshot.docs.map((doc) => (
                doc.data().property_id
            ));
            setID(data);
            for (const propertyId of data) {
                const propertyDocRef = doc(db, 'properties', propertyId);
                const propertySnapshot = await getDoc(propertyDocRef);

                if (propertySnapshot.exists()) {
                    const propertyData = propertySnapshot.data();
                    properties.push(propertyData);
                }
            }
            setFavorites(properties);
        }
        getData()
    }, []);
    return (
        <>
            {
                favorites.map((item, key) => (
                    <div className="searchItem" onClick={() => viewProperty(id[key])}>
                        <img
                            src={item.property_photo}
                            alt=""
                            className="siImg"
                        />
                        <div className="siDesc">
                            <h1 className="siTitle">{item.property_name}</h1>
                            <span className="siSubtitle">
                                {item.property_place}
                            </span>
                            <span className="siFeatures">
                                • {item.property_rooms} rooms • {item.property_bathrooms} bathrooms • {item.property_kitchen} Kitchen
                            </span>
                        </div>
                        <div className="siDetails">
                            <div className="siDetailTexts">
                                <span className="siPrice">${item.property_price}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default Favourite;
