import { usePlaylist } from "../../hooks";

function CenterContent() {
  const playlistStore = usePlaylist();

  return (
    <div className="flex  w-full h-[calc(100%-64px)] justify-center align-middle">
      <div className="bg-gray-50 bg-opacity-5 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-lg m-auto">
        {playlistStore.playlist
          ? playlistStore.playlist.id
          : `<div className="flex flex-col justify-center align-middle h-full">
            <h1 className="text-5xl text-center font-bold text-green-100">
              Select a playlist to get started
            </h1>
          </div>`}
      </div>
    </div>
  );
}

export default CenterContent;
