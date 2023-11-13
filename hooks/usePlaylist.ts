import { create } from "zustand";
import { PlaylistStore } from "../types";

// a store for the currently selected playlist

export const usePlaylist = create<PlaylistStore>((set) => ({
  playlist: { id: "1MGSI5VKz9MGcCKboUuTmX" },
  setPlaylist: (playlistId: string) => set({ playlist: { id: playlistId } }),
}));
