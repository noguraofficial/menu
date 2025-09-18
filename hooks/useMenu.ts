import { useState, useEffect } from 'react'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  categoryId: string
  isAvailable: boolean
  dineInAvailable: boolean
  takeawayAvailable: boolean
  packagingOption: boolean
  category: {
    id: string
    name: string
    description?: string
    icon?: string
  }
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  isActive: boolean
}

export function useMenu(orderType: 'dine-in' | 'takeaway' = 'dine-in') {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch categories
        const categoriesResponse = await fetch('/api/categories')
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories')
        }
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)

        // Fetch menu items
        const menuResponse = await fetch(`/api/menu?orderType=${orderType}`)
        if (!menuResponse.ok) {
          throw new Error('Failed to fetch menu items')
        }
        const menuData = await menuResponse.json()
        setMenuItems(menuData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [orderType])

  return {
    menuItems,
    categories,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      const fetchData = async () => {
        try {
          setError(null)
          const [categoriesResponse, menuResponse] = await Promise.all([
            fetch('/api/categories'),
            fetch(`/api/menu?orderType=${orderType}`)
          ])

          if (!categoriesResponse.ok || !menuResponse.ok) {
            throw new Error('Failed to fetch data')
          }

          const [categoriesData, menuData] = await Promise.all([
            categoriesResponse.json(),
            menuResponse.json()
          ])

          setCategories(categoriesData)
          setMenuItems(menuData)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }
}
