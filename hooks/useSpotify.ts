import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";

export const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "Failed to refresh access token") {
        signIn();
      }

      spotifyApi.setAccessToken(session.accessToken);
    }
  }, [session]);

  return spotifyApi;
};
