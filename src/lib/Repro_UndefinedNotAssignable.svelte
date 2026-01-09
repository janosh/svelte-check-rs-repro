<script lang="ts">
  // Reproduction: Assigning undefined to bindable prop without undefined in type
  // svelte-check-rs Error: Type 'undefined' is not assignable to type 'X'
  // svelte-check: passes (looser checking)

  interface BrillouinZoneData {
    vertices: number[][]
    edges: number[][]
    faces: number[][]
  }

  interface Crystal {
    lattice: { matrix: number[][] }
  }

  let {
    structure = $bindable(),
    bz_data = $bindable(),
    error_msg = $bindable(),
  }: {
    structure?: Crystal
    bz_data?: BrillouinZoneData  // Note: type doesn't include undefined explicitly
    error_msg?: string
  } = $props()

  function compute_brillouin_zone(_lattice: number[][]): BrillouinZoneData {
    return { vertices: [], edges: [], faces: [] }
  }

  // Effect that assigns undefined when structure is invalid
  $effect(() => {
    if (!structure || !(`lattice` in structure) || !structure.lattice) {
      bz_data = undefined  // Error: Type 'undefined' not assignable to 'BrillouinZoneData'
      return
    }

    try {
      bz_data = compute_brillouin_zone(structure.lattice.matrix)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      error_msg = `BZ computation failed: ${msg}`
      bz_data = undefined  // Error: Type 'undefined' not assignable to 'BrillouinZoneData'
    }
  })

  // Similar pattern with string type
  $effect(() => {
    if (!structure) {
      error_msg = undefined  // Error: Type 'undefined' not assignable to 'string'
    }
  })
</script>

<div>
  {#if bz_data}
    <p>BZ computed with {bz_data.vertices.length} vertices</p>
  {:else if error_msg}
    <p class="error">{error_msg}</p>
  {:else}
    <p>No structure loaded</p>
  {/if}
</div>
