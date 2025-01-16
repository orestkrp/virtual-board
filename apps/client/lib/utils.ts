import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (input: string) => {
  if (input.length) {
    return input;
  }
  return input[0].toUpperCase() + input.slice(1);
};
