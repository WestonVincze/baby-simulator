<script lang="ts">
  import { mapDynamicColors } from "../../helpers";
  export let colors: string[] = [];
  export let size: number;

  const defaultColors: string[] = [];

  $: appliedColors = mapDynamicColors(defaultColors, colors);
</script>

<svg width="{size}" height="{size}" viewBox="0 0 100 100">
  <title></title>
</svg>
