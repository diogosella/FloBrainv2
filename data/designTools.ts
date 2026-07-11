import type { DesignTool } from "./types";
import { CLAUDE_DESIGN } from "./sampleData";

// Design buddy tool catalog. The original used inline `action` closures;
// here we encode them as `actionKey` strings resolved by the design buddy
// component ("nav:<surface>" or "toast:<message>").
export const DESIGN_TOOLS: Record<string, DesignTool[]> = {
  essential: [
    { id: "figma", name: "Figma", icon: "figma", color: "#8B7EC8", desc: "Components, prototypes & shared libraries for the Design Team", api: "Figma REST API", url: "https://figma.com", status: "Connected", essential: true },
    { id: "storybook", name: "Storybook", icon: "storybook", color: "#E85D8C", desc: "FloBrain design system — live component previews & docs", api: "Storybook CLI", url: "https://storybook.js.org", status: "Synced", essential: true },
    { id: "vault", name: "FloVault", icon: "db", color: "#7C5CFF", desc: "Approved templates, assets & reusable knowledge", api: "Internal API", actionKey: "nav:vault", status: "3 in review", essential: true },
    { id: "design-room", name: "Design room", icon: "msg", color: "#7C5CFF", desc: "Async critiques, file links & sprint design threads", api: "FloRooms", actionKey: "nav:rooms", status: "2 active", essential: true },
  ],
  professional: [
    { id: "figma-dev", name: "Figma Dev Mode", icon: "code", color: "#5B9BD5", desc: "Inspect specs, spacing tokens & Code Connect mappings", api: "Dev Mode API", url: "https://figma.com/developers", status: "Ready" },
    { id: "stark", name: "Stark", icon: "a11y", color: "#5CB87A", desc: "WCAG contrast & accessibility audits inside Figma", api: "Stark Plugin", url: "https://getstark.co", status: "Installed" },
    { id: "unsplash", name: "Unsplash", icon: "camera", color: "#3DB8A8", desc: "Licensed hero imagery with attribution for Space VI", api: "Unsplash API", url: "https://unsplash.com/developers", status: "API key set" },
    { id: "coolors", name: "Coolors", icon: "palette", color: "#D4A04A", desc: "Palette exploration aligned to Dina color scales", api: "—", url: "https://coolors.co", status: "Pinned" },
  ],
  ai: [
    { ...(CLAUDE_DESIGN as DesignTool) },
    { id: "cursor", name: "Cursor", icon: "term", color: "#3DB8A8", desc: "Design-to-code workflow with FloBrain token context", api: "—", url: "https://cursor.com", status: "Active" },
    { id: "figma-ai", name: "Figma AI", icon: "figma", color: "#8B7EC8", desc: "First drafts, rename layers & auto-layout suggestions", api: "Figma AI", url: "https://figma.com/ai", status: "Beta" },
  ],
  apis: [
    { id: "figma-api", name: "Figma API sync", icon: "link", color: "#8B7EC8", desc: "Pull variables, components & file metadata into FloBrain", api: "GET /v1/files/:key", actionKey: "toast:Syncing Figma variables → design tokens…" },
    { id: "tokens-api", name: "Token pipeline", icon: "zap", color: "#7C5CFF", desc: "Export CSS custom properties from Design System v4", api: "POST /tokens/export", actionKey: "toast:Exported 42 tokens to flobrain-v2.html" },
    { id: "a11y-api", name: "A11y scanner", icon: "a11y", color: "#5CB87A", desc: "Batch-check contrast ratios across open frames", api: "POST /a11y/scan", actionKey: "toast:Scanning 8 frames — 2 contrast warnings found" },
    { id: "asset-api", name: "Asset CDN", icon: "imgicon", color: "#6B7FD7", desc: "Optimized exports from Figma → Vault with auto-naming", api: "POST /assets/publish", actionKey: "nav:vault" },
  ],
};
