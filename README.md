# LoveUI

LoveUI is a layered interface system for product teams that want production-ready UI without babysitting a design system. It combines copy‑pasteable React primitives, production patterns, ambient backgrounds, and tooling that keeps everything in sync—from the CLI to AI integrations.

![LoveUI banner](https://github.com/user-attachments/assets/56dfe7f7-85b7-44ee-b89a-1c30c5c4a156)

## What you get

- **Primitives** – 40+ Base UI powered components with LoveUI tokens and accessibility baked in.
- **Particles** – Application-level flows and surfaces (dashboards, onboarding, billing) sourced from real product work.
- **Backgrounds** – Procedural canvases like Ether, Silk, and Gradiant Blinds tuned for marketing and in-product moments.
- **Design tokens** – Color, typography, depth, and motion scales that can be themed or swapped.
- **CLI + Registry** – `npx loveui add` pulls components locally, diffs updates, and now ships an MCP server for AI copilots.
- **Docs tooling** – llms.txt, copy-to-clipboard snippets, and AI-friendly MDX examples.

LoveUI started inside [Cal.com](https://cal.com) and is now maintained as an open, community-driven system. The roadmap includes atoms (API-aware components), VS Code integrations, and opinionated theme packs.

## Monorepo tour

This repository is a Turborepo that houses every product surface and package that makes up LoveUI:

| Path | Purpose |
| --- | --- |
| `apps/www` | Marketing site and launch pages |
| `apps/ui` | Documentation, component previews, and registry endpoints |
| `apps/origin` | Legacy Radix-based Love UI snapshot (read-only) |
| `packages/*` | Published packages such as components, tokens, utilities, and starters |
| `packages/loveui` | The CLI + registry bundler distributed on npm |
| `packages/ui` | Shared UI building blocks used across apps |
| `scripts/index.ts` | Helper script to pull registry items with shadcn tooling |

Everything is written in TypeScript and uses Next.js, Tailwind CSS, and Bun for local commands.

## Getting started

1. **Install prerequisites**
   - Node.js 20+
   - [Bun](https://bun.sh/) 1.3+
2. **Install dependencies**
   ```bash
   bun install
   ```
3. **Start local development**
   ```bash
   bun run dev
   ```
   Use filters to focus on a single app:
   ```bash
   bun run dev --filter=ui
   bun run dev --filter=www
   bun run dev --filter=origin
   ```
4. **Build the whole stack**
   ```bash
   bun run build
   ```

### Environment variables

The Next.js apps link to each other. Copy `.env.example` entries (or create `.env.local`) inside `apps/www`, `apps/ui`, and `apps/origin` to configure cross-app URLs. Turborepo invalidates caches automatically when env files change.

## LoveUI CLI and registry

Install components straight into any project:

```bash
npx loveui add badge marquee silk
```

- The CLI mirrors the live registry at `https://www.loveui.dev`, copies template files, and respects `components.json`.
- After building (`bun run build:cli`), the CLI bundles every package from this repo.
- Use the MCP server to expose the registry to AI copilots:
  ```bash
  npx loveui-mcp
  ```
  Agents can browse resources via `loveui://registry/{package}` or call the `get-loveui-package` tool to receive JSON definitions.

## Documentation & learning

- Docs site: [`/ui`](https://loveui.dev/ui)
- Quick start: [`apps/ui/content/docs/(root)/get-started.mdx`](apps/ui/content/docs/(root)/get-started.mdx)
- Roadmap: [`apps/ui/content/docs/(root)/roadmap.mdx`](apps/ui/content/docs/(root)/roadmap.mdx)
- Change log: [`/ui/docs/changelog`](https://loveui.dev/ui/docs/changelog)

## Contributing

We welcome issues, feature ideas, and pull requests. Check out [`apps/ui/CONTRIBUTING.md`](apps/ui/CONTRIBUTING.md) for setup tips, coding standards, and triage flow. Most roadmap items started as community requests—feedback is always appreciated.

## Licensing

LoveUI uses a mixed license model:

- **AGPLv3** – Everything in this repository unless noted otherwise.
- **MIT** – The legacy `apps/origin` snapshot remains under its original license.

See [`LICENSE`](LICENSE) and [`LICENSING.md`](LICENSING.md) for full details.

## Community & support

- Follow [@loveui](https://x.com/loveui) for release snapshots.
- Subscribe to the [LoveUI updates feed](https://loveui.dev/ui/docs/changelog) for real-time drops.
- Open a discussion or issue for anything you need—accessibility sweeps, design packs, or integration ideas.

LoveUI is built in public. Ship faster, keep ownership, and have a little fun while you do it. 🚀
