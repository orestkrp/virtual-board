import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import { LifeProvider } from "@/providers/life-provider";

export const metadata: Metadata = {
  title: "Liveblocks",
};

const publicApiKey = process.env.NEXT_PUBLIC_LIFEBLOCKS_PUBLIC_KEY!;

interface BoardLayoutProps {
  params: { id: string };
}

const BoardLayout: FC<PropsWithChildren<BoardLayoutProps>> = ({
  children,
  params,
}) => {
  return (
    <LifeProvider publicApiKey={publicApiKey} roomId={params.id}>
      {children}
    </LifeProvider>
  );
};

export default BoardLayout;
