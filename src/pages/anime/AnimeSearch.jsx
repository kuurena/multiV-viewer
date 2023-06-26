import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import AnimeCard from "../../components/anime/AnimeCard";
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
              <AnimeCard updatedData={animeData} data={data} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeSearch;
