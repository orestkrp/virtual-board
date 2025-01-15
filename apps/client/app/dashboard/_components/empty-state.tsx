import { ClipboardPlus, LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

interface EmptyStateProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  message: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ icon: Icon, message }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Icon size={100} />
      <p className="font-semibold text-xl mt-6 text-center">{message}</p>
    </div>
  );
};
