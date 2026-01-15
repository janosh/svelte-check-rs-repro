<script lang="ts">
  // Reproduction: Passing conditional snippet | boolean to component
  // svelte-check-rs Error: Type 'true | ((...) => ...)' is not assignable to type 'boolean | Snippet<[...]>'
  // svelte-check: passes

  import Repro_SnippetOrBoolean from './Repro_SnippetOrBoolean.svelte'

  const sample_items = [
    { name: `Alpha`, value: 10 },
    { name: `Beta`, value: 20 },
    { name: `Gamma`, value: 30 },
  ]

  let use_custom = $state(false)
</script>

{#snippet custom_tooltip({ name, value, active }: { name: string; value: number; active: boolean })}
  <div class="custom-tooltip" class:active>
    <strong>{name}</strong>
    <span>{value}</span>
  </div>
{/snippet}

<label>
  <input type="checkbox" bind:checked={use_custom} />
  Use custom tooltip
</label>

<!-- This pattern causes the error: conditional snippet or boolean -->
<Repro_SnippetOrBoolean
  items={sample_items}
  tooltip={use_custom ? custom_tooltip : true}
/>

<style>
  .custom-tooltip {
    background: #333;
    color: white;
    padding: 8px;
  }
  .custom-tooltip.active {
    border: 2px solid gold;
  }
</style>
