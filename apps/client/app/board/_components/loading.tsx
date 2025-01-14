import { FC } from "react";
import { LoaderCircle } from "lucide-react";

export const Loading: FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircle className="w-10 h-10 animate-spin" />
    </div>
  );
};
