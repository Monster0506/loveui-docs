import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@workspace/ui/components/page-header"
import { Button } from "@workspace/ui/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have been moved.",
}

export default function NotFound() {
  return (
    <div className="container w-full flex-1 mb-16 lg:mb-20"> 
      <PageHeader>
        <PageHeaderHeading>Page Not Found</PageHeaderHeading>
        <PageHeaderDescription>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </PageHeaderDescription>
        <div className="mt-4">
          <Button
            className="group"
            size="lg"
            render={
              <Link href="/">
                <ArrowLeftIcon
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
