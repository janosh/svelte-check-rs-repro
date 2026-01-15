// Reproduction: Plugin type causes "Excessive stack depth" error
// svelte-check-rs Error: Excessive stack depth comparing types '...' and 'Plugin<any>'
// svelte-check: passes

import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, type Plugin } from 'vite'

export default defineConfig({
  plugins: [
    {
      // Custom plugin with inline type - may trigger excessive stack depth
      name: `vite-plugin-custom`,
      enforce: `pre`,
      load(id) {
        if (!id.endsWith(`.custom`)) return null
        return { code: `export default {}`, map: null }
      },
    } satisfies Plugin,
    sveltekit(),
  ],
})
