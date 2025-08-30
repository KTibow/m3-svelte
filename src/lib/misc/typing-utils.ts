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
