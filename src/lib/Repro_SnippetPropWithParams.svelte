<script lang="ts">
  // Reproduction: Component accepting snippet prop with typed parameters
  // This is the receiving component
  // svelte-check-rs may have issues with callers of this component

  import type { Snippet } from 'svelte'

  interface TooltipData {
    x: number
    y: number
    label: string
  }

  let {
    data,
    tooltip,
  }: {
    data: { x: number; y: number; label: string }[]
    tooltip?: Snippet<[TooltipData]>
  } = $props()

  let hovered = $state<TooltipData | null>(null)
</script>

<div class="chart">
  {#each data as point}
    <div
      class="point"
      style:left="{point.x}%"
      style:top="{point.y}%"
      onmouseenter={() => hovered = point}
      onmouseleave={() => hovered = null}
    >
      {point.label}
    </div>
  {/each}

  {#if hovered && tooltip}
    {@render tooltip(hovered)}
  {/if}
</div>

<style>
  .chart { position: relative; width: 200px; height: 200px; }
  .point { position: absolute; cursor: pointer; }
</style>
