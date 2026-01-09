# svelte-check-rs Minimal Reproduction

Minimal reproduction repo for svelte-check-rs parsing issues.

## Issues

| File | Issue | v0.5.5 | v0.5.6 |
|------|-------|--------|--------|
| `SnippetWithComplexConst.svelte` | `{@const}` with regex, method chaining | ❌ | ✅ Fixed |
| `ConstWithArrowAndIIFE.svelte` | `{@const}` with arrow functions | ❌ | ✅ Fixed |
| `EachDestructuringWithDefault.svelte` | `{#each}` with destructuring defaults ([#52](https://github.com/pheuter/svelte-check-rs/issues/52)) | ❌ | ✅ Fixed |
| `EachAsConst.svelte` | `as const` with destructuring defaults ([#54](https://github.com/pheuter/svelte-check-rs/issues/54)) | ❌ | ✅ Fixed |
| `AttachDirective.svelte` | `{@attach}` directive | ✅ | ✅ |
| `AttachWithFunctionCall.svelte` | `{@attach fn()}` | ✅ | ✅ |
| `SnippetWithTypedDestructuring.svelte` | **NEW** `{#snippet fn({ a, b }: Type,)}` with trailing comma | ✅ | ❌ Fails |

## Reproduce

```bash
pnpm install
node node_modules/svelte-check-rs/install.js  # May be needed if postinstall was skipped
pnpm check     # svelte-check passes ✅
pnpm check:rs  # svelte-check-rs fails ❌
```

## Current Bug (v0.5.6)

### Issue: `{#snippet}` with typed destructuring and trailing comma

```svelte
<!-- FAILS: Typed destructuring parameter with trailing comma -->
{#snippet user_content(
  { x_scale, width, height }: UserContentProps,
)}
  ...
{/snippet}
```

Error: `Variable declaration expected. (ts(TS1134))`

The trailing comma after the type annotation seems to trigger the error.

## Environment

- svelte-check-rs: 0.5.6
- svelte-check: 4.3.5
- svelte: 5.46.1
