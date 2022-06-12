import { FunctionComponent } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: FunctionComponent<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b  from-black to-zinc-900 min-h-screen w-full justify-center">
      {children}
    </div>
  );
};

export default PageWrapper;
