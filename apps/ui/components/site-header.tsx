import { SiteHeader as WorkspaceSiteHeader } from "@workspace/ui/components/site-header"
import { Separator } from "@workspace/ui/ui/separator"

import { appConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { CommandMenu } from "@/components/command-menu"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

export function SiteHeader() {
  const pageTree = source.pageTree

  return (
    <WorkspaceSiteHeader
      currentProduct="ui"
      mobileNav={
        <MobileNav
          tree={pageTree}
          items={appConfig.navItems}
          className="flex lg:hidden"
        />
      }
    >
      <MainNav items={appConfig.navItems} className="hidden lg:flex" />
      <div className="mx-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
        <CommandMenu tree={pageTree} navItems={appConfig.navItems} />
      </div>
      <Separator orientation="vertical" className="h-5 max-md:hidden" />
    </WorkspaceSiteHeader>
  )
}
