import React, { useEffect, useState } from "react";

const CreateObject = () => {
  const [sceneId, setSceneId] = useState("");
  const [name, setName] = useState("");
  const [imgsrc, setImgSrc] = useState("");
  const [description, setDescription] = useState("");
  const [allScenes, setAllScenes] = useState([]);

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
        const data = await response.json();
        setAllScenes(data);
      } catch (error) {
        console.error("Error fetching scenes:", error);
      }
    };

    fetchScenes();
  }, []);

  const handleCreateObject = async () => {
    if (!sceneId || !name || !imgsrc) {
      alert("Scene, Name, and Image URL are required fields.");
      return;
    }

    const objectData = {
      sceneId: parseInt(sceneId),
      name: name,
      imgsrc: imgsrc,
      description: description,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/objects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectData),
      });

      if (response.ok) {
        console.log("Object created successfully!");
        setSceneId("");
        setName("");
        setImgSrc("");
        setDescription("");
      } else {
        console.error("Error creating object.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  if (allScenes.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="modifyComponent">
      <h2>Create a New Object</h2>
      <label htmlFor="sceneId">Scene:</label>
      <select
        id="sceneId"
        value={sceneId}
        onChange={(e) => setSceneId(e.target.value)}
      >
        <option value="">Select a Scene</option>
        {allScenes.map((scene) => (
          <option key={scene.id} value={scene.id}>
            {scene.title}
          </option>
        ))}
      </select>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="imgsrc">Image URL:</label>
      <input
        type="text"
        id="imgsrc"
        value={imgsrc}
        onChange={(e) => setImgSrc(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        rows={5}
        cols={50}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="objectButton" onClick={handleCreateObject}>
        Create Object
      </button>
    </div>
  );
};

export default CreateObject;
