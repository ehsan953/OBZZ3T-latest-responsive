/**
 * Country list with dial codes for phone input.
 * Used with a country dropdown; user selects country (dial code auto) and types national number.
 */
export interface PhoneCountry {
  code: string
  name: string
  dial: string
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'US', name: 'United States', dial: '+1' },
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'PK', name: 'Pakistan', dial: '+92' },
  { code: 'IN', name: 'India', dial: '+91' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'DE', name: 'Germany', dial: '+49' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'ES', name: 'Spain', dial: '+34' },
  { code: 'IT', name: 'Italy', dial: '+39' },
  { code: 'MX', name: 'Mexico', dial: '+52' },
  { code: 'BR', name: 'Brazil', dial: '+55' },
  { code: 'NG', name: 'Nigeria', dial: '+234' },
  { code: 'EG', name: 'Egypt', dial: '+20' },
  { code: 'ZA', name: 'South Africa', dial: '+27' },
  { code: 'TR', name: 'Turkey', dial: '+90' },
  { code: 'CN', name: 'China', dial: '+86' },
  { code: 'JP', name: 'Japan', dial: '+81' },
  { code: 'KR', name: 'South Korea', dial: '+82' },
  { code: 'BD', name: 'Bangladesh', dial: '+880' },
  { code: 'PH', name: 'Philippines', dial: '+63' },
  { code: 'ID', name: 'Indonesia', dial: '+62' },
  { code: 'MY', name: 'Malaysia', dial: '+60' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
  { code: 'NL', name: 'Netherlands', dial: '+31' },
  { code: 'PL', name: 'Poland', dial: '+48' },
  { code: 'RU', name: 'Russia', dial: '+7' },
]

export function usePhoneCountries() {
  return {
    countries: PHONE_COUNTRIES,
    defaultCountry: PHONE_COUNTRIES[0],
  }
}

/**
 * Build E.164 phone from dial code and national number (digits only).
 */
export function buildE164(dialCode: string, nationalNumber: string): string {
  const digits = (nationalNumber || '').replace(/\D/g, '')
  const dial = (dialCode || '').replace(/\D/g, '')
  if (!digits.length) return ''
  return `+${dial}${digits}`
}

/**
 * Parse E.164 or full phone string into country code and national number.
 * Returns first matching country from list, or default US + rest as national.
 */
export function parsePhoneToCountryAndNational(phone: string): { code: string; national: string } {
  const raw = (phone || '').replace(/\D/g, '')
  if (!raw.length) return { code: PHONE_COUNTRIES[0].code, national: '' }
  for (const c of PHONE_COUNTRIES) {
    const dialDigits = c.dial.replace(/\D/g, '')
    if (raw.startsWith(dialDigits)) {
      return { code: c.code, national: raw.slice(dialDigits.length) }
    }
  }
  return { code: PHONE_COUNTRIES[0].code, national: raw }
}
