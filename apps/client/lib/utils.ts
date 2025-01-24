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

export const getFallback = (name: string) => {
  return name
    .split(" ")
    .map((sub) => sub[0])
    .join("")
    .toUpperCase();
};

export const generateColorFromHash = (hash: string) => {
  let hashValue = 0;
  for (let i = 0; i < hash.length; i++) {
    hashValue = hash.charCodeAt(i) + ((hashValue << 5) - hashValue);
  }

  const r = (hashValue >> 16) & 0xff;
  const g = (hashValue >> 8) & 0xff;
  const b = hashValue & 0xff;

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};
