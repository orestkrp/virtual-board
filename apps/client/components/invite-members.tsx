"use client";
import { UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useInviteModal } from "@/store/use-invite-modal";
import { FC } from "react";

interface InviteMembersProps {
  currentTeamId: string;
}

export const InviteMembers: FC<InviteMembersProps> = ({ currentTeamId }) => {
  const { onOpen } = useInviteModal();
  return (
    <Button onClick={() => onOpen(currentTeamId)}>
      <UserPlus />
      Invite members
    </Button>
  );
};
