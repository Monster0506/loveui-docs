import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { Index } from "@/registry/__index__"

interface ComponentPreviewProps
  extends Omit<React.ComponentProps<"div">, "ref"> {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Component = Index[name]?.component

  if (!Component) {
    return (
      <p className="text-sm text-muted-foreground">
        Component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={<Component />}
      source={<ComponentSource name={name} collapsible={false} />}
      {...props}
    />
  )
}
