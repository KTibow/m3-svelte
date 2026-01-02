import type {
  HTMLLabelAttributes,
  HTMLAnchorAttributes,
  HTMLButtonAttributes,
  HTMLAttributes,
} from "svelte/elements";

type MakeRequired<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };

export type NotButton<T> = Omit<T, "onclick"> & { onclick?: undefined };
export type NotLink<T> = T & { href?: undefined };
export type ButtonAttrs = MakeRequired<NotLink<HTMLButtonAttributes>, "onclick">;

export type LabelAttrs = MakeRequired<NotLink<NotButton<HTMLLabelAttributes>>, "for">;

export type AnchorAttrs = MakeRequired<NotButton<HTMLAnchorAttributes>, "href">;

export type DivAttrs = NotLink<NotButton<HTMLAttributes<HTMLDivElement>>>;
