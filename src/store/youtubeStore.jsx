import { create } from "zustand";
import { persist } from "zustand/middleware";

const youtubeStore = (set) => ({
  title: "",
  videoID: "",
  changeTitle: (titleName) => {
    set({ title: titleName });
  },
  changeVideoID: (youtubeID) => {
    set({ videoID: youtubeID });
  },
});

export const useYoutubeStore = create(
  persist(youtubeStore, { name: "youtubeVideoID" })
);
