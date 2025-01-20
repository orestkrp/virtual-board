import { FC } from "react";
import { BoardsList } from "./_components/boards-list";
import { BoardsTopBar } from "./_components/boards-bar";
import { getCurrentTeam } from "@/actions/meta";
import { authFetch } from "@/lib/auth-fetch";
import { IBoard } from "@/types/database";
import { EmptyState } from "./_components/empty-state";
import { ClipboardPlus, Users } from "lucide-react";

const Dashboard: FC = async () => {
  const currentTeamId = await getCurrentTeam();

  if (!currentTeamId) {
    return <EmptyState icon={Users} message="No team selected" />;
  }

  const boards = await authFetch<IBoard[]>(`board/team/${currentTeamId}`, {
    method: "GET",
    next: { tags: ["teams"] },
  });

  return (
    <>
      <BoardsTopBar activeTeamId={currentTeamId} />
      {boards.length ? (
        <BoardsList boards={boards} />
      ) : (
        <EmptyState
          icon={ClipboardPlus}
          message="There are no boards in this team"
        />
      )}
    </>
  );
};

export default Dashboard;
