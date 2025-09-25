import { useState, useEffect } from 'react'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  isAvailable: boolean
  dineInAvailable?: boolean
  takeawayAvailable?: boolean
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

        // Fetch from database using Netlify Functions
        const [categoriesResponse, menuResponse] = await Promise.all([
          fetch('/.netlify/functions/categories'),
          fetch(`/.netlify/functions/menu?orderType=${orderType}`)
        ])

        if (categoriesResponse.ok && menuResponse.ok) {
          const [categoriesData, menuData] = await Promise.all([
            categoriesResponse.json(),
            menuResponse.json()
          ])
          setCategories(categoriesData)
          setMenuItems(menuData)
        } else {
          throw new Error('Failed to fetch data from database')
        }
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

          // Fetch from database using Netlify Functions
          const [categoriesResponse, menuResponse] = await Promise.all([
            fetch('/.netlify/functions/categories'),
            fetch(`/.netlify/functions/menu?orderType=${orderType}`)
          ])

          if (categoriesResponse.ok && menuResponse.ok) {
            const [categoriesData, menuData] = await Promise.all([
              categoriesResponse.json(),
              menuResponse.json()
            ])
            setCategories(categoriesData)
            setMenuItems(menuData)
          } else {
            throw new Error('Failed to fetch data from database')
          }
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
