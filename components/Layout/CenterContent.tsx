import { useEffect, useState } from "react";
import { usePlaylist, useSpotify, useSelectPlaylist } from "../../hooks";
import PlaylistHeader from "../CenterContentComponents/PlaylistHeader";
import PlaylistBody from "../CenterContentComponents/PlaylistBody";

// TODO:: Don't attempt to fetch a playlist if it's already selected and fetched
function CenterContent() {
  const { playlist, setPlaylist } = usePlaylist();
  const spotifyApi = useSpotify();
  const selectedPlaylist = useSelectPlaylist();
  const [loadingStatus, setLoadingStatus] = useState("idle");

  useEffect(() => {
    console.log("selectedPlaylist", selectedPlaylist.playlist);
    if (selectedPlaylist.playlist) {
      setLoadingStatus("loading");
      spotifyApi
        .getPlaylist(selectedPlaylist.playlist.id)
        .then((data) => {
          setPlaylist(data.body);
          setLoadingStatus("idle");
        })
        .catch((err) => {
          console.log(err);
          setLoadingStatus("error");
        });
    }
  }, [selectedPlaylist, spotifyApi]);

  // TODO:: create loading and error components
  if (loadingStatus === "loading") {
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

  if (loadingStatus === "error") {
    return (
      <div className="flex  w-full h-[calc(100%-96px)] justify-center align-middle">
        <div className=" w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
          <div className="flex flex-col justify-center align-middle h-full">
            <h1 className="text-5xl text-center font-bold text-green-100">
              Error
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  w-full h-[calc(100%-96px)] justify-center align-middle">
      <div className=" w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
        {playlist ? (
          <>
            <PlaylistHeader playlistData={playlist} />
            <PlaylistBody playlistData={playlist} />
          </>
        ) : (
          <div className="flex flex-col justify-center align-middle h-full">
            <h1 className="text-5xl text-center font-bold text-green-100">
              Select a playlist to get started
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CenterContent;
