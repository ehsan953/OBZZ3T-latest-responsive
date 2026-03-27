import { defineStore } from 'pinia'

interface SignupData {
  name: string
  username: string
  email: string
  password: string
  password_confirmation: string
}

interface SignupResponse {
  message?: string
  user?: any
  token?: string
  [key: string]: any
}

interface AuthState {
  user: any | null
  token: string | null
  isLoading: boolean
  error: string | null
  isInitialized: boolean
}

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  message?: string
  user?: any
  token?: string
  [key: string]: any
}

function getStoredToken(): string | null {
  if (!process.client) return null
  try {
    return localStorage.getItem('auth_token')
  } catch {
    return null
  }
}

function getStoredUser(): any | null {
  if (!process.client) return null
  try {
    const raw = localStorage.getItem('user_data')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** Normalize phone to E.164 format (+ followed by digits only) for API requests. */
function toE164(phone: string): string {
  if (!phone || typeof phone !== 'string') return ''
  const digits = phone.replace(/\D/g, '')
  const trimmed = phone.trim()
  if (trimmed.startsWith('+')) return digits ? `+${digits}` : ''
  return digits ? `+${digits}` : ''
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: getStoredUser(),
    token: getStoredToken(),
    isLoading: false,
    error: null,
    isInitialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    getApiBaseUrl(): string {
      const config = useRuntimeConfig()
      // Check runtime config first, then fallback to env variable, then default
      return config.public.apiBaseUrl || 
             process.env.NUXT_PUBLIC_API_BASE_URL || 'https://staging-api.ob33z.com/api' ||
             'http://localhost:8000/api'
    },

    async sendPhoneVerification(): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/phone/verification/send`

        const formData = new FormData()
        formData.append('medium_type', 'sms')

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Failed to send verification SMS'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Start Document Verification
     */
    async startDocumentVerification(): Promise<{ url?: string; verification_url?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/verification/start`

        const response = await $fetch<{ url?: string; verification_url?: string; data?: any; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Failed to start document verification'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Get Document Verification Status
     */
    async getDocumentVerificationStatus(): Promise<{ status?: string; verification_status?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/verification/status`

        const response = await $fetch<{ status?: string; verification_status?: string; data?: any; [key: string]: any }>(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            // Ensure we always bypass ngrok's HTML warning and get JSON
            'ngrok-skip-browser-warning': 'true',
          },
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Failed to get verification status'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Verify Phone Verification Code
     */
    async verifyPhoneCode(phone: string, code: string): Promise<{ message?: string; user?: any; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/phone/verification/verify`

        const formData = new FormData()
        formData.append('phone', toE164(phone))
        formData.append('otp', code)
        formData.append('medium_type', 'sms')

        const response = await $fetch<{ message?: string; user?: any; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: formData,
        })

        // Update user data if returned
        const user = (response as any).data?.user || response.user
        if (user) {
          this.user = { ...this.user, ...user }
          if (process.client) {
            localStorage.setItem('user_data', JSON.stringify(this.user))
          }
        }

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Phone verification failed'
          } else {
            this.error = error.data.message || error.data.error || 'Phone verification failed'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    async signup(data: SignupData): Promise<SignupResponse> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/register`

        // Create FormData as the API expects formdata
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('password_confirmation', data.password_confirmation)

        // Use $fetch with FormData - don't set Content-Type header, browser will set it automatically with boundary
        const response = await $fetch<SignupResponse>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            // Don't set Content-Type for FormData - browser handles it
          },
          body: formData,
        })

        // Handle API response structure: response.data.token or response.token
        const token = (response as any).data?.token || response.token
        const user = (response as any).data?.user || response.user

        // If the API returns a token, store it
        if (token) {
          this.token = token
          this.user = user || null
          
          // Store token in localStorage for persistence
          if (process.client) {
            localStorage.setItem('auth_token', token)
            // Also store user data if available
            if (user) {
              localStorage.setItem('user_data', JSON.stringify(user))
            }
          }
        }

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        // Handle API error responses
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Signup failed'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred during signup'
        }

        throw error
      }
    },

    // Add this action inside the actions object in your store
    async login(data: LoginData): Promise<LoginResponse> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/login`

        // Create FormData as the API expects formdata. 'email' may be email or username.
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)

        const response = await $fetch<LoginResponse>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData,
        })

        // Handle API response structure: response.data.token or response.token
        const token = (response as any).data?.token || response.token
        const user = (response as any).data?.user || response.user

        // If the API returns a token, store it
        if (token) {
          this.token = token
          this.user = user || null
          
          // Store token in localStorage for persistence
          if (process.client) {
            localStorage.setItem('auth_token', token)
            // Also store user data if available
            if (user) {
              localStorage.setItem('user_data', JSON.stringify(user))
            }
          }
          
          // Mark as initialized after successful login
          this.isInitialized = true
        }

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        // Handle API error responses
        if (error.data) {
          // Handle validation errors
          if (error.data.errors) {
            // Format validation errors
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Login failed'
          } else {
            this.error = error.data.message || error.data.error || 'Login failed'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred during login'
        }

        throw error
      }
    },

    /**
     * Logout - Call API and clear auth state
     */
    async logout(): Promise<void> {
      this.isLoading = true
      this.error = null

      try {
        if (this.token) {
          const baseUrl = this.getApiBaseUrl()
          const url = `${baseUrl}/logout`

          // Call logout API endpoint
          await $fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.token}`,
            },
          })
        }
      } catch (error: any) {
        // Even if API call fails, we should still clear local state
        console.error('Logout API call failed:', error)
      } finally {
        // Always clear local state regardless of API call result
        this.user = null
        this.token = null
        this.error = null
        this.isLoading = false
        
        if (process.client) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_data')
        }
      }
    },

    /**
     * Get current user details from API
     */
    async getCurrentUser(): Promise<any> {
      if (!this.token) {
        throw new Error('Authentication required')
      }

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/user`

        const response = await $fetch<{ data?: any; user?: any; [key: string]: any }>(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            // Ensure we always bypass ngrok's HTML warning and get JSON
            'ngrok-skip-browser-warning': 'true',
          },
        })

        // Handle API response structure - try multiple possible structures
        const user = (response as any).data?.user || response.user || response.data || response

        if (user) {
          // Merge with existing user data to preserve all fields
          this.user = { ...this.user, ...user }
          if (process.client) {
            localStorage.setItem('user_data', JSON.stringify(this.user))
          }
          // Debug log to verify profile_completed status
          if (process.client) {
            console.log('User data fetched - profile completed:', this.user?.profile_completed)
          }
        }

        return user
      } catch (error: any) {
        // If token is invalid, clear auth state
        if (error.status === 401 || error.statusCode === 401) {
          this.logout()
        }
        throw error
      }
    },

    /**
     * Initialize auth state from stored token (on app load)
     */
    async initAuth() {
      if (process.client) {
        this.isInitialized = false
        const storedToken = localStorage.getItem('auth_token')
        if (storedToken) {
          this.token = storedToken
          
          // Try to restore user data from localStorage first (for faster initial load)
          const userData = localStorage.getItem('user_data')
          if (userData) {
            try {
              this.user = JSON.parse(userData)
            } catch (e) {
              console.error('Failed to parse user data', e)
            }
          }

          // Then fetch fresh user data from API to ensure it's up to date
          try {
            await this.getCurrentUser()
          } catch (error) {
            // If fetching fails (e.g., token expired), logout will be called in getCurrentUser
            console.error('Failed to fetch current user:', error)
            // Don't clear state here if it's just a network error - let getCurrentUser handle 401s
          }
        }
        this.isInitialized = true
      } else {
        this.isInitialized = true
      }
    },

    /**
     * Forgot Password - Send OTP to email
     */
    async forgotPassword(email: string): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/forgot-password`

        const formData = new FormData()
        formData.append('email', email)

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            // Don't set Content-Type for FormData - browser handles it automatically
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Failed to send OTP'
          } else {
            this.error = error.data.message || error.data.error || 'Failed to send OTP'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Verify OTP
     */
    async verifyOTP(email: string, otp: string): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/verify-otp`

        const formData = new FormData()
        formData.append('email', email)
        formData.append('otp', otp)

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'OTP verification failed'
          } else {
            this.error = error.data.message || error.data.error || 'OTP verification failed'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Reset Password
     */
    async resetPassword(
      email: string,
      otp: string,
      password: string,
      password_confirmation: string
    ): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/reset-password`

        const formData = new FormData()
        formData.append('email', email)
        formData.append('otp', otp)
        formData.append('password', password)
        formData.append('password_confirmation', password_confirmation)

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            // Don't set Content-Type for FormData - browser handles it automatically
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Password reset failed'
          } else {
            this.error = error.data.message || error.data.error || 'Password reset failed'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Change Password (authenticated user)
     */
    async changePassword(
      currentPassword: string,
      newPassword: string,
      newPasswordConfirmation: string
    ): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/change-password`

        const formData = new FormData()
        formData.append('current_password', currentPassword)
        formData.append('new_password', newPassword)
        formData.append('new_password_confirmation', newPasswordConfirmation)

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false

        if (error?.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Failed to change password'
          } else {
            this.error = error.data.message || error.data.error || 'Failed to change password'
          }
        } else if (error?.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Deactivate Account (POST /account/deactivate) – disable account (requires admin to reactivate)
     */
    async deactivateAccount(): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/account`

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })

        // Clear auth state after successful deactivation
        this.token = null
        this.user = null
        if (process.client) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_data')
        }

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false

        if (error?.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Failed to deactivate account'
          } else {
            this.error = error.data.message || error.data.error || 'Failed to deactivate account'
          }
        } else if (error?.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Edit Profile (PUT /profile) – use for profile page save only
     */
    async editProfile(profileData: {
      display_name?: string
      username?: string
      bio?: string
      city?: string
      state?: string
      birthday?: string
      date_of_birth?: string
      age?: string
      phone_number?: string
      interests?: string[]
      profile_photo?: File | string
    }): Promise<{ message?: string; user?: any; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/profile`

        const formData = new FormData()
        if (profileData.display_name) formData.append('display_name', profileData.display_name)
        if (profileData.bio) formData.append('bio', profileData.bio)
        if (profileData.username) formData.append('username', profileData.username)
        if (profileData.city) formData.append('city', profileData.city)
        if (profileData.state) formData.append('state', profileData.state)
        const birthDate = profileData.birthday || profileData.date_of_birth
        if (birthDate) {
          formData.append('birthday', birthDate)
          // Compatibility: some backends expect date_of_birth
          formData.append('date_of_birth', birthDate)
        }
        if (profileData.age) formData.append('age', profileData.age)
        if (profileData.phone_number) formData.append('phone_number', toE164(profileData.phone_number))

        if (profileData.interests) {
          profileData.interests.forEach(interest => {
            formData.append('interests[]', interest)
          })
        }

        if (profileData.profile_photo instanceof File) {
          const file = profileData.profile_photo
          const name = file.name && /\.(jpe?g|png|gif|webp)$/i.test(file.name) ? file.name : 'photo.jpg'
          formData.append('profile_photo', file, name)
        }

        // Use method spoofing for multipart updates so backend parses arrays/files reliably.
        formData.append('_method', 'PUT')

        const response = await $fetch<{ message?: string; user?: any; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: formData,
        })

        const user = (response as any).data?.user || response.user || (response as any).data || response
        if (user) {
          this.user = { ...this.user, ...user }
          if (process.client) {
            localStorage.setItem('user_data', JSON.stringify(this.user))
          }
        }

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false

        if (error?.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Profile update failed'
          } else {
            this.error = error.data.message || error.data.error || 'Profile update failed'
          }
        } else if (error?.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Send Email Verification
     */
    async sendEmailVerification(): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/email/verification/send`

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Failed to send verification email'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Resend Email Verification
     */
    async resendEmailVerification(): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/email/verification/resend`

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Failed to resend verification email'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Update User Profile
     */
    async updateProfile(
      profileData: {
        display_name?: string
        bio?: string
        city?: string
        state?: string
        birthday?: string
        date_of_birth?: string
        age?: string
        phone_number?: string
        interests?: string[]
        /**
         * Single profile photo. When sending an existing photo, pass the string URL/path
         * returned from the /user endpoint. When uploading a new one, pass a File.
         */
        profile_photo?: File | string
      },
      /** 'POST' for complete-profile flow, 'PUT' for edit-profile (default) */
      httpMethod: 'POST' | 'PUT' = 'PUT'
    ): Promise<{ message?: string; user?: any; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/profile`

        const formData = new FormData()
        if (profileData.display_name) formData.append('display_name', profileData.display_name)
        if (profileData.bio) formData.append('bio', profileData.bio)
        if (profileData.city) formData.append('city', profileData.city)
        if (profileData.state) formData.append('state', profileData.state)
        const birthDate = profileData.birthday || profileData.date_of_birth
        if (birthDate) {
          formData.append('birthday', birthDate)
          // Compatibility: some backends expect date_of_birth
          formData.append('date_of_birth', birthDate)
        }
        if (profileData.age) formData.append('age', profileData.age)
        if (profileData.phone_number) formData.append('phone_number', toE164(profileData.phone_number))
        
        if (profileData.interests) {
          profileData.interests.forEach(interest => {
            formData.append('interests[]', interest)
          })
        }

        if (profileData.profile_photo instanceof File) {
          const file = profileData.profile_photo
          const name = file.name && /\.(jpe?g|png|gif|webp)$/i.test(file.name) ? file.name : 'photo.jpg'
          formData.append('profile_photo', file, name)
        }

        // For PUT updates with multipart/form-data, use POST + _method=PUT for
        // better backend compatibility when uploading files.
        if (httpMethod === 'PUT') {
          formData.append('_method', 'PUT')
        }

        const response = await $fetch<{ message?: string; user?: any; [key: string]: any }>(url, {
          method: httpMethod === 'PUT' ? 'POST' : 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            // Don't set Content-Type for FormData - browser handles it automatically with boundary
          },
          body: formData,
        })

        // Update user data if returned - handle multiple response structures
        const user = (response as any).data?.user || response.user || response.data || response
        if (user) {
          // Merge with existing user data to preserve all fields
          this.user = { ...this.user, ...user }
          if (process.client) {
            localStorage.setItem('user_data', JSON.stringify(this.user))
          }
          // Debug log to verify profile_completed status
          if (process.client) {
            console.log('Profile updated - user data:', this.user)
            console.log('Profile completed status:', this.user?.profile_completed)
          }
        }

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Profile update failed'
          } else {
            this.error = error.data.message || error.data.error || 'Profile update failed'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Get Membership Tiers
     */
    async getMembershipTiers(): Promise<{ data?: any; tiers?: any; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/membership/tiers`

        const response = await $fetch<{ data?: any; tiers?: any; [key: string]: any }>(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            // Bypass ngrok browser interstitial so we always get JSON instead of HTML
            'ngrok-skip-browser-warning': 'true',
          },
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Failed to get membership tiers'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Get Membership Status
     */
    async getMembershipStatus(): Promise<{ data?: any; status?: any; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/membership/status`

        const response = await $fetch<{ data?: any; status?: any; [key: string]: any }>(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          this.error = error.data.message || error.data.error || 'Failed to get membership status'
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Subscribe to Membership
     */
    async subscribeMembership(
      tierKey: string,
      successUrl: string,
      cancelUrl: string
    ): Promise<{ url?: string; checkout_url?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/membership/subscribe`

        const formData = new FormData()
        formData.append('tier_key', tierKey)
        formData.append('success_url', successUrl)
        formData.append('cancel_url', cancelUrl)

        const response = await $fetch<{ url?: string; checkout_url?: string; data?: any; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            'ngrok-skip-browser-warning': 'true',
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Subscription failed'
          } else {
            this.error = error.data.message || error.data.error || 'Subscription failed'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Change Membership Tier/Plan
     */
    async changeMembershipTier(
      tierKey: string,
      successUrl: string,
      cancelUrl: string
    ): Promise<{ url?: string; checkout_url?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/membership/change-tier`

        const formData = new FormData()
        formData.append('tier_key', tierKey)
        formData.append('success_url', successUrl)
        formData.append('cancel_url', cancelUrl)

        const response = await $fetch<{ url?: string; checkout_url?: string; data?: any; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            'ngrok-skip-browser-warning': 'true',
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Failed to change tier'
          } else {
            this.error = error.data.message || error.data.error || 'Failed to change tier'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      }
    },

    /**
     * Cancel Membership Subscription
     */
    async cancelMembership(
      tierKey: string,
      successUrl: string,
      cancelUrl: string
    ): Promise<{ message?: string; [key: string]: any }> {
      this.isLoading = true
      this.error = null

      try {
        if (!this.token) {
          throw new Error('Authentication required')
        }

        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/membership/cancel`

        const formData = new FormData()
        formData.append('tier_key', tierKey)
        formData.append('success_url', successUrl)
        formData.append('cancel_url', cancelUrl)

        const response = await $fetch<{ message?: string; [key: string]: any }>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            'ngrok-skip-browser-warning': 'true',
          },
          body: formData,
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        
        if (error.data) {
          if (error.data.errors) {
            const errorMessages = Object.values(error.data.errors).flat()
            this.error = errorMessages.join(', ') || 'Failed to cancel subscription'
          } else {
            this.error = error.data.message || error.data.error || 'Failed to cancel subscription'
          }
        } else if (error.message) {
          this.error = error.message
        } else {
          this.error = 'An unexpected error occurred'
        }

        throw error
      } 
    },
  },
})
