import {
  AtSignIcon,
  ChevronDownIcon,
  CircleDashedIcon,
  CommandIcon,
  EclipseIcon,
  GaugeIcon,
  LucideIcon,
  ZapIcon,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/building-blocks/default/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/building-blocks/default/ui/collapsible"

const items = [
  {
    id: "1",
    title: "What are loveui Building Blocks?",
    icon: CommandIcon,
    collapsibles: [
      {
        title: "Which projects are they built for?",
        content:
          "The library covers hero sections, feature grids, onboarding flows, and dashboards so teams can prototype or ship faster.",
        icon: GaugeIcon,
      },
      {
        title: "Can I mix and match blocks?",
        content:
          "Spacing, grid, and typographic tokens stay consistent, so marketing and product surfaces snap together without visual drift.",
        icon: CircleDashedIcon,
      },
    ],
  },
  {
    id: "2",
    title: "How flexible are the layouts?",
    icon: EclipseIcon,
    collapsibles: [
      {
        title: "Do I have to override CSS?",
        content:
          "Tokens live in CSS variables and Tailwind utilities, letting you restyle components globally or per block without ejecting styles.",
        icon: GaugeIcon,
      },
      {
        title: "Can I adjust behavior?",
        content:
          "Blocks expose plain React props and composition patterns, so you can add form logic, analytics, or custom animations wherever you need them.",
        icon: CircleDashedIcon,
      },
    ],
  },
  {
    id: "3",
    title: "Can they connect to real data?",
    icon: ZapIcon,
    collapsibles: [
      {
        title: "What's the integration story?",
        content:
          "Swap the demo arrays with Prisma, REST, or GraphQL data—there's no proprietary layer to unwind.",
        open: true,
        icon: GaugeIcon,
      },
      {
        title: "Do they work with server components?",
        content:
          "Each block is compatible with Next.js Server Components and hydrates only the interactive pieces by default.",
        icon: CircleDashedIcon,
      },
    ],
  },
  {
    id: "4",
    title: "Are they production ready?",
    icon: AtSignIcon,
    collapsibles: [
      {
        title: "How do you handle accessibility?",
        content:
          "We lint ARIA, verify keyboard paths, and run screen reader checks before publishing a block update.",
        icon: GaugeIcon,
      },
      {
        title: "Will they keep evolving?",
        content:
          "Blocks ship alongside loveui releases with changelogs and upgrade notes so your product stays in sync.",
        icon: CircleDashedIcon,
      },
    ],
  },
]

export default function Component() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Multi-level w/ icon</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="outline-none has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
          >
            <AccordionTrigger className="justify-start gap-3 rounded-md text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
              <span className="flex items-center gap-3">
                <item.icon
                  size={16}
                  className="shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <span>{item.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              {item.collapsibles.map((collapsible, index) => (
                <CollapsibleDemo
                  key={index}
                  title={collapsible.title}
                  content={collapsible.content}
                  open={collapsible.open}
                  icon={collapsible.icon}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function CollapsibleDemo({
  title,
  content,
  open,
  icon: Icon,
}: {
  title: string
  content: string
  open?: boolean
  icon: LucideIcon
}) {
  return (
    <Collapsible className="border-t py-3 ps-6 pe-4" defaultOpen={open}>
      <CollapsibleTrigger className="flex gap-2 text-[15px] leading-6 font-semibold [&[data-state=open]>svg]:rotate-180">
        <ChevronDownIcon
          size={16}
          className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
          aria-hidden="true"
        />
        <span className="flex items-center gap-3">
          <Icon size={16} className="shrink-0 opacity-60" aria-hidden="true" />
          <span>{title}</span>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 overflow-hidden ps-6 text-sm text-muted-foreground transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {content}
      </CollapsibleContent>
    </Collapsible>
  )
}
