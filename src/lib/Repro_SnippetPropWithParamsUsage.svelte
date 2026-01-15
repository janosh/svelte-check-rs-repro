<script lang="ts">
  // Reproduction: Passing snippet with typed params to component
  // svelte-check-rs Error: Type '(info: ...) => {...}' is not assignable to type 'Snippet<[...]>'
  // svelte-check: passes

  import Repro_SnippetPropWithParams from './Repro_SnippetPropWithParams.svelte'

  const sample_data = [
    { x: 20, y: 30, label: `A` },
    { x: 50, y: 60, label: `B` },
    { x: 80, y: 20, label: `C` },
  ]
</script>

<!-- Pattern: Passing snippet prop with destructured params -->
<Repro_SnippetPropWithParams data={sample_data}>
  {#snippet tooltip({ x, y, label })}
    <div class="tooltip">
      Point {label} at ({x}, {y})
    </div>
  {/snippet}
</Repro_SnippetPropWithParams>

<style>
  .tooltip {
    position: absolute;
    background: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
  }
</style>
