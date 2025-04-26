<script lang="ts">
  import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";
  import { cn } from "$lib/misc/utils";
  import { buttonVariants, type ButtonVariantProps } from "$lib/buttons";
  import type { Snippet } from "svelte";
  import Primitive from "$lib/primitive/Primitive.svelte";
  import type { PrimitiveProps } from "$lib/primitive";

  interface ButtonProps extends PrimitiveProps {
    iconType?: ButtonVariantProps["iconType"]
    type?: ButtonVariantProps["type"]
    //TODO handle type any
    onclick?: MouseEventHandler<any> | null
    children?: Snippet,
    //TODO handle type any
    class?: HTMLAttributes<any>["class"],
    [key: string]: any;
  }

  let { as = 'button', iconType = "none", type = "elevated", disabled = false, children, class: className, onclick, ...attrs }: ButtonProps = $props();

</script>

<Primitive
  {as}
  {disabled}
  {onclick}
  class={cn(buttonVariants({ type, iconType }), className)}
  {...attrs}
>
  <Layer />
  {@render children?.()}
</Primitive>
