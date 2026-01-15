<script lang="ts">
  // Reproduction: CSS custom properties passed as style props
  // svelte-check-rs Error: '--point-fill-color' does not exist in type '__SvelteProps_...'
  // svelte-check: passes

  let {
    fill = `blue`,
    size = 10,
  }: {
    fill?: string
    size?: number
  } = $props()
</script>

<div
  class="point"
  style:--point-fill-color={fill}
  style:--point-size="{size}px"
></div>

<style>
  .point {
    width: var(--point-size);
    height: var(--point-size);
    background: var(--point-fill-color);
    border-radius: 50%;
  }
</style>
