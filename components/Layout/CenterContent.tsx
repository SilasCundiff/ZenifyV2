import { useEffect } from "react";
import { usePlaylist, useSpotify, useSelectPlaylist } from "../../hooks";
import PlaylistHeader from "../CenterContentComponents/PlaylistHeader";
import PlaylistBody from "../CenterContentComponents/PlaylistBody";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../LoadingSpinner";

function CenterContent() {
  const { playlist, setPlaylist } = usePlaylist();
  const spotifyApi = useSpotify();
  const { status } = useSession();
  const selectedPlaylist = useSelectPlaylist();

  useEffect(() => {
    console.log("selectedPlaylist", selectedPlaylist.playlist);
    if (selectedPlaylist.playlist.id) {
      spotifyApi
        .getPlaylist(selectedPlaylist.playlist.id)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedPlaylist, spotifyApi, status]);

  if (
    status !== "authenticated" ||
    (!playlist && selectedPlaylist.playlist.id)
  ) {
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

  if (!selectedPlaylist.playlist.id) {
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
            <PlaylistHeader playlistData={playlist} />
            <PlaylistBody playlistData={playlist} />
          </>
        )}
      </div>
    </div>
  );
}

export default CenterContent;
