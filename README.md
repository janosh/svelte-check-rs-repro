# svelte-check-rs Minimal Reproduction

Minimal reproduction repo for [svelte-check-rs#46](https://github.com/pheuter/svelte-check-rs/issues/46).

## Issues

Each file in `src/lib/` reproduces a specific parsing issue:

| File | Issue |
|------|-------|
| `SnippetWithComplexConst.svelte` | `{#snippet}` with complex `{@const}` (regex, destructuring, method chaining) |
| `ConstWithArrowAndIIFE.svelte` | `{@const}` with typed arrow functions and IIFE |

## Reproduce

```bash
pnpm install
pnpm check     # svelte-check passes ✅
pnpm check:rs  # svelte-check-rs fails ❌
```

## Expected

Both commands should report 0 errors.

## Environment

- svelte-check-rs: 0.5.4
- svelte: 5.46.1
