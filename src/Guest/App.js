import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MailList from "./components/mailList/MailList";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import Featured from "./components/featuredProperties/FeaturedProperties";
function App() {
  const [checkStatus, setCheckStatus] = useState(true);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {

    const propertyCountQuerySnapshot = await getDocs(query(collection(db, "properties")));
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
                <Featured />
              </>}
            </>
          } />
        </Routes>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
