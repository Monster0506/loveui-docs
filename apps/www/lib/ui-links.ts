const vercelEnv =
  process.env.NEXT_PUBLIC_VERCEL_ENV ??
  process.env.VERCEL_ENV ??
  (process.env.NODE_ENV === "production" ? "production" : "development");

const rawUiUrl = process.env.NEXT_PUBLIC_LOVEUI_UI_URL;
const fallbackUiUrl = vercelEnv === "production" ? "https://ui.loveui.dev" : "/ui";

type UiBase = {
  origin: string | null;
  prefix: string;
};

function ensureUiPrefix(prefix: string) {
  if (prefix === "" || prefix === "/") {
    return "/ui";
  }

  return prefix.endsWith("/ui") ? prefix : `${prefix}/ui`;
}

function parseUiBase(raw?: string | null): UiBase {
  const trimmed = raw?.trim();

  if (!trimmed) {
    return { origin: null, prefix: "/ui" };
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const pathname = url.pathname.replace(/\/+$/, "");
      return {
        origin: url.origin,
        prefix: ensureUiPrefix(pathname),
      };
    } catch {
      // fall through to relative parsing
    }
  }

  let prefix = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  prefix = prefix.replace(/\/+$/, "");
  return { origin: null, prefix: ensureUiPrefix(prefix) };
}

export const uiBase = parseUiBase(rawUiUrl ?? fallbackUiUrl);

export function normalizeUiPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildUiHref(path: string) {
  const normalizedPath = normalizeUiPath(path);

  if (uiBase.origin) {
    const relative = `${uiBase.prefix.replace(/^\//, "")}${normalizedPath}`;
    const url = new URL(relative.replace(/\/{2,}/g, "/"), `${uiBase.origin}/`);
    return url.toString();
  }

  return `${uiBase.prefix}${normalizedPath}`.replace(/\/{2,}/g, "/");
}

export function buildUiActiveHref(path: string) {
  return `/ui${normalizeUiPath(path)}`.replace(/\/{2,}/g, "/");
}
