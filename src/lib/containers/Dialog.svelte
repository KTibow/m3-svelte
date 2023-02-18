<script lang="ts">
  import { tick, createEventDispatcher } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import Button from "$lib/buttons/Button.svelte";
  import { enterExit, outroClass } from "$lib/utils/animation";
  import { easeEmphasizedAccel, easeEmphasizedDecel } from "$lib/utils/easing";

  export let display = "flex";
  export let extraDialogOptions: HTMLDialogAttributes = {};
  export let icon: IconifyIcon | null = null;
  export let title: string;
  export let confirmLabel: string;
  export let cancelLabel: string | null = null;
  export let open = false;
  export let preventDismiss = false;
  const dispatch = createEventDispatcher();
  let dialog: HTMLDialogElement;
  $: {
    if (!dialog) break $;
    tick().then(() => {
      if (open) dialog.showModal();
      else dialog.close();
    });
  }
</script>

{#key open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <dialog
    bind:this={dialog}
    on:cancel|preventDefault={() => {
      if (preventDismiss) return;
      open = false;
      dispatch("closed", { method: "browser" });
    }}
    on:click={() => {
      if (preventDismiss) return;
      open = false;
      dispatch("closed", { method: "clickedOutside" });
    }}
    in:enterExit={{ duration: 400, easing: easeEmphasizedDecel }}
    out:enterExit={{ duration: 200, easing: easeEmphasizedAccel }}
    use:outroClass
    {...extraDialogOptions}
  >
    <div class="m3-container" on:click|stopPropagation style="display: {display};">
      {#if icon}
        <Icon {icon} />
      {/if}
      <h2 class="m3-font-headline-small">{title}</h2>
      <div class="desc body-medium"><slot /></div>
      <div class="buttons">
        {#if cancelLabel}
          <Button
            type="text"
            on:click={() => {
              open = false;
              dispatch("closed", { method: "clickCancel" });
            }}
          >
            {cancelLabel}
          </Button>
        {/if}
        <Button
          type="text"
          on:click={() => {
            open = false;
            dispatch("closed", { method: "clickConfirm" });
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  </dialog>
{/key}

<style>
  dialog {
    padding: 0;
    border: none;
    background-color: rgb(var(--m3-scheme-surface));
    border-radius: 1.75rem;
    overflow: auto;
  }
  dialog::backdrop {
    background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    animation: backdropIn 400ms;
  }
  :global(.leaving):is(dialog)::backdrop {
    animation: backdropOut 400ms;
  }
  @keyframes backdropIn {
    0% {
      background-color: rgb(var(--m3-scheme-scrim) / 0);
    }
    100% {
      background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    }
  }
  @keyframes backdropOut {
    0% {
      background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    }
    100% {
      background-color: rgb(var(--m3-scheme-scrim) / 0);
    }
  }
  .m3-container {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-primary) / 0.05);
    padding: 1.5rem;
    min-width: 17.5rem;
    max-width: 35rem;
  }
  .m3-container :global(svg) {
    color: rgb(var(--m3-scheme-secondary));
    width: 1.5rem;
    height: 1.5rem;
    align-self: center;
  }
  h2 {
    color: rgb(var(--m3-scheme-on-surface));
    margin: 0 0 1rem 0;
  }
  .m3-container :global(svg + h2) {
    margin-top: 1rem;
    text-align: center;
  }
  .desc {
    color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .buttons {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }

  @media print, (forced-colors: active) {
    dialog {
      outline: solid 2px canvastext;
    }
  }
</style>
