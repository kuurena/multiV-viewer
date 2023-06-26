import { useState } from "react";

function AnimeSearchButton() {
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
              console.log("clicked");
              hide();
            }}
            onTouchStart={() => {
              console.log("clicked");
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
