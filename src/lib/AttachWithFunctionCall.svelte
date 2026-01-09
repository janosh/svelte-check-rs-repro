<script lang="ts">
  // Minimal repro: {@attach func()} with function call causes parsing errors in svelte-check-rs v0.5.5
  // This is the pattern that fails - calling a function that returns an attachment
  //
  // Error: 'const' is not allowed as a variable declaration name. (ts(TS1389))
  // Error: Unexpected keyword or identifier. (ts(TS1434))

  // Factory function that returns an attachment
  function tooltip(options?: { content?: string; placement?: string }): (element: HTMLElement) => void {
    return (element: HTMLElement) => {
      element.title = options?.content ?? element.title ?? ``
    }
  }

  // Another factory pattern
  function trackClick(label: string): (element: HTMLElement) => (() => void) {
    return (element: HTMLElement) => {
      const handler = () => console.log(`Clicked: ${label}`)
      element.addEventListener(`click`, handler)
      return () => element.removeEventListener(`click`, handler)
    }
  }
</script>

<!-- This pattern causes svelte-check-rs to fail: {@attach func()} -->
<div>
  <button
    title="Click me button"
    {@attach tooltip()}
    onclick={() => console.log(`clicked`)}
  >
    Button with tooltip()
  </button>
</div>

<!-- {@attach} with object argument -->
<div>
  <a
    href="/link"
    {@attach tooltip({ content: `Link tooltip` })}
    target="_blank"
  >
    Link with options
  </a>
</div>

<!-- Multiple function calls -->
<div
  {@attach tooltip({ content: `Tracked element`, placement: `top` })}
  {@attach trackClick(`main-div`)}
>
  Element with multiple factory attachments
</div>

<!-- Nested in conditional -->
{#if true}
  <span
    {@attach tooltip({ content: `Conditional tooltip` })}
  >
    Conditional content
  </span>
{/if}
