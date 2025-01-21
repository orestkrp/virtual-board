import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { authFetch } from "@/lib/auth-fetch";
import { Loading } from "@/app/board/_components/loading";
import { getCurrentTeam } from "@/actions/meta";
import { EmptyState } from "@/app/dashboard/_components/empty-state";
import { UserMinus } from "lucide-react";
import { ITeamDetails } from "@/types/database";
import { TeamProfile } from "./_components/team-profile";
import { TeamMembers } from "./_components/team-members";
import { getSession } from "@/lib/session";

const Team: FC = async () => {
  const currentTeamId = await getCurrentTeam();

  const session = await getSession();

  if (!session) {
    return null;
  }

  if (!currentTeamId) {
    return <EmptyState icon={UserMinus} message="No team selected" />;
  }
  const teamDetails = await authFetch<ITeamDetails>(`team/${currentTeamId}`, {
    method: "GET",
    next: { tags: [currentTeamId] },
  });

  if (!teamDetails) {
    return <Loading />;
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="flex flex-start rounded-none">
        <TabsTrigger className="text-l font-semibold" value="profile">
          Profile
        </TabsTrigger>
        <TabsTrigger className="text-l font-semibold" value="members">
          Members
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="p-6">
        <TeamProfile teamDetails={teamDetails} userId={session.user.id} />
      </TabsContent>
      <TabsContent value="members" className="p-6">
        <TeamMembers teamDetails={teamDetails} currentTeamId={currentTeamId} />
      </TabsContent>
    </Tabs>
  );
};

export default Team;
