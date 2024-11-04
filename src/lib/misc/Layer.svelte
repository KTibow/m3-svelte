<script lang="ts">
  import Ripple from "./_ripple.svelte";
  import RippleSimple from "./_ripplesimple.svelte";

  let ripple = RippleSimple;
  if (
    // @ts-ignore
    typeof M3_SVELTE_NO_RIPPLE == "undefined" &&
    (typeof window == "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  ) {
    ripple = Ripple;
  }
</script>

<svelte:component this={ripple} />