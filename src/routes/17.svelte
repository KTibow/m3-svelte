<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import DateField from "$lib/utils/DateField.svelte";


const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}DateField name="Date" bind:date />`;
</script>

<InternalCard title="Date field" on:showCode={() => dispatch("showCode", { name: "Date field" })}>
<DateField name="Date" slot="demo" />
</InternalCard>
