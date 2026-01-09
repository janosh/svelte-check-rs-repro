<script lang="ts">
  // Reproduction: State variables without explicit types
  // svelte-check-rs Error: Variable 'X' implicitly has type 'any'
  // svelte-check: passes (looser checking)

  // These implicitly have type 'any' when initialized with undefined
  let scene = $state(undefined)
  let camera = $state(undefined)

  // Later used in ways that require type info
  function setup_scene() {
    if (scene && camera) {
      // TypeScript needs to know the types here
      console.log(`Scene:`, scene)
      console.log(`Camera:`, camera)
    }
  }

  // In a conditional block, the type narrows to 'never' or stays 'any'
  $effect(() => {
    if (scene) {
      // scene is still 'any' here
      const s = scene
      console.log(s)
    }
    if (camera) {
      const c = camera
      console.log(c)
    }
  })
</script>

<div>
  <button onclick={setup_scene}>Setup Scene</button>
  <p>Scene: {scene ? `loaded` : `not loaded`}</p>
  <p>Camera: {camera ? `loaded` : `not loaded`}</p>
</div>
