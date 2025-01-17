import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { FC } from "react";

interface BoardCardProps {
  title: string;
  createdAtLabel: string;
  onClick: () => void;
  isFavorite: boolean;
  disabled: boolean;
}

export const BoardCardFooter: FC<BoardCardProps> = ({
  title,
  createdAtLabel,
  disabled,
  onClick,
  isFavorite,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] truncate text-muted-foreground">
        {createdAtLabel}
        <button
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "opacity-0 group-hover:opacity-100 hover:text-blue-600 transition absolute top-3 right-3 text-muted-foreground",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <Star
            className={cn(
              "h-4 w-4",
              isFavorite && "fill-blue-600 text-blue-600"
            )}
          />
        </button>
      </p>
    </div>
  );
};
