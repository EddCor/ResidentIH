import { useEffect, useState } from "react";

const DeleteObject = () => {
  const [allObjects, setAllObjects] = useState([]);

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

    fetchObjects();
  }, []);

  const handleDeleteObject = async (objectId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this object? This can't be undone"
      )
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/objects/${objectId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Object deleted successfully!");
          setAllObjects(allObjects.filter((object) => object.id !== objectId));
        } else {
          console.error("Error deleting object.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div>
      <h2>Delete Objects</h2>
      <ul style={{ listStyleType: "none" }}>
        {allObjects.map((object) => (
          <li key={object.id}>
            {object.name}
            <button
              className="objectButton"
              onClick={() => handleDeleteObject(object.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteObject;
