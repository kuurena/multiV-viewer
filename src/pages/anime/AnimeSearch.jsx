import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import AnimeCard from "../../components/anime/AnimeCard.jsx";
import Loading from "../../components/anime/loading";

// loader function

export const animeSearchLoader = async () => {
  try {
    const { data } = await axios.get(
      "https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/recent-episodes"
    );
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

function AnimeSearch() {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animeName, setAnimeName] = useState("recent-episodes");

  const url = `https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/${animeName}`;
  const data = useLoaderData();

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
      <div className="flex flex-col">
        <div className="mb-12 mr-[10%] mt-12 flex h-[5%] justify-end">
          <input
            type="text"
            onChange={search}
            placeholder="Search Anime"
            className="w-[20%] rounded-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/20 pl-4 text-fuchsia-500 placeholder-fuchsia-400 placeholder-opacity-50"
          />
          <button
            type="button"
            className="ml-4 h-8 w-28 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 drop-shadow-2xl
             hover:bg-fuchsia-500 hover:text-fuchsia-100"
            onClick={() => {
              topAndRecent("top-airing");
            }}
          >
            Top Airing
          </button>
          <button
            type="button"
            className="ml-4 h-8 w-28 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 drop-shadow-2xl
             hover:bg-fuchsia-500 hover:text-fuchsia-100"
            onClick={() => {
              topAndRecent("recent-episodes");
            }}
          >
            Recent
          </button>
        </div>
        <div
          className="  flex h-full w-[80%] flex-wrap justify-center self-center rounded-3xl bg-fuchsia-500/10 pt-10
        text-fuchsia-500 shadow-2xl shadow-fuchsia-500 drop-shadow-2xl"
        >
          {animeData && !isLoading ? (
            <AnimeCard updatedData={animeData} data={data} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}

export default AnimeSearch;

//   relative ml-[5%] mr-[5%] h-full w-full
