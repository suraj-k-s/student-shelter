import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {

  const navigate= useNavigate();

  const logoutLandlord = ()=>{
    sessionStorage.removeItem('lid');
    navigate("/");
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">STUDENT-SHELTER</span>
        <div className="navItems">
          <button className="navButton"><Link to={"/Community"}>Home</Link></button>
          <button className="navButton"><Link to={"/Community/AddPost"}>Add Post</Link></button>
          <button className="navButton"><Link to={"/Community/ViewPost"}>View Post</Link></button>
          <button className="navButton" onClick={logoutLandlord}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar