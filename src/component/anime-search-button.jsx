import React from "react";
import { useState } from "react";
import AnimeSearchPage from "./anime-search-page";

function AnimeSearchButton({ openAnimePage }) {
  return (
    <>
      <div>
        <button onClick={openAnimePage} className="bg-fuchsia-300">
          anime
        </button>
      </div>
    </>
  );
}

export default AnimeSearchButton;
