import { useSelectedSongStore } from "../../hooks/useTrack";
import PlaylistTrackItem from "./PlaylistTrackItem";

const PlaylistBody = ({ playlistData }) => {
  const { tracks, uri } = playlistData;
  const { setSelectedSong } = useSelectedSongStore();

  const handleSelectTrack = (track, offset) => {
    setSelectedSong({ ...track, offset, context: { type: "playlist", uri } });
  };

  return (
    <div className="flex flex-col overflow-y-auto p-4 max-h-[900px] gap-y-2">
      {tracks.items.map(({ track }, i: number) => {
        return (
          <div onClick={() => handleSelectTrack(track, i)}>
            <PlaylistTrackItem key={track.id} track={track} order={i} />
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistBody;
