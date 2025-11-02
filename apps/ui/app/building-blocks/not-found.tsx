import Link from "next/link"

import PageHeader from "@/components/building-blocks/page-header"
import { Button } from "@/registry/building-blocks/default/ui/button"

export default function NotFound() {
  return (
    <>
      <PageHeader title="404" className="mb-6">
        The page you&apos;re looking for does not exist or is no longer here.
      </PageHeader>
      <div className="text-center">
        <Button asChild className="rounded-full">
          <Link href="/building-blocks">Browse components</Link>
        </Button>
      </div>
    </>
  )
}
