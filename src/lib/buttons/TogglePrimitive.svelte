<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "./Button.svelte";

  let {
    toggle = $bindable(),
    variant,
    round = false,
    size,
    children,
  }: {
    toggle: boolean;
    variant?: "filled" | "tonal";
    round?: boolean;
    size?: "xs" | "s" | "m" | "l" | "xl";
    children: Snippet;
  } = $props();
  const id = $props.id();
</script>

<input type="checkbox" {id} bind:checked={toggle} />
<Button for={id} {variant} square={!round} {size} {children} />
