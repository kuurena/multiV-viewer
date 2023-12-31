import React, { useEffect, useState, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useAnimeStore } from "../store/animeStore";
import { useYoutubeStore } from "../store/youtubeStore";

import AnimePlayButton from "../components/anime/AnimePlayButton";
import VideoSelect from "../components/VideoSelect";
import Tooltip from "../components/Tooltip";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || [];

const Home = (props) => {
  const [animeID, changeAnimeID] = useAnimeStore((state) => [
    state.animeID,
    state.changeAnimeID,
  ]);

  const [title, videoID] = useYoutubeStore((state) => [
    state.title,
    state.videoID,
  ]);

  const [layouts, setLayouts] = useState(originalLayouts);
  const [items, setItems] = useState(
    [].map(function (i, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 5,
        h: 3,

        add: i === list.length - 1,
      };
    })
  );
  const [breakpoints, setBreakpoints] = useState({
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
  });
  const [cols, setCols] = useState({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 });
  const [count, setCount] = useState(getFromLS("count") || 0);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      setLayouts(getFromLS("layouts") || []);
      setItems(getFromLS("items") || []);
    }
  }, []);

  const createElement = (el) => {
    const i = el.i;

    return (
      <div
        key={i}
        data-grid={el}
        className="flex items-center justify-center rounded-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-500
        drop-shadow-2xl"
      >
        <AnimePlayButton animeId={animeID} videoId={videoID} />

        <button
          className="absolute left-1 top-1 h-7 w-3 cursor-pointer rounded border-2 border-double border-red-400 hover:bg-red-400"
          onClick={() => onRemoveItem(i)}
          onTouchStart={() => onRemoveItem(i)}
        ></button>
      </div>
    );
  };

  const onLayoutChange = (_items) => {
    saveToLS("layouts", layouts, "items", _items, "count", count);
  };

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoints(breakpoints);
    setCols(cols);
  };

  const onAddItem = () => {
    console.log("adding", "n" + items.length + 1);
    const addToCount = count + 1;
    setCount(addToCount);
    setItems((previous) => [
      ...previous,
      {
        i: `n${addToCount}`,
        x: (items.length * 2) % (cols || 12),
        y: -1,
        w: 5,
        h: 3,
      },
    ]);
  };

  const onRemoveItem = (i) => {
    console.log("removing", i);
    const removeCount = count - 1;
    setCount(removeCount);
    setItems((items) => _.reject(items, { i: i }));
  };

  const nextEP = () => {
    const newID = animeID.slice(0, -1) + `${Number(animeID.slice(-1)) + 1}`;
    changeAnimeID(newID);
    location.reload();
  };

  return (
    <>
      <div className=" flex flex-wrap items-center justify-start gap-y-2 p-5 sm:justify-center lg:justify-start">
        <div className=" mr-10 w-[90%] text-fuchsia-500 lg:w-[40%]">
          <div className="flex">
            <div className="mr-2">Anime: </div>
            <div className="overflow-hidden whitespace-nowrap rounded-lg">
              <div className="animate-slide">{animeID.replace(/-/g, " ")}</div>
            </div>
          </div>
          <div className="flex">
            <div className="mr-2">YT: </div>
            <div className="overflow-hidden whitespace-nowrap rounded-lg ">
              <div className="animate-slide">
                {title == "" ? videoID : title}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onAddItem}
          className=" mr-5 h-10 w-32 border-spacing-2 animate-pulse rounded-lg border-2 border-double border-fuchsia-500
               text-fuchsia-500 drop-shadow-2xl hover:scale-110 hover:bg-fuchsia-500 hover:text-fuchsia-100"
        >
          +
        </button>

        <Link to="/anime">
          <button className="mr-1 h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-fuchsia-100">
            Anime
          </button>
        </Link>
        <Link to="/youtube">
          <button className="mr-1 h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-fuchsia-100">
            Youtube
          </button>
        </Link>
        <button
          onClick={nextEP}
          onTouchStart={nextEP}
          className="h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-fuchsia-100"
        >
          NextEp{" "}
        </button>
      </div>
      <VideoSelect />
      <ResponsiveReactGridLayout
        {...props}
        className="layout"
        rowHeight={100}
        layouts={{ breakpoints }}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        onBreakpointChange={onBreakpointChange}
      >
        {_.map(items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
      <Tooltip count={count} />
    </>
  );
};

function getFromLS(key) {
  let ls = {};
  if (localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem("grid-layout")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(Lkey, Lvalue, Ikey, Ivalue, Xkey, Xvalue) {
  if (localStorage) {
    localStorage.setItem(
      "grid-layout",
      JSON.stringify({
        [Lkey]: Lvalue,
        [Ikey]: Ivalue,
        [Xkey]: Xvalue,
      })
    );
  }
}

export default Home;
