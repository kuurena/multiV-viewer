import { useState, useEffect } from "react";
import axios from "axios";
import YoutubeVideoSelect from "../../components/youtube/YoutubeVideoSelect";

function YoutubeSearch() {
  const key = "AIzaSyDQLwFNeRBGjjg5T3LXsQRBFTf3wt8QuG8";
  const [channelID, setChannelID] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [channelIDInput, setChannelIDInput] = useState("");
  const [keyWordInput, setKeyWordInput] = useState("");
  const [youtubeData, setYoutubeData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet${channelID}&maxResults=50${keyWord}&key=${key}`;

  const keyWordChange = (e) => {
    e.target.value != ""
      ? setKeyWordInput(`&q=${e.target.value}`)
      : setKeyWordInput("");
  };

  const channelIDChange = (e) => {
    e.target.value != ""
      ? setChannelIDInput(`&channelId=${e.target.value}`)
      : setChannelIDInput("");
  };

  const search = (e) => {
    e.preventDefault();
    console.log("submit");
    setChannelID(channelIDInput);
    const word = keyWordInput;
    setKeyWord(word.replace(/\s/g, "%20"));
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setYoutubeData(data.items);
        console.log(youtubeData);
        setIsLoading(false);
      } catch (err) {
        throw new Error(err.message);
      }
    }
    getData();
  }, [url]);

  return (
    <div className="flex h-screen flex-col">
      <div className="pb-10 pl-[10%] pr-[10%] pt-10">
        <form
          className="flex h-full w-full flex-col rounded-lg bg-fuchsia-500/25 p-4"
          onSubmit={search}
        >
          <div className="mb-3 flex justify-start">
            <input
              type="text"
              placeholder="Search"
              onChange={keyWordChange}
              className="mr-[5%] h-10 w-[45%] rounded-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/20 pl-4 text-fuchsia-500 placeholder-fuchsia-400 placeholder-opacity-50"
            />
            <input
              type="text"
              placeholder="Channel ID"
              onChange={channelIDChange}
              className="h-10 w-[45%] rounded-lg border-2 border-double border-fuchsia-500 bg-fuchsia-500/20 pl-4 text-fuchsia-500 placeholder-fuchsia-400 placeholder-opacity-50"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex h-12 w-12 items-center justify-center rounded-[50%] border-2 border-double border-fuchsia-500 bg-fuchsia-500/20 hover:bg-fuchsia-500/40"
            >
              <svg
                id="search-icon"
                className="h-[80%] w-[80%] fill-fuchsia-500"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap justify-evenly pl-[7%] pr-[7%] text-fuchsia-500 ">
        {(keyWord || channelID != "") && !isLoading ? (
          <YoutubeVideoSelect youtubeData={youtubeData} />
        ) : (
          <div className="animate-pulse text-center text-fuchsia-500/60">
            Enter keyword or channel ID then click search
          </div>
        )}
      </div>
    </div>
  );
}

export default YoutubeSearch;

//
