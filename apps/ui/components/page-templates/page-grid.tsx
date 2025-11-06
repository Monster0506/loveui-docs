export default function PageGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden">
      <div className="space-y-0 *:border-b *:border-zinc-200 *:py-12 last:*:border-b-0 dark:*:border-zinc-900">
        {children}
      </div>
    </div>
  )
}
