'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-wide">NOGURA</h1>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
