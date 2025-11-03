import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/building-blocks/default/ui/accordion"

const items = [
  {
    id: "1",
    title: "What are loveui Building Blocks?",
    content:
      "Building Blocks are pre-built sections for marketing sites, dashboards, and apps. They share the same tokens as our core library so you can drop them into a project without redesigning anything.",
  },
  {
    id: "2",
    title: "How flexible are the layouts?",
    content:
      "Every block exposes the same design tokens and utility classes as loveui. Tweak spacing, swap typography, or compose new variants without fighting a locked-in stylesheet.",
  },
  {
    id: "3",
    title: "Can they connect to real data?",
    content:
      "Blocks ship as plain React components with mock data. Replace it with your API, CMS, or server actions in minutes—no proprietary data layer to unwind.",
  },
  {
    id: "4",
    title: "Are they production ready?",
    content:
      "We audit focus states, keyboard paths, and ARIA semantics before releasing a block. Light and dark theme snapshots are included so you can ship confidently.",
  },
]

export default function Component() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Table w/ left chevron</h2>
      <Accordion
        type="single"
        collapsible
        className="w-full -space-y-px"
        defaultValue="3"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
          >
            <AccordionTrigger className="justify-start gap-3 rounded-md py-2 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="ps-7 pb-2 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
