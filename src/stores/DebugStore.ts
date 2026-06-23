import { writable } from "svelte/store";
import type { AppraisalScore, DebugData } from "$types";

const createDebugStore = () => {
  const { subscribe, update } = writable<DebugData>(({
    appraisals: [],
    selectedAppraisal: null
  }));

  const addOrUpdateAppraisal = (appraisal: AppraisalScore): void => {
    update((state) => {
      const existingAppraisalIndex = state.appraisals.findIndex((a) => a.name === appraisal.name);

      if (existingAppraisalIndex !== -1) {
        state.appraisals[existingAppraisalIndex] = appraisal;
      } else {
        state.appraisals.push(appraisal);
      }

      return state;
    });
  }

  const selectAppraisal = (appraisal: AppraisalScore) => {
    update((state) => ({
      ...state,
      selectedAppraisal: appraisal,
    }));
  }

  const resetSelection = () => {
    update((state) => ({
      ...state,
      selectedAppraisal: null,
    }));
  }

  return {
    subscribe,
    addOrUpdateAppraisal,
    selectAppraisal,
    resetSelection
  }
}

export const debugStore = createDebugStore();
