<script>
  import { onMount } from 'svelte'
  import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'

  import { imask } from '@imask/svelte'
  const options = {
    mask: '000-000-0000',
    lazy: true
  }

  import LoadingButton from '$lib/components/LoadingButton.svelte'
  import Dialog from '$lib/components/Dialog.svelte'
  let dialog

  export let isLoading
  let appVerifier
  let phoneNumber = ''
  let confirmationResult = null
  let otpCode = ''
  let error = null

  onMount(() => {
    const auth = getAuth()

    appVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log(error)
          error = 'Response expired. Ask user to solve reCAPTCHA again.'
          return
        }
      },
      auth
    )
  })

  const onCancel = () => {
    phoneNumber = ''
    confirmationResult = null
    error = null
    dialog.hide()
  }

  const onLogin = async () => {
    isLoading = true
    error = null

    const cleanedPhoneNumber = '+1' + phoneNumber.replace(/\D/g, '')

    const auth = getAuth()

    signInWithPhoneNumber(auth, cleanedPhoneNumber, appVerifier)
      .then((result) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        confirmationResult = result
      })
      .catch((err) => {
        // Error; SMS not sent
        error = 'Error; SMS not sent'
        console.log(err)
      })
      .finally(() => {
        isLoading = false
      })
  }

  const onConfirm = () => {
    isLoading = true
    error = null
    confirmationResult
      .confirm(otpCode)
      .then(() => {
        // User signed in successfully.
        // dialog will be closed automatically due to onAuthStateChanged listener
        window.location.reload()
      })
      .catch((err) => {
        // User couldn't sign in (bad verification code?)
        console.log(err)
        error = 'Invalid verification code.'
      })
      .finally(() => {
        isLoading = false
      })
  }
</script>

<Dialog bind:dialog>
  <div slot="header">
    <h2 class="text-xl font-semibold text-gray-900">
      {#if confirmationResult}
        Enter the verification code
      {:else}
        Login with your phone number
      {/if}
    </h2>
    {#if error}
      <p class="mt-2 text-sm text-red-600">{error}</p>
    {/if}
  </div>

  <div slot="content" class="flex flex-col  py-2">
    {#if confirmationResult}
      <form id="login-form" on:submit|preventDefault={onConfirm}>
        <label for="otp" class="sr-only">OTP Code</label>
        <input
          autofocus
          required
          type="text"
          minlength="6"
          maxlength="6"
          class="block w-full rounded-md border-gray-300 text-center focus:border-indigo-500 focus:ring-indigo-500"
          bind:value={otpCode}
        />

        <p class="mt-2 text-sm text-gray-500">code sent to <strong>{phoneNumber}</strong></p>
      </form>
    {:else}
      <form id="login-form" on:submit|preventDefault={onLogin}>
        <label for="phone-number" class="sr-only">Phone Number</label>
        <div class="relative rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500"> +1 </span>
          </div>
          <input
            required
            type="tel"
            bind:value={phoneNumber}
            use:imask={options}
            name="phone-number"
            id="phone-number"
            class="block w-full rounded-md border-gray-300 pl-8 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="xxx-xxx-xxxx"
          />
        </div>
        <p class="mt-2 text-sm text-gray-500">you will receive a text message with a code</p>
      </form>
    {/if}
  </div>
  <div slot="footer" class="flex justify-end gap-4">
    <button
      on:click={onCancel}
      class="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >Cancel</button
    >
    <button
      type="submit"
      form="login-form"
      class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      {#if isLoading}
        <LoadingButton />
      {/if}
      Login
    </button>
  </div>
</Dialog>

<button
  on:click={dialog.show}
  id="sign-in-button"
  type="button"
  class="inline-flex items-center rounded-md border border-transparent bg-gray-600/50 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
>
  {#if isLoading}
    Loading...
  {:else}
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
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
    Login
  {/if}
</button>
