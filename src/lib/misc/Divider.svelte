<script lang="ts">
  export let inset: "none" | "middle" | "right" = "none";
</script>

<hr class="type-{inset}" />

<style>
  hr {
    height: 0;
    border: none;
    border-bottom: solid 1px rgb(var(--md-sys-color-outline-variant));
  }
  .type-none {
    margin: 0.5rem 0;
  }
  .type-middle {
    margin: 0.5rem 1rem;
  }
  .type-right {
    margin: 0.5rem 0 0.5rem 1rem;
  }
</style>
