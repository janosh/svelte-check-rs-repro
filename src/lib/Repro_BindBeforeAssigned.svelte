<script lang="ts">
  // Reproduction: bind:this element used in $derived before it's assigned
  // svelte-check-rs Error: Variable 'canvas' is used before being assigned
  // svelte-check: passes

  interface Point {
    x: number
    y: number
    visible: boolean
  }

  let plot_entries: Point[] = $state([
    { x: 10, y: 20, visible: true },
    { x: 30, y: 40, visible: true },
    { x: 50, y: 60, visible: false },
  ])

  // Canvas is bound to element (starts undefined before mount)
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null = null

  function project_point(x: number, y: number): { sx: number; sy: number; depth: number } {
    return { sx: x * 10, sy: y * 10, depth: x + y }
  }

  // This $derived uses canvas before it's assigned by bind:this
  const sorted_points_cache = $derived.by(() => {
    if (!canvas || plot_entries.length === 0) return []
    return plot_entries
      .filter((entry) => entry.visible)
      .map((entry) => ({
        entry,
        projected: project_point(entry.x, entry.y),
      }))
      .sort((a, b) => a.projected.depth - b.projected.depth)
  })

  $effect(() => {
    if (canvas) {
      ctx = canvas.getContext(`2d`)
    }
  })
</script>

<canvas bind:this={canvas} width="600" height="600"></canvas>

<div>
  <h3>Sorted Points</h3>
  <ul>
    {#each sorted_points_cache as item (item.entry.x + item.entry.y)}
      <li>({item.entry.x}, {item.entry.y}) - depth: {item.projected.depth}</li>
    {/each}
  </ul>
</div>
