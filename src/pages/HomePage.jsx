import { useEffect, useState } from "react";

const HomePage = () => {
  const [scenes, setScenes] = useState([]);

  const fetchAllScenes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
    if (response.ok) {
      const allScenes = await response.json();
      setScenes(allScenes);
      console.log(allScenes);
    }
  };

  useEffect(() => {
    fetchAllScenes();
  }, []);

  return <h1>Welcome Resident IronHack</h1>;
};

export default HomePage;
