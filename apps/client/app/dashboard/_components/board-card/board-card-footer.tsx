import { FC } from "react";

interface BoardCardProps {
  title: string;
  createdAtLabel: string;
}

export const BoardCardFooter: FC<BoardCardProps> = ({
  title,
  createdAtLabel,
}) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] truncate text-muted-foreground">
        {createdAtLabel}
      </p>
    </div>
  );
};
