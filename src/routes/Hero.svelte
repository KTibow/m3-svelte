<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";

  const name = "M3 Svelte";
  const description = "implements the Material 3 design system in Svelte.";
  const github = "https://github.com/KTibow/m3-svelte";
</script>

<div class="branding">
  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 148 148">
    <title>KTibow's</title>
    <rect fill="#3a4379" width="296" height="296" x="0" y="0" ry="2" />
    <path
      fill="#6169a1"
      d="M21.4 6.3q-2.3 1.1-4.5 2.5a26 26 0 00-6.6 6c-1 1.6-2.3 3-3 4.7a31 31 0 00-2 4.6Q4 27.5 3.1 31q-.8 3.7-1.3 7.4l-.9 8.5-.5 11-.3 20.2v150l.6 16.8.8 10q.5 4.4 1.3 8.7a46 46 0 001.9 7 31 31 0 002.1 5.2 29 29 0 008 10q2.2 1.6 4.6 3 3 1.5 6.1 2.5 3.8 1.2 7.5 2 5 .8 9.9 1.3l11.8.8 15.5.4h148.9q12.7 0 25.6-.6 5-.2 10.1-.8 4.4-.5 8.7-1.3a46 46 0 007-1.9 31 31 0 005.2-2.1 29 29 0 009.8-7.8q1.8-2.2 3.2-4.8 1.1-2.2 2-4.6 1.1-3.4 2-6.9.8-3.7 1.2-7.4.6-4.2 1-8.5l.5-11 .3-20.2v-150l-.6-16.8-.8-10q-.5-4.4-1.3-8.7a46 46 0 00-1.9-7 31 31 0 00-2.1-5.2 29 29 0 00-8-10q-2.1-1.6-4.6-3-3-1.5-6.1-2.5a46 46 0 00-7.5-2q-5-.8-9.9-1.3-6-.6-11.8-.8l-15.5-.4H76.8q-12.7 0-25.6.6l-10.1.8q-4.4.5-8.7 1.3a46 46 0 00-11 3.4"
    />
    <path
      fill="#949dd7"
      d="M21.4 26a57 57 0 00-5.5 7.2l-2.9 5a48 48 0 00-3.3 7.2q-1.7 3.8-2.9 8l-1.8 6.8-1.4 7q-1 5.4-1.6 10.8l-1 12.8-.6 15-.2 15.6V168l.2 22.8a370 370 0 002.2 32q.7 5 1.7 10a94 94 0 002.4 9.5q1 3.7 2.5 7.2a60 60 0 003.7 8.2q1.4 2.6 3 5a57 57 0 005.8 7.5 59 59 0 008.8 8l5.2 3.5c3 1.5 5.8 3.2 8.8 4.3q4.4 1.8 8.8 3.2l6.9 1.8q3.5.9 7 1.4 5.4 1 10.8 1.6l12.8 1q7.6.4 15.4.6 11.2.3 22.3.2H170q9.8 0 19.5-.2l12.6-.4q6-.3 12.3-.9 5.6-.5 11.2-1.3 6-1 12-2.4 4.5-1.2 8.8-2.7 3.3-1.1 6.4-2.5c2.7-1 5.3-2.6 7.8-4q3.3-2 6.2-4.3a58 58 0 0013.3-14.6q2.1-3.3 4-6.7 2-4.4 3.6-8.9 1.4-3.8 2.4-7.7 1.3-5 2.1-10 .9-4 1.3-8.3.7-5.6 1.1-11 .8-9.5.9-18.8l.2-15.3v-58.3q0-11.8-.6-23.6a326 326 0 00-2-21.5q-.6-4.5-1.5-9.2a94 94 0 00-2.4-9.5q-1-3.7-2.5-7.2a60 60 0 00-3.7-8.2q-1.4-2.6-3-5a56 56 0 00-5.8-7.5 59 59 0 00-8.8-8l-5.2-3.5q-4.4-2.5-8.8-4.3t-8.8-3.2l-6.9-1.8-7-1.4q-5.4-1-10.8-1.6l-12.8-1-15.3-.6-22.4-.2H126l-19.5.2q-6.3.1-12.5.5-6.3.3-12.4.8-5.5.5-11.2 1.3-6 1-12 2.4-4.5 1.2-8.8 2.7-3.3 1.1-6.4 2.5-4 1.7-7.8 4-3.2 2-6.2 4.3a60 60 0 00-7.6 7z"
    />
  </svg>
  <h1>
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
    position: relative;

    margin-block: 6rem;
    margin-inline: auto;

    /* COLLAPSED STATE */
    &:not(:hover, :has(a:focus-visible)) {
      > svg {
        opacity: 0;
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
    svg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      transition: var(--transition);
    }
    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      @apply --m3-display-large;
      font-weight: bold;
      margin-block: 0.5rem;
      margin-inline: 1rem;
      transition: var(--transition);
    }

    /* Description paragraph */
    & > p {
      height: 1.5rem;
      margin-block: -0.5rem 0.5rem;
      margin-inline: 1rem;
      overflow: hidden;
      white-space: nowrap;
      transition: var(--transition);
    }

    /* Link "Buttons" */
    a {
      @apply --m3-focus-inward;
      @apply --m3-title-medium;
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
        @apply --m3-title-small;
        opacity: 0.8;
      }
    }
  }
</style>
