import { useEffect, useState } from "react";
import { usePlaylist, useSpotify, useSelectPlaylist } from "../../hooks";
import PlaylistHeader from "../CenterContentComponents/PlaylistHeader";
import PlaylistBody from "../CenterContentComponents/PlaylistBody";

// TODO:: Don't attempt to fetch a playlist if it's already selected and fetched
function CenterContent() {
  const { playlist, setPlaylist } = usePlaylist();
  const { spotifyApi, status } = useSpotify();
  console.log("status in center content", status);
  const selectedPlaylist = useSelectPlaylist();

  console.log("spotifyApi", spotifyApi);

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
  if (status !== "authenticated") {
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
