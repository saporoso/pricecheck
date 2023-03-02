<script>
  import LoadingButton from '$lib/components/LoadingButton.svelte'
  import Dialog from '$lib/components/Dialog.svelte'

  let dialog
  const emptyProduct = {
    name: '',
    description: '',
    imageUrl: '',
    prices: []
  }
  let product = {
    ...emptyProduct
  }
  let isLoading = false
  let error = null

  const onSubmit = () => {
    console.log('submit', product)
  }

  const onCancel = () => {
    product = {
      ...emptyProduct
    }
    dialog.close()
  }
</script>

<button
  on:click={dialog.showModal()}
  class="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
  <!-- Heroicon name: solid/plus -->
  <svg
    class="-ml-1 mr-2 h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clip-rule="evenodd"
    />
  </svg>
  Add Product
</button>

<Dialog bind:dialog>
  <div slot="header">
    <h2 class="text-xl font-semibold text-gray-900">Add a new product</h2>
  </div>

  <div slot="content" class="flex flex-col  py-2">
    <form id="login-form" on:submit|preventDefault={onSubmit}>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-1">
          <label for="name" class="required block text-sm font-medium text-gray-700">Name</label>
          <input
            required
            type="text"
            bind:value={product.name}
            name="name"
            id="name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="description" class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <input
            type="text"
            bind:value={product.description}
            description="description"
            id="description"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </form>
  </div>
  <div slot="footer" class="flex justify-end gap-4">
    {#if error}
      <p class="mt-2 text-sm text-red-600">{error}</p>
    {/if}
    <button
      on:click={onCancel}
      class="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >Cancel</button
    >
    <button
      type="submit"
      form="login-form"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {#if isLoading}
        <LoadingButton />
      {/if}
      Submit
    </button>
  </div>
</Dialog>
