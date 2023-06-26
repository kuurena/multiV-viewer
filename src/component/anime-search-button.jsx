import React from "react";
import { useState } from "react";

function AnimeSearchButton({ openAnimePage }) {
  const [showButton, setShowButton] = useState(true);
  const hide = () => {
    setShowButton(!showButton);
  };

  return (
    <>
      <div>
        {showButton && (
          <button
            onClick={() => {
              openAnimePage();
              hide();
            }}
            onTouchStart={() => {
              openAnimePage();
              hide();
            }}
            className="bg-fuchsia-300"
          >
            anime
          </button>
        )}
      </div>
    </>
  );
}

export default AnimeSearchButton;
