import { FunctionComponent } from "react";

interface ChildrenProps {}

const Children: FunctionComponent<ChildrenProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen  text-white flex flex-col justify-between">
      {children}
    </div>
  );
};

export default Children;
