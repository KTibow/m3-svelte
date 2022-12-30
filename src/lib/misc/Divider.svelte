<script lang="ts">
  export let inset: "none" | "middle" | "right" | "list-inset" = "none";
  export let verticalSpace = true;
  export let color: "outline" | "surface" = "outline";
</script>

<hr class="type-{inset} color-{color}" class:verticalSpace />

<style>
  hr {
    margin: 0;
    height: 0;
    border: none;
    border-bottom: solid 1px currentColor;
  }
  .type-middle {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .type-right {
    margin-left: 1rem;
  }
  .type-list-inset {
    margin-left: 1rem;
    margin-right: 1.5rem;
  }
  .verticalSpace {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .color-outline {
    color: rgb(var(--md-sys-color-outline-variant));
  }
  .color-surface {
    color: rgb(var(--md-sys-color-surface-variant));
  }
</style>
