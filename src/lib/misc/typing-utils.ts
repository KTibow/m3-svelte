import type { HTMLButtonAttributes } from "svelte/elements";

export type NotButton<T> = Omit<T, "onclick">;
export type ButtonAttrs = HTMLButtonAttributes & Required<Pick<HTMLButtonAttributes, "onclick">>;
