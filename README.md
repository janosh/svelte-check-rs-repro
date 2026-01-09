# svelte-check-rs Reproduction Repository

Minimal reproductions for issues with [svelte-check-rs](https://github.com/pheuter/svelte-check-rs).

## Current Status

| File                                    | Issue                                                   | svelte-check | svelte-check-rs |
| --------------------------------------- | ------------------------------------------------------- | ------------ | --------------- |
| `Repro_BindBeforeAssigned.svelte`       | `bind:this` variable used in `$derived` before assigned | ✅ passes     | ❌ TS2454        |
| `Repro_DerivedBeforeDeclaration.svelte` | `$derived` uses variable declared later                 | ✅ passes     | ❌ TS2448/TS2454 |
| `Repro_ImplicitAny.svelte`              | `$state(undefined)` without type annotation             | ✅ passes     | ❌ TS7034/TS7005 |
| `Repro_UndefinedNotAssignable.svelte`   | Assigning `undefined` to bindable prop                  | ✅ passes     | ❌ TS2322        |

## Fixed in v0.6.2

| File                             | Issue                                    |
| -------------------------------- | ---------------------------------------- |
| `SnippetWithComplexConst.svelte` | `{#snippet}` with complex `{@const}`     |
| `ConstWithArrowAndIIFE.svelte`   | `{@const}` with arrow functions and IIFE |

## Reproduce

```bash
pnpm install
pnpm check     # svelte-check - passes
pnpm check:rs  # svelte-check-rs - fails with 12 errors
```

## Environment

- svelte-check-rs: 0.6.2
- svelte-check: 4.3.5
- svelte: 5.46.1

## Analysis

These errors represent stricter type checking by tsgo compared to tsc. They may be:
1. **Legitimate issues** that svelte-check should also catch
2. **False positives** due to different understanding of Svelte's reactivity model
3. **Intentionally stricter** behavior in svelte-check-rs

The key patterns involve:
- `bind:this` element references used in `$derived` (always undefined initially)
- `$derived` referencing variables declared later in source (hoisting)
- `$state(undefined)` without explicit type annotations
- `$bindable()` props assigned `undefined` when type doesn't explicitly include `| undefined`
