import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) {
    return "today";
  } else if (diff === 1) {
    return "yesterday";
  } else {
    return `${diff} days ago`;
  }
}

// Example usage:
const dateString = "2024-04-20T17:32:17.478+00:00";
const formattedDate = formatDate(dateString);
console.log(formattedDate); // Output: "today" or "yesterday" or "x days ago"
export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
