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

  if (scenes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome Resident IronHack</h1>
      <h2>{scenes[0].title}</h2>
      <img src={scenes[0].imgsrc} style={{ maxWidth: "100vw" }} />
    </div>
  );
};

export default HomePage;
