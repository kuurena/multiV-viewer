import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "vidstack/styles/defaults.css";
import { MediaOutlet, MediaPlayer } from "@vidstack/react";
import { ModalContext } from "../testApp";

function AnimeDisplay(props) {
  const [source, setSource] = useState("");
  const { clear } = useContext(ModalContext);

  const id = props.animeId;
  const ep = props.animeEp;

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/watch/${id}-episode-${ep}`;
  ///const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/watch/${id}-episode-1`;

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(url);
        return setSource(data.sources[3].url);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getData();
    clear();
  }, []);

  return (
    <div className="flex h-[90%] w-[90%] items-center justify-center">
      <MediaPlayer title="Anime" src={source} controls>
        <MediaOutlet />
      </MediaPlayer>
    </div>
  );
}

export default AnimeDisplay;
