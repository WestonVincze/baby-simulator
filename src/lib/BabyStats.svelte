<script lang="ts">
  import Bar from "./Bar.svelte";
  let boredom = 40;

  const interests = [
    {
      category: "Shapes",
      items: [
        { name: "triangle", interest: 0 },
        { name: "square", interest: 0 },
        { name: "circle", interest: 0 }
      ]
    },
    {
      category: "Colors",
      items: []
    },
    {
      category: "Patterns",
      items: []
    },
  ]
</script>

<div class="stats">
  <div>
    Boredom:
  </div>
  <Bar min={boredom} max={100} />
</div>

{#each interests as interest}
    <div>{interest.category}</div>
    {#each interest.items as item}
      <div class="stats">
      <div>{item.name}</div>
      <Bar min={item.interest} max={100} />
    </div>
  {/each}
{/each}

<style>
  .stats {
    display: flex;
    place-content: center;
    place-items: center;
    gap: 15px;
  }
</style>