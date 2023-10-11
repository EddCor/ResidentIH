import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";

function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  return (
    <nav className="navigation">
      {/* <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
       
      </button> */}
      {/* <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      > */}
      <ul>
        <li>
          {" "}
          <Link to="/" className="brand-name">
            Umbrella Corp® Our Business is Life Itself
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/createnewstory/">Create New Story</Link>
        </li>
        <li>
          <Link to="/contact">About</Link>
        </li>
      </ul>
      {/* </div> */}
    </nav>
  );
}

export default NavBar;
