# svelte-check-rs Reproduction Repository

Minimal reproductions for issues with [svelte-check-rs](https://github.com/pheuter/svelte-check-rs).

## Current Issues (v0.6.8)

| File | Issue | svelte-check | svelte-check-rs |
| ---- | ----- | ------------ | --------------- |
| `tests/computed-prop.test.ts` | Computed property names in `mount()` props | ✅ passes | ❌ TS2322/TS2353 |
| `Repro_CssCustomPropertyUsage.svelte` | CSS custom properties (`--var`) as component props | ✅ passes | ❌ TS2353 |

## Fixed Issues

| Version | File | Issue |
| ------- | ---- | ----- |
| v0.6.6 | `Repro_SnippetChildrenUsage.svelte` | Snippet with typed params passed as children |
| v0.6.5+ | `Repro_BindBeforeAssigned.svelte` | `bind:this` variable used in `$derived` |
| v0.6.5+ | `Repro_DerivedBeforeDeclaration.svelte` | `$derived` uses variable declared later |
| v0.6.5+ | `Repro_ImplicitAny.svelte` | `$state(undefined)` without type annotation |
| v0.6.5+ | `Repro_UndefinedNotAssignable.svelte` | Assigning `undefined` to bindable prop |
| v0.6.2 | `SnippetWithComplexConst.svelte` | `{#snippet}` with complex `{@const}` |
| v0.6.2 | `ConstWithArrowAndIIFE.svelte` | `{@const}` with arrow functions and IIFE |

## Reproduce

```bash
pnpm install
pnpm check     # svelte-check - passes
pnpm check:rs  # svelte-check-rs - fails with errors
```

## Environment

- svelte-check-rs: 0.6.8
- svelte-check: 4.3.5
- svelte: 5.46.4
