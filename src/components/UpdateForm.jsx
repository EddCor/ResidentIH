import { useEffect, useState } from "react";

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
    const selectedId = parseInt(e.target.value);
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

    const linkedSceneIds = scenes
      .filter(
        (_, index) => document.getElementById(`linkedScene-${index}`).checked
      )
      .map((scene) => scene.id);

    const updatedData = {
      title: editedTitle,
      imgsrc: editedImageURL,
      description: editedDescription,
      linkedScenes: linkedSceneIds,
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
    setSelectScene(undefined);
  };

  const sendUpdatesToAPI = async (updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/scenes/${selectScene}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        fetchAllScenes();
      } else {
        console.error("Error updating data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchAllScenes();
  }, []);

  if (scenes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modifyComponent">
      {!isEditing && (
        <>
          <label htmlFor="scene-select">Choose a scene to edit:</label>
          <select
            name="selectScene"
            id="scene-select"
            onChange={handleSceneSelect}
          >
            {selectScene === undefined && (
              <option value="">-Please choose an option-</option>
            )}
            {scenes.map((scene, index) => (
              <option
                selected={scene.id === selectScene ? true : false}
                key={scene.id}
                value={index}
              >
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
              <div>
                <h3>linked scenes</h3>
                {scenes.map((scene, index) => (
                  <div key={scene.id}>
                    <input
                      type="checkbox"
                      id={`linkedScene-${index}`}
                      defaultChecked={scenes[
                        selectScene
                      ]?.linkedScenes?.includes(scene.id)}
                    />
                    <label htmlFor={`linkedScene-${index}`}>
                      {scene.title}
                    </label>
                  </div>
                ))}
              </div>
              <button className="objectButton" onClick={handleAddDescription}>
                Add Description
              </button>
              <button className="objectButton" onClick={handleSaveClick}>
                Save
              </button>
              <button className="objectButton" onClick={handleCancelClick}>
                Cancel
              </button>
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
              <button className="objectButton" onClick={handleEditClick}>
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateForm;
