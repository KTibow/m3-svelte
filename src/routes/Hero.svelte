<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";

  const name = "M3 Svelte";
  const description = "implements the Material 3 design system in Svelte.";
  const github = "https://github.com/KTibow/m3-svelte";
</script>

<div class="branding">
  <h1>
    <img src="https://ktibow.github.io/favicon.svg" alt="KTibow's" width="48" height="48" />
    {name}
  </h1>
  <p>{description}</p>
  <a href={github}>
    <p>GitHub</p>
    <p class="supporting">{page.data.stars} stars</p>
  </a>
  <a href="https://discord.gg/sRzVYM9b47">
    <p>Discord</p>
    <p class="supporting">{page.data.members} members</p>
  </a>
  <a href={resolve("/docs/features")}>
    <p>Features...</p>
    <p class="supporting">Powerful yet lean</p>
  </a>
</div>

<style>
  .branding {
    --transition: var(--m3-timing-function-emphasized) 500ms;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1.5rem;
    background-color: var(--m3c-primary-container-subtle);
    color: var(--m3c-on-primary-container-subtle);
    transition: var(--transition);
    overflow: hidden;

    margin-block: 6rem;
    margin-inline: auto;

    /* COLLAPSED STATE */
    &:not(:hover, :has(a:focus-visible)) {
      > h1 {
        > img {
          width: 0;
          height: 0;
          opacity: 0;
          margin-right: 0;
        }
      }
      > p,
      > a {
        height: 0;
        margin: 0 -2rem;
        opacity: 0;
        padding-block: 0;
        pointer-events: none;
      }
    }

    /* EXPANDED ELEMENTS */
    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      @apply --m3-display-large;
      font-weight: bold;
      margin-block: 0.5rem;
      margin-inline: 1rem;
      transition: var(--transition);

      img {
        width: 1em;
        height: 1em;
        border-radius: var(--m3-shape-full);
        background-color: var(--m3c-surface);
        margin-right: 1rem;
        transition: var(--transition);
      }
    }

    /* Description paragraph */
    & > p {
      height: 1.5rem;
      margin: 0;
      margin-inline: 1rem;
      overflow: hidden;
      white-space: nowrap;
      transition: var(--transition);
    }

    /* Link "Buttons" */
    a {
      @apply --m3-focus-inward;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 3rem;
      padding-inline: 1rem;
      border-radius: 1.5rem;
      margin-top: 0.5rem;
      background-color: var(--m3c-primary-container);
      color: var(--m3c-on-primary-container);
      text-decoration: none;
      transition: var(--transition);
      overflow: hidden;

      p {
        margin: 0;
      }

      .supporting {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    }
  }
</style>
