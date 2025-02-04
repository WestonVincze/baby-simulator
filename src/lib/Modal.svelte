<script lang="ts">
  export let onClose: () => void;
  export let title: string;
</script>

<div
  class="backdrop"
  on:click={onClose}
  role="button"
  aria-label="Close modal"
  tabindex="-1"
  on:keydown={(event) => event.key === 'Enter' && onClose()}
/>

<div class="modal">
  <h2>{title}</h2>
  <button class="close" on:click={onClose} aria-label="Close modal">X</button>
  <slot></slot>
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .modal {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 60%;
    border-radius: 8px;
    font-family: Inter, Helvetica;
    margin: 0 auto;
    padding: 15px 50px;
    background-color: #49243E;
    transform: translateY(-50%);
    z-index: 20;
  }
  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
  }
  h2 {
    margin-bottom: 2rem;
  }
</style>
