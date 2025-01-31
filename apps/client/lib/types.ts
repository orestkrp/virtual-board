export type AuthFormState =
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

export type Meta = {
  currentTeamId: string;
};

export type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export type ChangeEmailFormState =
  | {
      error?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type ChangePasswordFormState =
  | {
      error?: {
        password?: string[];
        newPassword?: string[];
      };
      message?: string;
    }
  | undefined;
