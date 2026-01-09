<script lang="ts">
  // Reproduction: Using component with typed children snippet
  // Children content doesn't explicitly use snippet params
  // svelte-check-rs Error: Type '() => {...}' is not assignable to type 'Snippet<[...]>'
  // svelte-check: passes

  import Repro_SnippetChildren from './Repro_SnippetChildren.svelte'

  let surface_color = $state(`#4488ff`)
  let surface_opacity = $state(0.3)
  let edge_color = $state(`#000000`)
  let edge_width = $state(0.05)
  let show_vectors = $state(true)
  let bz_order = $state(1)
</script>

<!-- Pattern 1: Children that don't use snippet params -->
<Repro_SnippetChildren
  title="General"
  current_values={{ bz_order, show_vectors }}
  on_reset={() => {
    bz_order = 1
    show_vectors = true
  }}
  style="display: flex; gap: 2ex; flex-wrap: wrap"
>
  <label>
    <span>Order:</span>
    <select bind:value={bz_order}>
      <option value={1}>1st</option>
      <option value={2}>2nd</option>
      <option value={3}>3rd</option>
    </select>
  </label>
  <label>
    <span>Show Vectors:</span>
    <input type="checkbox" bind:checked={show_vectors} />
  </label>
</Repro_SnippetChildren>

<!-- Pattern 2: Multiple sections -->
<Repro_SnippetChildren
  title="Surface"
  current_values={{ surface_color, surface_opacity }}
  on_reset={() => {
    surface_color = `#4488ff`
    surface_opacity = 0.3
  }}
>
  <label>
    <span>Color:</span>
    <input type="color" bind:value={surface_color} />
  </label>
  <label>
    <span>Opacity:</span>
    <input type="range" min="0" max="1" step="0.01" bind:value={surface_opacity} />
  </label>
</Repro_SnippetChildren>

<Repro_SnippetChildren
  title="Edges"
  current_values={{ edge_color, edge_width }}
  on_reset={() => {
    edge_color = `#000000`
    edge_width = 0.05
  }}
>
  <label>
    <span>Color:</span>
    <input type="color" bind:value={edge_color} />
  </label>
  <label>
    <span>Width:</span>
    <input type="range" min="0.01" max="0.2" step="0.01" bind:value={edge_width} />
  </label>
</Repro_SnippetChildren>
