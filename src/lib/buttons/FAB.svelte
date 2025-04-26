<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import Layer from "$lib/misc/Layer.svelte";
  import Primitive from "$lib/primitive/Primitive.svelte";
  import type { PrimitiveProps } from "$lib/primitive";
  import { type FABVariantProps, fabVariants } from "$lib/buttons/index";
  import { cn } from "$lib/misc/utils";

  interface FABProps extends PrimitiveProps {
    size?: FABVariantProps["size"];
    color?: FABVariantProps["color"];
    elevation?: FABVariantProps["elevation"];
    icon?: IconifyIcon;
    text?: string;
    class?: HTMLButtonAttributes["class"];
  }

  let { as = "button", color, size, elevation, icon, text, class: className, ...attrs }: FABProps = $props();

  $effect(() => {
    if (!icon && !text) console.warn("you need at least something in a FAB");
    if (size != "normal" && text) console.warn("extended fabs are supposed to use size normal");
  });
</script>

<Primitive
  {as}
  class={cn(fabVariants({size, elevation, color}), className)}
  {...attrs}
>
  <Layer />
  {#if icon}
    <Icon {icon} />
  {/if}
  {#if text}
    {text}
  {/if}
</Primitive>
