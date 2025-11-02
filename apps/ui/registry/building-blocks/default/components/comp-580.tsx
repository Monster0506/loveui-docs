import { useId } from "react"
import { SearchIcon } from "lucide-react"

import Logo from "@/registry/building-blocks/default/components/navbar-components/logo"
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
  { href: "#", label: "Products" },
  { href: "#", label: "Categories" },
  { href: "#", label: "Deals" },
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
                      <NavigationMenuLink href={link.href} className="py-1.5">
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem
                    className="w-full"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <div
                      role="separator"
                      aria-orientation="horizontal"
                      className="-mx-1 my-1 h-px bg-border"
                    ></div>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <NavigationMenuLink href="#" className="py-1.5">
                      Sign In
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Button
                      asChild
                      size="sm"
                      className="mt-0.5 w-full text-left text-sm"
                    >
                      <span className="flex items-baseline gap-2">
                        Cart
                        <span className="text-xs text-primary-foreground/60">
                          2
                        </span>
                      </span>
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex flex-1 items-center gap-6 max-md:justify-between">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            {/* Search form */}
            <div className="relative">
              <Input
                id={id}
                className="peer h-8 ps-8 pe-2"
                placeholder="Search..."
                type="search"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2 max-md:hidden">
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <a href="#">Sign In</a>
          </Button>
          <Button asChild size="sm" className="text-sm">
            <a href="#">
              <span className="flex items-baseline gap-2">
                Cart
                <span className="text-xs text-primary-foreground/60">2</span>
              </span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
