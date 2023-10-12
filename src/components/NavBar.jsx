import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";

function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  return (
    <nav className="navigation">
      <ul>
        <li>
          {" "}
          <Link to="/" className="Link">
            Umbrella Corp® Our Business is Life Itself
          </Link>
        </li>
        <li>
          <Link to="/" className="Link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/createnewstory/ " className="Link">
            Create New Story
          </Link>
        </li>
        <li>
          <Link to="/contact " className="Link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
