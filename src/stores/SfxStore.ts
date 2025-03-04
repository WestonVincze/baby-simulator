import { writable } from 'svelte/store';

type SoundLayer = 'sfx' | 'music';

interface Sound {
  audio?: HTMLAudioElement;
  volume: number;
}

interface SfxManagerState {
  sfx: Sound | null;
  music: Sound | null;
}

const createSfxStore = () => {
  const { subscribe, update } = writable<SfxManagerState>({
    sfx: null,
    music: null,
  });

  const playSound = async (soundName: string, layer: SoundLayer) => {
    const soundPath = `sfx/${soundName}.mp3`;
    try {
      const response = await fetch(soundPath);
      if (!response.ok) {
        console.warn(`Sound file not found: ${soundPath}`);
        return;
      }
      const audio = new Audio(soundPath);

      update(state => {
        if (state[layer]?.audio) {
          state[layer].audio.pause();
          state[layer].audio.currentTime = 0;
        }
        state[layer] = { audio, volume: state[layer]?.volume || 1 };
        audio.volume = state[layer].volume;
        console.log(state[layer].volume);
        audio.play()
        return state;
      });
    } catch (error) {
      console.error(`Error fetching sound file: ${soundPath}`, error);
    }
  };

  const setVolume = (layer: SoundLayer, volume: number) => {
    update(state => {
      if (state[layer]?.audio) {
        state[layer].audio.volume = volume;
        state[layer].volume = volume;
      } else {
        state[layer] = { volume }
      }
      return state;
    });
  };

  return {
    subscribe,
    playSound,
    setVolume,
  };
};

export const sfxStore = createSfxStore();
