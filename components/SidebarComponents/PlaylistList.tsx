"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSpotify } from "../../hooks/";
import ListItem from "./ListItem";

function PlaylistList() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
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
          // @ts-ignore
          playlists.map((playlist) => {
            return (
              <ListItem
                key={playlist.id}
                playlistId={playlist.id}
                playlistTitle={playlist.name}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default PlaylistList;
