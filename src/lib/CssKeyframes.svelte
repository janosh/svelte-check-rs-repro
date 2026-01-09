<script lang="ts">
  // Minimal repro: @keyframes in CSS causes parsing errors
  // svelte-check-rs 0.6.1 Error: ';' expected inside @keyframes block
</script>

<div class="animated">
  Animated content
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .animated {
    animation: fade-in 0.3s ease-out;
  }
</style>
