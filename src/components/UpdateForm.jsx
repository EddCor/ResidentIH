import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const [scenes, setScenes] = useState([]);
  const [selectScene, setSelectScene] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedImageURL, setEditedImageURL] = useState("");
  const [editedDescription, setEditedDescription] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  const fetchAllScenes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
    if (response.ok) {
      const allScenes = await response.json();
      setScenes(allScenes);
    }
  };

  const handleSceneSelect = (e) => {
    const selectedId = e.target.value - 1;
    setSelectScene(selectedId);
    setIsEditing(false);
    setEditedTitle("");
    setEditedImageURL("");
    setEditedDescription(scenes[selectedId].description || []);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(scenes[selectScene].title);
    setEditedImageURL(scenes[selectScene].imgsrc);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const updatedData = {
      title: editedTitle,
      imgsrc: editedImageURL,
      description: editedDescription,
    };
    sendUpdatesToAPI(updatedData);
  };

  const handleAddDescription = () => {
    setEditedDescription([...editedDescription, newDescription]);
    setNewDescription("");
  };

  const handleDeleteDescription = (indexToDelete) => {
    const updatedDescription = editedDescription.filter(
      (_, index) => index !== indexToDelete
    );
    setEditedDescription(updatedDescription);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle("");
    setEditedImageURL("");
    setEditedDescription(scenes[selectScene].description || []);
  };

  const sendUpdatesToAPI = async (updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/scenes/${selectScene + 1}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Data updated successfully!");
        fetchAllScenes();
      } else {
        console.error("Error updating data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = { title, description };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects${
          isUpdate ? `/${project.id}` : ""
        }`,
        {
          method: isUpdate ? "PUT" : "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const currentProject = await response.json();
        console.log(currentProject);
        navigate(`/projects/${currentProject.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllScenes();
  }, []);

  if (scenes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isEditing && (
        <>
          <label htmlFor="scene-select">Choose a scene to edit:</label>
          <select name="scene" id="scene-select" onChange={handleSceneSelect}>
            {selectScene === undefined && (
              <option value="">-Please choose an option-</option>
            )}
            {scenes.map((scene, index) => (
              <option key={scene.id} value={index + 1}>
                {scene.title}
              </option>
            ))}
          </select>
        </>
      )}
      {selectScene !== undefined && (
        <>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <input
                type="text"
                value={editedImageURL}
                onChange={(e) => setEditedImageURL(e.target.value)}
              />
              <h3>Description:</h3>
              {editedDescription.map((desc, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <textarea
                    value={desc}
                    onChange={(e) => {
                      const updatedDescription = [...editedDescription];
                      updatedDescription[index] = e.target.value;
                      setEditedDescription(updatedDescription);
                    }}
                    rows={10}
                    cols={50}
                    style={{ paddingRight: "30px" }}
                  />
                  <button
                    onClick={() => handleDeleteDescription(index)}
                    style={{
                      marginLeft: "10px",
                      padding: "2px 5px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}

              <button onClick={handleAddDescription}>Add Description</button>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{scenes[selectScene].title}</h2>
              <img
                src={scenes[selectScene].imgsrc}
                style={{ maxWidth: "60vw" }}
                alt={scenes[selectScene].title}
              />
              <h3>Description:</h3>
              <ul style={{ listStyle: "none" }}>
                {scenes[selectScene].description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <button onClick={handleEditClick}>Edit</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UpdateForm;
