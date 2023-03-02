<script>
  import { fly } from 'svelte/transition'
  import AddProduct from '$lib/components/AddProduct.svelte'
</script>

<div
  class="w-full max-w-3xl  divide-y divide-gray-500 divide-opacity-10  rounded-xl bg-white/90  shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter "
  transition:fly={{ y: 500, duration: 500 }}
>
  <div class="relative">
    <!-- Heroicon name: solid/search -->
    <svg
      class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
    <input
      type="text"
      class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
      placeholder="Search..."
      role="combobox"
      aria-expanded="false"
      aria-controls="options"
    />
  </div>

  <!-- Results, show/hide based on command palette state -->
  <ul class="max-h-96 scroll-py-3 overflow-y-auto p-3" id="options" role="listbox">
    <!-- Active: "bg-gray-100" -->
    <li
      class="group flex cursor-default select-none rounded-xl p-3"
      id="option-1"
      role="option"
      tabindex="-1"
    >
      <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-500">
        <!-- Heroicon name: outline/pencil-alt -->
        <svg
          class="h-6 w-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
      <div class="ml-4 flex-auto">
        <!-- Active: "text-gray-900", Not Active: "text-gray-700" -->
        <p class="text-sm font-medium text-gray-700">Text</p>
        <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
        <p class="text-sm text-gray-500">Add freeform text with basic formatting options.</p>
      </div>
    </li>

    <!-- More items... -->
  </ul>

  <!-- Empty state, show/hide based on command palette state -->
  <div class="flex flex-col items-center py-14 px-6 text-sm sm:px-14">
    <!-- Heroicon name: outline/exclamation-circle -->
    <svg
      class="mx-auto h-6 w-6 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p class="mt-4 font-semibold text-gray-900">No products found</p>
    <AddProduct />
  </div>
</div>
