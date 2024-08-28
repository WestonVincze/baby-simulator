<script lang="ts">
  export let min: number;
  export let max: number;

  $: percentage = min / max * 100;
</script>

<div class="bar" style="--width: {percentage}%" />

<style>
  .bar {
    border-radius: 5px;
    background-color: red;
    position: relative;
    width: 60px;
    height: 6px;
  }
  
  .bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: var(--width);
    height: 100%;
    background-color: black;
  }
</style>
