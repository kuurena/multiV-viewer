import React, { useEffect, useState, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import _ from "lodash";

import AnimeSearchButton from "./components/anime/AnimeSearchButton";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || [];
const originalItems = getFromLS("items") || [];

const DashboardSystemWithHooks = (props) => {
  const saveId = JSON.parse(localStorage.getItem("anime_Id"));
  const saveEp = JSON.parse(localStorage.getItem("anime_Ep"));

  const [layouts, setLayouts] = useState(originalLayouts);
  const [id, setId] = useState(saveId);
  const [ep, setEp] = useState(saveEp);
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
    localStorage.setItem("anime_Id", JSON.stringify(id));
    localStorage.setItem("anime_Ep", JSON.stringify(ep));
  }, [id, ep]);

  useEffect(() => {
    console.log(`changed`);
    if (firstLoad.current) {
      console.log("hit");
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
        <AnimeSearchButton animeId={id} animeEp={ep} />

        <button
          className="absolute left-1 top-1 h-7 w-3 cursor-pointer rounded border-2 border-double border-red-400 hover:bg-red-400"
          onClick={() => onRemoveItem(i)}
          onTouchStart={() => onRemoveItem(i)}
        ></button>
      </div>
    );
  };

  const onLayoutChange = (_items) => {
    console.log(`layout changed`);
    console.log(items);
    saveToLS("layouts", layouts, "items", _items, "count", count);
  };

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    console.log(`breakpoint hit`);
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

  return (
    <div>
      <div className="flex h-[10vh] items-center justify-center drop-shadow-lg">
        <button
          onClick={onAddItem}
          className="h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500 drop-shadow-2xl
               hover:scale-110 hover:bg-fuchsia-500 hover:text-fuchsia-100"
        >
          +
        </button>
        <button
          className="h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500"
          onClick={() => {
            setId("spy-x-family");
            setEp("1");
          }}
        >
          ep1
        </button>
        <button
          className="h-10 w-32 border-spacing-2 rounded-lg border-2 border-double border-fuchsia-500 text-fuchsia-500"
          onClick={() => {
            setId("spy-x-family");
            setEp("2");
          }}
        >
          ep2
        </button>
      </div>
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={100}
        layouts={{ breakpoints }}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        onBreakpointChange={onBreakpointChange}
        {...props}
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

export default DashboardSystemWithHooks;
