import { useEffect } from "react";
import { usePlaylist, useSpotify, useSelectPlaylist } from "../../hooks";

// TODO:: Add a loading state
// TODO:: Add a error state
// TODO:: Don't attempt to fetch a playlist if it's already selected and fetched
function CenterContent() {
  const { playlist, setPlaylist } = usePlaylist();
  const spotifyApi = useSpotify();
  const selectedPlaylist = useSelectPlaylist();

  useEffect(() => {
    console.log("selectedPlaylist", selectedPlaylist.playlist);
    if (selectedPlaylist.playlist) {
      spotifyApi
        .getPlaylist(selectedPlaylist.playlist.id)
        .then((data) => {
          console.log("data", data);
          setPlaylist(data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedPlaylist, spotifyApi]);

  return (
    <div className="flex  w-full h-[calc(100%-64px)] justify-center align-middle">
      <div className="bg-gray-50 bg-opacity-5 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
        {playlist ? (
          playlist.name
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
