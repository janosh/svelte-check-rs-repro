<script lang="ts">
  // Reproduction: Using component with CSS custom properties as props
  // svelte-check-rs Error: '--point-fill-color' does not exist in type
  // svelte-check: passes

  import Repro_CssCustomProperty from './Repro_CssCustomProperty.svelte'
</script>

<!-- This should work - passing CSS custom properties via style directive -->
<Repro_CssCustomProperty fill="red" size={20} />

<!-- Also passing inline via style attribute should work -->
<Repro_CssCustomProperty --point-fill-color="green" --point-size="15px" />
