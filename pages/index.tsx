import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BottomBar from "../components/Layout/BottomBar";
import CenterContent from "../components/Layout/CenterContent";
import DashboardLayout from "../components/Layout/DashboardLayout";
import MainBody from "../components/Layout/MainBody";
import MainInnerWrapperBody from "../components/Layout/MainBodyInnerWrapper";
import PageWrapper from "../components/Layout/PageWrapper";
import SideBar from "../components/Layout/SideBar";
import TopBar from "../components/Layout/TopBar";
import { useSpotify } from "../hooks/useSpotify";

const IndexPage = () => {
  const { spotifyApi } = useSpotify();
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

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default IndexPage;

//  <button
//    className="bg-[#18D860] text-black px-4 py-3 font-semibold  rounded-full w-48 mb-2"
//    onClick={() => signOut()}
//  >
//    Logout
//  </button>;
