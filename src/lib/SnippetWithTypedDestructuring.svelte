<script lang="ts">
  // Minimal repro: {#snippet} with typed destructuring parameter causes parsing errors
  // svelte-check-rs 0.5.6 Error: Variable declaration expected. (ts(TS1134))

  interface UserContentProps {
    x_scale: (n: number) => number
    y_scale: (n: number) => number
    width: number
    height: number
    padding: { top: number; left: number }
  }

  interface SimpleProps {
    width: number
    height: number
  }
</script>

<!-- FAILS: Snippet with typed destructuring parameters -->
{#snippet user_content(
  { x_scale, y_scale, width, height, padding }: UserContentProps,
)}
  {@const x0 = x_scale(0)}
  {@const y0 = y_scale(0)}
  <line x1={padding.left} x2={width} y1={y0} y2={y0} />
{/snippet}

<!-- PASSES: Snippet with simpler type annotation -->
{#snippet simple_content({ width, height }: SimpleProps)}
  <div style="width: {width}px; height: {height}px">Content</div>
{/snippet}

<div>
  {@render user_content({
    x_scale: (n) => n * 100,
    y_scale: (n) => n * 50,
    width: 400,
    height: 300,
    padding: { top: 10, left: 20 },
  })}
  {@render simple_content({ width: 200, height: 150 })}
</div>
