import { FunctionComponent } from "react";

interface MainBodyInnerWrapperProps {
  children: React.ReactNode;
}

const MainInnerWrapperBody: FunctionComponent<MainBodyInnerWrapperProps> = ({
  children,
}) => {
  return <div className="min-w-[calc(100%-64px)]">{children}</div>;
};

export default MainInnerWrapperBody;
