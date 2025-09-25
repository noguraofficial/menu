export function formatCurrency(amount: number): string {
  // Amount is already in Rupiah, no conversion needed
  const formatted = amount.toLocaleString('id-ID')
  return `Rp ${formatted}`
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format Indonesian phone number
  if (cleaned.startsWith('08')) {
    return cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
  } else if (cleaned.startsWith('628')) {
    return cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '+62 $1-$2-$3')
  }
  
  return phone
}
