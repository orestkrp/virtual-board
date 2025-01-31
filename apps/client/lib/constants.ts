import { Home, Star, User, Users } from "lucide-react";
import { Poppins } from "next/font/google";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const secretKey = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY!;

export const encodedKey = new TextEncoder().encode(secretKey);

export const logoFont = Poppins({ subsets: ["latin"], weight: ["600"] });

export const settingsSidebarItems = [
  {
    title: "User",
    url: "/settings/user",
    icon: User,
  },
  {
    title: "Team",
    url: "/settings/team",
    icon: Users,
  },
];

export const AVATAR_BG = "#0341fc";
