import {
  AtSignIcon,
  CommandIcon,
  EclipseIcon,
  PlusIcon,
  ZapIcon,
} from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/registry/building-blocks/default/ui/accordion"

const items = [
  {
    id: "1",
    icon: CommandIcon,
    title: "What are loveui Building Blocks?",
    content:
      "Building Blocks are pre-built sections for marketing sites, dashboards, and apps. They share the same tokens as our core library so you can drop them into a project without redesigning anything.",
  },
  {
    id: "2",
    icon: EclipseIcon,
    title: "How flexible are the layouts?",
    content:
      "Every block exposes the same design tokens and utility classes as loveui. Tweak spacing, swap typography, or compose new variants without fighting a locked-in stylesheet.",
  },
  {
    id: "3",
    icon: ZapIcon,
    title: "Can they connect to real data?",
    content:
      "Blocks ship as plain React components with mock data. Replace it with your API, CMS, or server actions in minutes—no proprietary data layer to unwind.",
  },
  {
    id: "4",
    icon: AtSignIcon,
    title: "Are they production ready?",
    content:
      "We audit focus states, keyboard paths, and ARIA semantics before releasing a block. Light and dark theme snapshots are included so you can ship confidently.",
  },
]

export default function Component() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">W/ icon and plus-minus</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                <span className="flex items-center gap-3">
                  <item.icon
                    size={16}
                    className="shrink-0 opacity-60"
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </span>
                <PlusIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="ps-7 pb-2 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
