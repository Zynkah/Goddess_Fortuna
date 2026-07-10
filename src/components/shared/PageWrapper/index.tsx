import type { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page md:hero mx-auto" role="main">
      <div className="md:hero-content flex flex-col xl:w-[1200px] lg:w-[1000px] gap-4">{children}</div>
    </div>
  );
};
