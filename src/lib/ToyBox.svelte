<script lang="ts">
  import { onMount, tick } from "svelte";
  import Toy from "./Toy.svelte";
  import { toyStore } from "$stores";
  import { dragDrop } from "$actions/dragDropAction";
  import { Toys } from "$data/Toys";
  import { TOY_SIZE } from "../constants";

  let toyOrder: string[] = []
  let toyBoxEl: HTMLDivElement;
  let scrollLeftPos = 0;

  onMount(() => {
    if ($toyStore.length === 0) {
      Toys.forEach((properties, i) => {
        toyStore.addToy({
          loc: "ToyBox",
          data: properties,
          position: {
            x: i * (TOY_SIZE + 15) + (TOY_SIZE / 2) + 15,
            y: 0
          }
        })
        toyOrder.push(`${i + 1}`);
      });
    }

    tick().then(() => handleScroll());

    const observer = new ResizeObserver(handleScroll);
    observer.observe(toyBoxEl);
    return () => observer.disconnect();
  });

  $: toyBoxToys = $toyStore
    .filter(toy => toy.loc === "ToyBox")
    .sort((toyA, toyB) => toyOrder.findIndex(id => id === toyA.id) - toyOrder.findIndex(id => id === toyB.id));

  function handleDrop(draggedToyId: string, targetIndex?: number) {
    if (targetIndex === undefined) return;

    const currentIndex = toyOrder.indexOf(draggedToyId);

    if (currentIndex !== -1) {
      toyOrder.splice(currentIndex, 1);
    }

    toyOrder.splice(targetIndex, 0, draggedToyId);
  }

  function handleScroll() {
    if (!toyBoxEl) return;
    scrollLeftPos = toyBoxEl.scrollLeft;
  }

  function scrollLeftArrow() {
    if (!toyBoxEl) return;
    const step = toyBoxEl.clientWidth - (TOY_SIZE + 15);
    toyBoxEl.scrollBy({ left: -Math.min(step, toyBoxEl.scrollLeft), behavior: "smooth" });
  }

  function scrollRightArrow() {
    if (!toyBoxEl) return;
    const step = toyBoxEl.clientWidth - (TOY_SIZE + 15);
    const remaining = toyBoxEl.scrollWidth - toyBoxEl.clientWidth - toyBoxEl.scrollLeft;
    toyBoxEl.scrollBy({ left: Math.min(step, remaining), behavior: "smooth" });
  }

  $: showLeftArrow = scrollLeftPos >= 25;
  $: showRightArrow = toyBoxEl ? scrollLeftPos < toyBoxEl.scrollWidth - toyBoxEl.clientWidth - 2 : false;
</script>

<div class="toy-box-container">
  {#if showLeftArrow}
    <button class="scroll-btn left" on:click={scrollLeftArrow} aria-label="Scroll left">
      <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
  {/if}
  <div
    bind:this={toyBoxEl}
    class="toy-box"
    data-dropzone="ToyBox"
    on:scroll={handleScroll}
    use:dragDrop={{
      dropZone: "ToyBox",
      onDrop: (id, target) => handleDrop(id, target)
    }}
    role="presentation"
  >
    {#each toyBoxToys as toy}
      <Toy {toy} />
    {/each}
  </div>
  {#if showRightArrow}
    <button class="scroll-btn right" on:click={scrollRightArrow} aria-label="Scroll right">
      <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
    </button>
  {/if}
</div>

<style>
  .toy-box-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 100%; 
    display: flex;
    justify-content: center;
    filter: drop-shadow(0 -4px 8px rgba(0,0,0,0.50));
    overflow: hidden;
  }
  .toy-box {
    position: relative;
    border-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #BB8493;
    width: 100%;
    height: 100px;
    padding: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 15px;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    scrollbar-width: thin;
  }
  .toy-box::-webkit-scrollbar {
    height: 4px;
  }
  .toy-box::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }
  .scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    border: none;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.35);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
    padding: 15px;
    height: 60px;
    min-width: unset;
  }
  .scroll-btn.left {
    left: -8px;
  }
  .scroll-btn.right {
    right: -8px;
  }
</style>
