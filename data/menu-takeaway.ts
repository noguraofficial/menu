import { MenuItem } from '@/context/CartContext'

export const takeawayMenuItems: MenuItem[] = [
  // Ramen - Take Away Only
  {
    id: 'takeaway-tori-paitan',
    name: 'Tori Paitan (Take Away)',
    description: 'Ramen dengan kaldu ayam yang kental dan creamy, dikemas khusus untuk take away',
    price: 40000,
    image: '/images/tori-paitan.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true,
    packagingOption: true
  },
  {
    id: 'takeaway-shoyu-ramen',
    name: 'Shoyu Ramen (Take Away)',
    description: 'Ramen dengan kaldu ayam dan kecap asin, dikemas untuk take away',
    price: 42000,
    image: '/images/shoyu-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true,
    packagingOption: true
  },
  {
    id: 'takeaway-miso-ramen',
    name: 'Miso Ramen (Take Away)',
    description: 'Ramen dengan kaldu miso yang kaya rasa, dikemas untuk take away',
    price: 43000,
    image: '/images/miso-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true,
    packagingOption: true
  },

  // Appetizers - Take Away Only
  {
    id: 'takeaway-gyoza',
    name: 'Gyoza (6 pcs) - Take Away',
    description: 'Dumpling isi daging ayam dan sayuran, dikemas untuk take away',
    price: 25000,
    image: '/images/gyoza.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true
  },
  {
    id: 'takeaway-edamame',
    name: 'Edamame - Take Away',
    description: 'Kacang kedelai muda rebus dengan garam laut, dikemas untuk take away',
    price: 15000,
    image: '/images/edamame.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true
  },
  {
    id: 'takeaway-chicken-karaage',
    name: 'Chicken Karaage - Take Away',
    description: 'Ayam goreng krispi ala Jepang dengan saus ponzu, dikemas untuk take away',
    price: 30000,
    image: '/images/chicken-karaage.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true
  },

  // Rice Bowls - Take Away Only
  {
    id: 'takeaway-chashu-don',
    name: 'Chashu Ayam Don - Take Away',
    description: 'Nasi dengan potongan chashu ayam, telur, dan sayuran segar, dikemas untuk take away',
    price: 35000,
    image: '/images/chashu-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true,
    packagingOption: true
  },
  {
    id: 'takeaway-teriyaki-chicken-don',
    name: 'Teriyaki Chicken Don - Take Away',
    description: 'Nasi dengan ayam teriyaki, sayuran, dan saus teriyaki, dikemas untuk take away',
    price: 32000,
    image: '/images/teriyaki-chicken-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true,
    packagingOption: true
  },
  {
    id: 'takeaway-chicken-katsu-don',
    name: 'Chicken Katsu Don - Take Away',
    description: 'Nasi dengan ayam katsu, telur, dan saus katsu, dikemas untuk take away',
    price: 38000,
    image: '/images/katsu-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true,
    packagingOption: true
  },

  // Drinks - Take Away Only
  {
    id: 'takeaway-green-tea',
    name: 'Green Tea - Take Away',
    description: 'Teh hijau Jepang yang segar dan menyehatkan, dikemas untuk take away',
    price: 8000,
    image: '/images/green-tea.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true
  },
  {
    id: 'takeaway-ramune',
    name: 'Ramune - Take Away',
    description: 'Minuman soda Jepang dengan rasa lemon yang menyegarkan, dikemas untuk take away',
    price: 15000,
    image: '/images/ramune.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true
  },
  {
    id: 'takeaway-calpico',
    name: 'Calpico - Take Away',
    description: 'Minuman susu fermentasi dengan rasa buah yang unik, dikemas untuk take away',
    price: 12000,
    image: '/images/calpico.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true
  },
  {
    id: 'takeaway-es-kopi-susu',
    name: 'Es Kopi Susu Platera - Take Away',
    description: 'Kopi susu dingin dengan tekstur yang creamy dan nikmat, dikemas untuk take away',
    price: 20000,
    image: '/images/es-kopi-susu.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: false,
    takeawayAvailable: true
  }
]

export const takeawayCategories = [
  { id: 'ramen', name: 'Ramen' },
  { id: 'appetizer', name: 'Appetizer' },
  { id: 'rice', name: 'Rice Bowl' },
  { id: 'drink', name: 'Minuman' }
]
