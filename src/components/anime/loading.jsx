function Loading() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {list.map((i) => {
        return (
          <div
            key={i}
            className="m-4 flex h-64 w-44 border-spacing-4 animate-pulse items-center
            justify-center overflow-hidden rounded-2xl border-2 border-fuchsia-500 bg-gradient-to-tr from-fuchsia-500/30 to-fuchsia-500/60 text-center"
          >
            loading...
          </div>
        );
      })}
    </>
  );
}

export default Loading;
