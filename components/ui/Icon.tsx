import { ICON_PATHS } from "./iconPaths";

export function hasIcon(name: string): boolean {
  return Boolean(ICON_PATHS[name]);
}

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
};

/**
 * Faithful React port of the original `ic(name, size)` helper.
 * Renders a 24x24 lucide-style stroke icon. When `name` isn't a known
 * icon key, callers should fall back to rendering the raw text (e.g.
 * initials) themselves.
 */
export function Icon({ name, size = 15, className, color, strokeWidth = 1.75 }: IconProps) {
  const body = ICON_PATHS[name] || "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        verticalAlign: "middle",
        pointerEvents: "none",
      }}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
