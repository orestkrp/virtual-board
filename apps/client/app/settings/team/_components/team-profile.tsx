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
}

export const TeamProfile: FC<TeamProfileProps> = ({ teamDetails }) => {
  const { toast } = useToast();
  return (
    <div className="flex flex-col">
      <div className="flex">
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
      </div>
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
          header="Delete Team?"
          description="Whis will delete all the boards of this team and all of it contents."
          onConfirm={async () => {
            await deleteCurrentTeam();
            await deleteTeam(teamDetails.id).then(async (result) => {
              if (result.error) {
                toast({
                  title: result.error,
                  variant: "destructive",
                });
              } else {
                toast({ title: "Team was deleted" });
              }
            });
          }}
        >
          <Button className="mt-5" variant="destructive">
            Delete team
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
