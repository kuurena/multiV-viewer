/*import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class Test extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [].map(function (i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === list.length - 1,
        };
      }),
      newCounter: 0,
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const i = el.i;
    return (
      <div key={i} data-grid={el} className="bg-slate-300">
        <button
          className="absolute right-1 top-1 h-7 w-3 cursor-pointer rounded bg-red-400"
          onClick={this.onRemoveItem.bind(this, i)}
        ></button>
      </div>
    );
  }

  onAddItem() {
    // eslint no-console: 0
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <div>
        <div className="flex h-[5vh] justify-evenly overflow-hidden bg-slate-500">
          <input type="text" />
          <button
            onClick={this.onAddItem}
            className="h-10 w-10 rounded-[50%] bg-slate-100"
          >
            +
          </button>
        </div>
        <ResponsiveReactGridLayout
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, (el) => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}*/

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "vidstack/styles/defaults.css";
import { MediaOutlet, MediaPlayer } from "@vidstack/react";

function Test() {
  const [source, setSource] = useState("");
  const [showButton, setShowButton] = useState(true);

  const url =
    "https://consumet-cyrlcx779-kuurena.vercel.app/anime/gogoanime/watch/spy-x-family-episode-1";
  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data.sources);
      setShowButton(!showButton);
      return setSource(data.sources[3].url);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="flex h-[90%] w-[90%] items-center justify-center">
      {showButton && (
        <button
          onClick={getData}
          onTouchStart={getData}
          className="bg h-10 w-20 bg-pink-300"
        >
          Play
        </button>
      )}
      <MediaPlayer title="Test" src={source} controls>
        <MediaOutlet />
      </MediaPlayer>
    </div>
  );
}

export default Test;
