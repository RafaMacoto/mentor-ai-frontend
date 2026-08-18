import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn("group flex items-center gap-2.5", className)}>
      <span className="bg-gradient-ai flex size-9 items-center justify-center rounded-xl shadow-soft transition-transform group-hover:scale-105">
        <Sparkles className="size-4.5 text-primary-foreground" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Mentor<span className="text-primary"> AI</span>
      </span>
    </Link>
  );
}
