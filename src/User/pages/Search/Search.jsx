import "./search.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Item.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";



const Search = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [propertyList, setPropertyList] = useState([]);

    useEffect(async () => {
        const initialQuerySnapshot = await getDocs(
            query(collection(db, "properties"), where("property_place", "==", destination))
        );
        const data = initialQuerySnapshot.docs.map((doc) => doc.data());
        setPropertyList(data);
    }, []);


    const searchRooms = async () => {

    };

    return (
        <div>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Location</label>
                            <input value={destination} type="text" />
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price
                                    </span>
                                    <input type="number" className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price
                                    </span>
                                    <input type="number" className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Rooms</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Bathrooms</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Kitchen</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Farnished</span>
                                    <input
                                        type="radio"
                                        name="Farnished"
                                    />
                                    Yes
                                    <input
                                        type="radio"
                                        name="Farnished"
                                    />
                                    No
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Rent</span>
                                    <input
                                        type="radio"
                                        name="Rent"
                                    />
                                    Monthly
                                    <input
                                        type="radio"
                                        name="Rent"
                                    />
                                    Weekly
                                </div>
                            </div>
                        </div>
                        <button>Search</button>
                    </div>
                    <div className="listResult">
                        {
                            propertyList.map((item,key) => (
                                <div className="searchItem">
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
                                        <div className="siRating">
                                            &#10084;
                                        </div>
                                        <div className="siDetailTexts">
                                            <span className="siPrice">${item.property_price}</span>
                                            <button className="siCheckButton">Call</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
