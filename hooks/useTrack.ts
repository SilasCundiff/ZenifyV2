import { create } from "zustand";

export const useCurrentTrack = create((set) => ({
  track: { id: null, isPlaying: false },
  setSong: (trackId: string) => set({ track: { id: trackId } }),
}));

export const useSelectTrack = create((set) => ({
  track: { id: null },
  setSong: (trackId: string) => set({ track: { id: trackId } }),
}));
