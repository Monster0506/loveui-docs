import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../packages/ui/src/ui/accordion";

export function FaqsSection() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16">
      <div className="space-y-2">
        <h2 className="font-semibold text-3xl md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Answers to the questions we hear most about adopting LoveUI in production. Still unsure? Reach out and we'll help you evaluate the fit.
        </p>
      </div>
      <Accordion
        className="-space-y-px w-full rounded-lg bg-card shadow dark:bg-card/50"
        defaultValue={["item-1"]}
        multiple={false}
      >
        {questions.map((item) => (
          <AccordionItem
            className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
            key={item.id}
            value={item.id}
          >
            <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-muted-foreground">
        Can't find what you're looking for? Email us at{" "}
        <a className="text-primary hover:underline" href="mailto:hello@loveui.dev">
          hello@loveui.dev
        </a>{" "}
        and we'll get back within a day.
      </p>
    </div>
  );
}

const questions = [
  {
    id: "item-1",
    title: "What is LoveUI?",
    content:
      "LoveUI is our opinionated React component library, complete with backgrounds, marketing blocks, and documentation used across loveui.dev. It gives you the exact building blocks we rely on to ship new surfaces fast.",
  },
  {
    id: "item-2",
    title: "Which frameworks are supported?",
    content:
      "Every component is built with React, TypeScript, and Tailwind. They work instantly in Next.js, and drop into other React setups with minor adjustments to routing or data fetching.",
  },
  {
    id: "item-3",
    title: "Can I customize the look and feel?",
    content:
      "Yes. Tokens for color, typography, spacing, and radius mirror the theme config documented across the LoveUI design kit, so you can override decisions globally or per component without rewriting markup.",
  },
  {
    id: "item-4",
    title: "Do the components cover accessibility?",
    content:
      "We bake in keyboard support, focus management, and ARIA attributes. LoveUI sits on top of Base UI primitives, so accessibility isn’t an afterthought—it’s part of the contract.",
  },
  {
    id: "item-5",
    title: "How often do you ship updates?",
    content:
      "We dogfood LoveUI on our marketing site and docs, so enhancements land weekly. The changelog highlights new blocks, backgrounds, and fixes as soon as they’re available.",
  },
  {
    id: "item-6",
    title: "Can I request a new component?",
    content:
      "Absolutely. Open an issue or drop us a note with your use case. We prioritise components that benefit the broader community and share progress publicly.",
  },
];
