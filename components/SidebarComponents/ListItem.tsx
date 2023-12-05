import { useSelectedPlaylistStore } from "../../hooks/";

const ListItem = ({ playlistId, playlistTitle }) => {
  const { setPlaylist } = useSelectedPlaylistStore();
  const { playlist } = useSelectedPlaylistStore();

  const handleSelectPlaylist = () => {
    if (playlistId === playlist?.id) return;
    setPlaylist(playlistId);
  };

  return (
    <li
      className="font-bolt py-1.5 px-2 text-xl align-middle cursor-pointer hover:text-green-300 w-full whitespace-nowrap"
      onClick={handleSelectPlaylist}
    >
      {playlistTitle}
    </li>
  );
};

export default ListItem;
