import { Home, Star } from "lucide-react";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const secretKey = process.env.NEXT_PUBLIC_SESSION_SECRET_KEY!;

export const encodedKey = new TextEncoder().encode(secretKey);

export const dashboardSidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Favorites",
    url: "/?favorites=true",
    icon: Star,
  },
];
