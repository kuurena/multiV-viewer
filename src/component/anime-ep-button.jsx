import React from "react";
import { useContext } from "react";
import { ModalContext } from "../testApp";

function AnimeEpButton(props) {
  const { close, animeEp } = useContext(ModalContext);

  const selectAnimeEp = (number) => {
    console.log(number);
    return number;
  };
  return (
    <>
      {props.animeEp.map(({ id, number }) => {
        return (
          <button
            key={id}
            onClick={() => {
              selectAnimeEp(number);
              animeEp(number);
              close();
            }}
            onTouchStart={() => {
              selectAnimeEp(number);
              animeEp(number);
              close();
            }}
            className=" m-4 flex h-10 w-10 items-center justify-center  rounded-lg bg-slate-500 text-center"
          >
            <p>{number}</p>
          </button>
        );
      })}
    </>
  );
}

export default AnimeEpButton;
