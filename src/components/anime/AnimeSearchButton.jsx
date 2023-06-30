import { useState, useEffect } from "react";
import AnimeDisplay from "../../component/anime-display";

function AnimeSearchButton({ animeEp, animeId }) {
  //const saveId = JSON.parse(localStorage.getItem("anime_Id"));
  //const saveEp = JSON.parse(localStorage.getItem("anime_Ep"));

  const [showButton, setShowButton] = useState(true);
  //const [Id, setId] = useState(saveId);
  //const [Ep, setEp] = useState(saveEp);
  const hide = () => {
    if (animeEp && animeId != null) {
      setShowButton(false);
      console.log(animeId, animeEp, showButton);
    } else {
      null;
    }
  };

  /*useEffect(() => {
    setId(animeId);
    setEp(animeEp);
    localStorage.setItem("anime_Id", JSON.stringify(Id));
    localStorage.setItem("anime_Ep", JSON.stringify(Ep));
  }, [Id, Ep]);*/

  return (
    <>
      <div>
        {showButton && (
          <button
            onClick={() => {
              console.log("clicked");
              hide();
            }}
            className="bg-fuchsia-300"
          >
            play
          </button>
        )}
      </div>
      {showButton == false && animeEp != null ? (
        <AnimeDisplay id={animeId} ep={animeEp} />
      ) : null}
    </>
  );
}

export default AnimeSearchButton;
