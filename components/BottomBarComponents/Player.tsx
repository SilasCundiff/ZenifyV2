import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks";
import {
  useCurrentTrack,
  useTrackInfo,
  useSelectedSongStore,
  usePlaybackStore,
} from "../../hooks/useTrack";
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
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const { track, setTrack } = useCurrentTrack();
  const [volume, setVolume] = useState(50);

  const { selectedSong } = useSelectedSongStore();
  const { isPlaying, setIsPlaying } = usePlaybackStore();

  const trackInfo = useTrackInfo();

  const fetchCurrentTrack = () => {
    if (!trackInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("data.body", data.body);
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
      <NowPlayingInfo songData={selectedSong} />
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
        N
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
  );
};

export default Player;
