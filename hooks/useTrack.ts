import { create } from "zustand";
import { useSpotify } from "./useSpotify";
import { useEffect, useState } from "react";
import { TrackDetails, PlaybackSong } from "../types";

export const useCurrentTrack = create<any>((set) => ({
  track: { id: null },
  isPlaying: false,
  setTrack: (trackId: string) => set({ track: { id: trackId } }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
}));

export const useSetPlaybackTrack = () => {
  const spotifyApi = useSpotify();
  const {
    selectedSong: { id },
  } = useSelectedSongStore();
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

type SelectedPlaylistState = {
  selectedSong: TrackDetails | { id: null | string; uri: string | null };
  setSelectedSong: (selectedSongInfo: TrackDetails) => void;
};

export const useSelectedSongStore = create<SelectedPlaylistState>((set) => ({
  selectedSong: { id: null, uri: null },
  setSelectedSong: (selectedSongInfo) =>
    set({ selectedSong: selectedSongInfo }),
}));

type PlaybackState = {
  nowPlaying: PlaybackSong | { id: null | string };
  isPlaying: boolean;
  isActive: boolean;
  setNowPlaying: (nowPlaying: PlaybackSong) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsActive: (isActive: boolean) => void;
};

export const usePlaybackStore = create<PlaybackState>((set) => ({
  nowPlaying: { id: null },
  isPlaying: false,
  isActive: false,
  setNowPlaying: (nowPlaying) => set({ nowPlaying }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsActive: (isActive) => set({ isActive }),
}));
