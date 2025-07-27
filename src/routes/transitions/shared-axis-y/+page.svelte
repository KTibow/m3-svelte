<script>
  import { sharedAxisTransition } from "$lib";
  import Button from "$lib/buttons/Button.svelte";

  let page = $state(0);
  let prevPage = $state(0);
</script>

<main>
  {#if page == 0}
    <div transition:sharedAxisTransition={{ direction: "Y", rightSeam: true }}>
      <p>
        <Button variant="outlined" onclick={() => ((prevPage = page), (page = 1))}>next</Button>
      </p>
      <img
        src="https://picsum.photos/id/12/192/168"
        alt="Red placeholder"
        width="192"
        height="168"
      />
    </div>
  {:else if page == 1}
    <div
      in:sharedAxisTransition={{
        direction: "Y",
        rightSeam: prevPage > 1,
      }}
      out:sharedAxisTransition={{
        direction: "Y",
        rightSeam: page > 1,
      }}
    >
      <p>
        <Button variant="outlined" onclick={() => ((prevPage = page), (page = 0))}>back</Button>
        <Button variant="outlined" onclick={() => ((prevPage = page), (page = 2))}>next</Button>
      </p>
      <img
        src="https://picsum.photos/id/20/192/168"
        alt="Orange placeholder"
        width="192"
        height="168"
      />
    </div>
  {:else if page == 2}
    <div
      in:sharedAxisTransition={{
        direction: "Y",
        rightSeam: prevPage > 2,
      }}
      out:sharedAxisTransition={{
        direction: "Y",
        rightSeam: page > 2,
      }}
    >
      <p>
        <Button variant="outlined" onclick={() => ((prevPage = page), (page = 1))}>back</Button>
        <Button variant="outlined" onclick={() => ((prevPage = page), (page = 3))}>next</Button>
      </p>
      <img
        src="https://picsum.photos/id/19/192/168"
        alt="Yellow placeholder"
        width="192"
        height="168"
      />
    </div>
  {:else}
    <div transition:sharedAxisTransition={{ direction: "Y", rightSeam: false }}>
      <p>
        <Button variant="outlined" onclick={() => ((prevPage = page), (page = 2))}>back</Button>
      </p>
      <img
        src="https://picsum.photos/id/18/192/168"
        alt="Green placeholder"
        width="192"
        height="168"
      />
    </div>
  {/if}
</main>

<style>
  main {
    position: relative;
    min-height: 100%;
    overflow: hidden;
  }
  main > * {
    position: absolute;
    background-color: rgb(var(--m3-scheme-surface));
    overflow: hidden;
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
