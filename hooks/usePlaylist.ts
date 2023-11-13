import { create } from "zustand";
import { PlaylistStore, SelectedPlaylist } from "../types";

export const useSelectPlaylist = create<SelectedPlaylist>((set) => ({
  playlist: { id: "1MGSI5VKz9MGcCKboUuTmX", name: "The Dark Pool" },
  setPlaylist: (playlistId: string) => set({ playlist: { id: playlistId } }),
}));

export const usePlaylist = create<PlaylistStore>((set) => ({
  playlist: null,
  setPlaylist: (playListData) => set({ playlist: playListData }),
}));
