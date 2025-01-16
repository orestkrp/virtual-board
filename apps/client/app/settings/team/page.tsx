import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersTable } from "./_components/members-tab";
import { FC } from "react";
import { authFetch } from "@/lib/auth-fetch";
import { Loading } from "@/app/board/_components/loading";
import { getCurrentTeam } from "@/actions/meta";
import { EmptyState } from "@/app/dashboard/_components/empty-state";
import { UserMinus } from "lucide-react";
import { ITeamDetails } from "@/types/database";

const Team: FC = async () => {
  const currentTeamId = await getCurrentTeam();

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
          <div>Profile</div>
        </TabsTrigger>
        <TabsTrigger className="text-l font-semibold" value="members">
          Members
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="p-6">
        Profile
      </TabsContent>
      <TabsContent value="members" className="p-6">
        <MembersTable
          members={teamDetails.members}
          currentTeamId={currentTeamId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default Team;
