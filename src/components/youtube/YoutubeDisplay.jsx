export default function YoutubeDisplay() {
  const data = JSON.parse(localStorage.getItem("youtubeVideoID"));
  const ytID = data.state.videoID;

  return (
    <div className=" h-[90%] w-[90%] overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${ytID}`}
        frameborder="0"
        width="100%"
        height="100%"
        className="h-[100%] w-[100%] overflow-hidden"
      ></iframe>
    </div>
  );
}
