import { writable } from "svelte/store";
import type { DebugData } from "$types";

const createDebugStore = writable<DebugData[]>;

export const debugStore = createDebugStore([]);
