import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "vidstack/styles/defaults.css";
import { MediaOutlet, MediaPlayer } from "@vidstack/react";
import { useAnimeStore } from "../../store/animeStore";

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
        throw new Error(err.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="flex h-[90%] w-[90%] items-start justify-center">
      <MediaPlayer title="Anime" src={source} controls>
        <MediaOutlet />
      </MediaPlayer>
    </div>
  );
}

export default AnimeDisplay;
