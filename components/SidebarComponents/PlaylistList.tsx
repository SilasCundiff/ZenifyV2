import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSpotify, usePlaylist } from "../../hooks/";
import { Playlist } from "../../types";

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
          setPlaylists(data.body.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session, spotifyApi]);

  console.log("playlists: ", playlists);

  return (
    <div className="flex-shrink overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="min-h-min font-regular text-lg p-3">
        {playlists &&
          playlists.map((playlist: Playlist) => {
            return <ListItem key={playlist.id} playlist={playlist} />;
          })}
      </ul>
    </div>
  );
}

const ListItem = ({ playlist }) => {
  const playlistStore = usePlaylist();

  return (
    <li
      className="font-bolt py-1.5 px-2 text-xl align-middle cursor-pointer hover:text-green-100 w-full whitespace-nowrap"
      onClick={() => playlistStore.setPlaylist(playlist.id)}
    >
      {playlist.name}
    </li>
  );
};

export default PlaylistList;
