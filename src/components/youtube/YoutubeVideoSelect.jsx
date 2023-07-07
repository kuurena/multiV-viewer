import { Link } from "react-router-dom";
import { useYoutubeStore } from "../../store/youtubeStore";

export default function YoutubeVideoSelect(props) {
  const [changeTitle, changeVideoID] = useYoutubeStore((state) => [
    state.changeTitle,
    state.changeVideoID,
  ]);

  return (
    <>
      {props.youtubeData.map(({ id, snippet }) => {
        return (
          <Link to="/" key={id.videoId}>
            <div
              className="mb-10 flex w-80 flex-col"
              onClick={() => {
                changeTitle(snippet.title);
                changeVideoID(id.videoId);
              }}
            >
              <div className="h-48 w-80 rounded-lg bg-fuchsia-500/25">
                <img
                  src={snippet.thumbnails.medium.url}
                  alt="thumbnails for youtube video"
                  className="h-48 w-80 rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="truncate text-lg">{snippet.title}</p>
              </div>
              <div>
                <p>{snippet.channelTitle}</p>
              </div>
              <div>
                <p className="text-xs text-fuchsia-500/60">
                  ID: {snippet.channelId}
                </p>
              </div>
              <div>
                <p className="text-xs">
                  {snippet.publishTime
                    .replace(/-/g, "/")
                    .replace(/T/g, " (")
                    .replace(/Z/g, ")")}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
