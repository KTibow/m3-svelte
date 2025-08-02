<!--
@component
@deprecated use Slider directly instead
-->
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Slider from "./Slider.svelte";

  let props: Omit<ComponentProps<typeof Slider>, "ticks"> = $props();
</script>

<Slider {...props} ticks={true}></Slider>
