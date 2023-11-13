import TrackItem from "./TrackItem";

const PlaylistBody = ({ playlistData }) => {
  const { tracks } = playlistData;
  console.log("tracks", tracks.items);

  return (
    <div className="flex flex-col overflow-y-auto p-4 max-h-[900px] gap-y-2">
      {tracks.items.map(({ track }, i) => {
        return <TrackItem key={track.track.id} track={track} order={i} />;
      })}
    </div>
  );
};

export default PlaylistBody;
