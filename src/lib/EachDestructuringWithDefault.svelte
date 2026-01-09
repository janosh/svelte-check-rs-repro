<script lang="ts">
  // Minimal repro: {#each} with complex destructuring and default values causes parsing errors
  // svelte-check-rs 0.5.5 Error: Property or signature expected. (ts(TS1131))
  // svelte-check-rs 0.5.5 Error: Declaration or statement expected. (ts(TS1128))

  interface DataItem {
    title: string
    value?: string | number | null
    unit?: string
    fmt?: string
    condition?: boolean
    tooltip?: string
  }

  let data: DataItem[] = $state([
    { title: `Energy`, value: 1.23, unit: `eV`, fmt: `.3f` },
    { title: `Force`, value: 0.01, unit: `eV/Å` },
    { title: `Disabled`, value: null, condition: false },
  ])

  let default_fmt = $state(`.2f`)

  function format_num(value: number, fmt: string): string {
    return value.toFixed(parseInt(fmt.replace(/\D/g, ``)) || 2)
  }
</script>

<!-- Complex filter + destructuring with default values on multiple lines -->
<section>
  {#each data.filter((itm) =>
      (!(`condition` in itm) || itm?.condition) && itm.value !== undefined &&
      itm.value !== null
    ) as
    { title, value, unit, fmt = default_fmt, tooltip }
    (title + value + unit + fmt)
  }
    <div>
      <span class="title">{title}</span>
      <strong title={tooltip ?? ``}>
        {typeof value === `number` ? format_num(value, fmt) : value}
        {#if unit}
          <small>{unit}</small>
        {/if}
      </strong>
    </div>
  {:else}
    No data
  {/each}
</section>

<!-- Simpler version - also may fail -->
<ul>
  {#each data.filter((d) => d.value != null) as { title, value, fmt = `.2f` } (title)}
    <li>{title}: {typeof value === `number` ? format_num(value, fmt) : value}</li>
  {/each}
</ul>

<style>
  section {
    display: grid;
    gap: 1rem;
  }
</style>
