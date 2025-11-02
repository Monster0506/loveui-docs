import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
  {
    name: "ui",
    type: "registry:ui",
    registryDependencies: [
      "@coss/accordion",
      "@coss/alert",
      "@coss/alert-dialog",
      "@coss/autocomplete",
      "@coss/avatar",
      "@coss/badge",
      "@coss/breadcrumb",
      "@coss/button",
      "@coss/card",
      "@coss/checkbox",
      "@coss/checkbox-group",
      "@coss/collapsible",
      "@coss/combobox",
      "@coss/dialog",
      "@coss/empty",
      "@coss/field",
      "@coss/fieldset",
      "@coss/form",
      "@coss/frame",
      "@coss/group",
      "@coss/input",
      "@coss/label",
      "@coss/menu",
      "@coss/meter",
      "@coss/number-field",
      "@coss/pagination",
      "@coss/popover",
      "@coss/preview-card",
      "@coss/progress",
      "@coss/radio-group",
      "@coss/scroll-area",
      "@coss/select",
      "@coss/separator",
      "@coss/sheet",
      "@coss/skeleton",
      "@coss/slider",
      "@coss/switch",
      "@coss/table",
      "@coss/tabs",
      "@coss/textarea",
      "@coss/toast",
      "@coss/toggle",
      "@coss/toggle-group",
      "@coss/toolbar",
      "@coss/tooltip",
    ],
  },
  {
    name: "accordion",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/accordion.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "alert",
    type: "registry:ui",
    files: [
      {
        path: "ui/alert.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      light: {
        "destructive-foreground": "oklch(0.505 0.213 27.518)",
        info: "oklch(0.623 0.214 259.815)",
        "info-foreground": "oklch(0.488 0.243 264.376)",
        success: "oklch(0.696 0.17 162.48)",
        "success-foreground": "oklch(0.508 0.118 165.612)",
        warning: "oklch(0.769 0.188 70.08)",
        "warning-foreground": "oklch(0.555 0.163 48.998)",
      },
      dark: {
        "destructive-foreground": "oklch(0.704 0.191 22.216)",
        info: "oklch(0.623 0.214 259.815)",
        "info-foreground": "oklch(0.707 0.165 254.624)",
        success: "oklch(0.696 0.17 162.48)",
        "success-foreground": "oklch(0.765 0.177 163.223)",
        warning: "oklch(0.769 0.188 70.08)",
        "warning-foreground": "oklch(0.828 0.189 84.429)",
      },
    },
  },
  {
    name: "alert-dialog",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/alert-dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "autocomplete",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    registryDependencies: ["@coss/input", "@coss/scroll-area"],
    files: [
      {
        path: "ui/autocomplete.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "avatar",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      light: {
        "destructive-foreground": "oklch(0.505 0.213 27.518)",
        info: "oklch(0.623 0.214 259.815)",
        "info-foreground": "oklch(0.488 0.243 264.376)",
        success: "oklch(0.696 0.17 162.48)",
        "success-foreground": "oklch(0.508 0.118 165.612)",
        warning: "oklch(0.769 0.188 70.08)",
        "warning-foreground": "oklch(0.555 0.163 48.998)",
      },
      dark: {
        "destructive-foreground": "oklch(0.704 0.191 22.216)",
        info: "oklch(0.623 0.214 259.815)",
        "info-foreground": "oklch(0.707 0.165 254.624)",
        success: "oklch(0.696 0.17 162.48)",
        "success-foreground": "oklch(0.765 0.177 163.223)",
        warning: "oklch(0.769 0.188 70.08)",
        "warning-foreground": "oklch(0.828 0.189 84.429)",
      },
    },
  },
  {
    name: "breadcrumb",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/breadcrumb.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      light: {
        "destructive-foreground": "oklch(0.505 0.213 27.518)",
      },
      dark: {
        "destructive-foreground": "oklch(0.704 0.191 22.216)",
      },
    },
  },
  {
    name: "card",
    type: "registry:ui",
    dependencies: [],
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/checkbox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkbox-group",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/checkbox-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "collapsible",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/collapsible.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "combobox",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    registryDependencies: ["@coss/input", "@coss/scroll-area"],
    files: [
      {
        path: "ui/combobox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "empty",
    type: "registry:ui",
    files: [
      {
        path: "ui/empty.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "field",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/field.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      light: {
        "destructive-foreground": "oklch(0.505 0.213 27.518)",
      },
      dark: {
        "destructive-foreground": "oklch(0.704 0.191 22.216)",
      },
    },
  },
  {
    name: "fieldset",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/fieldset.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "form",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "frame",
    type: "registry:ui",
    files: [
      {
        path: "ui/frame.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "group",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    registryDependencies: ["@coss/separator"],
    files: [
      {
        path: "ui/group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "label",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/label.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menu",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/menu.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      light: {
        "destructive-foreground": "oklch(0.505 0.213 27.518)",
      },
      dark: {
        "destructive-foreground": "oklch(0.704 0.191 22.216)",
      },
    },
  },
  {
    name: "meter",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/meter.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "number-field",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/number-field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "pagination",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    registryDependencies: ["@coss/button"],
    files: [
      {
        path: "ui/pagination.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "preview-card",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/preview-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "progress",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/progress.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "radio-group",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-area",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/scroll-area.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "separator",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/separator.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sheet",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    registryDependencies: ["@coss/dialog"],
    files: [
      {
        path: "ui/sheet.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton",
    type: "registry:ui",
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      theme: {
        "--animate-skeleton": "skeleton 2s -1s infinite linear",
      },
    },
    css: {
      "@keyframes skeleton": {
        to: {
          "background-position": "-200% 0",
        },
      },
    },
  },
  {
    name: "slider",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/slider.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/switch.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "table",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/textarea.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toast",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    registryDependencies: ["@coss/button"],
    files: [
      {
        path: "ui/toast.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggle",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/toggle.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    registryDependencies: ["@coss/separator", "@coss/toggle"],
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toolbar",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/toolbar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    dependencies: ["@base-ui-components/react"],
    files: [
      {
        path: "ui/tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "silk",
    type: "registry:ui",
    dependencies: ["@react-three/fiber", "three"],
    files: [
      {
        path: "ui/silk.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "ether",
    type: "registry:ui",
    dependencies: ["three"],
    files: [
      {
        path: "ui/ether.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "gradient-blinds",
    type: "registry:ui",
    dependencies: ["ogl"],
    files: [
      {
        path: "ui/gradient-blinds.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "ticker",
    type: "registry:ui",
    files: [
      {
        path: "ui/ticker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "marquee",
    type: "registry:ui",
    dependencies: ["react-fast-marquee"],
    files: [
      {
        path: "ui/marquee.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "video-player",
    type: "registry:ui",
    dependencies: ["media-chrome"],
    files: [
      {
        path: "ui/video-player.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "announcement",
    type: "registry:ui",
    files: [
      {
        path: "ui/announcement.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "avatar-stack",
    type: "registry:ui",
    files: [
      {
        path: "ui/avatar-stack.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "cursor",
    type: "registry:ui",
    files: [
      {
        path: "ui/cursor.tsx",
        type: "registry:ui",
      },
    ],
  },
]
