import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <button>Umbrella LABs</button>
      </Link>
      <Link to="/scene/1">
        <button>Arklay Mansion</button>
      </Link>
      <Link to="/scene/1">
        <button>Raccon City</button>
      </Link>
      <Link to="/createnewstory/">
        <button>Create new story</button>
      </Link>
    </nav>
  );
};

export default NavBar;
