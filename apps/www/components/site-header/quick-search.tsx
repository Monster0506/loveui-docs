"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@loveui/ui/ui/command";
import { Button } from "@loveui/ui/ui/button";
import { cn } from "@loveui/ui/lib/utils";

type CommandLink = {
  id: string;
  label: string;
  description?: string;
  href: string;
  external?: boolean;
};

type CommandAction = CommandLink & {
  group: "Navigation" | "External";
};

const sectionLinks: CommandLink[] = [
  { id: "hero", label: "Hero", description: "Jump to the top", href: "#hero" },
  {
    id: "features",
    label: "Features",
    description: "LoveUI feature cards",
    href: "#features",
  },
  {
    id: "gallery",
    label: "Image gallery",
    description: "Preview component imagery",
    href: "#gallery",
  },
  {
    id: "faqs",
    label: "FAQs",
    description: "Browse common questions",
    href: "#faqs",
  },
];

const externalLinks: CommandLink[] = [
  {
    id: "docs",
    label: "Documentation",
    description: "Browse the LoveUI docs",
    href: "https://loveui.dev/ui/docs",
    external: true,
  },
  {
    id: "blocks",
    label: "Blocks directory",
    description: "Explore production-ready blocks",
    href: "https://loveui.dev/ui/building-blocks",
    external: true,
  },
  {
    id: "waitlist",
    label: "Join the waitlist",
    description: "Request early access to LoveUI",
    href: "https://i.cal.com/forms/0129f2a8-7b15-4850-b3fb-07944dfacb3c",
    external: true,
  },
];

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const element = typeof document !== "undefined" ? document.getElementById(id) : null;

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function QuickSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const commands = useMemo<CommandAction[]>(() => {
    return [
      ...sectionLinks.map((item) => ({ ...item, group: "Navigation" as const })),
      ...externalLinks.map((item) => ({ ...item, group: "External" as const })),
    ];
  }, []);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSelect = useCallback(
    (action: CommandAction) => {
      handleClose();
      if (action.href.startsWith("#")) {
        scrollToHash(action.href);
        return;
      }
      if (action.external) {
        window.open(action.href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(action.href);
    },
    [handleClose, router]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        const isEditable = target.isContentEditable;
        if (isEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
          return;
        }
      }

      const modKey = isApplePlatform() ? event.metaKey : event.ctrlKey;

      if (modKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }

      if (event.key === "/") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-8 gap-3 text-muted-foreground",
          className
        )}
        onClick={handleOpen}
        aria-label="Open quick search"
      >
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        <div className="hidden items-center gap-1 sm:flex">
          <QuickSearchKbd>{isApplePlatform() ? "⌘" : "Ctrl"}</QuickSearchKbd>
          <QuickSearchKbd className="aspect-square">K</QuickSearchKbd>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Quick search" description="Jump to a section or open external links.">
        <CommandInput placeholder="Search sections and resources..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {(["Navigation", "External"] as const).map((group) => {
            const groupItems = commands.filter((item) => item.group === group);
            if (groupItems.length === 0) return null;
            return (
              <CommandGroup key={group} heading={group}>
                {groupItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.label}
                    onSelect={() => handleSelect(item)}
                  >
                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      {item.description ? (
                        <span className="text-muted-foreground text-xs">
                          {item.description}
                        </span>
                      ) : null}
                    </div>
                    <CommandShortcut>↵</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}

function QuickSearchKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 items-center justify-center gap-1 rounded border bg-background px-1 font-sans text-[0.7rem] font-medium text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  );
}

function isApplePlatform() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}
