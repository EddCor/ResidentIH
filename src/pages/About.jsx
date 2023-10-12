import React, { useState } from "react";

const About = () => {
  const [showVideo, setShowVideo] = useState(null);

  const easterEgg = (clicked) => {
    if (showVideo === clicked) {
      setShowVideo(null);
    } else {
      setShowVideo(clicked);
    }
  };

  return (
    <>
      <h1>
        4<span onClick={() => easterEgg(1)}>0</span>4
      </h1>
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
            <source src="https://i.imgur.com/zmXINiy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="objectButton"
            onClick={() => setShowVideo(null)}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Close Video
          </button>
        </div>
      )}
    </>
  );
};

export default About;
