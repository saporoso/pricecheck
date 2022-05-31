<script>
  import '../app.css'
  import { onMount } from 'svelte'

  const setCustomViewportHeightVariable = () => {
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
  }

  onMount(() => {
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

<slot />
