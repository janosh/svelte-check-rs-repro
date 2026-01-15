# svelte-check-rs Reproduction Repository

Minimal reproductions for issues with [svelte-check-rs](https://github.com/pheuter/svelte-check-rs).

## Current Status (v0.6.6)

| File                                  | Issue                                              | svelte-check | svelte-check-rs |
| ------------------------------------- | -------------------------------------------------- | ------------ | --------------- |
| `Repro_CssCustomPropertyUsage.svelte` | CSS custom properties (`--var`) as component props | ✅ passes     | ❌ TS2353        |

## Fixed in v0.6.6

The following issues from earlier versions have been resolved:

| File                                    | Issue                                               |
| --------------------------------------- | --------------------------------------------------- |
| `Repro_BindBeforeAssigned.svelte`       | `bind:this` variable used in `$derived`             |
| `Repro_DerivedBeforeDeclaration.svelte` | `$derived` uses variable declared later             |
| `Repro_ImplicitAny.svelte`              | `$state(undefined)` without type annotation         |
| `Repro_UndefinedNotAssignable.svelte`   | Assigning `undefined` to bindable prop              |
| `SnippetWithComplexConst.svelte`        | `{#snippet}` with complex `{@const}`                |
| `ConstWithArrowAndIIFE.svelte`          | `{@const}` with arrow functions and IIFE            |
| `Repro_SnippetChildrenUsage.svelte`     | Snippet with typed params passed as children        |

## Reproduce

```bash
pnpm install
pnpm check     # svelte-check - passes (0 errors)
pnpm check:rs  # svelte-check-rs - fails (1 error)
```

## Environment

- svelte-check-rs: 0.6.6
- svelte-check: 4.3.5
- svelte: 5.46.4

## CSS Custom Properties Issue

Svelte supports passing CSS custom properties directly to components:

```svelte
<!-- Repro_CssCustomProperty.svelte -->
<script lang="ts">
  let { fill = `blue`, size = 10 }: { fill?: string; size?: number } = $props()
</script>

<div class="point" style:--point-fill-color={fill} style:--point-size="{size}px"></div>

<style>
  .point {
    width: var(--point-size);
    height: var(--point-size);
    background: var(--point-fill-color);
    border-radius: 50%;
  }
</style>
```

```svelte
<!-- Repro_CssCustomPropertyUsage.svelte - FAILS in svelte-check-rs -->
<script lang="ts">
  import Repro_CssCustomProperty from './Repro_CssCustomProperty.svelte'
</script>

<!-- ✅ Works in svelte-check -->
<!-- ❌ svelte-check-rs Error: '--point-fill-color' does not exist in type -->
<Repro_CssCustomProperty --point-fill-color="green" --point-size="15px" />
```

This is a valid Svelte pattern documented at: https://svelte.dev/docs/svelte/styling#component-styles

svelte-check-rs incorrectly reports:
```
Error: Object literal may only specify known properties, and '"--point-fill-color"' does not exist in type '__SvelteProps_Repro_CssCustomProperty_'. (ts(TS2353))
```
