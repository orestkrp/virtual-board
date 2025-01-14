"use client";
import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { cn } from "@/lib/utils";
import { IBoard } from "@/types/database";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { FC } from "react";
import { Avatars } from "./avatars";

interface InfoProps {
  board: IBoard;
}

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export const Info: FC<InfoProps> = ({ board }) => {
  return (
    <div className="h-8 p-8 flex items-center">
      <Hint label="Dashboard" side="bottom" sideOffset={18}>
        <Button variant="ghost" className="px-2" asChild>
          <Link href="/">
            <h1
              className={cn(
                font.className,
                "text-blue-900 font-bold text-2xl capitalize"
              )}
            >
              V-board
            </h1>
          </Link>
        </Button>
      </Hint>
      <div className="text-neutral-300 px-1.5">|</div>
      <Hint label="Edit title" side="bottom" sideOffset={18}>
        <Button
          onClick={() => {}}
          className={cn(
            "font-semibold text-sm ml-2 text-white bg-blue-900",
            font.className
          )}
        >
          {board.title}
        </Button>
      </Hint>
      <div className="text-neutral-300 px-1.5">|</div>

      <Hint label="Main menu" side="bottom" sideOffset={20}>
        <Actions
          id={board.id}
          title={board.title}
          sideOffset={18}
          side="bottom"
        >
          <Button size="icon" variant="ghost">
            <Menu className="text-blue-800" />
          </Button>
        </Actions>
      </Hint>
    </div>
  );
};

export const InfoSkeleton: FC = () => {
  return (
    <div className="absolute top-2 left-2 w-[300px] bg-white rounded-md px-1.5 h-12 flex items-center shadow-sm"></div>
  );
};
