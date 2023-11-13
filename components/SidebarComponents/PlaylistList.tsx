import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSpotify, useSelectPlaylist } from "../../hooks/";
import { SelectedPlaylist } from "../../types";

function PlaylistList() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          // TODO:: data.body.items only contains the first 20 playlists
          console.log("data", data);
          setPlaylists(data.body.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session, spotifyApi]);

  return (
    <div className="flex-shrink overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="min-h-min font-regular text-lg p-3">
        {playlists &&
          playlists.map((playlist) => {
            return <ListItem key={playlist.id} playlist={playlist} />;
          })}
      </ul>
    </div>
  );
}

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

export default PlaylistList;
