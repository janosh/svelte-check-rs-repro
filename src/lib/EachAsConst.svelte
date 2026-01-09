<script lang="ts">
  // Minimal repro: {#each array as const as [destructuring with default]} causes parsing errors
  // svelte-check-rs 0.5.5 Error: 'const' is not allowed as a variable declaration name
  //
  // The "as const" TypeScript assertion works fine on its own.
  // The bug is triggered when BOTH:
  //   1. "as const" is used
  //   2. Destructuring has a default value (e.g., `opts = {}`)
</script>

<!-- PASSES: Simple as const without default values -->
<div id="pass-1">
  {#each [`pie`, `bubble`, `bar`] as const as mode (mode)}
    <span>{mode}</span>
  {/each}
</div>

<!-- PASSES: as const with tuple destructuring (no defaults) -->
<div id="pass-2">
  {#each [[`a`, 1], [`b`, 2]] as const as [name, val] (name)}
    <span>{name}: {val}</span>
  {/each}
</div>

<!-- FAILS: as const with destructuring default value -->
<div id="fail-1">
  {#each [[`a`, 1], [`b`, 2, { extra: true }]] as const as [name, val, opts = {}] (name)}
    <span>{name}: {val}</span>
  {/each}
</div>

<!-- FAILS: Multi-line as const with destructuring default -->
<div id="fail-2">
  {#each [
    [`Pie`, `pie`, `Vesta`],
    [`Donut`, `pie`, `Pastel`, { radius: 40 }],
  ] as const as
    [title, mode, color, props = {}]
    (title)
  }
    <span>{title}: {mode}</span>
  {/each}
</div>
