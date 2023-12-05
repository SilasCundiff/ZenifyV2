import BottomBar from "../components/Layout/BottomBar";
import CenterContent from "../components/Layout/CenterContent";
import DashboardLayout from "../components/Layout/DashboardLayout";
import MainBody from "../components/Layout/MainBody";
import MainInnerWrapperBody from "../components/Layout/MainBodyInnerWrapper";
import SideBar from "../components/Layout/SideBar";
import TopBar from "../components/Layout/TopBar";

export default function Home() {
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
