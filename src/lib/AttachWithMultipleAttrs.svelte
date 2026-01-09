<script lang="ts">
  // Minimal repro: {@attach} combined with other attributes
  // svelte-check-rs 0.5.5 fails to parse this correctly
  // Error: 'const' is not allowed as a variable declaration name

  function tooltip(element: HTMLElement): void {
    element.style.cursor = `help`
  }

  function autofocus(element: HTMLInputElement): void {
    element.focus()
  }
</script>

<!-- {@attach} on input with event handlers -->
<input
  type="text"
  placeholder="Enter text"
  title="Type something here"
  {@attach tooltip}
  oninput={(e) => console.log(e.currentTarget.value)}
/>

<!-- {@attach} mixed with conditional attributes -->
{#if true}
  <button
    {@attach (el: HTMLButtonElement) => { el.dataset.attached = `true` }}
    disabled={false}
    onclick={() => console.log(`clicked`)}
  >
    Conditional button
  </button>
{/if}

<!-- {@attach} with cleanup function return -->
<div
  {@attach (element: HTMLDivElement) => {
    const handler = () => console.log(`clicked`)
    element.addEventListener(`click`, handler)
    return () => element.removeEventListener(`click`, handler)
  }}
>
  Element with cleanup attachment
</div>

<style>
  input {
    padding: 0.5rem;
  }
</style>
