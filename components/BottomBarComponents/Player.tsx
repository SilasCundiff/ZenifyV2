import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks";
import { useSelectedSongStore, usePlaybackStore } from "../../hooks/useTrack";
import { useCallback, useEffect, useState } from "react";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

import { debounce } from "lodash";
import NowPlayingInfo from "./NowPlayingInfo";

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
  const [player, setPlayer] = useState(null);
  const [volume, setVolume] = useState(50);

  const spotifyApi = useSpotify();

  const token = spotifyApi.getAccessToken();

  const playTrack = () => {
    console.log("selectedSong", spotifyApi);
    spotifyApi
      .play({ uris: [selectedSong?.uri] })
      .then((res) => {
        console.log("res", player);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    debounce((volume: number) => {
      spotifyApi.setVolume(volume).catch((err) => {
        console.log(err);
      });
    }, 500),
    []
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
          console.log("player_state_changed", state);

          setIsPlaying(state.paused);
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
  }, [token, spotifyApi]);

  useEffect(() => {
    if (selectedSong?.id) {
      playTrack();
    }
  }, [selectedSong]);

  useEffect(() => {
    renderPlayer();
  }, [token]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedVolumeChange(volume);
    }
  }, [volume]);

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
  }, []);

  if (!player) {
    console.log(player, "player");
    return <>no player</>;
  }

  if (!isActive) {
    return <>playback not active, open spotify to begin</>;
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
