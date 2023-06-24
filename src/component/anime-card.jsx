import React from "react";
import { useContext } from "react";
import { ModalContext } from "../testApp";

function AnimeCard(props) {
  const { animeId } = useContext(ModalContext);

  const selectAnimeId = (id) => {
    console.log(id);
    return id;
  };
  return (
    <>
      {props.animeData.map(({ id, title, image }) => {
        return (
          <div
            key={id}
            onClick={() => {
              selectAnimeId(id);
              animeId(id);
            }}
            onTouchStart={() => {
              selectAnimeId(id);
              animeId(id);
            }}
            className="group m-4 flex h-56 w-40 items-center justify-center overflow-hidden rounded-lg bg-slate-500 text-center"
          >
            <img
              src={image}
              alt="image"
              className="relative h-full w-full object-cover transition ease-in-out group-hover:scale-110"
            />
            <div className="absolute h-56 w-40 bg-slate-900 bg-opacity-60 object-contain opacity-0 group-hover:rounded-lg group-hover:opacity-100">
              <p className="text-slate-100">{title}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AnimeCard;

/*function AnimeCard(props) {
  const getAnimeId = (id) => {
    console.log(id);
    return id;
  };
  return (
    <>
      {props.animeData.map(({ id, title, image }) => {
        return (
          <div
            key={id}
            onClick={() => {
              getAnimeId(id);
              props.closeModal();
            }}
            className="group m-4 flex h-56 w-40 items-center justify-center overflow-hidden rounded-lg bg-slate-500 text-center"
          >
            <img
              src={image}
              alt="image"
              className="relative h-full w-full object-cover transition ease-in-out group-hover:scale-110"
            />
            <div className="absolute h-56 w-40 bg-slate-900 bg-opacity-60 object-contain opacity-0 group-hover:rounded-lg group-hover:opacity-100">
              <p className="text-slate-100">{title}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AnimeCard;
*/
