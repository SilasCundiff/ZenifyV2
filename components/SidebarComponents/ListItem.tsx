import { useSelectPlaylist } from "../../hooks/";

const ListItem = ({ playlist }) => {
  const selectedPlaylist = useSelectPlaylist();

  return (
    <li
      className="font-bolt py-1.5 px-2 text-xl align-middle cursor-pointer hover:text-green-100 w-full whitespace-nowrap"
      onClick={() => selectedPlaylist.setPlaylist(playlist.id)}
    >
      {playlist.name}
    </li>
  );
};

export default ListItem;
