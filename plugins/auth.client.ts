export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Initialize auth state on app load
  // This must complete before pages render to avoid showing guest views
  try {
    await authStore.initAuth()
  } catch (error) {
    console.error('Failed to initialize auth:', error)
    // Keep existing browser session data; avoid forcing logout on transient init errors.
    authStore.isInitialized = true
  }

  // Keep auth state in sync across tabs/windows.
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', async (event) => {
      if (event.key !== 'auth_token' && event.key !== 'user_data') return

      // Another tab logged out
      if (!localStorage.getItem('auth_token')) {
        authStore.user = null
        authStore.token = null
        authStore.error = null
        authStore.isInitialized = true
        return
      }

      // Another tab logged in or refreshed profile
      await authStore.initAuth()
    })
  }
})
