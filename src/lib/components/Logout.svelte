<script>
  import { getAuth, signOut } from 'firebase/auth'

  const onLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }
</script>

<button
  on:click={onLogout}
  id="logout-button"
  type="button"
  class="inline-flex items-center rounded-md border border-transparent bg-gray-600/50 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="mr-2 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
  Logout
</button>
