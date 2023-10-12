import { useEffect, useState } from "react";

const DeleteScene = () => {
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

  const handleDeleteScene = async (sceneId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this scene? This can't be undone"
      )
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/scenes/${sceneId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setAllScenes(allScenes.filter((scene) => scene.id !== sceneId));
        } else {
          console.error("Error deleting scene.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div className="modifyComponent">
      <h2>Delete Scenes</h2>
      <ul style={{ listStyleType: "none" }}>
        {allScenes.map((scene) => (
          <li key={scene.id}>
            {scene.title}
            <button
              className="objectButton"
              onClick={() => handleDeleteScene(scene.id)}
              style={{ marginLeft: "1vw" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteScene;
