import React, { useEffect, useState } from "react";

function Scenes() {
  const [scenes, setScenes] = useState([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [objects, setObjects] = useState([]);
  const [hoveredObject, setHoveredObject] = useState(null);

  const fetchAllScenes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
    if (response.ok) {
      const allScenes = await response.json();
      setScenes(allScenes);
    }
  };

  const fetchAllObjects = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/objects`);
    if (response.ok) {
      const allObjects = await response.json();
      setObjects(allObjects);
    }
  };

  useEffect(() => {
    fetchAllScenes();
    fetchAllObjects();
  }, []);

  const handleButtonClick = (index) => {
    setCurrentSceneIndex(index);
  };

  if (scenes.length === 0) {
    return <div>Loading...</div>;
  }

  const currentScene = scenes[currentSceneIndex];

  return (
    <div>
      <h2>You're currently at: {currentScene.title}</h2>
      {currentScene.linkedScenes.map((oneScene, index) => (
        <button
          className="navigationButtons"
          key={index}
          onClick={() => handleButtonClick(oneScene)}
        >
          {scenes[oneScene].title}
        </button>
      ))}
      <br />
      <div className="storyComponents">
        <img
          className="storyImages"
          src={currentScene.imgsrc}
          alt={currentScene.title}
        />
        <div>
          {currentScene.description.map((oneLine, index) => (
            <p className="storyText" key={index}>
              {oneLine}
            </p>
          ))}
        </div>
      </div>

      {objects
        .filter((object) => object.sceneId === currentScene.id)
        .map((object, index) => (
          <div key={index} className="objectContainer">
            <button
              className="objectButton"
              onMouseEnter={() => setHoveredObject(object)}
              onMouseLeave={() => setHoveredObject(null)}
            >
              <img
                src={object.imgsrc}
                alt={object.name}
                style={{ maxWidth: "3vw", marginRight: "0.5vw" }}
              />
              {object.name}
            </button>
          </div>
        ))}
      {hoveredObject && (
        <div className="descriptionDiv">
          <p>{hoveredObject.description}</p>
        </div>
      )}
    </div>
  );
}

export default Scenes;
