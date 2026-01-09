<script lang="ts">
  // Reproduction: $derived uses variable before its declaration
  // svelte-check-rs Error: Block-scoped variable 'model' used before its declaration
  // svelte-check-rs Error: Variable 'model' is used before being assigned
  // svelte-check: passes

  interface HullModel {
    faces: number[][]
    vertices: number[][]
  }

  interface Entry {
    x: number
    y: number
    z: number
    e_above_hull?: number
  }

  let coords_entries: Entry[] = $state([
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0.1 },
    { x: 0, y: 1, z: 0.2 },
  ])

  function build_hull_model(faces: number[][]): HullModel {
    return { faces, vertices: [] }
  }

  function compute_e_above_hull(
    points: { x: number; y: number; z: number }[],
    _model: HullModel,
  ): number[] {
    return points.map(() => Math.random() * 0.1)
  }

  // This $derived uses hull_model which is declared AFTER this block
  const all_enriched_entries = $derived.by(() => {
    if (coords_entries.length === 0) return []
    const pts = coords_entries.map((e) => ({ x: e.x, y: e.y, z: e.z }))
    const e_hulls = compute_e_above_hull(pts, hull_model)
    return coords_entries.map((e, idx) => ({ ...e, e_above_hull: e_hulls[idx] }))
  })

  // hull_model is declared AFTER it's used above
  const hull_faces = $derived(coords_entries.map((_, idx) => [idx]))
  let hull_model = $derived.by(() => build_hull_model(hull_faces))
</script>

<div>
  <h3>Entries with e_above_hull</h3>
  <ul>
    {#each all_enriched_entries as entry (entry.x + entry.y)}
      <li>({entry.x}, {entry.y}, {entry.z}) - e_hull: {entry.e_above_hull?.toFixed(3)}</li>
    {/each}
  </ul>
</div>
