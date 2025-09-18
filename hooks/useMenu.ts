import { useState, useEffect } from 'react'
import { dineInMenuItems, dineInCategories } from '@/data/menu-dine-in'
import { takeawayMenuItems, takeawayCategories } from '@/data/menu-takeaway'

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

        // Try to fetch from database first
        try {
          const [categoriesResponse, menuResponse] = await Promise.all([
            fetch('/api/categories'),
            fetch(`/api/menu?orderType=${orderType}`)
          ])

          if (categoriesResponse.ok && menuResponse.ok) {
            const [categoriesData, menuData] = await Promise.all([
              categoriesResponse.json(),
              menuResponse.json()
            ])
            setCategories(categoriesData)
            setMenuItems(menuData)
            return
          }
        } catch (dbError) {
          console.log('Database not available, using fallback data')
        }

        // Fallback to static data
        const currentMenuItems = orderType === 'dine-in' ? dineInMenuItems : takeawayMenuItems
        const currentCategories = orderType === 'dine-in' ? dineInCategories : takeawayCategories

        // Convert static data to match database format
        const formattedMenuItems = currentMenuItems.map(item => ({
          ...item,
          categoryId: item.category,
          category: {
            id: item.category,
            name: currentCategories.find(cat => cat.id === item.category)?.name || item.category,
            description: '',
            icon: ''
          }
        }))

        const formattedCategories = currentCategories.map(cat => ({
          ...cat,
          isActive: true
        }))

        setCategories(formattedCategories)
        setMenuItems(formattedMenuItems)
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

          // Try to fetch from database first
          try {
            const [categoriesResponse, menuResponse] = await Promise.all([
              fetch('/api/categories'),
              fetch(`/api/menu?orderType=${orderType}`)
            ])

            if (categoriesResponse.ok && menuResponse.ok) {
              const [categoriesData, menuData] = await Promise.all([
                categoriesResponse.json(),
                menuResponse.json()
              ])
              setCategories(categoriesData)
              setMenuItems(menuData)
              return
            }
          } catch (dbError) {
            console.log('Database not available, using fallback data')
          }

          // Fallback to static data
          const currentMenuItems = orderType === 'dine-in' ? dineInMenuItems : takeawayMenuItems
          const currentCategories = orderType === 'dine-in' ? dineInCategories : takeawayCategories

          // Convert static data to match database format
          const formattedMenuItems = currentMenuItems.map(item => ({
            ...item,
            categoryId: item.category,
            category: {
              id: item.category,
              name: currentCategories.find(cat => cat.id === item.category)?.name || item.category,
              description: '',
              icon: ''
            }
          }))

          const formattedCategories = currentCategories.map(cat => ({
            ...cat,
            isActive: true
          }))

          setCategories(formattedCategories)
          setMenuItems(formattedMenuItems)
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
