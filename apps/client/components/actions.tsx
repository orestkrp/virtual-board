"use client";

import {
  DropdownMenuContentProps,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FC, PropsWithChildren } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ConfirmModal } from "./confirm-modal";
import { useRenameModal } from "@/store/use-raname-modal";
import { deleteBoard } from "@/actions/delete-board";

interface ActionsProps {
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions: FC<PropsWithChildren<ActionsProps>> = ({
  children,
  id,
  side,
  sideOffset,
  title,
}) => {
  const { toast } = useToast();
  const { onOpen } = useRenameModal();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() =>
        toast({
          title: "Link copied",
        })
      )
      .catch(() => {
        toast({
          title: "Failed to copy link",
          variant: "destructive",
        });
      });
  };

  const onDelete = () => {
    deleteBoard(id).then((result) => {
      if (result.error) {
        toast({
          title: result.error,
          variant: "destructive",
        });
      } else {
        toast({ title: "Board was deleted" });
      }
    });
  };

  const onRename = () => {
    onOpen(id, title);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename} className="p-3 cursor-pointer">
          <Pencil className="h-4 w-4 mr-2" />
          Rename board
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="Whis will delete the board and all of it contents."
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
