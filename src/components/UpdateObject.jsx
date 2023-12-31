import React, { useEffect, useState } from "react";

const UpdateObject = () => {
  const [selectedObject, setSelectedObject] = useState("");
  const [name, setName] = useState("");
  const [imgsrc, setImgSrc] = useState("");
  const [description, setDescription] = useState("");
  const [sceneId, setSceneId] = useState("");
  const [allObjects, setAllObjects] = useState([]);
  const [allScenes, setAllScenes] = useState([]);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/objects`);
        const data = await response.json();
        setAllObjects(data);
      } catch (error) {
        console.error("Error fetching objects:", error);
      }
    };

    const fetchScenes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
        const data = await response.json();
        setAllScenes(data);
      } catch (error) {
        console.error("Error fetching scenes:", error);
      }
    };

    fetchObjects();
    fetchScenes();
  }, []);

  const handleSelectChange = (event) => {
    const selectedObjectId = event.target.value;
    const selectedObjectData = allObjects[selectedObjectId];

    setSelectedObject(selectedObjectId);
    setName(selectedObjectData.name);
    setImgSrc(selectedObjectData.imgsrc);
    setDescription(selectedObjectData.description);
    setSceneId(selectedObjectData.sceneId);
  };

  const handleUpdateObject = async () => {
    if (!selectedObject || !name || !imgsrc || !sceneId) {
      alert("Object, Name, Image URL, and Scene are required fields.");
      return;
    }

    const updatedObjectData = {
      name: name,
      imgsrc: imgsrc,
      description: description,
      sceneId: parseInt(sceneId),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/objects/${selectedObject}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedObjectData),
        }
      );

      if (response.ok) {
        setSelectedObject("");
        setName("");
        setImgSrc("");
        setDescription("");
        setSceneId("");
      } else {
        console.error("Error updating object.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (allObjects.length === 0 || allScenes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modifyComponent">
      <h2>Update Object</h2>
      <label htmlFor="selectedObject">Select Object:</label>
      <select
        id="selectedObject"
        value={selectedObject}
        onChange={handleSelectChange}
      >
        <option value="">Select an Object</option>
        {allObjects.map((object, index) => (
          <option key={index} value={index}>
            {object.name}
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
      <label htmlFor="sceneId">Select the scene for this object:</label>
      <select
        id="sceneId"
        value={sceneId}
        onChange={(e) => setSceneId(e.target.value)}
      >
        {allScenes.map((scene) => (
          <option key={scene.id} value={scene.id}>
            {scene.title}
          </option>
        ))}
      </select>
      <button className="objectButton" onClick={handleUpdateObject}>
        Update Object
      </button>
    </div>
  );
};

export default UpdateObject;
