import { MenuItem } from '@/context/CartContext'

export const menuItems: MenuItem[] = [
  // Ramen
  {
    id: 'tori-paitan',
    name: 'Tori Paitan',
    description: 'Ramen dengan kaldu ayam yang kental dan creamy, dilengkapi dengan chashu, nori, dan telur rebus',
    price: 40000,
    image: '/images/tori-paitan.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'tantan-ramen',
    name: 'Tantan Ramen',
    description: 'Ramen pedas dengan kaldu ayam dan bumbu tantan, topping chashu, sayuran, dan biji wijen',
    price: 40000,
    image: '/images/tantan-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'tonkotsu-ramen',
    name: 'Tonkotsu Ramen',
    description: 'Ramen dengan kaldu tulang babi yang kental dan gurih, dilengkapi dengan chashu, nori, dan telur rebus',
    price: 40000,
    image: '/images/tonkotsu-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'shoyu-ramen',
    name: 'Shoyu Ramen',
    description: 'Ramen dengan kaldu ayam dan kecap asin, topping chashu, menma, dan nori',
    price: 40000,
    image: '/images/shoyu-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'miso-ramen',
    name: 'Miso Ramen',
    description: 'Ramen dengan kaldu miso yang kaya rasa, dilengkapi dengan jagung, tauge, dan chashu',
    price: 40000,
    image: '/images/miso-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'spicy-ramen',
    name: 'Spicy Ramen',
    description: 'Ramen pedas dengan kaldu tonkotsu dan bumbu pedas khas, topping chashu dan sayuran',
    price: 40000,
    image: '/images/spicy-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },

  // Appetizers
  {
    id: 'gyoza',
    name: 'Gyoza (6 pcs)',
    description: 'Dumpling isi daging babi dan sayuran, disajikan dengan saus gyoza',
    price: 40000,
    image: '/images/gyoza.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'takoyaki',
    name: 'Takoyaki (8 pcs)',
    description: 'Bola-bola gurih berisi gurita dengan saus takoyaki dan mayones',
    price: 40000,
    image: '/images/takoyaki.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'edamame',
    name: 'Edamame',
    description: 'Kacang kedelai muda rebus dengan garam laut',
    price: 40000,
    image: '/images/edamame.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'chicken-karaage',
    name: 'Chicken Karaage',
    description: 'Ayam goreng krispi ala Jepang dengan saus ponzu',
    price: 40000,
    image: '/images/chicken-karaage.jpg',
    category: 'appetizer',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },

  // Rice Bowls
  {
    id: 'chashu-don',
    name: 'Chashu Don',
    description: 'Nasi dengan potongan chashu, telur, dan sayuran segar',
    price: 40000,
    image: '/images/chashu-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'teriyaki-chicken-don',
    name: 'Teriyaki Chicken Don',
    description: 'Nasi dengan ayam teriyaki, sayuran, dan saus teriyaki',
    price: 40000,
    image: '/images/teriyaki-chicken-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'katsu-don',
    name: 'Katsu Don',
    description: 'Nasi dengan daging katsu, telur, dan saus katsu',
    price: 40000,
    image: '/images/katsu-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },

  // Drinks
  {
    id: 'green-tea',
    name: 'Green Tea',
    description: 'Teh hijau Jepang yang segar dan menyehatkan',
    price: 40000,
    image: '/images/green-tea.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'ramune',
    name: 'Ramune',
    description: 'Minuman soda Jepang dengan rasa lemon yang menyegarkan',
    price: 40000,
    image: '/images/ramune.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'calpico',
    name: 'Calpico',
    description: 'Minuman susu fermentasi dengan rasa buah yang unik',
    price: 40000,
    image: '/images/calpico.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  },
  {
    id: 'japanese-beer',
    name: 'Japanese Beer',
    description: 'Bir Jepang yang segar dan ringan',
    price: 40000,
    image: '/images/japanese-beer.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  }
]

export const menuCategories = [
  { id: 'ramen', name: 'Ramen', icon: '🍜' },
  { id: 'appetizer', name: 'Appetizer', icon: '🥟' },
  { id: 'rice', name: 'Rice Bowl', icon: '🍚' },
  { id: 'drink', name: 'Minuman', icon: '🥤' }
]
