import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/scene/1">
        <button>Scene</button>
      </Link>
      <Link to="/createnewstory/">
        <button>Create new story</button>
      </Link>
    </nav>
  );
};

export default NavBar;
