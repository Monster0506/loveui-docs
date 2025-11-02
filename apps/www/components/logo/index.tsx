import Link from "next/link";
import { cn } from "../../../../packages/ui/src/lib/utils";

export function WordmarkIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading text-xl tracking-tight text-foreground",
        className
      )}
    >
      <span className="font-semibold">love</span>{" "}
      <span className="text-muted-foreground">ui</span>
    </span>
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <WordmarkIcon />
    </Link>
  );
}
