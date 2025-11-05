"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { SiteHeader as WorkspaceSiteHeader } from "@loveui/ui/components/site-header";
import { Button } from "@loveui/ui/ui/button";
import { Separator } from "@loveui/ui/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@loveui/ui/ui/sheet";
import { cn } from "@loveui/ui/lib/utils";
import { QuickSearch } from "@/components/site-header/quick-search";
import { buildUiActiveHref, buildUiHref } from "@/lib/ui-links";
import { useScrolledPastHero } from "@/hooks/use-scrolled-past-hero";

type NavItem = {
  label: string;
  href: string;
  activeHref?: string;
};

const baseNavItems: ReadonlyArray<{ path: string; label: string }> = [
  { path: "/docs", label: "Docs" },
  { path: "/docs/features/avatar-stack", label: "Features" },
  { path: "/building-blocks", label: "Building Blocks" },
  // { path: "/page-templates", label: "Page Templates" },
  { path: "/docs/backgrounds/ether", label: "Backgrounds" },
] as const;

const navItems: ReadonlyArray<NavItem> = baseNavItems.map((item) => ({
  label: item.label,
  href: buildUiHref(item.path),
  activeHref: buildUiActiveHref(item.path),
}));

function useActiveHref(items: readonly NavItem[]) {
  const pathname = usePathname();
  const normalizedPath = (pathname || "/").replace(/\/$/, "") || "/";

  return items.reduce<string | null>((best, item) => {
    const href = (item.activeHref ?? item.href).replace(/\/$/, "") || "/";
    const matchesExact = normalizedPath === href;
    const matchesPrefix = normalizedPath.startsWith(`${href}/`);

    if (matchesExact || matchesPrefix) {
      if (!best || href.length > best.length) {
        return href;
      }
    }

    return best;
  }, null);
}

function DesktopNav() {
  const activeHref = useActiveHref(navItems);

  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {navItems.map((item) => {
        const normalizedHref = (item.activeHref ?? item.href).replace(/\/$/, "") || "/";
        const isActive = activeHref === normalizedHref;

        return (
          <Button
            key={item.href}
            variant="ghost"
            data-pressed={isActive || undefined}
            render={<Link href={item.href} prefetch={false} className={cn(isActive && "text-primary")} />}
          >
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}

function MobileNav() {
  const activeHref = useActiveHref(navItems);

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
        <MenuIcon className="size-4" />
        <span className="sr-only">Toggle navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[calc(100%-(--spacing(8)))] max-w-xs flex-col gap-4 p-5">
        <div className="text-sm font-medium text-muted-foreground">Navigate</div>
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const normalizedHref = (item.activeHref ?? item.href).replace(/\/$/, "") || "/";
            const isActive = activeHref === normalizedHref;

            return (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={(closeProps) => {
                  const { className: closeClassName, ...restCloseProps } = closeProps;
                  return (
                    <Link
                      {...restCloseProps}
                      href={item.href}
                      prefetch={false}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                        isActive ? "text-primary" : "text-foreground",
                        typeof closeClassName === "string" ? closeClassName : undefined
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <span aria-hidden className="text-xs font-semibold text-primary">
                          •
                        </span>
                      ) : null}
                    </Link>
                  );
                }}
              />
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const scrolledPastHero = useScrolledPastHero();

  return (
    <>
      <WorkspaceSiteHeader
        currentProduct="ui"
        mobileNav={<MobileNav />}
        className={cn(
          "landing-header transition-[background-color,backdrop-filter] duration-300 before:transition-colors",
          scrolledPastHero
            ? "bg-sidebar/80 backdrop-blur-sm before:bg-border/50"
            : "bg-transparent before:bg-transparent"
        )}
      >
        <DesktopNav />
        <div className="mx-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
          <QuickSearch className="w-full" />
        </div>
        <Separator orientation="vertical" className="h-5 max-md:hidden" />
      </WorkspaceSiteHeader>
      <style jsx global>{`
        .landing-header .ms-auto > :last-child {
          display: none !important;
        }
      `}</style>
    </>
  );
}
