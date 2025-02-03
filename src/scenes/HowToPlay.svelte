<script lang="ts">
  export let onClose: () => void;
  // panels?
</script>

<div class="backdrop" />

<div class="how-to-play">
  <h2>How to Play</h2>
  <button class="close" on:click={onClose}>X</button>

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
</div>

<style>
  .how-to-play {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 60%;
    border-radius: 8px;
    font-family: Inter, Helvetica;
    margin: 0 auto;
    padding: 50px;
    padding-top: 15px;
    background-color: #49243E;
    transform: translateY(-50%);
  }
  .backdrop {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    border-radius: 15px;
  }
  .close {
    position: absolute;
    right: 5%;
    top: 5%;
    min-width: 30px;
    padding: 2px 10px;
    margin: 0;
    border-radius: 50%;
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
  h2 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 1rem;
  }
</style>