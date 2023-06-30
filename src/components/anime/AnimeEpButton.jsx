import React from "react";
import { Link } from "react-router-dom";

function AnimeEpButton(props) {
  const selectAnimeEp = (number) => {
    console.log(number);
    return number;
  };
  return (
    <>
      {props.animeEp.map(({ id, number }) => {
        return (
          <Link to="/">
            <button
              key={id}
              onClick={() => {
                selectAnimeEp(number);
              }}
              onTouchStart={() => {
                selectAnimeEp(number);
              }}
              className=" m-3 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-fuchsia-500 text-center hover:bg-fuchsia-500 hover:text-slate-100"
            >
              <p>{number}</p>
            </button>
          </Link>
        );
      })}
    </>
  );
}

export default AnimeEpButton;
