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
      `<div style="${[
        "font-size:0.688rem",
        "letter-spacing:0.031rem",
        "font-weight:500",
        "background-color:var(--m3c-error)",
        "color:var(--m3c-on-error)",
        "width:max-content",
        "padding-inline:4px",
        "border-radius:var(--m3-shape-full)",
      ].join(";")}">` +
      text +
      `</div>`;
  } else {
    badge = `<circle cx="${width - 3}" cy="3" r="3" fill="var(--m3c-error)"/>`;
  }
  return {
    ...icon,
    body: icon.body + badge,
  };
};
