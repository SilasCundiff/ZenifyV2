import NavMenu from "../SidebarComponents/NavMenu";
import PlaylistList from "../SidebarComponents/PlaylistList";

function SideBar() {
  return (
    <div className="w-80 min-h-full flex flex-col pl-2">
      <NavMenu />
      <hr className="opacity-50 mb-6 mt-3 w-64 mr-auto ml-5" />
      <PlaylistList />
    </div>
  );
}

export default SideBar;
