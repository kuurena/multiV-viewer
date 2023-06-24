import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import AnimeSearchButton from "./component/anime-search-button";
import AnimeSearchPage from "./component/anime-search-page";
import AnimeDisplay from "./component/anime-display";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const ModalContext = React.createContext(null);

export default class TestApp extends React.PureComponent {
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
          w: 3,
          h: 2,
          minH: 2,
          minW: 3,
          add: i === list.length - 1,
        };
      }),
      newCounter: 0,
      openModal: false,
      id: null,
      ep: null,
    };

    this.getAnimeEp = this.getAnimeEp.bind(this);
    this.clear = this.clear.bind(this);
    this.getAnimeId = this.getAnimeId.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const i = el.i;
    const clear = this.clear;

    return (
      <div
        key={i}
        data-grid={el}
        className="flex items-center justify-center bg-pink-200"
      >
        <AnimeSearchButton
          openAnimePage={() => {
            console.log("clicked");
            this.setState({ openModal: true });
          }}
        />
        {this.state.ep != null ? (
          <ModalContext.Provider value={{ clear }}>
            <AnimeDisplay animeId={this.state.id} animeEp={this.state.ep} />
          </ModalContext.Provider>
        ) : null}
        <button
          className="absolute left-1 top-1 h-7 w-3 cursor-pointer rounded bg-red-400"
          onClick={this.onRemoveItem.bind(this, i)}
          onTouchStart={this.onRemoveItem.bind(this, i)}
        ></button>
        <button
          onClick={() => {
            console.log(this.state.id);
            console.log(this.state.ep);
            console.log(this.state.fixed);
          }}
          className="bg-red-600 "
        >
          id
        </button>
      </div>
    );
  }

  onAddItem() {
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 3,
        h: 2,
        minW: 3,
        minH: 2,
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

  closeModal() {
    this.setState({ openModal: false });
  }

  getAnimeId(animeId) {
    this.setState({ id: animeId });
  }

  getAnimeEp(animeEp) {
    this.setState({ ep: animeEp });
  }

  clear() {
    this.setState({ id: null });
    //this.setState({ ep: null });
  }

  render() {
    const close = this.closeModal;
    const animeId = this.getAnimeId;
    const animeEp = this.getAnimeEp;

    return (
      <>
        {this.state.openModal && (
          <ModalContext.Provider value={{ close, animeId, animeEp }}>
            <AnimeSearchPage id={this.state.id} />
          </ModalContext.Provider>
        )}

        <div>
          <div className="flex h-[5vh] justify-end overflow-hidden bg-pink-50/20 backdrop-blur-lg">
            <button
              onClick={this.onAddItem}
              className="h-10 w-10 rounded-[50%] bg-slate-800"
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
      </>
    );
  }
}

/*export default class TestApp extends React.PureComponent {
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
          minH: 50,
          add: i === list.length - 1,
        };
      }),
      newCounter: 0,
      openModal: false,
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const i = el.i;
    return (
      <div
        key={i}
        data-grid={el}
        className="flex items-center justify-center bg-pink-200"
      >
        <AnimeSearchButton
          openAnimePage={() => {
            console.log("clicked");
            this.setState({ openModal: true });
          }}
        />
        <button
          className="absolute left-1 top-1 h-7 w-3 cursor-pointer rounded bg-red-400"
          onClick={this.onRemoveItem.bind(this, i)}
          onTouchStart={this.onRemoveItem.bind(this, i)}
        ></button>
      </div>
    );
  }

  onAddItem() {
    
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
      <>
        {this.state.openModal && (
          <AnimeSearchPage
            closeModal={() => {
              console.log("close modal");
              this.setState({ openModal: false });
            }}
          />
        )}

        <div>
          <div className="flex h-[5vh] justify-evenly overflow-hidden bg-slate-100">
            <button
              onClick={this.onAddItem}
              className="h-10 w-10 rounded-[50%] bg-slate-800"
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
      </>
    );
  }
}*/
