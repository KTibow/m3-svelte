import type { HTMLButtonAttributes } from "svelte/elements";

export type NotButton<T> = Omit<T, "onclick">;
export type ButtonAttrs = HTMLButtonAttributes & Required<Pick<HTMLButtonAttributes, "onclick">>;
// thanks to https://stackoverflow.com/a/52140738/15557835
export type OneOf<T, TKey extends keyof T = keyof T> =
    TKey extends keyof T ? { [P in TKey]-?: T[TKey] } & Partial<Record<Exclude<keyof T, TKey>, never>> : never
export type ProgressAria = OneOf<{ "aria-label": string; "aria-labelledby": string }>