import React, { useState } from "react";

const CreateSceneForm = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  const handleAddDescription = () => {
    if (newDescription.trim() !== "") {
      setDescription([...description, newDescription]);
      setNewDescription("");
    }
  };

  const handleCreateScene = async () => {
    // Ensure that title and image URL are not empty before creating a scene
    if (title.trim() === "" || imageURL.trim() === "") {
      alert("Title and Image URL are required fields.");
      return;
    }

    const sceneData = {
      title: title,
      imgsrc: imageURL,
      description: description,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sceneData),
      });

      if (response.ok) {
        console.log("Scene created successfully!");
        setTitle("");
        setImageURL("");
        setDescription([]);
        setNewDescription("");
      } else {
        console.error("Error creating scene.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Scene</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="imageURL">Image URL:</label>
      <input
        type="text"
        id="imageURL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <br />
      <h3>Description:</h3>
      {description.map((desc, index) => (
        <div key={index}>
          <p>{desc}</p>
        </div>
      ))}
      <textarea
        value={newDescription}
        rows={10}
        cols={50}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={handleAddDescription}>Add Description</button>
      <br />
      <button onClick={handleCreateScene}>Create Scene</button>
    </div>
  );
};

export default CreateSceneForm;
