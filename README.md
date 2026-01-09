# svelte-check-rs Minimal Reproduction

Minimal reproduction repo for [svelte-check-rs#46](https://github.com/pheuter/svelte-check-rs/issues/46) and related Svelte 5 parsing issues.

## Issues

Each file in `src/lib/` reproduces a specific parsing issue:

| File | Issue | svelte-check | svelte-check-rs v0.5.5 |
|------|-------|--------------|------------------------|
| `SnippetWithComplexConst.svelte` | `{#snippet}` with complex `{@const}` (regex, destructuring, method chaining) | ✅ | ✅ Fixed |
| `ConstWithArrowAndIIFE.svelte` | `{@const}` with typed arrow functions and IIFE | ✅ | ✅ Fixed |
| `AttachDirective.svelte` | `{@attach}` directive (Svelte 5) | ✅ | ✅ |
| `AttachWithMultipleAttrs.svelte` | Multiple `{@attach}` directives | ✅ | ⚠️ Implicit any |
| `AttachWithFunctionCall.svelte` | `{@attach fn()}` with function calls | ✅ | ✅ |
| `EachDestructuringWithDefault.svelte` | **NEW** `{#each}` with destructuring & default values | ✅ | ❌ Fails |

## Reproduce

```bash
pnpm install
node node_modules/svelte-check-rs/install.js  # May be needed if postinstall was skipped
pnpm check     # svelte-check passes ✅
pnpm check:rs  # svelte-check-rs fails ❌
```

## Expected

Both commands should report 0 errors.

## Error Output (v0.5.5)

```
src/lib/EachDestructuringWithDefault.svelte:34:47
Error: Property or signature expected. (ts(TS1131))

src/lib/EachDestructuringWithDefault.svelte:62:1
Error: Declaration or statement expected. (ts(TS1128))
```

## Analysis

### Issue: `{#each}` with complex destructuring patterns

The parser fails on multi-line `{#each}` blocks that combine:
1. Inline filter function calls
2. Destructuring with default values (`{ foo = default_value }`)
3. Key expressions on separate lines

Example that fails:

```svelte
{#each data.filter((itm) =>
    itm.value !== null
  ) as
  { title, value, fmt = default_fmt }
  (title + value)
}
  ...
{/each}
```

### Previously Fixed (v0.5.5)

- Regex literals in `{@const}` expressions
- Complex method chaining in `{@const}`

## Environment

- svelte-check-rs: 0.5.5
- svelte-check: 4.3.5
- svelte: 5.46.1
