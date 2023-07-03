import { useNavigate } from "react-router-dom";
import "./ViewPost.css";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const Favourite = () => {
    const [data, setData] = useState([]);
    const postRef = collection(db, "posts");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const querySnapshot = await getDocs(
            query(
                postRef
            )
        );
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setData(data);
    };

    
    return (
        <>
            {data.length === 0 ? (
                <div className="text-data">No posts added yet.</div>
            ) : (
                data.map((item, key) => (
                    <div className="searchItem">
                        <img src={item.post_image} alt="" className="siImg" />
                        <div className="siDesc">
                            <h1 className="siTitle">{item.post_title}</h1>
                            <span className="siSubtitle">{item.post_details}</span>
                        </div>
                        <div className="siDetails">
                            <div className="siDetailTexts">
                                
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Favourite;
