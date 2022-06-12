import { signOut } from "next-auth/react";

const IndexPage = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b  from-black to-zinc-900 min-h-screen w-full justify-center">
      <div>
        <button
          className="bg-[#18D860] text-black px-4 py-3 font-semibold  rounded-full w-48 mb-2"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
