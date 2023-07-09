import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AnimeEpButton from "../../components/anime/AnimeEpButton";
import { useLoaderData, useParams } from "react-router";

function AnimeEpSelect() {
  const animeEpData = useLoaderData();
  console.log(animeEpData);

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-12 mt-12 flex h-[5%] justify-center pl-4 pr-4 text-center text-fuchsia-500">
          <p className="text-xl md:text-3xl">{animeEpData.title}</p>
        </div>
        <div
          className="  flex h-full w-[80%] flex-wrap items-center justify-center self-center rounded-3xl bg-fuchsia-500/10 pb-10 pt-10
        text-fuchsia-500 shadow-2xl shadow-fuchsia-500 drop-shadow-2xl"
        >
          <div className="flex justify-center ">
            <div className=" mb-10 w-[75%] rounded-2xl ">
              <img
                src={animeEpData.image}
                alt="image"
                className=" rounded-2xl object-cover"
              />
            </div>
          </div>
          <div className="flex h-80 w-[65%] flex-col flex-wrap justify-start overflow-auto">
            <h1 className="mb-10 text-xl md:text-3xl">Episodes</h1>
            <div className="flex flex-wrap justify-center">
              <AnimeEpButton animeEp={animeEpData.episodes} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeEpSelect;

//loader function
export const getEPLoader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await axios.get(
      "https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/info/" + id
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
