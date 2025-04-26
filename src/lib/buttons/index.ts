import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex", //default display
    //"border-none",
    "items-center",
    "justify-center",
    "transition-all",
    "duration-200",
    "h-10", // 2.5rem
    "px-6", // 1.5rem
    "rounded-full", // border-radius: var(--m3-button-shape);
    "cursor-pointer",
    "relative",
    "overflow-hidden",
    "m3-font-label-large",
    //.m3-container > :global(*) {
    //    flex-shrink: 0;
    //}
    "[&>*]:flex-shrink-0",
    "disabled:bg-on-surface/12",
    "disabled:text-on-surface/38",
    "disabled:cursor-auto",
    // -webkit-tap-highlight-color: transparent;
    // [ -webkit-tap-highlight-color:transparent ]
    // print-color-adjust: exact;
  ],
  {
    variants: {
      type: {
        elevated: [
          "[@media(screen and (forced-colors:active))]:bg-transparent",
          "[@media(screen and (forced-colors:active))]:border",
          "[@media(screen and (forced-colors:active))]:opacity-38",
          "enabled:bg-surface-container-low",
          "enabled:text-primary",
          "enabled:shadow-elevation-1",
          "enabled:hover:shadow-elevation-2",
        ],
        filled: [
          "[@media(screen and (forced-colors:active))]:bg-transparent",
          "[@media(screen and (forced-colors:active))]:border",
          "[@media(screen and (forced-colors:active))]:opacity-38",
          "enabled:bg-primary",
          "enabled:text-on-primary",
          "enabled:hover:shadow-elevation-1",
        ],
        tonal: [
          "[@media(screen and (forced-colors:active))]:bg-transparent",
          "[@media(screen and (forced-colors:active))]:border",
          "[@media(screen and (forced-colors:active))]:opacity-38",
          "enabled:bg-secondary-container",
          "enabled:text-on-secondary-container",
          "enabled:hover:shadow-elevation-1",
        ],
        outlined: [
          "disabled:bg-transparent",
          "border-on-surface/12",
          "border",
          "enabled:border-outline",
        ],
        text: ["disabled:bg-transparent", "px-3", "text-primary"],
      },

      iconType: {
        none: [],
        left: [
          "pl-4", // 1rem
          "gap-2", // 0.5rem
          //  .icon-left > :global(svg) {
          //    width: 1.125rem;
          //    height: 1.125rem;
          //}
          "[&>svg]:w-[1.125rem]",
          "[&>svg]:h-[1.125rem]",
        ],
        full: [
          "w-10", // 2.5rem square
          "p-0",
          "[&>svg]:w-[1.5rem]",
          "[&>svg]:h-[1.5rem]",
        ],
      },
    },

    compoundVariants: [
      //// text + left-icon needs extra right padding
      {
        type: "text",
        iconType: "left",
        class: "pr-4",
      },
    ],

    defaultVariants: {
      type: "elevated",
      iconType: "none",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
