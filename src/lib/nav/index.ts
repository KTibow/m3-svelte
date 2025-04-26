// navVariants.ts
import { cva, type VariantProps } from "class-variance-authority";

export const navListVariants = cva("relative flex-grow justify-evenly gap-2", {
  variants: {
    type: {
      bar: [
        "bg-surface-container", // background: var(--color-surface-container)
        "px-2", // 0.5rem horizontal padding
        "pt-3", // 0.75rem top
        "pb-4", // 1rem bottom
        "flex", // horizontal layout
        "flex-row",
      ],
      rail: [
        "bg-surface", // background: var(--color-surface)
        "flex-col", // vertical layout
        "w-20", // width: 5rem
        "py-14", // 3.5rem vertical padding
        "px-0", // 0 horizontal padding
        "justify-start", // align start
        "gap-3", // 0.75rem gap
        "fixed", // typically fixed positioning
        "top-0",
        "left-0",
        "h-full",
      ],
      auto: [
        "flex", // default bottom-rail layout
        "flex-row",
        "bg-surface-container",
        "px-2",
        "pt-3",
        "pb-4",
        "sm:bg-surface", // swich to side-rail at >=sm
        "sm:flex-col",
        "sm:w-20",
        "sm:py-14",
        "sm:px-0",
        "sm:justify-start",
        "sm:gap-3",
      ],
    },
  },
  defaultVariants: {
    type: "auto",
  },
});

export type NavListVariants = VariantProps<typeof navListVariants>;
