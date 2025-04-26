import type { Component, Snippet } from "svelte";

export type AsTag =
  | "a"
  | "button"
  | "div"
  | "form"
  | "h2"
  | "h3"
  | "img"
  | "input"
  | "label"
  | "li"
  | "nav"
  | "ol"
  | "p"
  | "span"
  | "svg"
  | "ul"
  | "template"
  | ({} & string) // any other string

export interface PrimitiveProps {
  asChild?: boolean;
  //		DynamicComponent: Component<{ prop: string }>; idk, i cannot read docs
  as?: AsTag | ConstructorOfATypedSvelteComponent | Component<any, any, any> | null;
  children?: Snippet;
  [key: string]: any; // rest props
}
