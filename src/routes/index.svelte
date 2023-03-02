<script>
  import { onMount } from 'svelte'

  import { getAuth, onAuthStateChanged } from 'firebase/auth'

  import SearchBox from '$lib/components/SearchBox.svelte'
  import Login from '$lib/components/Login.svelte'
  import Logout from '$lib/components/Logout.svelte'

  let isLoading = true
  let isAuthenticated = false
  let isVisible = false
  let inputRef = null

  onMount(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isAuthenticated = true
      } else {
        isAuthenticated = false
      }
      isLoading = false
    })
    setTimeout(() => {
      isVisible = true
    }, 500)
  })

  $: {
    if (isVisible && inputRef) {
      inputRef.focus()
    }
  }
</script>

<main
  class="flex h-full w-full flex-col items-center justify-end gap-4 overflow-auto p-6 lg:py-10"
  class:justify-between={isVisible}
>
  {#if isVisible}
    <SearchBox />
  {/if}
  <div class="flex flex-col items-center gap-4 rounded-lg bg-gray-900/50 p-4 backdrop-blur-sm">
    <img src="/favicon.png" alt="Price Check" class="inline-block w-8 animate-pulse" />
    <h1 class="text-2xl font-extrabold text-white">Price Check</h1>
    <p class="text-center text-gray-300">A simple price checker for your favorite products</p>
    {#if isAuthenticated}
      <Logout />
    {:else}
      <Login {isLoading} />
    {/if}
    <p class="mt-2 text-sm text-gray-300">
      Powered by <a
        href="https://codepiercer.org"
        target="_blank"
        class="font-bold tracking-wider text-red-500"
      >
        <img src="/codepiercer.png" alt="Logo of CODEPIERCER" class="inline-block h-4" />
      </a>
    </p>
  </div>
</main>
