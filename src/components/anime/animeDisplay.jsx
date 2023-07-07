import axios from "axios";
import { useState, useEffect } from "react";
import "vidstack/styles/defaults.css";
import { MediaOutlet, MediaPlayer } from "@vidstack/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AnimeDisplay() {
  const [source, setSource] = useState("");
  const data = JSON.parse(localStorage.getItem("animeIDEP"));
  const animeID = data.state.animeID;

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/watch/${animeID}`;

  useEffect(() => {
    async function getData() {
      try {
        console.log("getting anime");
        const { data } = await axios.get(url);
        return setSource(data.sources[3].url);
      } catch (err) {
        toast.error("Couldn't find anime. Recheck name and ep.", {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        throw new Error(err.message);
      }
    }
    getData();
  }, []);

  return (
    <div className=" h-[90%] w-[90%]">
      <MediaPlayer title="Anime" src={source} controls>
        <MediaOutlet />
      </MediaPlayer>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default AnimeDisplay;
