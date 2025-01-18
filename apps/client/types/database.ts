export interface ITeam {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBoard {
  id: string;
  title: string;
  imageUrl: string | null;
  teamId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}
export interface ITeamDetails {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: IUser[];
  boards: IBoard[];
}
