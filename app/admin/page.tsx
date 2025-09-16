'use client'

import { useState, useEffect } from 'react'
import { Utensils, Tag, Users, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMenus: 0,
    totalCategories: 0,
    dineInMenus: 0,
    takeawayMenus: 0
  })

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalMenus: 18,
      totalCategories: 4,
      dineInMenus: 12,
      takeawayMenus: 6
    })
  }, [])

  const statCards = [
    {
      name: 'Total Menus',
      value: stats.totalMenus,
      icon: Utensils,
      color: 'bg-blue-500'
    },
    {
      name: 'Categories',
      value: stats.totalCategories,
      icon: Tag,
      color: 'bg-green-500'
    },
    {
      name: 'Dine In Menus',
      value: stats.dineInMenus,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      name: 'Take Away Menus',
      value: stats.takeawayMenus,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola menu dan kategori Nogura Ramen Bar
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/admin/menu"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  <Utensils className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  Manage Menus
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add, edit, or remove menu items for both Dine In and Take Away
                </p>
              </div>
            </a>

            <a
              href="/admin/categories"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                  <Tag className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  Manage Categories
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Organize menus into categories like Ramen, Appetizer, etc.
                </p>
              </div>
            </a>

            <a
              href="/admin/settings"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  <Users className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  Settings
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Configure restaurant settings and preferences
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <Utensils className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Added new menu item: <span className="font-medium text-gray-900">Tori Paitan</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>2 hours ago</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <Tag className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Updated category: <span className="font-medium text-gray-900">Ramen</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>4 hours ago</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center ring-8 ring-white">
                        <Utensils className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Updated menu item: <span className="font-medium text-gray-900">Tonkotsu Ramen</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>1 day ago</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
