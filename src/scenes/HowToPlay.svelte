<script lang="ts">
  export let onClose: () => void;
  // panels?
</script>

<div class="backdrop" />

<div class="how-to-play">
  <h3>How to Play</h3>
  <button class="close" on:click={onClose}>X</button>

  <p>
    Don't let baby cry of boredom! Keep baby entertained by dragging toys onto baby. Baby will lose interest in toys over time, so bring new toys that look and feel different.
  </p>

  <span class="keybind">`</span> - toggle debug info
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
    padding: 3px 8px;
    margin: 0;
    border-radius: 50%;
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
</style>