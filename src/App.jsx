import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Scene from "./pages/Scene";
import CreateNewStory from "./pages/CreateNewStory";
import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scene/:sceneId" element={<Scene />} />
        <Route path="/createnewstory" element={<CreateNewStory />} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
