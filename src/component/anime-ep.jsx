import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AnimeEpButton from "./anime-ep-button";

function AnimeEp(props) {
  const [animeEp, setAnimeEp] = useState([]);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const animeId = props.animeId;

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/info/${animeId}`;
  useEffect(() => {
    async function getEp() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setAnimeEp(data.episodes);
        console.log(animeEp);
        setImage(data.image);
        setTitle(data.title);
        setIsLoading(false);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getEp();
  }, [url]);

  return (
    <div className="fixed z-40 flex h-screen w-screen items-center justify-center bg-purple-800">
      <div className="flex h-[80%] w-[80%] flex-row justify-end overflow-y-auto bg-purple-400 ">
        {animeEp && !isLoading ? (
          <>
            <div>
              <div className="w-[75%] bg-slate-200">
                <img
                  src={image}
                  alt="image"
                  className="h-full w-full object-contain"
                />
              </div>
              <p>{title}</p>
            </div>
            <div className="flex w-[60%] flex-row flex-wrap justify-center">
              <AnimeEpButton animeEp={animeEp} />
            </div>
          </>
        ) : (
          <div>
            <p className="text-xl">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimeEp;
