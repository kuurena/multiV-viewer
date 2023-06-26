function AnimeCard(props) {
  return (
    <>
      {props.updatedData
        ? props.updatedData.map(({ id, title, image }) => {
            return (
              <div
                key={id}
                className="group m-4 flex h-56 w-40 items-center justify-center overflow-hidden rounded-lg bg-slate-500 text-center"
              >
                <img
                  src={image}
                  alt="image"
                  className="relative h-full w-full object-cover transition ease-in-out group-hover:scale-110"
                />
                <div className="absolute h-56 w-40 bg-slate-900 bg-opacity-60 object-contain opacity-0 group-hover:rounded-lg group-hover:opacity-100">
                  <p className="text-slate-100">{title}</p>
                </div>
              </div>
            );
          })
        : props.data.map(({ id, title, image }) => {
            return (
              <div
                key={id}
                className="group m-4 flex h-56 w-40 items-center justify-center overflow-hidden rounded-lg bg-slate-500 text-center"
              >
                <img
                  src={image}
                  alt="image"
                  className="relative h-full w-full object-cover transition ease-in-out group-hover:scale-110"
                />
                <div className="absolute h-56 w-40 bg-slate-900 bg-opacity-60 object-contain opacity-0 group-hover:rounded-lg group-hover:opacity-100">
                  <p className="text-slate-100">{title}</p>
                </div>
              </div>
            );
          })}
    </>
  );
}

export default AnimeCard;
