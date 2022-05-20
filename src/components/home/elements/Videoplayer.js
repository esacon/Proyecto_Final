import React, { useEffect } from "react";
import "../../styles/Videoplayer.css";
import ReactPlayer from "react-player/youtube";

function Videoplayer() {
  useEffect(() => {
    window.addEventListener("scroll", reveal);
    function reveal() {
      var reveals = document.querySelectorAll(".reveal");
      for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;
        if (revealtop < windowheight - revealpoint) {
          reveals[i].classList.add("itemactive");
        } else {
          reveals[i].classList.remove("itemactive");
        }
      }
    }
  });

  return (
    <>
      <div className="video-section">
        <div className="topic reveal">
          <h1>¿QUÉ ES LUNGHEALTH?</h1>
        </div>

        <div className="video-container reveal">
          <div className="video-item">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=27vLW00rPsk"
              width="70vw"
              height="calc(70vw / 1.77778)"
              controls={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Videoplayer;
