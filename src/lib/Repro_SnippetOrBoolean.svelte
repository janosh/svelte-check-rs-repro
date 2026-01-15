<script lang="ts">
  // Reproduction: Component with prop that accepts Snippet | boolean
  // svelte-check-rs Error: Type 'true | ((...) => ...)' is not assignable to type 'boolean | Snippet<[...]>'
  // svelte-check: passes

  import type { Snippet } from 'svelte'

  interface TooltipProps {
    name: string
    value: number
    active: boolean
  }

  let {
    items,
    tooltip,
  }: {
    items: { name: string; value: number }[]
    tooltip?: Snippet<[TooltipProps]> | boolean
  } = $props()

  let hovered = $state<{ name: string; value: number } | null>(null)
</script>

<div class="list">
  {#each items as item}
    <div
      class="item"
      onmouseenter={() => hovered = item}
      onmouseleave={() => hovered = null}
    >
      {item.name}: {item.value}
    </div>
  {/each}

  {#if hovered}
    {#if tooltip === true}
      <div class="tooltip">{hovered.name}: {hovered.value}</div>
    {:else if typeof tooltip === `function`}
      {@render tooltip({ ...hovered, active: true })}
    {/if}
  {/if}
</div>
