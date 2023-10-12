import React, { useEffect, useState } from "react";
import Scenes from "../components/Scenes";

const HomePage = () => {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById("mainVideo");

    const handleVideoEnd = () => {
      setShowVideo(false);
    };

    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);

  const closeVideo = () => {
    setShowVideo(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Scenes />

      {showVideo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: "black",
          }}
        >
          <video
            controls
            id="mainVideo"
            style={{ width: "100%", height: "100%" }}
          >
            <source src="https://i.imgur.com/497VHWL.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="objectButton"
            onClick={closeVideo}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Close Video
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
