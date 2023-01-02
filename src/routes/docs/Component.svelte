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
  <Card type="filled">
    <h3 class="md-headline-large">{name}</h3>
    <p>{desc}</p>
    <div class="buttons">
      <Button type="filled" href={mtLink} target="_blank">Open Material</Button>
      {#if ghLink}
        <Button type="outlined" href={ghLink} target="_blank">Open implementation</Button>
      {/if}
    </div>
    <style>
      .buttons {
        display: flex;
        gap: 0.5rem;
        margin-top: auto;
      }
    </style>
  </Card>
{/if}
