<script lang="ts">
  import { startGame } from "$stores";
  import Modal from "$lib/Modal.svelte";

  let showHowItWorks = false;
  let showHowToPlay = false;

  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 4,
    duration: 1.5 + Math.random() * 3,
  }));
</script>

<div class="main-menu">
  <div class="stars">
    {#each stars as star}
      <span
        class="star"
        style="left: {star.left}%; top: {star.top}%; width: {star.size}px; height: {star.size}px; animation-delay: {star.delay}s; animation-duration: {star.duration}s;"
      ></span>
    {/each}
  </div>
  <header>
    <h1>
      <span class="xl">Baby</span>
      <span class="md">Simulator</span>
    </h1>
    <div class="img-container">
      <img
        class="baby-img"
        draggable="false"
        src="sitting-baby.png"
        alt="Sitting baby"
      />
      <img
        class="rug-img"
        draggable="false"
        src="rug.svg"
        alt="Circular rug"
      />
    </div>
  </header>

  <div class="button-group">
    <button on:click={() => startGame(false)}>Simulation Mode</button>
    <button on:click={() => startGame(true)}>Detailed Mode</button>
    <button on:click={() => showHowToPlay = true}>How To Play</button>
    <button on:click={() => showHowItWorks = true}>How It Works</button>
  </div>

  {#if showHowToPlay}
    <Modal title="How to Play" onClose={() => showHowToPlay = false }>
      <p>
        Don't let baby cry of boredom! Keep baby entertained by dragging toys onto baby. Baby will lose interest in toys over time, so bring new toys that look and feel different.
      </p>

      <div class="keybinds">
        <div>
          <span class="keybind">`</span> - toggle debug info
        </div>
        <div>
          <span class="keybind">esc</span> - pause / resume
        </div>
      </div>
    </Modal>
  {/if}

  {#if showHowItWorks}
    <Modal title="How it Works" onClose={() => showHowItWorks = false }>
      <p>
        Each toy has unique properties that baby builds 'aversion' to while playing. As baby becomes more averse to a property, the boredom it satisfies lessens.
      </p>

      <p>
        The 'preferred toy' (displayed in the thought bubble) indicates the best option for a toy based on the utility AI decision making system. The parameters of the decision are based on its distance to the baby, how recently it was moved, and how averse baby is to its various properties. A slight bonus to boredom satisfaction is provided for while baby is playing with the preferred toy.
      </p>
    </Modal>
  {/if}
</div>

<style>
  .main-menu {
    font-family: 'Mountains of Christmas', Inter, Helvetica;
    position: relative;
    width: 100svw;
    height: 100svh;
    padding: 35px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: #502f47;
    background: radial-gradient(circle, rgba(112, 66, 100, 1) 20%, rgba(64, 38, 57, 1) 100%);
    overflow: hidden;
    gap: 100px;
  }
  .stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .star {
    position: absolute;
    border-radius: 50%;
    background: #fff;
    opacity: 0;
    animation: twinkle ease-in-out infinite alternate;
  }
  @keyframes twinkle {
    0% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 0.8; }
    100% { opacity: 0; transform: scale(1.2); }
  }
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img-container {
    position: relative;
  }
  .img-container::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25%;
    border-radius: 50%;
    background-color: rgba(50, 50, 50, 0.3);
    filter: blur(7px);
    z-index: 1;
  }
  .baby-img {
    height: 150px;
    width: 150px; 
    position: relative;
    z-index: 1;
  }
  .rug-img {
    position: absolute;
    top: 85%;
    left: 50%;
    height: 150px;
    width: auto;
    transform: translate(-50%, -50%);
  }
  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 .xl {
    font-size: 8rem;
  }
  h1 .md {
    font-size: 3.2rem;
  }
  .keybinds {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .keybind {
    background-color: #101010;
    border: 1px solid #222;
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    margin: 0 0.2rem;
    font-family: monospace;
  }
  p {
    margin-bottom: 1rem;
  }
  .button-group {
    justify-content: center;
    width: 550px;
    margin: 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    z-index: 2;
  }
  button {
    min-width: 200px;
  }
  @media (max-width: 768px) {
    .main-menu {
      position: fixed;
      inset: 0;
      z-index: 100;
      border-radius: 0;
      justify-content: center;
      padding: 25px 15px;
    }
    .button-group {
      width: 100%;
      flex-direction: column;
      align-items: center;
    }
    .baby-img {
      height: 120px;
      width: 120px;
    }
    .rug-img {
      height: 120px;
    }
  }
</style>
