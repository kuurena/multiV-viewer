import { useState } from "react";
import { useYoutubeStore } from "../store/youtubeStore";
import { useAnimeStore } from "../store/animeStore";

export default function VideoSelect() {
  const [changeVideoID] = useYoutubeStore((state) => [state.changeVideoID]);
  const [changeAnimeID] = useAnimeStore((state) => [state.changeAnimeID]);
  const [youtubeID, setYoutubeID] = useState("");
  const [animeName, setAnimeName] = useState("");
  const [ep, setEp] = useState("");

  const youtubeIDChange = (e) => {
    e.target.value != "" ? setYoutubeID(e.target.value) : setYoutubeID("");
  };

  const animeChange = (e) => {
    setAnimeName(e.target.value);
  };

  const epChange = (e) => {
    setEp(e.target.value);
  };

  const buttonClick = (e) => {
    e.preventDefault();
    changeVideoID(youtubeID);
    animeName && ep != ""
      ? changeAnimeID(
          `${animeName
            .trim()
            .replace(/\s+/g, " ")
            .replace(/ /g, "-")}-episode-${ep.trim().replace(/\D/g, "")}`
        )
      : null;
  };

  return (
    <div>
      <form
        className="mb-5 flex flex-wrap gap-y-2 pl-4 sm:justify-center lg:justify-start"
        onSubmit={buttonClick}
      >
        <input
          type="text"
          placeholder="Youtube ID"
          className="mr-2 rounded-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/20 pl-4
         text-fuchsia-500 placeholder-fuchsia-400 placeholder-opacity-50"
          onChange={youtubeIDChange}
        />
        <div className="mr-3">
          <input
            type="text"
            placeholder="Anime name"
            className="rounded-l-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/20 pl-4 text-fuchsia-500
         placeholder-fuchsia-400 placeholder-opacity-50"
            onChange={animeChange}
          />
          <input
            type="text"
            placeholder="EP"
            className="w-10 rounded-r-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/20 pl-2 text-fuchsia-500
         placeholder-fuchsia-400 placeholder-opacity-50"
            onChange={epChange}
          />
        </div>

        <button
          className="flex w-7 items-center justify-center rounded-[50%] border-2
       border-double border-fuchsia-500 bg-fuchsia-500/20 hover:bg-fuchsia-500/40"
          type="submit"
        >
          <svg
            id="search-icon"
            className="h-[80%] w-[80%] fill-fuchsia-500"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </form>
    </div>
  );
}
