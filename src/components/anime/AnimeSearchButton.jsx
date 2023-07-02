import { useState, useEffect } from "react";
import AnimeDisplay from "./animeDisplay";

function AnimeSearchButton({ animeEp, animeId }) {
  const [showButton, setShowButton] = useState(true);

  const hide = () => {
    if (animeEp && animeId != null) {
      setShowButton(false);
    } else {
      return (
        <div className="z-30 w-full text-slate-100">
          <h2>Please select anime</h2>
        </div>
      );
    }
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
            className="rounded-lg border-2 border-fuchsia-500 pb-3 pl-5 pr-5 pt-3 text-center
            text-fuchsia-500 hover:bg-fuchsia-500 hover:text-slate-100"
          >
            play
          </button>
        )}
      </div>
      {showButton == false && animeEp != null ? <AnimeDisplay /> : null}
    </>
  );
}

export default AnimeSearchButton;
