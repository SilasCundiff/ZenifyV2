import LoadingSpinner from "../LoadingSpinner";

export default function NowPlayingInfo({ songData }) {
  if (!songData || songData?.id === null) {
    return (
      <div className="flex items-center space-x-4 overflow-hidden max-w-[320px]">
        <div className="p-4"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 overflow-hidden max-w-[320px]">
      {songData && (
        <>
          <img
            className="hidden md:inline h-10 w-10 md:h-16 md:w-16"
            src={songData.album && songData?.album.images?.[0]?.url}
            alt="album cover"
          />
          <div>
            <h3 className="md:text-xl">{songData?.name}</h3>
            <p className="md:text-lg">{songData?.artists?.[0]?.name}</p>
          </div>
        </>
      )}
      {!songData && status === "loading" && (
        <div className="p-4">
          <LoadingSpinner size="small" />
        </div>
      )}
    </div>
  );
}
