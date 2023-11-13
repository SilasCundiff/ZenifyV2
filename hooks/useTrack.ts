import { create } from "zustand";
import { useSpotify } from "./useSpotify";
import { useEffect, useState } from "react";

// todo: fix any
export const useCurrentTrack = create<any>((set) => ({
  track: { id: null },
  isPlaying: false,
  setTrack: (trackId: string) => set({ track: { id: trackId } }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
}));

export const useTrackInfo = () => {
  const spotify = useSpotify();
  const {
    track: { id },
  } = useCurrentTrack();
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${spotify.getAccessToken()}`,
        },
      }).then((res) => res.json());

      setSongInfo(trackInfo);
    };

    if (id) {
      fetchTrackInfo();
    }
  }, [id]);

  return songInfo;
};
