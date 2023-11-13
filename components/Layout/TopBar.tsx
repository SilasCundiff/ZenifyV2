import { signOut } from "next-auth/react";

function TopBar() {
  return (
    <div className="min-w-full h-16  flex justify-end items-center">
      <button
        className="bg-[#18D860] text-black px-3 py-2 font-semibold  rounded-full w-24 m-2"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}

export default TopBar;
