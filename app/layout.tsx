import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CartSummary from '@/components/CartSummary'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Nogura Ramen Bar - Menu Pemesanan',
  description: 'Pesan menu favorit Anda dari Nogura Ramen Bar dengan mudah. Tersedia untuk dine-in dan takeaway.',
  keywords: 'ramen, japanese food, nogura, menu, pesan online, dine in, takeaway',
  authors: [{ name: 'Nogura Ramen Bar' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-white min-h-screen">
        <CartProvider>
          <Header />
          <main className="pb-20">
            {children}
          </main>
          <CartSummary />
        </CartProvider>
      </body>
    </html>
  )
}
