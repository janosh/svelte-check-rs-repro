# svelte-check-rs Minimal Reproduction

Minimal reproduction repo for svelte-check-rs parsing issues.

## Progress Summary 🎉

| Version | Errors on [matterviz](https://github.com/janosh/matterviz) | Status |
|---------|-------------------------------------------------------------|--------|
| v0.5.4 | 154 | - |
| v0.5.5 | 46 | 70% ↓ |
| v0.5.6 | 4 | 97% ↓ |
| **v0.6.1** | **3*** | **98% ↓** |

*3 remaining errors are line number calculation issues on large files (errors reported on lines beyond file length)

## All Reproductions Now Pass in v0.6.1! ✅

| File | Issue | Status |
|------|-------|--------|
| `SnippetWithComplexConst.svelte` | `{@const}` with regex | ✅ Fixed |
| `ConstWithArrowAndIIFE.svelte` | `{@const}` with arrow functions | ✅ Fixed |
| `EachDestructuringWithDefault.svelte` | `{#each}` destructuring defaults | ✅ Fixed |
| `EachAsConst.svelte` | `as const` with defaults | ✅ Fixed |
| `AttachDirective.svelte` | `{@attach}` directive | ✅ Works |
| `AttachWithFunctionCall.svelte` | `{@attach fn()}` | ✅ Works |
| `SnippetWithTypedDestructuring.svelte` | Typed snippet params | ✅ Fixed |
| `CssKeyframes.svelte` | `@keyframes` in CSS | ✅ Works |

## Reproduce

```bash
pnpm install
node node_modules/svelte-check-rs/install.js
pnpm check     # svelte-check
pnpm check:rs  # svelte-check-rs
```

## Environment

- svelte-check-rs: 0.6.1
- svelte-check: 4.3.5
- svelte: 5.46.1
