import { Metadata } from "next"
import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@loveui/ui/components/page-header"

import { Button } from "@/registry/default/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist or may have been moved.",
}

export default function NotFound() {
  return (
    <div className="container w-full">
      <PageHeader>
        <PageHeaderHeading>Page Not Found</PageHeaderHeading>
        <PageHeaderDescription>
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </PageHeaderDescription>
        <div className="mt-4">
          <Button
            className="group"
            size="lg"
            render={
              <Link href="/">
                <RiArrowLeftLine
                  className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Back to Home
              </Link>
            }
          />
        </div>
      </PageHeader>
    </div>
  )
}
