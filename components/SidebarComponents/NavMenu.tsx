import { FaHome, FaSearch } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
function NavMenu() {
  return (
    <div className="flex-shrink flex-grow basis-60 min-h-min mt-2 ">
      <ul className="font-semibold p-3 w-full">
        <li className=" flex py-2 text-2xl align-middle cursor-pointer hover:text-green-100 w-full">
          <span className=" min-h-full px-2 pt-0.5 my-auto flex justify-center align-middle">
            <FaHome />
          </span>{" "}
          <span className="">Home</span>
        </li>
        <li className="font-semibold flex py-2 text-2xl align-middle cursor-pointer hover:text-green-100 w-full">
          <span className=" min-h-full px-2 pt-0.5 my-auto flex justify-center align-middle">
            <FaSearch />
          </span>{" "}
          <span className="">Search</span>
        </li>
        <li className="font-semibold flex py-2 text-2xl align-middle cursor-pointer hover:text-green-100 w-full">
          <span className=" min-h-full px-2 pr-1 pt-0.5 my-auto flex justify-center align-middle">
            <HiLibrary />
          </span>{" "}
          <span className="">Your Library</span>
        </li>
      </ul>
    </div>
  );
}

export default NavMenu;
