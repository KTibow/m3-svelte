import type { Component } from "svelte";
import Layer from "./Layer.svelte";
import SimpleLayer from "./SimpleLayer.svelte";

let rippleDisabled = false;
try {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    rippleDisabled = true;
  }
  // @ts-ignore
  else if (M3_SVELTE_NO_RIPPLE) {
    rippleDisabled = true;
  }
} catch {}

export default (rippleDisabled ? SimpleLayer : Layer) as Component;
