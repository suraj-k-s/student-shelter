import { useState } from "react";
import Login from "../../pages/Forms/Login";
import "./navbar.css";
import Landlord from "../../pages/Forms/Landlord";
import User from "../../pages/Forms/User";
import Community from "../../pages/Forms/Community";

const Navbar = () => {
  const [loginModel, setLoginModel] = useState(false);
  const [landlordModel, setLandlordModel] = useState(false);
  const [userModel, setUserModel] = useState(false);
  const [communityModel, setCommunityModel] = useState(false);

  const communityOpen = () => {
    setCommunityModel(true);
  };

  const communityClose = () => {
    setCommunityModel(false);
  };

  const userOpen = () => {
    setUserModel(true);
  };

  const userClose = () => {
    setUserModel(false);
  };

  const landlordOpen = () => {
    setLandlordModel(true);
  };

  const landlordClose = () => {
    setLandlordModel(false);
  };

  const loginOpen = () => {
    setLoginModel(true);
  };

  const loginClose = () => {
    setLoginModel(false);
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">STUDENT-SHELTER</span>
        <div className="navItems">
          <button className="navButton" onClick={userOpen}>
            User
          </button>
          <button className="navButton" onClick={communityOpen}>
          Community
          </button>
          <button className="navButton" onClick={landlordOpen}>
            Landlord
          </button>
          <button className="navButton" onClick={loginOpen}>
            Login
          </button>
          <Login isOpen={loginModel} onClose={loginClose} />
          <Landlord isOpen={landlordModel} onClose={landlordClose} />
          <User isOpen={userModel} onClose={userClose} />
          <Community isOpen={communityModel} onClose={communityClose} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
