import { cn } from "@/utils/cn";

const colorClasses = {
  success: "bg-green-500",
  error: "bg-red-500",
  warn: "bg-yellow-500",
  info: "bg-blue-500",
  default: "bg-purple-500",
  deactivated: "bg-gray-500",
};

const Ping = ({
  color = "default",
  isActive = true,
  className,
}: {
  color?: "success" | "error" | "warn" | "info" | "default" | "deactivated";
  isActive?: boolean;
  className?: string;
}) => {
  const colorClass = colorClasses[color] || colorClasses.default;

  return (
    <span className={cn("pointer-events-none relative flex h-3 w-3", className)}>
      <span className={`${isActive ? "animate-ping" : ""} absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75`}></span>
      <span className={`relative inline-flex h-3 w-3 rounded-full ${colorClass}`}></span>
    </span>
  );
};

export { Ping };
