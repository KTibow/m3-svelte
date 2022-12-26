<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import Button from "$lib/buttons/Button.svelte";
  import Card from "$lib/containers/Card.svelte";
  export let name: string;
  export let mtLink: string;
  export let ghLink: string | undefined = undefined;
  export let desc: string;
  export let category: string;
  const categoriesToShow: Writable<{ label: string }[]> = getContext("categories");
</script>

{#if $categoriesToShow.some((c) => c.label == category)}
  <Card type="filled" clickable on:click={() => window.open(mtLink, "_blank")}>
    <h3 class="md-headline-large">{name}</h3>
    {#if ghLink}
      <Button type="outlined" on:click={() => window.open(ghLink, "_blank")}>
        Open implementation
      </Button>
    {/if}
    <p>{desc}</p>
  </Card>
{/if}
