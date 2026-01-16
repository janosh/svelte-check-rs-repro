// Reproduction: Computed property names in mount() props
// svelte-check-rs Error: Type '{ [x: string]: ... }' is not assignable to type '...'
// svelte-check: passes

import { mount } from 'svelte'
import { describe, test, expect } from 'vitest'
import Repro_ComputedPropName from '../src/lib/Repro_ComputedPropName.svelte'

describe(`Computed property names in props`, () => {
  const element = { name: `Hydrogen`, number: 1 }

  // Pattern 1: Computed property name from variable
  test.each([
    [`show_symbol`, `symbol`],
    [`show_number`, `number`],
    [`show_name`, `name`],
  ] as const)(`%s prop controls %s visibility`, (prop: string, selector: string) => {
    // This triggers: Type '{ [x: string]: ... }' is not assignable to type '...'
    mount(Repro_ComputedPropName, {
      target: document.body,
      props: { element, [prop]: true },
    })

    expect(document.querySelector(`.${selector}`)).toBeTruthy()
  })

  // Pattern 2: Computed property name for handler
  test(`computed handler prop`, () => {
    const handler_name = `onclick` as const
    const mock_handler = () => {}

    // Also triggers type error with computed property names
    mount(Repro_ComputedPropName, {
      target: document.body,
      props: { element, [handler_name]: mock_handler },
    })
  })
})
