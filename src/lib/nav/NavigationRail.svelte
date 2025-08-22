<script lang="ts">
    import type { Snippet } from 'svelte';
    
    import MenuOpenIcon from '@ktibow/iconset-material-symbols/menu-open';
    import MenuIcon from '@ktibow/iconset-material-symbols/menu';
    
    import Icon from '$lib/misc/_icon.svelte';

    let {
        open = false,
        collapsible = true,
        fullyCollapse = false,
        modal = false,
        fab,
        children
    }: {
        open?: boolean;
        collapsible?: boolean;
        fullyCollapse?: boolean;
        modal?: boolean;
        fab?: Snippet<[open: boolean]>;
        children: Snippet;
    } = $props();
</script>

<div class="m3-container" class:fullyCollapse>
    <div class="rail" class:open={open && collapsible} class:modal>
        <div class="top">
            {#if collapsible}
                <button class="collapse" onclick={() => open = !open}>
                    <Icon icon={open ? MenuOpenIcon : MenuIcon} />
                </button>
            {/if}
            
            {#if fab}
                <div>
                    {@render fab(open)}
                </div>
            {/if}
        </div>
        
        <div class="items">
            {@render children()}
        </div>
    </div>
</div>

<style>
    .m3-container {
        width: 96px;
        height: 100%;
    }
    
    .m3-container.fullyCollapse {
        width: 0;
    }
    
    .m3-container.fullyCollapse>.rail:not(.open) {
        background: none !important;
    }
    
    .m3-container.fullyCollapse>.rail {
        position: fixed;
    }
    
    .m3-container.fullyCollapse>.rail:not(.open)>.items,
    .m3-container.fullyCollapse>.rail:not(.open)>.top>div {
        opacity: 0;
        pointer-events: none;
    }
    
    .rail {
        width: 96px;
        height: 100%;
        padding: 40px 0px;
        transition: all 200ms;
        overflow: hidden;
        overflow-y: auto;
    }
    
    .rail.modal {
        border-top-right-radius: var(--m3-util-rounding-large);
        border-bottom-right-radius: var(--m3-util-rounding-large);
    }
    
    .rail.modal.open,
    .rail:not(.modal) {
        background: rgb(var(--m3-scheme-surface-container));
    }
    
    .rail.open {
        width: 220px;
    }
    
    .top {
        margin: 0px 0px 46px 20px;
        display: flex;
        flex-direction: column;
    }
    
    .collapse {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        width: 24px;
        height: 24px;
        margin: 1rem;
        pointer-events: all;
    }
    
    .collapse>:global(svg) {
        width: 24px;
        height: 24px;
    }
    
    .items {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-left: 20px;
        width: 56px;
        container: items / inline-size;
    }
    
    .rail.open>.items {
        width: 180px;
        gap: 0px;
    }
    
    @media (width <= 220px) {
        .rail.open {
            border-radius: 0px !important;
            width: 100%;
        }
    }
</style>