import { create } from "zustand";
import { persist } from "zustand/middleware";

const animeStore = (set) => ({
  animeID: "",
  animeEP: "",
  changeAnimeID: (idNumber) => {
    set({ animeID: idNumber });
  },
  changeAnimeEP: (epNumber) => {
    set({ animeEP: epNumber });
  },
});

export const useAnimeStore = create(persist(animeStore, { name: "animeIDEP" }));

/*const useStore = create((set) => ({
  animeID: getLocalStorage("animeID") || null,
  changeAnimeID: (idNumber) => set(() => ({ animeID: idNumber })),
  setlocalAnimeID: (animeID) =>
    set(() => {
      setLocalStorage("animeID", animeID);
    }),

  animeEP: getLocalStorage("animeEP") || null,
  changeAnimeEP: (epNumber) => set(() => ({ animeEP: epNumber })),
  setlocalAnimeID: (animeEP) =>
    set(() => {
      setLocalStorage("animeID", animeEP);
    }),
}));

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));*/
