<script lang="ts">
  export let min: number;
  export let max: number;

  $: percentage = min / max * 100;
</script>

<div class="progress-bar">
  <div class="slider" style="--width: {percentage}%" />
</div>

<style>
  .progress-bar {
    overflow: hidden;
    position: relative;
    width: 60px;
    height: 10px;
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
    background-color: slateblue;
    box-shadow: inset 0 0 4px 3px #0002;
  }
</style>
