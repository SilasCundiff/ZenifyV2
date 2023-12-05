import { signOut, useSession } from "next-auth/react";

import BottomBar from "../components/Layout/BottomBar";
import CenterContent from "../components/Layout/CenterContent";
import DashboardLayout from "../components/Layout/DashboardLayout";
import MainBody from "../components/Layout/MainBody";
import MainInnerWrapperBody from "../components/Layout/MainBodyInnerWrapper";
import SideBar from "../components/Layout/SideBar";
import TopBar from "../components/Layout/TopBar";
import { useSpotify } from "../hooks/useSpotify";

export default function Home() {
  // const spotifyApi = useSpotify();
  // const { data: session, status } = useSession();
  // const [playlists, setPlaylists] = useState(null);

  // useEffect(() => {
  //   if (spotifyApi.getAccessToken()) {
  //     spotifyApi
  //       .getUserPlaylists()
  //       .then((data) => {
  //         // TODO:: data.body.items only contains the first 20 playlists
  //         setPlaylists(data.body.items);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [session, spotifyApi]);

  return (
    <>
      <DashboardLayout>
        <MainBody>
          <SideBar />
          <MainInnerWrapperBody>
            <TopBar />
            <CenterContent />
          </MainInnerWrapperBody>
        </MainBody>
        <BottomBar />
      </DashboardLayout>
    </>
  );
}
