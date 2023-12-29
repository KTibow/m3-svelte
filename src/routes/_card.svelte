<div class="container">
  <div class="content">
    <slot />
  </div>
  <div class="content">
    <slot name="demo" />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem;
    background-color: rgb(var(--m3-scheme-surface-container));
    color: rgb(var(--m3-scheme-on-surface));
  }
  .content:first-child {
    flex-grow: 1;
    border-radius: 1.5rem 1.5rem 0.5rem 0.5rem;
  }
  .content:last-child {
    border-radius: 0.5rem 0.5rem 1.5rem 1.5rem;
  }
</style>
