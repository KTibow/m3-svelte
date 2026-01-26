<script lang="ts">
  import iconContrast from "@ktibow/iconset-material-symbols/contrast";
  import Slider from "$lib/forms/Slider.svelte";
  import Select from "$lib/forms/Select.svelte";

  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import { appType, density } from "../state";

  let {
    contrast = $bindable(),
    usePreExpressive = $bindable(),
    includeDimBright = $bindable(),
    includeFixed = $bindable(),
  }: {
    contrast: number;
    usePreExpressive: boolean;
    includeDimBright: boolean;
    includeFixed: boolean;
  } = $props();

  let showMore = $state(contrast != 0 || $density != 0 || $appType != "vanilla");
</script>

{#if showMore}
  <div class="content">
    <div class="long">
      <Slider
        min={-1}
        max={1}
        step={0.05}
        size="m"
        leadingIcon={iconContrast}
        format={(n) => n.toString()}
        bind:value={
          () => contrast,
          (n) => {
            if (n <= -0.5) n = -1;
            else if (n > -0.5 && n < 0) n = 0;
            contrast = n;
          }
        }
      />
      <ConnectedButtons>
        <Button square label size="m"
          ><input type="checkbox" bind:checked={usePreExpressive} />Pre-Expressive colors</Button
        >
        <Button square label size="m"
          ><input type="checkbox" bind:checked={includeDimBright} />Include Dim/Bright</Button
        >
        <Button square label size="m"
          ><input type="checkbox" bind:checked={includeFixed} />Include Fixed</Button
        >
      </ConnectedButtons>
    </div>
    <div>
      <Select
        label="Density"
        width="50%"
        options={[
          { text: "0", value: "0" },
          { text: "Variable", value: "variable" },
          { text: "-3", value: "-3" },
          { text: "-2", value: "-2" },
          { text: "-1", value: "-1" },
          { text: "+1", value: "1" },
          { text: "+2", value: "2" },
          { text: "+3", value: "3" },
        ]}
        bind:value={
          () => String($density),
          (val) => {
            $density = val == "variable" ? "variable" : Number(val);
          }
        }
      />
      <Select
        label="App Type"
        width="50%"
        options={[
          { text: "Vanilla", value: "vanilla" },
          { text: "Tailwind", value: "tailwind" },
        ]}
        bind:value={$appType}
      />
    </div>
  </div>
  {#if $appType == "tailwind"}
    <p style:text-align="center" style:margin-top="0.5rem">
      ⚠️ Tailwind <a href="https://github.com/tailwindlabs/tailwindcss/pull/19427"
        >may not support mixins yet</a
      >. You may need to stay on M3 Svelte v5 for now.
    </p>
  {/if}
{:else}
  <button class="content m3-layer" onclick={() => (showMore = true)}>
    Configure theme and more
  </button>
{/if}

<style>
  .content {
    background-color: var(--m3c-surface-container-low);
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
  }

  p {
    margin: 0;
  }

  button.content {
    @apply --m3-label-large;
  }
  div.content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    > * {
      display: grid;
      gap: 0.5rem;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      &.long {
        @media (width < 52.5rem) {
          grid-auto-flow: row;
        }
      }
    }
  }
</style>
