<script lang="ts">
  // Component with optional boolean props
  // Used to test computed property names in mount()

  interface Props {
    element: { name: string; number: number }
    show_symbol?: boolean
    show_number?: boolean
    show_name?: boolean
  }

  let { element, show_symbol = true, show_number = true, show_name = false }: Props = $props()
</script>

<div class="tile">
  {#if show_symbol}
    <span class="symbol">{element.name.slice(0, 2)}</span>
  {/if}
  {#if show_number}
    <span class="number">{element.number}</span>
  {/if}
  {#if show_name}
    <span class="name">{element.name}</span>
  {/if}
</div>
