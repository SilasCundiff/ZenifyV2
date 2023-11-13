import { useSpotify } from "../../hooks";
import { useCurrentTrack } from "../../hooks/useTrack";
import { convertMsToMinutes } from "../../lib/time";

const TrackItem = ({ track, order }) => {
  const { id, name, album, artists, duration_ms, explicit, popularity } = track;
  const spotifyApi = useSpotify();
  const currentTrack = useCurrentTrack();

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg"
      onClick={() => console.log(id)}
    >
      <div className="flex items-center space-x-4">
        <p className="text-lg max-w-[32px] font-bold  flex">{order + 1}</p>
        <img
          src={album.images[2].url}
          className="h-10 w-10"
          alt="album cover"
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

export default TrackItem;
