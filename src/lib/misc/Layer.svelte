<script lang="ts">
  import Ripple from "./_ripple.svelte";
  import RippleSimple from "./_ripplesimple.svelte";

  let ripple = $state(RippleSimple);
  if (
    // @ts-expect-error about M3_SVELTE_NO_RIPPLE
    typeof M3_SVELTE_NO_RIPPLE == "undefined" &&
    (typeof window == "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  ) {
    ripple = Ripple;
  }

  const Component = $derived(ripple);
</script>

<Component />
