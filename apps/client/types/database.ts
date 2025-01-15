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
}
