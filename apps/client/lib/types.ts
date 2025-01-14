export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type Session = {
  user: {
    name: string;
    id: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type Role = "USER" | "ADMIN";
