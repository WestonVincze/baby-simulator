<script lang="ts">
  export let min: number;
  export let max: number;
  export let color: string = "slateblue";
  export let height: string = "10px";

  $: percentage = min / max * 100;
</script>

<div class="progress-bar" style="--height: {height};">
  <div class="slider" style="--width: {percentage}%; --color: {color};" />
</div>

<style>
  .progress-bar {
    overflow: hidden;
    position: relative;
    width: 100%;
    min-height: 5px;
    height: var(--height);
    border-radius: 5px;
    background-color: #0004;
    box-shadow: inset 0 0 4px 3px #0008;
  }
  
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--width);
    height: 100%;
    background-color: var(--color);
    box-shadow: inset 0 0 4px 3px #0002;
  }
</style>
