import React, { useState } from "react";
import CreateSceneForm from "../components/CreateSceneForm";
import DeleteScene from "../components/DeleteScene";
import UpdateForm from "../components/UpdateForm";
import CreateObject from "../components/CreateObject";
import UpdateObject from "../components/UpdateObject";
import DeleteObject from "../components/DeleteObject";

const CreateNewStory = () => {
  const [selectedOperation, setSelectedOperation] = useState(); // Initial state is an empty string

  return (
    <>
      <p>I want to:</p>

      <select
        value={selectedOperation}
        onChange={(e) => setSelectedOperation(e.target.value)}
      >
        {selectedOperation === undefined && (
          <option value="">-Please choose an option-</option>
        )}
        <option value="sceneCreate">Create a scene</option>
        <option value="sceneUpdate">Edit a scene</option>
        <option value="sceneDelete">Delete a scene</option>
        <option value="objCreate">Create an object</option>
        <option value="objUpdate">Edit an object</option>
        <option value="objDelete">Delete an object</option>
      </select>
      {selectedOperation === "sceneCreate" && <CreateSceneForm />}
      {selectedOperation === "sceneDelete" && <DeleteScene />}
      {selectedOperation === "sceneUpdate" && <UpdateForm />}
      {selectedOperation === "objCreate" && <CreateObject />}
      {selectedOperation === "objUpdate" && <UpdateObject />}
      {selectedOperation === "objDelete" && <DeleteObject />}
    </>
  );
};

export default CreateNewStory;
