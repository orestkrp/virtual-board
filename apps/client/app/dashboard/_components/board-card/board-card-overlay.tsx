import { FC } from "react";

export const BoardCardOverlay: FC = () => {
  return (
    <div className="opacity-0 group-hover:opacity-20 transition-opacity h-full w-full bg-black" />
  );
};
