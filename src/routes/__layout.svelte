<script>
  import '../app.css'
  import { onMount } from 'svelte'
  import { initializeApp } from 'firebase/app'
  import firebaseConfig from '$lib/utils/firebase'

  const setCustomViewportHeightVariable = () => {
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
  }

  let isLoading = true
  onMount(() => {
    // initialize Firebase
    initializeApp(firebaseConfig)
    isLoading = false
    // fix 100vh height on mobile: use with calc(100 * var(--vh))
    setCustomViewportHeightVariable()
    // add event listener on resize
    const resize = window.addEventListener('resize', () => {
      setCustomViewportHeightVariable()
    })
    return () => {
      window.removeEventListener('resize', resize)
    }
  })
</script>

{#if !isLoading}
  <slot />
{/if}
