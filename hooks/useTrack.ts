import { create } from "zustand";
import { useSpotify } from "./useSpotify";
import { useEffect, useState } from "react";
import { TrackDetails } from "../types";

export const useCurrentTrack = create<any>((set) => ({
  track: { id: null },
  isPlaying: false,
  setTrack: (trackId: string) => set({ track: { id: trackId } }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
}));

export const useTrackInfo = () => {
  const spotifyApi = useSpotify();
  const {
    track: { id },
  } = useCurrentTrack();
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
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

// I want to separate the playback state from the song info

type SelectedPlaylistState = {
  selectedSong: TrackDetails | { id: null | string };
  setSelectedSong: (selectedSongInfo) => void;
};

export const useSelectedSongStore = create<SelectedPlaylistState>((set) => ({
  selectedSong: { id: null },
  setSelectedSong: (selectedSongInfo) =>
    set({ selectedSong: selectedSongInfo }),
}));

type PlaybackState = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const usePlaybackStore = create<PlaybackState>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));
