import { Link } from "react-router-dom";

function AnimeCard(props) {
  return (
    <>
      {props.updatedData
        ? props.updatedData.map(({ id, title, image }) => {
            return (
              <Link to={id} key={id}>
                <div
                  key={id}
                  className="group m-4 flex h-64 w-44 border-spacing-4 items-center justify-center overflow-hidden rounded-2xl border-2 border-fuchsia-500 text-center hover:shadow-lg hover:shadow-fuchsia-500"
                >
                  <img
                    src={image}
                    alt="image"
                    className="relative h-full w-full object-cover transition ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute h-64 w-44 bg-fuchsia-700/50 bg-opacity-60 object-contain p-3 opacity-0  backdrop-blur-sm group-hover:rounded-lg group-hover:opacity-100">
                    <p className="text-slate-100 shadow-black drop-shadow-lg">
                      {title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        : props.data.map(({ id, title, image }) => {
            return (
              <Link to={animeEpData.id} key={id}>
                <div
                  key={id}
                  className="group m-4 flex h-64 w-44 border-spacing-4 items-center justify-center overflow-hidden rounded-2xl border-2 border-fuchsia-500 text-center hover:shadow-lg hover:shadow-fuchsia-500"
                >
                  <img
                    src={image}
                    alt="image"
                    className="relative h-full w-full object-cover transition ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute h-64 w-44 bg-fuchsia-700/50 bg-opacity-60 object-contain p-3 opacity-0  backdrop-blur-sm group-hover:rounded-lg group-hover:opacity-100">
                    <p className="text-slate-100 shadow-black drop-shadow-lg">
                      {title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
    </>
  );
}

export default AnimeCard;
