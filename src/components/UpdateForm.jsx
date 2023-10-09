import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const [scenes, setScenes] = useState([]);

  const fetchAllScenes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
    if (response.ok) {
      const allScenes = await response.json();
      setScenes(allScenes);
      console.log(allScenes);
    }
  };
  /* if (scenes.length === 0) {
    return <div>Loading...</div>;
  }
*/

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
  /*
    useEffect(() => {
    if (isUpdate && project) {
      setTitle(project.title)
      setDescription(project.description)
    }
  }, [project]) */

  return (
    <form
      style={{ display: "grid", gridTemplate: "auto / 1fr" }}
      onSubmit={onSubmit}
    >
      <label>
        Title
        <input
          value={""}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          value={""}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </label>
      <label>
        Image url
        <input
          value={""}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </label>
      <label>
        Scene description
        <input
          value={""}
          onChange={(event) => setDescription(event.target.value)}
          required
          maxLength="10"
        />
      </label>
      <button type="submit">Whatever var to display later {}</button>
    </form>
  );
};

export default UpdateForm;
