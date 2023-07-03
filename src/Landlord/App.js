import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MailList from "./components/mailList/MailList";
import { Route, Routes } from "react-router-dom";
import AddProperty from "./pages/Property/AddProperty";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import Featured from "./components/featuredProperties/FeaturedProperties";
import ViewProperty from "./pages/Property/ViewProperty";

function App() {
  const [checkStatus, setCheckStatus] = useState(true);
  const [landlordId, setLandlordId] = useState(sessionStorage.getItem("lid"));

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () =>{

    const propertyCountQuerySnapshot = await getDocs(query(collection(db, "properties"), where("landlord_id", "==", landlordId)));
    if (propertyCountQuerySnapshot.docs.length > 0) { 
      setCheckStatus(false);
    }
  }

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Routes>
          <Route path="/" element={
            <>
              {checkStatus ? <h1>No Properties Yet Addedd</h1> : <>
              <Featured/>
              </>}
            </>
          } />
          <Route path="/AddProperty" element={<AddProperty />} />
          <Route path="/ViewProperty" element={<ViewProperty />} />
        </Routes>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
