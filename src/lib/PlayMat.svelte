<script lang="ts">
  // visual representation of play mat
  // accepts "drag" events
</script>

<div class="playMat" on:drop on:dragover role="presentation">
  <slot name="baby"></slot>
  <slot />
</div>

<style>
  .playMat {
    background-color: tomato;
    height: 500px;
    width: 800px;
    border-radius: 15px;
  }
</style>