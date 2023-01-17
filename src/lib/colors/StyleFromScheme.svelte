<script lang="ts">
  import type { SerializedScheme } from "./utils";
  import Styling from "./_styling.svelte";
  import BaseStyles from "./BaseStyles.svelte";

  export let lightScheme: SerializedScheme;
  export let darkScheme: SerializedScheme;
</script>

<Styling {lightScheme} {darkScheme} />
<BaseStyles />
