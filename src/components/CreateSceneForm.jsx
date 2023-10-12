import { useEffect, useState } from "react";

const CreateSceneForm = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [allScenes, setAllScenes] = useState([]);
  const [linkedScenes, setLinkedScenes] = useState([]);

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

  const handleAddDescription = () => {
    if (newDescription.trim() !== "") {
      setDescription([...description, newDescription]);
      setNewDescription("");
    }
  };

  const handleCreateScene = async () => {
    if (title.trim() === "" || imageURL.trim() === "") {
      alert("Title and Image URL are required fields.");
      return;
    }

    const sceneData = {
      title: title,
      imgsrc: imageURL,
      description: description,
      linkedScenes: linkedScenes.map((scene) => scene.id),
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
        setLinkedScenes([]);
      } else {
        console.error("Error creating scene.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="modifyComponent">
      <h2>Create a New Scene</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="imageURL">Image URL:</label>
      <input
        type="text"
        id="imageURL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <h3>Description:</h3>
      {description.map((desc, index) => (
        <div key={index}>
          <textarea
            value={desc}
            rows={5}
            cols={50}
            onChange={(e) => {
              const updatedDescription = [...description];
              updatedDescription[index] = e.target.value;
              setDescription(updatedDescription);
            }}
          />
        </div>
      ))}
      <textarea
        value={newDescription}
        rows={5}
        cols={50}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button className="objectButton" onClick={handleAddDescription}>
        Add Description
      </button>

      <h3>Linked Scenes:</h3>
      {allScenes.map((scene) => (
        <div key={scene.id}>
          <input
            type="checkbox"
            id={`linkedScene-${scene.id}`}
            checked={linkedScenes.includes(scene)}
            onChange={() => {
              if (linkedScenes.includes(scene)) {
                setLinkedScenes((prevScenes) =>
                  prevScenes.filter((s) => s.id !== scene.id)
                );
              } else {
                setLinkedScenes((prevScenes) => [...prevScenes, scene]);
              }
            }}
          />
          <label htmlFor={`linkedScene-${scene.id}`}>{scene.title}</label>
        </div>
      ))}

      <button className="objectButton" onClick={handleCreateScene}>
        Create Scene
      </button>
    </div>
  );
};

export default CreateSceneForm;
