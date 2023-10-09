import CreateSceneForm from "../components/CreateSceneForm";
import UpdateForm from "../components/UpdateForm";

const CreateNewStory = () => {
  return (
    <>
      <h1> Create or update new story</h1>
      <CreateSceneForm />
      <h2> choose story to edit</h2>
      <UpdateForm />
    </>
  );
};

export default CreateNewStory;
