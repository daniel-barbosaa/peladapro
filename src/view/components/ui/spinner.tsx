import { cn } from "@/app/utils/class-name-merger";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-500",
        sizes[size],
        className,
      )}
      role="status"
      aria-label="Carregando"
    />
  );
}
