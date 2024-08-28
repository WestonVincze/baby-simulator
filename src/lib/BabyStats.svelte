<script lang="ts">
  import Bar from "./Bar.svelte";
  let boredom = 40;

  const interests = [
    {
      "Shapes": [
        { "triangle": 0 },
        { "square": 0 },
        { "circle": 0 }
      ]
    }
  ]
</script>

<div class="stats">
  <div>
    Boredom:
  </div>
  <Bar min={boredom} max={100} />
</div>

<style>
  .stats {
    display: flex;
    place-content: center;
    place-items: center;
    gap: 15px;
  }
</style>