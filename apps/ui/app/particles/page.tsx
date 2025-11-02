import * as React from "react"
import { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@workspace/ui/components/page-header"

import { getUniqueParticleCategories } from "@/lib/particle-categories"
import { cn } from "@/lib/utils"
import { particles } from "@/registry/default/particles"

import { CategoryNavigation } from "./category-navigation"
import { ParticleDisplay } from "./particle-display"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

const particleCategories = getUniqueParticleCategories(particles)

const title = "Particles"
const description =
  "Particles are more than just components. They are the building blocks of your design system. Click on a category or browse them all."

export const metadata: Metadata = {
  title: "Particle components built with React and Tailwind CSS - loveui",
  description: description,
}

export default async function Page() {
  return (
    <div className="container w-full">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription className="max-w-2xl">
          {description}
        </PageHeaderDescription>
        <CategoryNavigation categories={particleCategories} />
      </PageHeader>
      <div className="grid flex-1 items-stretch gap-9 pb-12 lg:grid-cols-2 lg:gap-6 xl:gap-9">
        {particles.map((particle) => {
          const ParticleComponent = particle.component
          return (
            <ParticleDisplay
              key={particle.id}
              name={particle.id}
              className={cn(
                particle.fullWidth ? "lg:col-span-2" : "lg:col-span-1",
                particle.className
              )}
            >
              <ParticleComponent
                currentPage={1}
                totalPages={10}
                totalResults={100}
              />
            </ParticleDisplay>
          )
        })}
      </div>
    </div>
  )
}
