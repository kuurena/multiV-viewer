export default function Tooltip(props) {
  return (
    <>
      <div className=" ml-4 mr-4 mt-5 flex flex-col items-center justify-center text-center text-fuchsia-500/70">
        {props.count == 0 ? (
          <span>Click "+" button above to add grid for video</span>
        ) : (
          <span>Drag to move the grid. Resize at the bottom right.</span>
        )}
      </div>
    </>
  );
}
