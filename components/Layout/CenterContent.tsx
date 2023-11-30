import { useEffect } from "react";
import { usePlaylist, useSpotify, useSelectPlaylist } from "../../hooks";
import PlaylistHeader from "../CenterContentComponents/PlaylistHeader";
import PlaylistBody from "../CenterContentComponents/PlaylistBody";
import { useSession } from "next-auth/react";

function CenterContent() {
  const { playlist, setPlaylist } = usePlaylist();
  const spotifyApi = useSpotify();
  const { status } = useSession();
  const selectedPlaylist = useSelectPlaylist();

  useEffect(() => {
    console.log("selectedPlaylist", selectedPlaylist.playlist);
    if (selectedPlaylist.playlist) {
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

  // TODO:: create loading and error components
  if (status !== "authenticated" || !playlist) {
    return (
      <div className="flex  w-full h-[calc(100%-96px)] justify-center align-middle">
        <div className=" w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
          <div className="flex flex-col justify-center align-middle h-full">
            <h1 className="text-5xl text-center font-bold text-green-100">
              Loading...
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
