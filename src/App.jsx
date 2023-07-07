import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import Home from "./pages/Home";
import AnimeSearch from "./pages/anime/AnimeSearch";
import AnimeEpSelect, { getEPLoader } from "./pages/anime/AnimeEpSelect";
import YoutubeSearch from "./pages/youtube/YoutubeSearch";
import Error from "./pages/error";

//layouts
import DefaultLayouts from "./layouts/defaultLayouts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayouts />}>
      <Route index element={<Home />} />

      <Route path="anime" element={<DefaultLayouts />}>
        <Route index element={<AnimeSearch />} />
        <Route path=":id" element={<AnimeEpSelect />} loader={getEPLoader} />
      </Route>

      <Route path="youtube" element={<YoutubeSearch />} />

      <Route path="*" element={<Error />} />
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
