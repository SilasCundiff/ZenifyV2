import PlaylistTrackItem from "./PlaylistTrackItem";

const PlaylistBody = ({ playlistData }) => {
  const { tracks } = playlistData;

  return (
    <div className="flex flex-col overflow-y-auto p-4 max-h-[900px] gap-y-2">
      {tracks.items.map(({ track }, i: number) => {
        return (
          <PlaylistTrackItem key={track.track.id} track={track} order={i} />
        );
      })}
    </div>
  );
};

export default PlaylistBody;
