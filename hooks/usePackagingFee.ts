import { useContext } from 'react'
import { SettingsContext } from '@/context/SettingsContext'

export function usePackagingFee() {
  const context = useContext(SettingsContext)
  
  if (!context) {
    throw new Error('usePackagingFee must be used within a SettingsProvider')
  }
  
  return context.packagingFee
}