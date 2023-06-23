import React from "react";
import AnimeCard from "./anime-card";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./loading";
import AnimeEp from "./anime-ep";

function AnimeSearchPage(props) {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animeName, setAnimeName] = useState("recent-episodes");

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/${animeName}`;

  const search = (e) => {
    setAnimeName(e.target.value);
  };

  const topAndRecent = (a) => {
    setAnimeName(a);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setAnimeData(data.results);
        console.log(animeData);
        setIsLoading(false);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getData();
  }, [url]);

  return (
    <>
      {props.id !== null && props.ep == null && <AnimeEp animeId={props.id} />}
      <div className="fixed z-10 flex h-screen w-screen items-center justify-center bg-purple-800">
        <div className="h-[80%] w-[80%] flex-col justify-center overflow-y-auto bg-purple-400 ">
          <form className="mb-2 flex justify-end pr-12 pt-5">
            <input
              type="text"
              onChange={search}
              placeholder="Search Anime"
              className="rounded-lg "
            />
            <button
              type="button"
              className="ml-2 rounded-lg bg-red-300"
              onClick={() => {
                topAndRecent("top-airing");
              }}
            >
              Top Airing
            </button>
            <button
              type="button"
              className="ml-2 rounded-lg bg-red-300"
              onClick={() => {
                topAndRecent("recent-episodes");
              }}
            >
              Recent
            </button>
          </form>
          <div className="relative flex h-fit w-full flex-wrap justify-center">
            {animeData && !isLoading ? (
              <AnimeCard animeData={animeData} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeSearchPage;

/*import React from "react";
import AnimeCard from "./anime-card";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./loading";

function AnimeSearchPage() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animeName, setAnimeName] = useState("recent-episodes");

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/${animeName}`;

  const search = (e) => {
    setAnimeName(e.target.value);
  };

  const topAndRecent = (a) => {
    setAnimeName(a);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setAnimeData(data.results);
        console.log(animeData);
        setIsLoading(false);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getData();
  }, [url]);

  return (
    <>
      <div className="fixed z-10 flex h-screen w-screen items-center justify-center bg-purple-800">
        <div className="h-[80%] w-[80%] flex-col justify-center overflow-y-auto bg-purple-400 ">
          <form className="mb-2 flex justify-end pr-12 pt-5">
            <input
              type="text"
              onChange={search}
              placeholder="Search Anime"
              className="rounded-lg "
            />
            <button
              type="button"
              className="ml-2 rounded-lg bg-red-300"
              onClick={() => {
                topAndRecent("top-airing");
              }}
            >
              Top Airing
            </button>
            <button
              type="button"
              className="ml-2 rounded-lg bg-red-300"
              onClick={() => {
                topAndRecent("recent-episodes");
              }}
            >
              Recent
            </button>
          </form>
          <div className="relative flex h-fit w-full flex-wrap justify-center">
            {animeData && !isLoading ? (
              <AnimeCard animeData={animeData} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeSearchPage;*/

/*function AnimeSearchPage({ closeModal }) {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animeName, setAnimeName] = useState("recent-episodes");

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/${animeName}`;
  

  const search = (e) => {
    setAnimeName(e.target.value);
  };

  const topAndRecent = (a) => {
    setAnimeName(a);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setAnimeData(data.results);
        console.log(animeData);
        setIsLoading(false);
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getData();
  }, [url]);

  return (
    <div
      ///onClick={closeModal}
      className="fixed z-10 flex h-screen w-screen items-center justify-center bg-purple-800"
    >
      <div className="h-[80%] w-[80%] flex-col justify-center overflow-y-auto bg-purple-400 ">
        <form className="mb-2 flex justify-end pr-12 pt-5">
          <input
            type="text"
            onChange={search}
            placeholder="Search Anime"
            className="rounded-lg "
          />
          <button
            type="button"
            className="ml-2 rounded-lg bg-red-300"
            onClick={() => {
              topAndRecent("top-airing");
            }}
          >
            Top Airing
          </button>
          <button
            type="button"
            className="ml-2 rounded-lg bg-red-300"
            onClick={() => {
              topAndRecent("recent-episodes");
            }}
          >
            Recent
          </button>
        </form>
        <div className="relative flex h-fit w-full flex-wrap justify-center">
          {animeData && !isLoading ? (
            <AnimeCard closeModal={closeModal} animeData={animeData} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeSearchPage;*/

/*<div>{animeData ? <AnimeCard animeData={animeData} /> : null}</div>
{animeData && !isLoading ? (
  <AnimeCard closeModal={closeModal} animeData={animeData} />
) : (
  <Loading />
)}*/

/*const getData = async () => {
    try {
      const { data } = await axios.get(url);
      //console.log(data);
      setAnimeData(data);
      return animeData;
    } catch (err) {
      throw new Error(err.message);
    }
  };*/
