import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth'

interface RoomMessage {
  id: number | string
  user?: string
  text: string
  [key: string]: any
}

interface RoomState {
  messagesByRoom: Record<number, RoomMessage[]>
  usersByRoom: Record<number, any[]>
  levels: any[]
  gifts: any[]
  boosts: any[]
  isLoading: boolean
  error: string | null
}

export const useRoomStore = defineStore('room', {
  state: (): RoomState => ({
    messagesByRoom: {},
    usersByRoom: {},
    levels: [],
    gifts: [],
    boosts: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchLevels(): Promise<any[]> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/levels`

        const response = await $fetch<any>(url, {
          method: 'GET',
          headers: this.getAuthHeaders(),
        })

        const data = (response as any).data || response
        const levels = data.levels || data

        this.levels = Array.isArray(levels) ? levels : []
        this.isLoading = false
        return this.levels
      } catch (error: any) {
        this.isLoading = false
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to load levels'
        throw error
      }
    },

    // ===== Gifts & Boosts =====

    async fetchGifts(): Promise<any[]> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/gifts`

        const response = await $fetch<any>(url, {
          method: 'GET',
          headers: this.getAuthHeaders(),
        })

        const data = (response as any).data || response
        const gifts = data.gifts || data

        this.gifts = Array.isArray(gifts) ? gifts : []
        this.isLoading = false
        return this.gifts
      } catch (error: any) {
        this.isLoading = false
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to load gifts'
        throw error
      }
    },

    async sendGiftToRoom(roomId: number, giftId: number | string): Promise<any> {
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/gifts`

        const formData = new FormData()
        formData.append('gift_id', String(giftId))

        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: formData,
        })

        return response
      } catch (error: any) {
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to send gift'
        throw error
      }
    },

    async purchaseGift(giftId: number | string, paymentMethodId: string, successUrl?: string, cancelUrl?: string): Promise<any> {
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/gifts/purchase`

        const formData = new FormData()
        formData.append('gift_id', String(giftId))
        formData.append('payment_method_id', paymentMethodId)
        formData.append('success_url', successUrl || `${window.location.origin}/vibe-room?gift_success=1`)
        formData.append('cancel_url', cancelUrl || `${window.location.origin}/vibe-room?gift_cancelled=1`)
        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: formData,
        })

        return response
      } catch (error: any) {
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to purchase gift'
        throw error
      }
    },

    async fetchBoosts(): Promise<any[]> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/boosts`

        const response = await $fetch<any>(url, {
          method: 'GET',
          headers: this.getAuthHeaders(),
        })

        const data = (response as any).data || response
        const boosts = data.boosts || data

        this.boosts = Array.isArray(boosts) ? boosts : []
        this.isLoading = false
        return this.boosts
      } catch (error: any) {
        this.isLoading = false
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to load boosts'
        throw error
      }
    },

    async purchaseAndStartBoost(
      roomId: number,
      boostId: number | string,
      paymentMethodId: string,
      successUrl?: string,
      cancelUrl?: string,
    ): Promise<any> {
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/boosts`

        const formData = new FormData()
        formData.append('boost_id', String(boostId))
        formData.append('payment_method_id', paymentMethodId)
        formData.append('success_url', successUrl || window.location.href)
        formData.append('cancel_url', cancelUrl || window.location.href)
        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: formData,
        })

        return response
      } catch (error: any) {
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to purchase/start boost'
        throw error
      }
    },

    getApiBaseUrl(): string {
      const config = useRuntimeConfig()
      return (
        config.public.apiBaseUrl ||
        process.env.NUXT_PUBLIC_API_BASE_URL ||
        'https://staging-api.ob33z.com/api' ||
        'http://localhost:8000/api'
      )
    },

    getAuthHeaders() {
      const authStore = useAuthStore()
      if (!authStore.token) {
        throw new Error('Authentication required')
      }

      return {
        Accept: 'application/json',
        Authorization: `Bearer ${authStore.token}`,
        'ngrok-skip-browser-warning': 'true',
      }
    },

    async joinRoom(roomId: number): Promise<any> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/join`

        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to join room'
        throw error
      }
    },

    async leaveRoom(roomId: number): Promise<any> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/leave`

        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
        })

        this.isLoading = false
        return response
      } catch (error: any) {
        this.isLoading = false
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to leave room'
        throw error
      }
    },

    async fetchRoomUsers(roomId: number): Promise<any[]> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/users`

        const response = await $fetch<any>(url, {
          method: 'GET',
          headers: this.getAuthHeaders(),
        })

        const users = (response as any).data || response
        this.usersByRoom[roomId] = Array.isArray(users) ? users : []

        this.isLoading = false
        return this.usersByRoom[roomId]
      } catch (error: any) {
        this.isLoading = false
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to load room users'
        throw error
      }
    },

    async fetchMessages(roomId: number): Promise<RoomMessage[]> {
      this.isLoading = true
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/messages`

        const response = await $fetch<any>(url, {
          method: 'GET',
          headers: this.getAuthHeaders(),
        })

        // API shape from collection/screenshot:
        // { success, code, data: { messages: [ { id, level_id, room_id, message, user: { display_name, is_verified } } ] } }
        const container = (response as any).data || response
        const rawMessages = container.messages || container
        const mapped: RoomMessage[] = Array.isArray(rawMessages)
          ? rawMessages.map((m: any) => ({
              id: m.id ?? m.message_id ?? Math.random().toString(36).slice(2),
              user:
                m.user?.display_name ||
                m.user?.name ||
                m.user_name ||
                m.username ||
                'User',
              text: m.message || m.text || '',
              verified:
                m.user?.is_verified === true ||
                m.user?.verified === true ||
                false,
              ...m,
            }))
          : []

        this.messagesByRoom[roomId] = mapped
        this.isLoading = false
        return mapped
      } catch (error: any) {
        this.isLoading = false
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to load messages'
        throw error
      }
    },

    async sendMessage(roomId: number, message: string): Promise<RoomMessage> {
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/chat`

        const formData = new FormData()
        formData.append('message', message)

        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: formData,
        })

        const data = (response as any).data || response
        const newMessage: RoomMessage = {
          id: data.id ?? data.message_id ?? Math.random().toString(36).slice(2),
          user: data.user?.name || data.user_name || data.username || 'You',
          text: data.message || data.text || message,
          ...data,
        }

        if (!this.messagesByRoom[roomId]) {
          this.messagesByRoom[roomId] = []
        }
        this.messagesByRoom[roomId].push(newMessage)

        return newMessage
      } catch (error: any) {
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to send message'
        throw error
      }
    },

    async sendReaction(
      roomId: number,
      messageId: number | string,
      reactionType: string,
    ): Promise<any> {
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/rooms/${roomId}/reactions`

        const formData = new FormData()
        formData.append('reaction_type', reactionType)
        formData.append('message_id', String(messageId))

        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: formData,
        })

        return response
      } catch (error: any) {
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to send reaction'
        throw error
      }
    },

    async updatePresence(state: string): Promise<any> {
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/presence/update`

        const formData = new FormData()
        formData.append('state', state)

        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: formData,
        })

        return response
      } catch (error: any) {
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to update presence'
        throw error
      }
    },

    async heartbeat(): Promise<any> {
      this.error = null

      try {
        const baseUrl = this.getApiBaseUrl()
        const url = `${baseUrl}/presence/heartbeat`

        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: this.getAuthHeaders(),
        })

        return response
      } catch (error: any) {
        this.error =
          error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          'Failed to send presence heartbeat'
        throw error
      }
    },
  },
})

