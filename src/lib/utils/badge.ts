import type { IconifyIcon } from "@iconify/types";

export const addBadge = (icon: IconifyIcon, n?: number) => {
  const { width, height } = icon;
  if (!width || !height) throw new Error("Icon must have icon and height");

  let badge;
  if (n) {
    const x = width - 12;
    const y = 14 - 16; // 14 down, 16 up
    const max = 999;
    const text = n > max ? `${max}+` : n.toString();
    badge =
      `<!--badge--><foreignObject x="${x}" y="${y}" width="40" height="16">` +
      `<div class="m3-font-label-small" style="${[
        "background-color:var(--color-error)",
        "color:var(--color-on-error)",
        "width:max-content",
        "padding-inline:4px",
        "border-radius:var(--m3-util-rounding-full)",
      ].join(";")}">` +
      text +
      `</div>`;
  } else {
    badge = `<circle cx="${width - 3}" cy="3" r="3" fill="var(--color-error)"/>`;
  }
  return {
    ...icon,
    body: icon.body + badge,
  };
};
