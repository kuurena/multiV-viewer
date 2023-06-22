import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "vidstack/styles/defaults.css";
import { MediaOutlet, MediaPlayer } from "@vidstack/react";

function Test() {
  const [source, setSource] = useState("");
  const [showButton, setShowButton] = useState(true);

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/watch/${id}-episode-${ep}`;
  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setShowButton(!showButton);
      return setSource(data.sources[3].url);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="flex h-[90%] w-[90%] items-center justify-center">
      {showButton && (
        <button
          onClick={getData}
          onTouchStart={getData}
          className="bg h-10 w-20 bg-pink-300"
        >
          Play
        </button>
      )}
      <MediaPlayer title="Test" src={source} controls>
        <MediaOutlet />
      </MediaPlayer>
    </div>
  );
}

export default Test;
