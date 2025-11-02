export default function Footer() {
  return (
    <footer className="relative mt-16 py-8 before:absolute before:-inset-x-32 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] md:mt-20">
      <div
        className="before:absolute before:-top-px before:-left-12 before:z-10 before:-ml-px before:size-[3px] before:bg-ring/50 after:absolute after:-top-px after:-right-12 after:z-10 after:-mr-px after:size-[3px] after:bg-ring/50"
        aria-hidden="true"
      ></div>
      <div className="flex justify-between gap-2 max-sm:flex-col max-sm:text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} loveui
        </p>
      </div>
    </footer>
  )
}
