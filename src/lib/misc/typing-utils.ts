import type {
  HTMLLabelAttributes,
  HTMLAnchorAttributes,
  HTMLButtonAttributes,
  HTMLAttributes,
} from "svelte/elements";

export type LabelAttrs = Omit<HTMLLabelAttributes, "for"> & {
  for: NonNullable<HTMLLabelAttributes["for"]>;
};

export type AnchorAttrs = Omit<HTMLAnchorAttributes, "href"> & {
  href: NonNullable<HTMLAnchorAttributes["href"]>;
};

export type NotButton<T> = Omit<T, "onclick"> & { onclick?: undefined };
export type ButtonAttrs = Omit<HTMLButtonAttributes, "onclick"> & {
  onclick: NonNullable<HTMLButtonAttributes["onclick"]>;
};

export type DivAttrs = NotButton<HTMLAttributes<HTMLDivElement>>;
