<script lang="ts">
  import Bar from "./Bar.svelte";
  let boredom = 40;

  type Interest = {
    category?: string,
    name: string,
    value: number
  }

  const interests: Interest[] = [
    { category: "Shape", name: "triangle", value: 100 },
    { category: "Shape", name: "square", value: 100 },
    { category: "Shape", name: "circle", value: 100 },
    { category: "Colors", name: "Blue", value: 100 },
    { category: "Patterns", name: "stripes", value: 100 },
    { category: "Sounds", name: "beep", value: 100 },
    { name: "points", value: 100 },
    { name: "complexity", value: 100 },
    { name: "interactivity", value: 100 },
    { name: "symmetry", value: 100 },
    { name: "smoothness", value: 100 },
    { name: "luster", value: 100 },
  ]
</script>

<div class="stats">
  <span>Boredom:</span>
  <Bar min={boredom} max={100} />
</div>
<br>

{#each interests as interest}
  <div class="stats">
    <span>{interest.name}:</span>
    <Bar min={interest.value} max={100} />
  </div>
{/each}

<style>
  .stats {
    display: flex;
    place-content: center;
    place-items: center;
    gap: 15px;
  }
  .stats > * {
    width: 120px;
  }
  .stats > span {
    text-align: right;
  }
</style>