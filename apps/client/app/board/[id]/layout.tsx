import { FC, PropsWithChildren } from "react";
import { LifeProvider } from "@/providers/life-provider";

interface BoardLayoutProps {
  params: { id: string };
}

const BoardLayout: FC<PropsWithChildren<BoardLayoutProps>> = async ({
  children,
  params,
}) => {
  return <LifeProvider roomId={params.id}>{children}</LifeProvider>;
};

export default BoardLayout;
