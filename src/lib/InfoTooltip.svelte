<script lang="ts">
  import { tooltip } from "@svelte-plugins/tooltips"
  import Info from "../icons/info.svelte";
  export let text;
</script>

<span
  use:tooltip={{
    content: text,
    action: "click",
    animation: "slide",
    hideOnClickOutside: true
  }}
>
  <Info />
</span>

<style>
  span {
    width: 15px;
    cursor: pointer;
  }
</style>
