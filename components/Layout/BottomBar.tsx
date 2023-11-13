import { useCurrentTrack } from "../../hooks/useTrack";

function BottomBar() {
  const currentTrack = useCurrentTrack();

  return <div className="w-full h-16 min-h-16 flex-shrink-0 bg-black"></div>;
}

export default BottomBar;
