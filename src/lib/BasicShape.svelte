<script lang="ts">
  import { TOY_SIZE } from "../constants";

  export let type: "triangle" | "square" | "circle";
  export let color: string = "red";
  export let size: number = TOY_SIZE;
</script>

<svg width="{size}" height="{size}" viewBox="0 0 100 100">
  {#if type === "triangle"}
    <polygon points="0,0, 100,100 100,0" fill="{color}" />
  {:else if type === "square"}
    <rect width="100" height="100" fill="{color}" />
  {:else if type === "circle"}
    <circle cx="50" cy="50" r="50" fill="{color}" />
  {/if}
</svg>

