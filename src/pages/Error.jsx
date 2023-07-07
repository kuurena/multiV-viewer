import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="overflow-hidden p-10 text-fuchsia-500">
      <h1 className="mb-6 text-5xl">Page Not Found...</h1>
      <span className="text-xl">Return home by </span>
      <Link to="/">
        <button className="animate-pulse rounded-lg border-2 border-fuchsia-500 p-2 text-xl hover:bg-fuchsia-500 hover:text-fuchsia-100">
          clicking Here
        </button>
      </Link>
    </div>
  );
}
