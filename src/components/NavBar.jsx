import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";



function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

return (


    <nav className="navigation">
      <a href="/" className="brand-name">
      Umbrella Corp®     Our Business is Life Itself
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {/* hamburger svg code... */}
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/createnewstory/">Create New Story</a>
        </li>
        <li>
          <a href="/contact">About</a>
        </li>
      </ul>
    </div>
  </nav>
);
      }

      export default NavBar




