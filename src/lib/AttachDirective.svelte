<script lang="ts">
  // Minimal repro: {@attach} directive causes parsing errors in svelte-check-rs v0.5.5
  // Error: 'const' is not allowed as a variable declaration name. (ts(TS1389))
  // Error: Unexpected keyword or identifier. (ts(TS1434))

  // Simple attachment function (Svelte 5 style)
  // Attachments return void or a cleanup function
  function tooltip(element: HTMLElement): void {
    const original_title = element.title
    element.style.cursor = `help`
    // Cleanup not needed for this simple example
  }

  function highlight(element: HTMLElement): void {
    element.style.backgroundColor = `yellow`
  }

  let items = $state([
    { name: `Item 1`, url: `/item-1` },
    { name: `Item 2`, url: `/item-2` },
  ])
</script>

<!-- Simple case: {@attach} on element -->
<div>
  <a
    href="/example"
    title="This is a link"
    {@attach tooltip}
    target="_blank"
    rel="noopener noreferrer"
  >
    Example Link
  </a>
</div>

<!-- {@attach} with inline function -->
<div>
  <button
    {@attach (el: HTMLButtonElement) => { el.title = `Click me` }}
    onclick={() => console.log(`clicked`)}
  >
    Button with inline attachment
  </button>
</div>

<!-- {@attach} inside {#each} loop -->
<ul>
  {#each items as { name, url }}
    <li>
      <a
        href={url}
        title={`Go to ${name}`}
        {@attach tooltip}
      >
        {name}
      </a>
    </li>
  {/each}
</ul>

<!-- Multiple {@attach} directives on same element -->
<div
  {@attach tooltip}
  {@attach highlight}
  title="Has two attachments"
>
  Element with multiple attachments
</div>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
</style>
