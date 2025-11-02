"use client";

import Link from "next/link";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "../../../../packages/announcement";
import { PageHeaderHeading } from "@workspace/ui/components/page-header";
import { Button } from "@workspace/ui/ui/button";

import Beams from "@/components/beams";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100vh-var(--header-height))] flex-col overflow-hidden border-b border-border/40 transition-colors duration-300 bg-background dark:bg-sidebar"
    >
      <div className="pointer-events-none absolute inset-0 -z-5  ">
        <Beams
          beamNumber={18}
          beamHeight={28}
          scale={0.18}
          beamWidth={2.8}
          speed={1.1}
          noiseIntensity={0.8}
          lightColor="#949494"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-white/95 to-white transition-colors duration-300 dark:from-sidebar dark:via-sidebar/95 dark:to-sidebar" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[46rem] transition-colors duration-300 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.75)_55%,rgba(255,255,255,0.92)_80%,rgba(255,255,255,1)_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(15,15,15,0.4)_55%,rgba(15,15,15,0.78)_75%,rgba(15,15,15,1)_100%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8 px-4 py-24 text-center lg:gap-10 lg:py-32">
        <Announcement
          themed
          className="border-transparent bg-white/80 text-sm text-foreground shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80"
          render={<Link href="/ui/docs/changelog" />}
        >
          <AnnouncementTag>Update</AnnouncementTag>
          <AnnouncementTitle>LoveUI 2.0 — new beams, new docs</AnnouncementTitle>
        </Announcement>
        <PageHeaderHeading className="max-w-3xl text-balance text-5xl leading-tight text-foreground md:text-6xl lg:text-7xl">
          Build polished interfaces at the speed of copy&nbsp;+&nbsp;paste
        </PageHeaderHeading>
        <p className="max-w-2xl text-balance text-lg text-muted-foreground">
          LoveUI is our curated library of React components, backgrounds, and editorial-quality docs that help your team ship
          cohesive product experiences without wrestling with design systems from scratch.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="xl" render={<Link href="https://loveui.dev/ui/docs" />}>
            Browse the docs
          </Button>
          <Button size="xl" variant="outline" render={<Link href="https://loveui.dev/ui/building-blocks" />}>
            Explore blocks
          </Button>
        </div>
      </div>
    </section>
  );
}
