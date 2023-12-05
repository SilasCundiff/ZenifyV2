"use client";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { debounce } from "lodash";
import {
  useSpotify,
  useSelectedSongStore,
  usePlaybackStore,
} from "../../hooks";
import NowPlayingInfo from "./NowPlayingInfo";

import { useCallback, useEffect, useState } from "react";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

const Player = () => {
  const { selectedSong } = useSelectedSongStore();
  const {
    nowPlaying,
    isPlaying,
    setIsPlaying,
    isActive,
    setIsActive,
    setNowPlaying,
  } = usePlaybackStore();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [volume, setVolume] = useState(10);

  const spotifyApi = useSpotify();

  const token = spotifyApi.getAccessToken();

  const playTrack = useCallback(() => {
    if (selectedSong === null || selectedSong.context === null) {
      console.log("no song selected");
      return;
    }
    spotifyApi
      .play({
        context_uri: selectedSong?.context.uri,
        offset: { position: selectedSong?.offset },
      })
      .then((res) => {
        console.log("res", player);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [player, selectedSong, spotifyApi]);

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  const handleVolumeIncrease = () => {
    if (volume < 90) {
      return setVolume(volume + 10);
    }
    if (volume >= 90) {
      return setVolume(100);
    }
  };

  const handleVolumeDecrease = () => {
    if (volume > 10) {
      return setVolume(volume - 10);
    }
    if (volume <= 10) {
      return setVolume(0);
    }
  };

  const debouncedVolumeChange = useCallback(
    (volume: number) => {
      const debounced = debounce(() => {
        spotifyApi.setVolume(volume).catch((err) => {
          console.log(err);
        });
      }, 500);
      debounced();
    },
    [spotifyApi]
  );

  const renderPlayer = useCallback(() => {
    // check to see if the player is already added to the DOM to prevent multiple instances of the player
    if (token && !window.Spotify) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Zenify 2",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        setPlayer(player);

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          if (!state) {
            return;
          }

          setIsPlaying(state.paused);
          // @ts-ignore
          setNowPlaying(state.track_window.current_track);

          player.getCurrentState().then((state) => {
            if (!state) {
              setIsActive(false);
            } else {
              setIsActive(true);
            }
          });
        });

        player.connect();

        return () => {
          player.disconnect();
        };
      };
    }
  }, [token, setIsPlaying, setNowPlaying, setIsActive]);

  useEffect(() => {
    if (selectedSong?.id) {
      playTrack();
    }
  }, [selectedSong, playTrack]);

  useEffect(() => {
    renderPlayer();
  }, [token, renderPlayer]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedVolumeChange(volume);
    }
  }, [volume, debouncedVolumeChange]);

  useEffect(() => {
    if (!player) {
      return;
    }

    player.getCurrentState().then((state) => {
      if (!state) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!player) {
    console.log(player, "player");
    return <>no player</>;
  }

  if (!isActive) {
    return (
      <div className="w-full h-24 min-h-24 flex-shrink-0 flex text-xs md:text-base px-2 md:px-6 ">
        <p className="m-auto">
          Player not active, please open Spotify and select{" "}
          <span className="text-green-400">Zenify</span> as your active device.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-24 min-h-24 flex-shrink-0 grid grid-cols-3 text-xs md:text-base px-2 md:px-6">
        <NowPlayingInfo songData={nowPlaying} />
        <div className="flex items-center justify-center w-full text-4xl ">
          <SwitchHorizontalIcon className="button" />
          <div className="space-x-4 flex items-center justify-center  mr-[64px] ml-8">
            <RewindIcon
              className="button w-10 h-10"
              onClick={() => player.previousTrack()}
            />

            {!isPlaying ? (
              <PauseIcon
                className="button w-12 h-12"
                onClick={() => player.pause()}
              />
            ) : (
              <PlayIcon
                className="button w-12 h-12"
                onClick={() => player.resume()}
              />
            )}
            <FastForwardIcon
              className="button w-10 h-10"
              onClick={() => player.nextTrack()}
            />
          </div>
        </div>
        <div className=" flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <VolumeDownIcon className="button" onClick={handleVolumeDecrease} />
          <input
            className="volume-slider w-14 md:w-28"
            type="range"
            value={volume}
            min={0}
            max={100}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
          />
          <VolumeUpIcon className="button" onClick={handleVolumeIncrease} />
        </div>
      </div>
    </div>
  );
};

export default Player;
