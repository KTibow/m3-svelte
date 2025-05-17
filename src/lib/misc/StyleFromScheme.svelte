<!--
  @component
  @deprecated Directly set styles instead
-->
<script lang="ts">
  import type { SerializedScheme } from "./utils";
  import Styling from "./_styling.svelte";
  import "./styles.css";

  interface Props {
    lightScheme: SerializedScheme;
    darkScheme: SerializedScheme;
  }

  let { lightScheme, darkScheme }: Props = $props();
</script>

<Styling {lightScheme} {darkScheme} />
