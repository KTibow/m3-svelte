<script lang="ts">
  import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { navListVariants, type NavListVariants } from "$lib/nav/index";
  import { cn } from "$lib/misc/utils";

  type NavListProps = {
    type: NavListVariants["type"]
    className?: HTMLAttributes<any>["class"],
    children: Snippet
    disabled?: boolean
  }

  let { type, className, children }: NavListProps = $props();
</script>

<nav class={cn(navListVariants({ type }), className)}>
  {@render children?.()}
</nav>
