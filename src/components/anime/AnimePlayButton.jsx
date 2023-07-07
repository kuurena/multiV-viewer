import { useState } from "react";
import AnimeDisplay from "./animeDisplay";
import YoutubeDisplay from "../youtube/YoutubeDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AnimePlayButton({ videoId, animeId }) {
  const [showButton, setShowButton] = useState(true);
  const [animeClick, setAnimeClick] = useState(false);
  const [ytClick, setYtClick] = useState(false);

  const hideAnime = () => {
    if (animeId != "") {
      setShowButton(false);
      setAnimeClick(true);
    } else {
      toast.error("Please select anime", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const hideYt = () => {
    if (videoId != "") {
      setShowButton(false);
      setYtClick(true);
    } else {
      toast.error("Please select youtube video", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div>
        {showButton && (
          <div className="flex ">
            <button
              onClick={() => {
                hideAnime();
              }}
              onTouchStart={() => {
                hideAnime();
              }}
              className="mr-2 rounded-lg border-2 border-fuchsia-500 pb-3 pl-5 pr-5 pt-3
            text-center text-fuchsia-500 hover:bg-fuchsia-500 hover:text-slate-100"
            >
              play anime
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <button
              onClick={() => {
                hideYt();
              }}
              onTouchStart={() => {
                hideYt();
              }}
              className="rounded-lg border-2 border-fuchsia-500 pb-3 pl-5 pr-5 pt-3 text-center
            text-fuchsia-500 hover:bg-fuchsia-500 hover:text-slate-100"
            >
              play YT
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        )}
      </div>
      {showButton == false && animeClick == true ? <AnimeDisplay /> : null}
      {showButton == false && ytClick == true ? <YoutubeDisplay /> : null}
    </>
  );
}

export default AnimePlayButton;
