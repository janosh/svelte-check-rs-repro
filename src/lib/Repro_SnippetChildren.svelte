<script lang="ts">
  // Reproduction: Component with typed children snippet
  // svelte-check-rs reports: Type '() => {...}' is not assignable to type 'Snippet<[...]>'
  // svelte-check: passes

  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  let {
    title,
    current_values,
    children,
    on_reset = () => {},
    ...rest
  }: HTMLAttributes<HTMLElement> & {
    title: string
    current_values: Record<string, unknown>
    children: Snippet<
      [{
        current_values: Record<string, unknown>
        has_changes: boolean
        reference_values: Record<string, unknown>
      }]
    >
    on_reset?: () => void
  } = $props()

  const reference_values = structuredClone(current_values)
  let has_changes = $derived(
    JSON.stringify(current_values) !== JSON.stringify(reference_values)
  )
</script>

<section {...rest}>
  <h4>
    {title}
    {#if has_changes}
      <button onclick={() => on_reset()}>Reset</button>
    {/if}
  </h4>
  {@render children?.({ current_values, has_changes, reference_values })}
</section>
