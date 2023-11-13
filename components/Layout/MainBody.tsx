import { FunctionComponent } from "react";

interface MainBodyProps {
  children: React.ReactNode;
}

const MainBody: FunctionComponent<MainBodyProps> = ({ children }) => {
  return (
    <div className="flex basis-full min-h-[calc(100vh-96px)] overflow-hidden">
      {children}
    </div>
  );
};

export default MainBody;
