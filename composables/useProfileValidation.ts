/**
 * Client-side validation for profile fields (display name, city, state, age, phone, etc.)
 */
export interface ProfileValidationErrors {
  displayName?: string
  city?: string
  state?: string
  date_of_birth?: string
  phone?: string
  bio?: string
}

const DISPLAY_NAME_MIN = 2
const DISPLAY_NAME_MAX = 50
const CITY_STATE_MIN = 2
const CITY_STATE_MAX = 100
const BIO_MAX = 500
const PHONE_NATIONAL_MIN_DIGITS = 6
const LOCATION_MIN = 2
const LOCATION_MAX = 200

export function useProfileValidation() {
  function validateDisplayName(value: string): string | null {
    const t = (value || '').trim()
    if (!t) return 'Display name is required'
    if (t.length < DISPLAY_NAME_MIN) return `Display name must be at least ${DISPLAY_NAME_MIN} characters`
    if (t.length > DISPLAY_NAME_MAX) return `Display name must be at most ${DISPLAY_NAME_MAX} characters`
    return null
  }

  function validateCity(value: string): string | null {
    const t = (value || '').trim()
    if (!t) return 'City is required'
    if (t.length < CITY_STATE_MIN) return `City must be at least ${CITY_STATE_MIN} characters`
    if (t.length > CITY_STATE_MAX) return `City must be at most ${CITY_STATE_MAX} characters`
    if (!/^[\p{L}\p{M}\s\-'.]+$/u.test(t)) return 'City can only contain letters, spaces, and hyphens'
    return null
  }

  function validateState(value: string): string | null {
    const t = (value || '').trim()
    if (!t) return 'State / region is required'
    if (t.length < CITY_STATE_MIN) return `State must be at least ${CITY_STATE_MIN} characters`
    if (t.length > CITY_STATE_MAX) return `State must be at most ${CITY_STATE_MAX} characters`
    if (!/^[\p{L}\p{M}\s\-'.]+$/u.test(t)) return 'State can only contain letters, spaces, and hyphens'
    return null
  }

  function validateDateOfBirth(value: string): string | null {
    const v = (value || '').trim()
    if (!v) return 'Birthday is required'
    const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    const parsed = m ? new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`) : new Date(v)
    if (Number.isNaN(parsed.getTime())) return 'Please enter a valid birthday'
    const today = new Date()
    let ageYears = today.getFullYear() - parsed.getFullYear()
    const monthDiff = today.getMonth() - parsed.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < parsed.getDate())) ageYears--
    if (ageYears < 18) return 'You must be at least 18 years old'
    return null
  }

  function validatePhoneNational(value: string): string | null {
    const digits = (value || '').replace(/\D/g, '')
    if (digits.length < PHONE_NATIONAL_MIN_DIGITS) return `Phone number must have at least ${PHONE_NATIONAL_MIN_DIGITS} digits`
    return null
  }

  function validateBio(value: string): string | null {
    if (!value || !value.trim()) return null
    if (value.length > BIO_MAX) return `Bio must be at most ${BIO_MAX} characters`
    return null
  }

  /** Location (city or "City, State") */
  function validateLocation(value: string): string | null {
    const t = (value || '').trim()
    if (!t) return 'Location is required'
    if (t.length < LOCATION_MIN) return `Location must be at least ${LOCATION_MIN} characters`
    if (t.length > LOCATION_MAX) return `Location must be at most ${LOCATION_MAX} characters`
    if (!/^[\p{L}\p{M}\s\-',.]+$/u.test(t)) return 'Location can only contain letters, spaces, commas, and hyphens'
    return null
  }

  return {
    validateDisplayName,
    validateCity,
    validateState,
    validateDateOfBirth,
    validatePhoneNational,
    validateBio,
    validateLocation,
  }
}
