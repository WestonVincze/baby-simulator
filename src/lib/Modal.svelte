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
    border: 2px solid #f9f9f9;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    width: auto;
    line-height: 36px;
  }
  h2 {
    margin-bottom: 2rem;
  }
  @media screen and (max-width: 768px) {
    .modal {
      width: 100%;
      max-height: 100%;
      left: 0;
      padding: 10px 20px;
    }
  }
</style>
