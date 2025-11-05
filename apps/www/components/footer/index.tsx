import Link from "next/link";
import { GithubIcon } from "lucide-react";

import { WordmarkIcon } from "@/components/logo";
import { Button } from "../../../../packages/ui/src/ui/button";
import { cn } from "../../../../packages/ui/src/lib/utils";
import { buildUiHref } from "@/lib/ui-links";

export function Footer() {
  const company = [
    {
      title: "Docs",
      href: buildUiHref("/docs"),
    },
    {
      title: "Changelog",
      href: buildUiHref("/docs/changelog"),
    },
  ];

  const resources = [
    {
      title: "Backgrounds",
      href: buildUiHref("/docs/backgrounds/ether"),
    },
    {
      title: "Building blocks",
      href: buildUiHref("/building-blocks"),
    },
    {
      title: "Roadmap",
      href: "https://github.com/loveconnor/loveui/discussions",
    },
    {
      title: "Support",
      href: "mailto:loveconnor2005@gmail.com",
    },
    {
      title: "License",
      href: "https://github.com/loveconnor/loveui/blob/main/LICENSING.md",
    },
  ];

  const socialLinks = [
    {
      icon: GithubIcon,
      link: "https://github.com/loveconnor/loveui",
    }
  ];

  const community = [
    {
      title: "GitHub issues",
      href: "https://github.com/loveconnor/loveui/issues",
    },
    {
      title: "Community calls",
      href: buildUiHref("/docs/community"),
    },
  ];
  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background via-background/98 to-background dark:from-sidebar dark:via-sidebar/95 dark:to-sidebar">
      <div
        className={cn(
          "mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 lg:border-x lg:px-8"
        )}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Link className="w-max" href="/">
              <WordmarkIcon className="h-5" />
            </Link>
            <p className="text-balance font-mono text-muted-foreground text-sm">
              LoveUI helps teams ship polished product and marketing experiences with the exact components we rely on at loveui.dev.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button
                  key={`social-${item.link}-${index}`}
                  size="icon-sm"
                  variant="ghost"
                  className="border border-border/60 bg-card/60 hover:bg-card"
                  render={
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.icon.name}
                    />
                  }
                >
                  <item.icon className="size-3.5" />
                </Button>
              ))}
            </div>
          </div>
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FooterColumn label="Resources" items={resources} />
            <FooterColumn label="Company" items={company} />
            <FooterColumn label="Community" items={community} />
          </div>
        </div>
        <div className="border-t border-border/60 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LoveUI. Crafted with care for builders everywhere.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  items,
  className,
}: {
  label: string;
  items: { title: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1 flex flex-col gap-1.5 text-sm">
        {items.map(({ href, title }) => (
          <a
            key={title}
            href={href}
            className="w-max text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            {title}
          </a>
        ))}
      </div>
    </div>
  );
}
