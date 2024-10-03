<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { TOY_SIZE } from "../constants";
  import type { Color, ToyName } from "../types";

  export let name: ToyName;
  export let colors: Color[];
  export let size: number = TOY_SIZE;

  let ToyComponent: typeof SvelteComponent | null = null;

  async function loadToyComponent(name: ToyName) {
    try {
      ToyComponent = (await import(`./toys/${name.charAt(0).toUpperCase() + name.slice(1)}.svelte`)).default;
    } catch (error) {
      console.error(`Failed to load component for toy: '${name}'\n\n`, 
      error);
      ToyComponent = null;
    }
  }

  $: loadToyComponent(name);
</script>

<svelte:component this={ToyComponent} {size} {colors} />
