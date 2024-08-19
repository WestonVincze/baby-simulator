<script lang="ts">
  type Toy = {
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
  import { toys } from "./stores/ToyStore";

  let status = "";

  toys.addToy({ loc: "ToyBox", type: "triangle", color: "red" });
  toys.addToy({ loc: "ToyBox", type: "square", color: "blue" });
  toys.addToy({ loc: "ToyBox", type: "circle", color: "green" });

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
    console.log(event.target);
    const id = event.dataTransfer?.getData("id");
    if (!id) return;
    toys.updateToy(parseInt(id), dropZone, event.offsetX, event.offsetY);
    status = `dropped ${id}`
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
    {#each $toys.filter(toy => toy.loc === "PlayMat") as toy, i}
      <div
        id="{toy.id.toString()}"
        class="draggable"
        draggable="true"
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
    {#each $toys.filter(toy => toy.loc === "ToyBox") as toy, i}
      <div
        id="{toy.id.toString()}"
        class="draggable"
        draggable="true"
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
