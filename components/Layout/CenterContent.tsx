import { useEffect, useState } from "react";
import { useSelectedPlaylistStore, useSpotify } from "../../hooks";
import PlaylistHeader from "../CenterContentComponents/PlaylistHeader";
import PlaylistBody from "../CenterContentComponents/PlaylistBody";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../LoadingSpinner";

function CenterContent() {
  const { playlist } = useSelectedPlaylistStore();
  const [playlistData, setPlaylistData] = useState(null);
  const spotifyApi = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    if (playlist?.id) {
      spotifyApi
        .getPlaylist(playlist.id)
        .then((data) => {
          setPlaylistData(data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [playlist, spotifyApi, status]);

  // console.log("playlistData", playlistData);

  if (status !== "authenticated") {
    return (
      <div className="flex  w-full h-[calc(100%-96px)] justify-center align-middle">
        <div className=" w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
          <div className="flex flex-col justify-center align-middle h-full">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!playlistData) {
    return (
      <div className="flex  w-full h-[calc(100%-96px)] justify-center align-middle">
        <div className=" w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
          <div className="flex flex-col justify-center align-middle h-full">
            <h1 className="text-2xl font-semibold fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
              Select a playlist to view its contents
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  w-full h-[calc(100%-96px)] justify-center align-middle">
      <div className=" w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
        {playlist && (
          <>
            <PlaylistHeader playlistData={playlistData} />
            <PlaylistBody playlistData={playlistData} />
          </>
        )}
      </div>
    </div>
  );
}

export default CenterContent;
