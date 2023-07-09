import { Link } from "react-router-dom";
import { useAnimeStore } from "../../store/animeStore";

function AnimeEpButton(props) {
  const [changeAnimeID, changeAnimeEP] = useAnimeStore((state) => [
    state.changeAnimeID,
    state.changeAnimeEP,
  ]);

  return (
    <>
      {props.animeEp.map(({ id, number }) => {
        return (
          <Link to="/" key={id}>
            <button
              key={id}
              onClick={() => {
                changeAnimeID(id);
                changeAnimeEP(number);
              }}
              onTouchStart={() => {
                changeAnimeID(id);
                changeAnimeEP(number);
              }}
              className=" m-3 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-fuchsia-500 text-center hover:bg-fuchsia-500 hover:text-slate-100 sm:h-10 sm:w-10"
            >
              <p>{number}</p>
            </button>
          </Link>
        );
      })}
    </>
  );
}

export default AnimeEpButton;
