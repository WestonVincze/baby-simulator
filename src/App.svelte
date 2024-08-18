<script lang="ts">
  type Toy = {
    el: HTMLElement | null,
    id: number,
    loc: "ToyBox" | "PlayMat",
    color: string,
    type: "triangle" | "circle" | "square",
    position?: { x: number, y: number }
  }
  import Baby from "./lib/Baby.svelte";
  import BasicShape from "./lib/BasicShape.svelte";
  import PlayMat from "./lib/PlayMat.svelte";
  import ToyBox from "./lib/ToyBox.svelte";

  // draggedItem
  const toys: Toy[] = [
    { el: null, id: 1, loc: "ToyBox", type: "triangle", color: "red" },
    { el: null, id: 2, loc: "ToyBox", type: "square", color: "blue" },
    { el: null, id: 3, loc: "ToyBox", type: "circle", color: "green" },
  ]

  let status = "";

  const handleDragStart = (event: DragEvent) => {
    /* we can set a custom image:
     * event.dataTransfer?.setDragImage()
     */
    const el = event.target as HTMLDivElement;
    const id = el.getAttribute("id");
    status = `dragging ${id}`;

    if (!id || !event.dataTransfer) return;

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("id", id);
  }

  const handleDragEnd = (event: DragEvent) => {
  }

  const handleDragDrop = (event: DragEvent, dropZone: "PlayMat" | "ToyBox") => {
    event.preventDefault();
    const id = event.dataTransfer?.getData("id");
    if (!id) return;
    status = `dropped ${id}`
    const draggedToyIndex = toys.findIndex(toy => toy.id === parseInt(id));
    if (draggedToyIndex === -1) return;
    toys[draggedToyIndex].loc = dropZone;
    toys[draggedToyIndex].position = { x: event.offsetX, y: event.offsetY };
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  }
</script>

<main>
  <h1>Baby Simulator</h1>
  <h3>Drag Status: {status || "none"}</h3>
  <PlayMat
    on:dragover={handleDragOver}
    on:drop={(event) => handleDragDrop(event, "PlayMat")}
  >
    <Baby slot="baby" />
    {#each toys.filter(toy => toy.loc === "PlayMat") as toy, i}
      <div
        id="{toy.id.toString()}"
        class="draggable"
        draggable="true"
        bind:this={toys[i].el}
        on:dragstart={handleDragStart}
        on:dragend={handleDragEnd}
        role="presentation"
        style="position: absolute; left: {toy.position?.x}px; top: {toy.position?.y}px;"
      >
        <BasicShape type={toy.type} color={toy.color} size={60} />
      </div>
    {/each}
  </PlayMat>
  <ToyBox
    on:dragover={handleDragOver}
    on:drop={(event) => handleDragDrop(event, "ToyBox")}
  >
    {#each toys.filter(toy => toy.loc === "ToyBox") as toy, i}
      <div
        id="{toy.id.toString()}"
        class="draggable"
        draggable="true"
        bind:this={toys[i].el}
        on:dragstart={handleDragStart}
        on:dragend={handleDragEnd}
        role="presentation"
      >
        <BasicShape type={toy.type} color={toy.color} size={60} />
      </div>
    {/each}
  </ToyBox>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .draggable {
    cursor: pointer;
  }
</style>
