import { useId } from "react"
import { SearchIcon } from "lucide-react"

import Logo from "@/registry/building-blocks/default/components/navbar-components/logo"
import NotificationMenu from "@/registry/building-blocks/default/components/navbar-components/notification-menu"
import UserMenu from "@/registry/building-blocks/default/components/navbar-components/user-menu"
import { Button } from "@/registry/building-blocks/default/ui/button"
import { Input } from "@/registry/building-blocks/default/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/registry/building-blocks/default/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/building-blocks/default/ui/popover"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#", label: "Features" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
]

export default function Component() {
  const id = useId()

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className="py-1.5"
                        active={link.active}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
          </div>
        </div>
        {/* Middle area */}
        <div className="grow">
          {/* Search form */}
          <div className="relative mx-auto w-full max-w-xs">
            <Input
              id={id}
              className="peer h-8 ps-8 pe-10"
              placeholder="Search..."
              type="search"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground">
              <kbd className="inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Notification */}
          <NotificationMenu />
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
      {/* Bottom navigation */}
      <div className="border-t py-2 max-md:hidden">
        {/* Navigation menu */}
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  active={link.active}
                  href={link.href}
                  className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
