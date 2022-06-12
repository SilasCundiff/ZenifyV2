import Link from "next/link";
import PageWrapper from "../components/Layout/PageWrapper";

function Welcome() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl mb-8 text-extrabold">
          Welcome to Zenify
        </h1>
        <p className="text-[#18D860] text-lg mb-8 ">
          Zenify is a music player for Spotify with a built-in particle audio
          visualizer.
        </p>
      </div>
      <button className="text-white font-extrabold underline underline-offset-2 text-md px-4 py-3 mb-2">
        <Link href="/login">Return to login</Link>
      </button>
    </PageWrapper>
  );
}

export default Welcome;
