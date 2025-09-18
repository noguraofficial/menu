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
    id: 'dine-in-tantan-ramen',
    name: 'Tantan Ramen',
    description: 'Ramen pedas dengan kaldu ayam dan bumbu tantan, topping chashu ayam, sayuran, dan biji wijen',
    price: 45000,
    image: '/images/tantan-ramen.jpg',
    category: 'ramen',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-shoyu-ramen',
    name: 'Shoyu Ramen',
    description: 'Ramen dengan kaldu ayam dan kecap asin, topping chashu ayam, menma, dan nori',
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
    description: 'Ramen dengan kaldu miso yang kaya rasa, dilengkapi dengan jagung, tauge, dan chashu ayam',
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
    description: 'Ramen pedas dengan kaldu ayam dan bumbu pedas khas, topping chashu ayam dan sayuran',
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
    description: 'Dumpling isi daging ayam dan sayuran, disajikan dengan saus gyoza',
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
    name: 'Chashu Ayam Don',
    description: 'Nasi dengan potongan chashu ayam, telur, dan sayuran segar',
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
    id: 'dine-in-chicken-katsu-don',
    name: 'Chicken Katsu Don',
    description: 'Nasi dengan ayam katsu, telur, dan saus katsu',
    price: 38000,
    image: '/images/katsu-don.jpg',
    category: 'rice',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },

  // Desserts - Dine In Only
  {
    id: 'dine-in-japanese-purin',
    name: 'Japanese Purin Caramel',
    description: 'Pudding Jepang dengan saus karamel yang lembut dan manis',
    price: 25000,
    image: '/images/japanese-purin.jpg',
    category: 'dessert',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: false
  },
  {
    id: 'dine-in-burnt-cheese-cake',
    name: 'Burnt Cheese Cake',
    description: 'Cheesecake dengan tekstur lembut dan rasa gurih yang khas',
    price: 25000,
    image: '/images/burnt-cheese-cake.jpg',
    category: 'dessert',
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
    takeawayAvailable: true
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
    takeawayAvailable: true
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
    takeawayAvailable: true
  },
  {
    id: 'dine-in-es-kopi-susu',
    name: 'Es Kopi Susu Platera',
    description: 'Kopi susu dingin dengan tekstur yang creamy dan nikmat',
    price: 20000,
    image: '/images/es-kopi-susu.jpg',
    category: 'drink',
    isAvailable: true,
    dineInAvailable: true,
    takeawayAvailable: true
  }
]

export const dineInCategories = [
  { id: 'ramen', name: 'Ramen' },
  { id: 'appetizer', name: 'Appetizer' },
  { id: 'rice', name: 'Rice Bowl' },
  { id: 'dessert', name: 'Dessert' },
  { id: 'drink', name: 'Minuman' }
]
