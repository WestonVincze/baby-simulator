<script lang="ts">
</script>

<div class="toy-box">
  <slot class="item" />
</div>

<style>
  .toy-box {
    background-color: burlywood;
    width: 100%;
    height: 100px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
  }
</style>