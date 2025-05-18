<script lang="ts">
  import type { Snippet } from "svelte";
  import iconHeart from "@ktibow/iconset-material-symbols/favorite-outline";
  import Button from "$lib/buttons/Button.svelte";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import { base } from "$app/paths";
  import { page } from "$app/state";

  let { children }: { children: Snippet } = $props();

  const iconGithub = {
    body: `<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.42 9.42 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5A10.03 10.03 0 0 0 22 12 10 10 0 0 0 12 2"/>`,
    width: 24,
    height: 24,
  };
  const iconDiscord = {
    body: `<path fill="currentColor" d="M19.3 5.3A17 17 0 0 0 15 4l-.6 1.1a16.1 16.1 0 0 0-4.8 0A10 10 0 0 0 9 4c-1.5.3-3 .7-4.3 1.3a17.7 17.7 0 0 0-3 12A17.4 17.4 0 0 0 6.8 20L8 18.2l-1.7-.8v-.1l.3-.3h.1a12.4 12.4 0 0 0 10.6 0l.4.3-1.7.9 1 1.8h.1a17.3 17.3 0 0 0 5.3-2.7 17.6 17.6 0 0 0-3.1-12M8.5 15c-1 0-1.9-1-1.9-2.1s.9-2.1 2-2.1c1 0 1.8 1 1.8 2 0 1.3-.8 2.2-1.9 2.2m7 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1c1 0 1.9 1 1.9 2 0 1.3-.8 2.2-2 2.2"/>`,
    width: 24,
    height: 24,
  };

  const pages = {
    "quick-start": "Quick start",
    "detailed-walkthrough": "Detailed walkthrough",
  };
  const normalizePath = (path: string) => {
    const u = new URL(path, page.url.href);
    path = u.pathname;
    if (path.endsWith("/")) path = path.slice(0, -1);
    return path || "/";
  };
</script>

<div class="wrapper">
  <div class="sidebar-slot">
    <div class="sidebar m3-container">
      {#each Object.entries(pages) as [path, label]}
        {@const route = base + "/docs/" + path}
        {@const selected = normalizePath(route) === normalizePath(page.url.pathname)}
        <a class:selected href={route}>
          <Layer />
          {label}
        </a>
      {/each}
      <a href="{base}/llms.txt">
        <Layer />
        llms.txt
      </a>
      <div class="icons">
        <Button variant="text" iconType="full" href="https://github.com/sponsors/KTibow">
          <Icon icon={iconHeart} />
        </Button>
        <Button variant="text" iconType="full" href="https://discord.gg/gS8T5RnMmA">
          <Icon icon={iconDiscord} />
        </Button>
        <Button variant="text" iconType="full" href="https://github.com/KTibow/m3-svelte">
          <Icon icon={iconGithub} />
        </Button>
      </div>
    </div>
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
  }
  @media (width >= 37.5rem) {
    .wrapper {
      grid-template-rows: 1fr;
      grid-template-columns: 16rem 1fr;
      height: 100%;
    }
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 16rem;
      padding: 1rem 0;
    }
  }
  .sidebar {
    display: flex;
    flex-direction: column;
  }
  .sidebar > a {
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding: 0 0.5rem;
    border-radius: var(--m3-util-rounding-small);

    color: inherit;
    position: relative;
  }
  .sidebar > a.selected {
    background-color: rgb(var(--m3-scheme-secondary-container));
  }
  .icons {
    display: flex;
    margin-top: auto;
  }
</style>
