import Link from "next/link";

const assetBase = "/thumbs";

type Category = {
  slug: string;
  name: string;
  components: number;
  imageKey: keyof typeof thumbs;
};

const thumbs = {
  accordion: { light: `${assetBase}/accordion.png`, dark: `${assetBase}/accordion-dark.png` },
  alert: { light: `${assetBase}/alert.png`, dark: `${assetBase}/alert-dark.png` },
  avatar: { light: `${assetBase}/avatar.png`, dark: `${assetBase}/avatar-dark.png` },
  badge: { light: `${assetBase}/badge.png`, dark: `${assetBase}/badge-dark.png` },
  banner: { light: `${assetBase}/banner.png`, dark: `${assetBase}/banner-dark.png` },
  breadcrumb: { light: `${assetBase}/breadcrumb.png`, dark: `${assetBase}/breadcrumb-dark.png` },
  button: { light: `${assetBase}/button.png`, dark: `${assetBase}/button-dark.png` },
  calendar: { light: `${assetBase}/calendar-date-picker.png`, dark: `${assetBase}/calendar-date-picker-dark.png` },
  dropdown: { light: `${assetBase}/dropdown.png`, dark: `${assetBase}/dropdown-dark.png` },
  popover: { light: `${assetBase}/popover.png`, dark: `${assetBase}/popover-dark.png` },
  tabs: { light: `${assetBase}/tabs.png`, dark: `${assetBase}/tabs-dark.png` },
  toast: { light: `${assetBase}/notification.png`, dark: `${assetBase}/notification-dark.png` },
} as const;

const featuredCategories: Category[] = [
  { slug: "accordion", name: "Accordion", components: 20, imageKey: "accordion" },
  { slug: "alert", name: "Alert", components: 12, imageKey: "alert" },
  { slug: "avatar", name: "Avatar", components: 23, imageKey: "avatar" },
  { slug: "badge", name: "Badge", components: 13, imageKey: "badge" },
  { slug: "banner", name: "Banner", components: 12, imageKey: "banner" },
  { slug: "breadcrumb", name: "Breadcrumb", components: 8, imageKey: "breadcrumb" },
  { slug: "button", name: "Button", components: 54, imageKey: "button" },
  { slug: "calendar-date-picker", name: "Calendar", components: 28, imageKey: "calendar" },
  { slug: "dropdown-menu", name: "Dropdown menu", components: 18, imageKey: "dropdown" },
  { slug: "popover", name: "Popover", components: 16, imageKey: "popover" },
  { slug: "tabs", name: "Tabs", components: 14, imageKey: "tabs" },
  { slug: "toast", name: "Toast", components: 12, imageKey: "toast" },
];

export function BuildingBlocksGallery() {
  return (
    <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-10">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredCategories.map((category) => (
          <GalleryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}

function GalleryCard({ category }: { category: Category }) {
  const href = `/ui/building-blocks/${category.slug}`;
  const alt = `${category.name} building block preview`;
  const image = thumbs[category.imageKey];

  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm transition hover:border-primary/40 hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/40">
        <img
          className="w-full rounded-xl dark:hidden"
          src={image.light}
          alt={alt}
          loading="lazy"
        />
        <img
          className="hidden w-full rounded-xl dark:block"
          src={image.dark}
          alt={`${alt} dark`}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-sm font-medium text-foreground group-hover:text-primary">
          {category.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {category.components} {category.components === 1 ? "Component" : "Components"}
        </span>
      </div>
    </Link>
  );
}
