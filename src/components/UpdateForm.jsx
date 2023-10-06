import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchAllScenes();
  }, []);

  return <></>;
};

export default UpdateForm;
