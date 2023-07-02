import React, { useEffect, useState, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useAnimeStore } from "../store/animeStore";

import AnimeSearchButton from "../components/anime/AnimeSearchButton";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || [];

const Home = (props) => {
  const [animeID, animeEP] = useAnimeStore((state) => [
    state.animeID,
    state.animeEP,
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
        <AnimeSearchButton animeId={animeID} animeEp={animeEP} />

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
    /*eslint no-console: 0*/
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
    setItems((items) => _.reject(items, { i: i }));
  };

  const data = JSON.parse(localStorage.getItem("animeIDEP"));
  function showAnime(data) {
    if (data != null) {
      const playingAnime = data.state.animeID;
      return playingAnime;
    } else {
      const playingAnime = null;
      return playingAnime;
    }
  }

  return (
    <div>
      <div className="flex h-[10vh] items-center justify-start p-5 drop-shadow-lg">
        <div className=" mr-10 w-[40%] text-fuchsia-500">
          <h1 className="text-xl">Playing: {showAnime(data)}</h1>
        </div>
        <button
          onClick={onAddItem}
          className="mr-5 h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500
               drop-shadow-2xl hover:scale-110 hover:bg-fuchsia-500 hover:text-fuchsia-100"
        >
          +
        </button>

        <Link to="/anime">
          <button className="h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-fuchsia-100">
            Anime
          </button>
        </Link>
      </div>
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
    </div>
  );
};

function getFromLS(key) {
  let ls = {};
  if (localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(Lkey, Lvalue, Ikey, Ivalue, Xkey, Xvalue) {
  if (localStorage) {
    localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [Lkey]: Lvalue,
        [Ikey]: Ivalue,
        [Xkey]: Xvalue,
      })
    );
  }
}

export default Home;

/*import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import AnimeSearchButton from "../components/anime/AnimeSearchButton";
import AnimeDisplay from "../component/anime-display";
import { useState } from "react";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Home() {
  const [cols, setCols] = useState({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 });

  const [newCounter, setNewCounter] = useState(0);
  const [id, setId] = useState(null);
  const [ep, setEp] = useState(null);
  const [item, setItem] = useState(
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

  const createElement = (el) => {
    const i = el.i;

    return (
      <div
        key={i}
        data-grid={el}
        className="flex items-center justify-center rounded-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-500
        drop-shadow-2xl"
      >
        <AnimeSearchButton />
        {ep != null ? <AnimeDisplay animeId={id} animeEp={ep} /> : null}
        <button
          className="absolute left-1 top-1 h-7 w-3 cursor-pointer rounded border-2 border-double border-red-400 hover:bg-red-400"
          onClick={() => onRemoveItem(i)}
          onTouchStart={() => onRemoveItem(i)}
        ></button>
      </div>
    );
  };

  const onAddItem = () => {
    console.log("adding", "n" + newCounter);

    setItem((item) => [
      ...item,
      {
        i: "n" + newCounter,
        x: (item.length * 2) % 1,
        y: Infinity,
        w: 5,
        h: 3,
      },
    ]);
    setNewCounter((newCounter) => newCounter + 1);
  };

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    setCols(cols);
  };

  const onRemoveItem = (i) => {
    console.log("removing", i);
    setItem((item) => _.reject(item, { i: i }));
  };

  {
    return (
      <>
        <div>
          <div className="flex h-[10vh] items-center justify-center drop-shadow-lg">
            <button
              onClick={onAddItem}
              className="h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 drop-shadow-2xl
               hover:scale-110 hover:bg-fuchsia-500 hover:text-fuchsia-100"
            >
              +
            </button>
          </div>
          <ResponsiveReactGridLayout
            className="layout"
            rowHeight={100}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            onBreakpointChange={onBreakpointChange}
          >
            {_.map(item, (el) => createElement(el))}
          </ResponsiveReactGridLayout>
        </div>
      </>
    );
  }
}
*/
