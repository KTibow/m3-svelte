import type {
  HTMLLabelAttributes,
  HTMLAnchorAttributes,
  HTMLButtonAttributes,
  HTMLAttributes,
} from "svelte/elements";

export type LabelAttrs = HTMLLabelAttributes & Required<Pick<HTMLLabelAttributes, "for">>;

export type AnchorAttrs = HTMLAnchorAttributes & Required<Pick<HTMLAnchorAttributes, "href">>;

export type NotButton<T> = Omit<T, "onclick">;
export type ButtonAttrs = HTMLButtonAttributes & Required<Pick<HTMLButtonAttributes, "onclick">>;

export type DivAttrs = NotButton<HTMLAttributes<HTMLDivElement>>;

// thanks to https://stackoverflow.com/a/52140738/15557835
export type OneOf<T, TKey extends keyof T = keyof T> = TKey extends keyof T
  ? { [P in TKey]-?: T[TKey] } & Partial<Record<Exclude<keyof T, TKey>, never>>
  : never;
export type LabelledAria = OneOf<{ "aria-label": string; "aria-labelledby": string }>;
