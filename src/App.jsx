import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import Home from "./pages/Home";
import AnimeSearch, { animeSearchLoader } from "./pages/anime/AnimeSearch";
import AnimeEpSelect, { getEPLoader } from "./pages/anime/animeEpSelect";

//layouts
import DefaultLayouts from "./layouts/defaultLayouts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayouts />}>
      <Route index element={<Home />} />

      <Route path="anime" element={<DefaultLayouts />}>
        <Route index element={<AnimeSearch />} loader={animeSearchLoader} />
        <Route path=":id" element={<AnimeEpSelect />} loader={getEPLoader} />
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}
