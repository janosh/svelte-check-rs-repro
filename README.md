# svelte-check-rs Minimal Reproduction

Minimal reproduction repo for [svelte-check-rs#46](https://github.com/pheuter/svelte-check-rs/issues/46), [#52](https://github.com/pheuter/svelte-check-rs/issues/52), and related Svelte 5 parsing issues.

## Issues

Each file in `src/lib/` reproduces a specific parsing issue:

| File | Issue | svelte-check | svelte-check-rs v0.5.5 |
|------|-------|--------------|------------------------|
| `SnippetWithComplexConst.svelte` | `{#snippet}` with complex `{@const}` (regex, method chaining) | ✅ | ✅ Fixed |
| `ConstWithArrowAndIIFE.svelte` | `{@const}` with typed arrow functions and IIFE | ✅ | ✅ Fixed |
| `AttachDirective.svelte` | `{@attach}` directive (Svelte 5) | ✅ | ✅ |
| `AttachWithFunctionCall.svelte` | `{@attach fn()}` with function calls | ✅ | ✅ |
| `EachDestructuringWithDefault.svelte` | `{#each}` with destructuring & default values ([#52](https://github.com/pheuter/svelte-check-rs/issues/52)) | ✅ | ❌ Fails |
| `EachAsConst.svelte` | **NEW** `{#each array as const as [name, opts = {}]}` | ✅ | ❌ Fails |

## Reproduce

```bash
pnpm install
node node_modules/svelte-check-rs/install.js  # May be needed if postinstall was skipped
pnpm check     # svelte-check passes ✅
pnpm check:rs  # svelte-check-rs fails ❌
```

## Expected

Both commands should report 0 errors.

## Bug Details

### Issue 1: `{#each}` with destructuring default values (#52)

Multi-line `{#each}` blocks with destructuring that includes default values fail to parse:

```svelte
{#each data.filter((x) => x.value) as
  { title, value, fmt = default_fmt }
  (title)
}
  ...
{/each}
```

### Issue 2: `as const` with destructuring default values (NEW)

`{#each}` using TypeScript's `as const` assertion combined with destructuring that has default values:

```svelte
<!-- PASSES: as const without defaults -->
{#each [[`a`, 1]] as const as [name, val] (name)}

<!-- FAILS: as const WITH defaults -->
{#each [[`a`, 1, {}]] as const as [name, val, opts = {}] (name)}
```

The `as const` assertion alone works fine. The bug is triggered when combining:
1. `as const` assertion
2. Destructuring with default values (`opts = {}`)

## Environment

- svelte-check-rs: 0.5.5
- svelte-check: 4.3.5
- svelte: 5.46.1
