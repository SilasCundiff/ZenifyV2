const PlaylistHeader = ({ playlistData }) => {
  const { name, description, images } = playlistData;

  // TODO:: handle no image, and when images[1] doesn't exist but images[0] does
  // TODO:: add placeholder images for when images[1] doesn't exist

  return (
    <div className="flex flex-wrap p-4">
      <div className="my-auto flex-shrink-0">
        <img src={images[1].url} className="h-20 w-20" alt="playlist cover" />
      </div>
      <div className="">
        <p className="text-2xl ml-4 font-bold mb-1 text-green-100">
          {description ? description : "Playlist"}
        </p>
        <h1 className="text-5xl ml-4 mb-2 font-bold text-green-100">{name}</h1>
      </div>
    </div>
  );
};

export default PlaylistHeader;
