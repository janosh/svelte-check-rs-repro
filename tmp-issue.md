svelte-check-rs v0.6.2 reports TypeScript errors that svelte-check v4.3.5 does not. Minimal reproductions at https://github.com/janosh/svelte-check-rs-repro

### Environment

- svelte-check-rs: 0.6.2
- svelte-check: 4.3.5
- svelte: 5.46.1

### Issue 1: `bind:this` variable used in `$derived` before assigned

**Error:** `Variable 'canvas' is used before being assigned. (ts(TS2454))`

```svelte
<script lang="ts">
  let canvas: HTMLCanvasElement

  const cache = $derived.by(() => {
    if (!canvas) return []  // Error here
    return [canvas.width]
  })
</script>

<canvas bind:this={canvas}></canvas>
```

### Issue 2: `$derived` uses variable declared later in source

**Error:** `Block-scoped variable 'hull_model' used before its declaration. (ts(TS2448))`

```svelte
<script lang="ts">
  // This $derived references hull_model declared below
  const enriched = $derived.by(() => {
    return compute(hull_model)  // Error: used before declaration
  })

  const hull_model = $derived.by(() => build_model())
</script>
```

### Issue 3: `$state(undefined)` without type annotation

**Error:** `Variable 'scene' implicitly has type 'any'. (ts(TS7034))`

```svelte
<script lang="ts">
  let scene = $state(undefined)  // Error: implicit any

  $effect(() => {
    if (scene) console.log(scene)  // Error: implicit any
  })
</script>
```

### Issue 4: Assigning `undefined` to bindable prop

**Error:** `Type 'undefined' is not assignable to type 'X'. (ts(TS2322))`

```svelte
<script lang="ts">
  let { bz_data = $bindable() }: { bz_data?: BrillouinZoneData } = $props()

  $effect(() => {
    if (!valid) {
      bz_data = undefined  // Error: undefined not assignable
    }
  })
</script>
```

### Reproduce

```bash
git clone https://github.com/janosh/svelte-check-rs-repro
cd svelte-check-rs-repro
pnpm install
pnpm check     # svelte-check passes ✅
pnpm check:rs  # svelte-check-rs fails with 12 errors ❌
```

### Question

Are these intentionally stricter checks, or should they match svelte-check's behavior for Svelte reactivity patterns?
