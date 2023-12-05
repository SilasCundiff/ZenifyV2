import Image from "next/image";
import { convertMsToMinutes } from "../../lib/time";

const PlaylistTrackItem = ({ track, order }) => {
  const { id, name, album, artists, duration_ms, explicit, popularity, uri } =
    track;

  console.log("album.images[2].url", album.images[2].url);

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-green-800 hover:bg-opacity-30 hover:text-white rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4">
        <p className="text-lg max-w-[32px] font-bold  flex">{order + 1}</p>
        <Image
          src={album.images[2].url}
          className="h-10 w-10"
          alt="album cover"
          height={40}
          width={40}
        />
        <div className="">
          <p className="w-36 lg:4-64 truncate text-green-50">{name}</p>
          <p className="w-40">{artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{album.name}</p>
        <p className=" ">{convertMsToMinutes(duration_ms)}</p>
      </div>
    </div>
  );
};

export default PlaylistTrackItem;
