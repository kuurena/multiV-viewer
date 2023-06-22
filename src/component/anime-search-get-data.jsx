import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "vidstack/styles/defaults.css";

function Test() {
  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/${
    search - input
  }`;
  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="flex h-[90%] w-[90%] items-center justify-center">
      <button
        onClick={getData}
        onTouchStart={getData}
        className="bg h-10 w-20 bg-pink-300"
      >
        search
      </button>
    </div>
  );
}

export default Test;
