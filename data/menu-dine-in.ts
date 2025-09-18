import { MenuItem } from '@/context/CartContext'

export const dineInMenuItems: MenuItem[] = [
  // Ramen - Dine In Only
  {
    id: 'dine-in-tori-paitan',
    name: 'Tori Paitan',
    description: 'Ramen dengan kaldu ayam yang kental dan creamy, dilengkapi dengan chashu, nori, dan telur rebus',
    price: 40000,
    image: '/images/tori-paitan.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-tonkotsu-ramen',
    name: 'Tonkotsu Ramen',
    description: 'Ramen dengan kaldu tulang babi yang kental dan gurih, dilengkapi dengan chashu, nori, dan telur rebus',
    price: 45000,
    image: '/images/tonkotsu-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-shoyu-ramen',
    name: 'Shoyu Ramen',
    description: 'Ramen dengan kaldu ayam dan kecap asin, topping chashu, menma, dan nori',
    price: 42000,
    image: '/images/shoyu-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-miso-ramen',
    name: 'Miso Ramen',
    description: 'Ramen dengan kaldu miso yang kaya rasa, dilengkapi dengan jagung, tauge, dan chashu',
    price: 43000,
    image: '/images/miso-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-spicy-ramen',
    name: 'Spicy Ramen',
    description: 'Ramen pedas dengan kaldu tonkotsu dan bumbu pedas khas, topping chashu dan sayuran',
    price: 47000,
    image: '/images/spicy-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },

  // Appetizers - Dine In Only
  {
    id: 'dine-in-gyoza',
    name: 'Gyoza (6 pcs)',
    description: 'Dumpling isi daging babi dan sayuran, disajikan dengan saus gyoza',
    price: 25000,
    image: '/images/gyoza.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-takoyaki',
    name: 'Takoyaki (8 pcs)',
    description: 'Bola-bola gurih berisi gurita dengan saus takoyaki dan mayones',
    price: 28000,
    image: '/images/takoyaki.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-edamame',
    name: 'Edamame',
    description: 'Kacang kedelai muda rebus dengan garam laut',
    price: 15000,
    image: '/images/edamame.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-chicken-karaage',
    name: 'Chicken Karaage',
    description: 'Ayam goreng krispi ala Jepang dengan saus ponzu',
    price: 30000,
    image: '/images/chicken-karaage.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },

  // Rice Bowls - Dine In Only
  {
    id: 'dine-in-chashu-don',
    name: 'Chashu Don',
    description: 'Nasi dengan potongan chashu, telur, dan sayuran segar',
    price: 35000,
    image: '/images/chashu-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-teriyaki-chicken-don',
    name: 'Teriyaki Chicken Don',
    description: 'Nasi dengan ayam teriyaki, sayuran, dan saus teriyaki',
    price: 32000,
    image: '/images/teriyaki-chicken-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-katsu-don',
    name: 'Katsu Don',
    description: 'Nasi dengan daging katsu, telur, dan saus katsu',
    price: 38000,
    image: '/images/katsu-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },

  // Drinks - Dine In Only
  {
    id: 'dine-in-green-tea',
    name: 'Green Tea',
    description: 'Teh hijau Jepang yang segar dan menyehatkan',
    price: 8000,
    image: '/images/green-tea.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-ramune',
    name: 'Ramune',
    description: 'Minuman soda Jepang dengan rasa lemon yang menyegarkan',
    price: 15000,
    image: '/images/ramune.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-calpico',
    name: 'Calpico',
    description: 'Minuman susu fermentasi dengan rasa buah yang unik',
    price: 12000,
    image: '/images/calpico.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-japanese-beer',
    name: 'Japanese Beer',
    description: 'Bir Jepang yang segar dan ringan',
    price: 25000,
    image: '/images/japanese-beer.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  }
]

export const dineInCategories = [
  { id: 'ramen', name: 'Ramen' },
  { id: 'appetizer', name: 'Appetizer' },
  { id: 'rice', name: 'Rice Bowl' },
  { id: 'drink', name: 'Minuman' }
]
