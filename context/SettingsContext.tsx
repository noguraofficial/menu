'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface SettingsContextType {
  packagingFee: number
  setPackagingFee: (fee: number) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [packagingFee, setPackagingFeeState] = useState(8000) // Default 8000 Rupiah

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('packagingFee')
    if (saved) {
      setPackagingFeeState(parseInt(saved, 10))
    }
  }, [])

  const setPackagingFee = (fee: number) => {
    setPackagingFeeState(fee)
    localStorage.setItem('packagingFee', fee.toString())
  }

  return (
    <SettingsContext.Provider value={{ packagingFee, setPackagingFee }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext }

