"use client";

import { deleteTeam } from "@/actions/delete-team";
import { deleteCurrentTeam } from "@/actions/meta";
import { renameTeam } from "@/actions/rename-team";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/debounce-input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ITeamDetails } from "@/types/database";
import { FC } from "react";

interface TeamProfileProps {
  teamDetails: ITeamDetails;
  userId: string;
}

export const TeamProfile: FC<TeamProfileProps> = ({ teamDetails, userId }) => {
  const { toast } = useToast();
  const isAdmin = teamDetails.teamAdminId === userId;
  return (
    <div className="flex flex-col">
      <DebouncedInput
        name="team_name"
        placeholder="Write new team name"
        sendRequest={async (value: string) => {
          return await renameTeam(teamDetails.id, value);
        }}
        label="Team name"
        type="text"
        value={teamDetails.name}
        className="max-w-80 text-l font-semibold"
      />
      <div>
        <h2 className="my-4 text-xl font-bold">Team details</h2>
        <Separator />
        <p className="my-2 text-l font-semibold">
          Team members: {teamDetails.members.length}
        </p>
        <Separator />
        <p className="my-2 text-l font-semibold">
          Team boards: {teamDetails.boards.length}
        </p>
        <Separator />
      </div>
      <div className="mt-8">
        <h2 className="my-4 text-xl">Leave {teamDetails.name} team</h2>
        <p className="my-2 text-l font-semibold">
          By leaving the team, you will lose access to all its boards.
        </p>
        <ConfirmModal
          action={isAdmin ? "Delete" : "Leave"}
          header={isAdmin ? "Delete Team?" : "Leave Team?"}
          description={
            isAdmin
              ? "Whis will delete all the boards of this team and all of it contents."
              : "Do you want leave the team"
          }
          onConfirm={async () => {
            await deleteTeam(teamDetails.id).then(async (result) => {
              if (result.error) {
                toast({
                  title: result.error,
                  variant: "destructive",
                });
              } else {
                toast({
                  title: isAdmin ? "Team was deleted" : "You leaved the team",
                });
                await deleteCurrentTeam();
              }
            });
          }}
        >
          {isAdmin ? (
            <Button className="mt-5" variant="destructive">
              Delete team
            </Button>
          ) : (
            <Button className="mt-5" variant="secondary">
              Leave
            </Button>
          )}
        </ConfirmModal>
      </div>
    </div>
  );
};
