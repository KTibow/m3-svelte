<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
</script>

<div class="m3-container" style="display: {display};" {...extraOptions}>
  <slot />
</div>

<style>
  :root {
    --m3-snackbar-shape: var(--m3-util-rounding-extra-small);
  }
  .m3-container {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    min-width: 20rem;
    max-width: 60rem;
    min-height: 3rem;
    border-radius: var(--m3-snackbar-shape);
    box-shadow: var(--m3-util-elevation-3);
    background-color: rgb(var(--m3-scheme-inverse-surface));
    color: rgb(var(--m3-scheme-inverse-on-surface));
    animation:
      snackbarIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1),
      opacity 100ms cubic-bezier(0.05, 0.7, 0.1, 1);
  }
  /*@TODO: Fix animation with different shaping or something*/
  @keyframes snackbarIn {
    0% {
      clip-path: polygon(
        -100% 150%,
        -100% calc(100% + 0.25rem),
        0% calc(100% + 0.25rem),
        0.033rem calc(100% + 0.125rem),
        0.125rem calc(100% + 0.033rem),
        0.25rem 100%,
        calc(100% - 0.25rem) 100%,
        calc(100% - 0.125rem) calc(100% + 0.033rem),
        calc(100% - 0.033rem) calc(100% + 0.125rem),
        100% calc(100% + 0.25rem),
        200% calc(100% + 0.25rem),
        200% 150%
      );
    }
    100% {
      clip-path: polygon(
        -100% 150%,
        -100% 0.25rem,
        0% 0.25rem,
        0.033rem 0.125rem,
        0.125rem 0.033rem,
        0.25rem 0%,
        calc(100% - 0.25rem) 0%,
        calc(100% - 0.125rem) 0.033rem,
        calc(100% - 0.033rem) 0.125rem,
        100% 0.25rem,
        200% 0.25rem,
        200% 150%
      );
    }
  }
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
