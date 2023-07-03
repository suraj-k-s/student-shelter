import { useEffect } from "react";
import "./featuredProperties.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useState } from "react";

const FeaturedProperties = () => {
  const [landlordId, setLandlordId] = useState(sessionStorage.getItem("lid"));
  const [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const propertyCountQuerySnapshot = await getDocs(
      query(collection(db, "properties"), )
    );
    if (propertyCountQuerySnapshot.docs.length > 0) {
      const data = propertyCountQuerySnapshot.docs.map((doc) => doc.data());
      setPropertyList(data);
    }
  };

  return (
    <div className="fp">
      {propertyList.map((item, key) => {
        if ((key + 1) % 4 === 0) {
          return (
            <>
               <div className="fpItem" key={key}>
              <img
                src={item.property_photo}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.property_name}</span>
              <span className="fpCity">{item.property_place}</span>
              <span className="fpPrice">Starting from ${item.property_price}</span>
              <div className="fpRating">
                Rooms : {item.property_rooms}
              </div>
            </div>
            </>
          );
        } else {
          return (
            <div className="fpItem" key={key}>
              <img
                src={item.property_photo}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.property_name}</span>
              <span className="fpCity">{item.property_place}</span>
              <span className="fpPrice">Starting from ${item.property_price}</span>
              <div className="fpRating">
                Rooms : {item.property_rooms}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FeaturedProperties;
