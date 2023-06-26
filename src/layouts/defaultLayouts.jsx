import { Outlet } from "react-router-dom";

export default function DefaultLayouts() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
