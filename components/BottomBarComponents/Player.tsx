import { useSession } from "next-auth/react";
import { useSpotify } from "../../hooks";
import { useCurrentTrack, useTrackInfo } from "../../hooks/useTrack";
import { useEffect, useState } from "react";
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

const Player = () => {
  const { spotifyApi } = useSpotify();
  const { data: session, status } = useSession();
  const { track, isPlaying, setTrack, setIsPlaying } = useCurrentTrack();
  const [volume, setVolume] = useState(50);

  const trackInfo = useTrackInfo();

  console.log("trackInfo", trackInfo);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !track.id) {
      fetchCurrentTrack();
      setVolume(50);
    }
  }, [track.id, spotifyApi, session]);

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

  return (
    <div className="w-full h-24 min-h-24 flex-shrink-0 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={trackInfo?.album.images?.[0]?.url}
          alt="album cover"
        />
        <div>
          <h3>{trackInfo?.name}</h3>
          <p>{trackInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon className="button" />
        ) : (
          <PlayIcon className="button" />
        )}
        <FastForwardIcon className="button" />
      </div>
    </div>
  );
};

export default Player;
