import { useEffect, useState } from "react";

const HomePage = () => {
  const [scenes, setScenes] = useState([]);
  const [currentScene, setCurrentScene] = useState(0);

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
  const handleButtonClick = () => {
    setCurrentScene(1);
  };
  const handleButtonClick2 = () => {
    setCurrentScene(0);
  };

  return (
    <div>
      <h1>Welcome Resident IronHack</h1>
      <button onClick={handleButtonClick}>Update Scene</button>
      <button onClick={handleButtonClick2}>Update Scene</button>

      <h2>{scenes[currentScene].title}</h2>
      <img src={scenes[currentScene].imgsrc} style={{ maxWidth: "50vw" }} />
      {scenes[currentScene].description.map((oneLine) => {
        return (
          <>
            <p>{oneLine}</p>
          </>
        );
      })}
    </div>
  );
};

export default HomePage;
