<script lang="ts">
    import type { IconifyIcon } from '@iconify/types';
    
    import Layer from '$lib/misc/Layer.svelte';
    import Icon from '$lib/misc/_icon.svelte';
    
    let {
        label,
        icon,
        active = false,
        badge,
        onclick
    }: {
        label: string;
        icon: IconifyIcon;
        active?: boolean;
        badge?: {
            label?: string;
            small?: boolean;
        } | true;
        onclick?: (e: MouseEvent) => any;
    } = $props();
</script>

<button class="m3-container" class:active onclick={onclick}>
    <div class="icon">
        <Icon {icon} />
        
        {#if badge}
            <span class="badge" class:small={badge && typeof badge === 'object' ? badge.small : false}>
                {typeof badge === 'object' ? badge.label : ''}
            </span>
        {/if}
    </div>
    
    {label}
</button>

<style>
    .m3-container {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        gap: 4px;
        font-size: 12px;
        user-select: none;
        color: rgb(var(--m3-scheme-secondary));
        width: fit-content;
    }
    
    .icon {
        position: relative;
    }
    
    .icon>:global(svg) {
        width: 24px;
        height: 24px;
        color: rgb(var(--m3-scheme-on-secondary-container));
        position: relative;
    }
    
    .icon>.badge {
        border-radius: var(--m3-util-rounding-full);
        background: rgb(var(--m3-scheme-error));
        color: rgb(var(--m3-scheme-on-error));
        width: 16px;
        height: 16px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
        font-size: 10px;
    }
    
    .icon>.badge.small {
        width: 6px;
        height: 6px;
        font-size: 0px;
    }
    
    @container items (width <= 56px) {
        .m3-container.active>.icon {
            background: rgb(var(--m3-scheme-secondary-container));
        }
        
        .m3-container:not(.active):hover>.icon {
            background: color-mix(in srgb-linear, currentColor 8%, transparent);
        }
        
        .m3-container:not(.active):focus-visible>.icon,
        .m3-container:not(.active):active>.icon {
            background-color: color-mix(in srgb-linear, currentColor 12%, transparent);
        }
        
        .icon {
            border-radius: var(--m3-util-rounding-full);
            padding: 0px 16px;
            height: 32px;
        }
        
        .icon>:global(svg) {
            margin: 4px 0px;
        }
        
        .icon>.badge {
            right: 12px;
            top: 2px;
        }
        
        .icon>.badge.small {
            right: 16px;
            top: 4px;
        }
    }
    
    @container items (width > 56px) {
        .m3-container {
            flex-direction: row;
            align-items: center;
            justify-content: start;
            gap: 12px;
            padding: 0px 16px;
            border-radius: var(--m3-util-rounding-full);
            font-size: 14px;
            height: 56px;
        }
        
        .m3-container.active {
            background: rgb(var(--m3-scheme-secondary-container));
        }
        
        .m3-container:not(.active):hover {
            background: color-mix(in srgb-linear, currentColor 8%, transparent);
        }
        
        .m3-container:not(.active):focus-visible,
        .m3-container:not(.active):active {
            background-color: color-mix(in srgb-linear, currentColor 12%, transparent);
        }
        
        
        .icon>.badge {
            right: -4px;
            top: -4px;
        }
        
        .icon>.badge.small {
            right: 0;
            top: 0;
        }
    }
</style>