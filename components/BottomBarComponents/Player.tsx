import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks";
import { useCurrentTrack, useTrackInfo } from "../../hooks/useTrack";
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
import LoadingSpinner from "../LoadingSpinner";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const { track, isPlaying, setTrack, setIsPlaying } = useCurrentTrack();
  const [volume, setVolume] = useState(50);

  const trackInfo = useTrackInfo();

  console.log("trackInfo", trackInfo);
  console.log("volume", volume);

  const fetchCurrentTrack = () => {
    if (!trackInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setTrack(data.body?.item.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const playTrack = () => {
    setIsPlaying(true);
    spotifyApi
      .play({ uris: [trackInfo?.uri] })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    spotifyApi
      .pause()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const skipTrack = () => {
    spotifyApi
      .skipToNext()
      .then((res) => {
        console.log(res);
        fetchCurrentTrack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const previousTrack = () => {
    spotifyApi
      .skipToPrevious()
      .then((res) => {
        console.log(res);
        fetchCurrentTrack();
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

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !track.id) {
      fetchCurrentTrack();
      setVolume(50);
    }
  }, [track.id, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedVolumeChange(volume);
    }
  }, [volume]);

  return (
    <div className="w-full h-24 min-h-24 flex-shrink-0 grid grid-cols-3 text-xs md:text-base px-2 md:px-6">
      <div className="flex items-center space-x-4 overflow-hidden max-w-[320px]">
        {trackInfo && (
          <>
            <img
              className="hidden md:inline h-10 w-10 md:h-16 md:w-16"
              src={trackInfo?.album.images?.[0]?.url}
              alt="album cover"
            />
            <div>
              <h3 className="md:text-xl">{trackInfo?.name}</h3>
              <p className="md:text-lg">{trackInfo?.artists?.[0]?.name}</p>
            </div>
          </>
        )}
        {!trackInfo && status === "loading" && (
          <div className="p-4">
            <LoadingSpinner size="small" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full text-4xl ">
        <SwitchHorizontalIcon className="button" />
        <div className="space-x-4 flex items-center justify-center  mr-[64px] ml-8">
          <RewindIcon className="button w-10 h-10" onClick={previousTrack} />

          {isPlaying ? (
            <PauseIcon className="button w-12 h-12" onClick={pauseTrack} />
          ) : (
            <PlayIcon className="button w-12 h-12" onClick={playTrack} />
          )}
          <FastForwardIcon className="button w-10 h-10" onClick={skipTrack} />
        </div>
      </div>
      <div className=" flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        {/* volume controls */}
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
  );
};

export default Player;
