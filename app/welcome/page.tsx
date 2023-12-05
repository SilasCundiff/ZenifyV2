import Link from "next/link";

function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl mb-8 text-extrabold">
          Welcome to Zenify
        </h1>
        <p className="text-[#18D860] text-lg mb-8 ">
          Zenify (under construction) is a music player for Spotify with a
          built-in particle audio visualizer. You can play your favorite songs
          from your Spotify playlists.
        </p>
        <p>
          To enable playback, you will need to open an instance of Spotify, play
          a song there, and then select Zenify as your current device. From
          there, you can freely navigate playlists and control playback from
          Zenify.
        </p>
        <p>Particle integration coming soon!</p>
      </div>
      <button className="text-white font-extrabold underline underline-offset-2 text-md px-4 py-3 mb-2">
        <Link href="/login">Return to login</Link>
      </button>
    </>
  );
}

export default Welcome;
