import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import Test from "./component/test";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const TestAppF = () => {
  const className = "layout";
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  const rowHeight = 100;

  const [items, setItems] = useState(
    [].map(function (i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
        minH: 50,
        add: i === list.length - 1,
      };
    })
  );
  const [newCounter, setNewCounter] = useState(0);

  const onAddItem = () => {
    console.log("adding", "n" + newCounter);
    setItems((prevItems) => [
      ...prevItems,
      {
        i: "n" + newCounter,
        x: (prevItems.length * 2) % (cols || 12),
        y: Infinity,
        w: 2,
        h: 2,
      },
    ]);
    setNewCounter((prevCounter) => prevCounter + 1);
  };

  /*const onBreakpointChange = (breakpoint, cols) => {
    // We're using the cols coming back from this to calculate where to add new items.
    setCols(cols);
  };*/

  const onRemoveItem = (i) => {
    console.log("removing", i);
    setItems((prevItems) => _.reject(prevItems, { i: i }));
  };

  const createElement = (el) => {
    const i = el.i;
    return (
      <div
        key={i}
        data-grid={el}
        className="layout flex items-center justify-center bg-pink-200"
      >
        <Test />
        <button
          className="absolute left-1 top-1 h-7 w-3 cursor-pointer rounded bg-red-400"
          onClick={() => onRemoveItem(i)}
          onTouchStart={() => onRemoveItem(i)}
        ></button>
      </div>
    );
  };

  return (
    <div>
      <div className="flex h-[5vh] justify-evenly overflow-hidden bg-slate-500">
        <input type="text" />
        <button
          onClick={onAddItem}
          className="h-10 w-10 rounded-[50%] bg-slate-100"
        >
          +
        </button>
      </div>
      <ResponsiveReactGridLayout

      // Replace `this.props` with the appropriate props you want to pass
      >
        {_.map(items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default TestAppF;
