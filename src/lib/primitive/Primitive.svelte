<script lang="ts">
  import { type Component, type Snippet } from "svelte";
  import type { PrimitiveProps } from "$lib/primitive/index";

  // Destructure props with rest parameters
  let { as = "div", asChild = false, children, ...restProps }: PrimitiveProps = $props();

  interface Props {
    [key: string]: any;
  }

  let Comp: ConstructorOfATypedSvelteComponent | Component<any, any, any> | null | undefined = $state();

  // set the value with condition to avoid typescript angry at rendering string
  if (typeof as !== "string")
    Comp = as;

</script>

{#if asChild}
  <!-- Render the slot content without wrapping it in an element -->
  {@render children?.()}
{:else if (typeof as !== 'string')}
  <Comp {...restProps}>{@render children?.()}</Comp>
{:else}
  <svelte:element this={as} {...restProps}>{@render children?.()}</svelte:element>
{/if}
