# svelte-check-rs Minimal Reproduction

Minimal reproduction repo for [svelte-check-rs#46](https://github.com/pheuter/svelte-check-rs/issues/46).

## Status

✅ **Fixed in v0.6.2** - All issues from #46 are resolved.

## Historical Issues (Fixed)

| File                             | Issue                                                                        | Status |
| -------------------------------- | ---------------------------------------------------------------------------- | ------ |
| `SnippetWithComplexConst.svelte` | `{#snippet}` with complex `{@const}` (regex, destructuring, method chaining) | ✅ Fixed |
| `ConstWithArrowAndIIFE.svelte`   | `{@const}` with typed arrow functions and IIFE                               | ✅ Fixed |

## Reproduce

```bash
pnpm install
pnpm check     # svelte-check
pnpm check:rs  # svelte-check-rs
```

Both commands now report 0 errors with v0.6.2.

## Environment

- svelte-check-rs: 0.6.2
- svelte: 5.46.1
