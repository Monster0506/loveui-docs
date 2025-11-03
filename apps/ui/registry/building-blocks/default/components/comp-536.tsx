import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/building-blocks/default/ui/timeline"

const items = [
  {
    id: 1,
    date: "15 minutes ago",
    title: "Ian Schroeter",
    action: "opened a new issue",
    description:
      "I'm having trouble with the new component library. It's not rendering properly.",
    image: "https://i.pravatar.cc/160?img=8",
  },
  {
    id: 2,
    date: "10 minutes ago",
    title: "Connor Love",
    action: "commented on",
    description:
      "Hey Ian, I'm having trouble with the new component library. It's not rendering properly.",
    image: "https://i.pravatar.cc/160?img=9",
  },
  {
    id: 3,
    date: "5 minutes ago",
    title: "Nathan Wickersham",
    action: "assigned you to",
    description:
      "The new component library is not rendering properly. Can you take a look?",
    image: "https://i.pravatar.cc/160?img=10",
  },
  {
    id: 4,
    date: "2 minutes ago",
    title: "Thomas Raklovits",
    action: "closed the issue",
    description: "The issue has been fixed. Please review the changes.",
    image: "https://i.pravatar.cc/160?img=12",
  },
]

export default function Component() {
  return (
    <Timeline>
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          step={item.id}
          className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
            <TimelineTitle className="mt-0.5">
              {item.title}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {item.action}
              </span>
            </TimelineTitle>
            <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7">
              <img
                src={item.image}
                alt={item.title}
                className="size-6 rounded-full"
              />
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent className="mt-2 rounded-lg border px-4 py-3 text-foreground">
            {item.description}
            <TimelineDate className="mt-1 mb-0">{item.date}</TimelineDate>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}