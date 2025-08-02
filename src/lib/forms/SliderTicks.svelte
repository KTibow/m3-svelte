<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";
  import Slider from "./Slider.svelte";

  let props = $props<
    {
      value: number;
      min?: number;
      max?: number;
      step: number;
      disabled?: boolean;
      showValue?: boolean;
      size?: "xs" | "s" | "m" | "l" | "xl";
      leadingIcon?: IconifyIcon;
      trailingIcon?: IconifyIcon;
      format?: (n: number) => string;
    } & HTMLInputAttributes
  >();
</script>

<Slider {...props} ticks={true}></Slider>
