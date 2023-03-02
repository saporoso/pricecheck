<script>
  import { onMount } from 'svelte'

  export let dialog = null
  export let size = 'md'

  // exposse methods to open and close the dialog
  onMount(() => {
    dialog.show = () => {
      dialog.showModal()
      dialog.addEventListener('keydown', trapFocus)
    }
    dialog.hide = () => {
      dialog.removeEventListener('keydown', trapFocus)
      dialog.close()
    }
  })

  // trap focus inside the dialog
  const trapFocus = (e) => {
    const keyboardfocusableElements = [
      ...dialog.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    ].filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))

    const firstElement = keyboardfocusableElements.at(0)
    const lastElement = keyboardfocusableElements.at(-1)

    if (e.key === 'Tab') {
      const tabForwards = !e.shiftKey && document.activeElement === lastElement
      const tabBackwards = e.shiftKey && document.activeElement === firstElement

      if (tabForwards) {
        // only TAB is pressed, not SHIFT simultaneously
        // Prevent default behavior of keydown on TAB (i.e. focus next element)
        e.preventDefault()
        firstElement.focus()
      } else if (tabBackwards) {
        // TAB and SHIFT are pressed simultaneously
        e.preventDefault()
        lastElement.focus()
      }
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="max-h-[80%] min-h-[8rem] w-full rounded-lg border-none p-0 shadow-lg"
  class:max-w-xs={size === 'xs'}
  class:max-w-sm={size === 'sm'}
  class:max-w-md={size === 'md'}
  class:max-w-lg={size === 'lg'}
  class:max-w-xl={size === 'xl'}
  class:max-w-2xl={size === '2xl'}
  class:max-w-3xl={size === '3xl'}
  class:max-w-4xl={size === '4xl'}
  class:max-w-5xl={size === '5xl'}
  class:max-w-6xl={size === '6xl'}
  class:max-w-7xl={size === '7xl'}
  class:max-w-[90%]={size === 'full'}
>
  <!-- sticky header -->
  <div class="sticky top-0 bg-inherit p-5">
    <slot name="header" />
  </div>
  <!-- main content of dialog -->
  <div class="flex flex-col overflow-y-auto px-5">
    <slot name="content" />
  </div>
  <!-- sticky footer -->
  <div class="sticky bottom-0 bg-inherit p-5 ">
    <slot name="footer" />
  </div>
</dialog>

<style>
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.2rem);
  }
  dialog[open] {
    -webkit-animation: show 500ms ease normal;
    animation: show 500ms ease normal;
  }
  @media (max-width: 420px) {
    dialog[open] {
      margin-block-end: 10%;
    }
  }
  @-webkit-keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
