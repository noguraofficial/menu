import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const ramenCategory = await prisma.category.upsert({
    where: { id: 'ramen' },
    update: {},
    create: {
      id: 'ramen',
      name: 'Ramen',
      description: 'Authentic Japanese ramen with rich broth',
      icon: '🍜',
      isActive: true,
      priority: 1, // Highest priority
    },
  })

  const appetizerCategory = await prisma.category.upsert({
    where: { id: 'appetizer' },
    update: {},
    create: {
      id: 'appetizer',
      name: 'Appetizer',
      description: 'Japanese appetizers and side dishes',
      icon: '🥟',
      isActive: true,
      priority: 2,
    },
  })

  const riceCategory = await prisma.category.upsert({
    where: { id: 'rice' },
    update: {},
    create: {
      id: 'rice',
      name: 'Rice Bowl',
      description: 'Hearty rice bowls with various toppings',
      icon: '🍚',
      isActive: true,
      priority: 3,
    },
  })

  const dessertCategory = await prisma.category.upsert({
    where: { id: 'dessert' },
    update: {},
    create: {
      id: 'dessert',
      name: 'Dessert',
      description: 'Sweet treats and desserts',
      icon: '🍰',
      isActive: true,
      priority: 4,
    },
  })

  const drinkCategory = await prisma.category.upsert({
    where: { id: 'drink' },
    update: {},
    create: {
      id: 'drink',
      name: 'Minuman',
      description: 'Japanese drinks and beverages',
      icon: '🥤',
      isActive: true,
      priority: 5,
    },
  })

  // Create Dine In menu items
  const dineInMenuItems = [
    {
      id: 'dine-in-tori-paitan',
      name: 'Tori Paitan',
      description: 'Ramen dengan kaldu ayam yang kental dan creamy, dilengkapi dengan chashu ayam, nori, dan telur rebus',
      price: 40000,
      categoryId: 'ramen',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-tantan-ramen',
      name: 'Tantan Ramen',
      description: 'Ramen pedas dengan kaldu ayam dan bumbu tantan, topping chashu ayam, sayuran, dan biji wijen',
      price: 45000,
      categoryId: 'ramen',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-shoyu-ramen',
      name: 'Shoyu Ramen',
      description: 'Ramen dengan kaldu ayam dan kecap asin, topping chashu ayam, menma, dan nori',
      price: 42000,
      categoryId: 'ramen',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-miso-ramen',
      name: 'Miso Ramen',
      description: 'Ramen dengan kaldu miso yang kaya rasa, dilengkapi dengan jagung, tauge, dan chashu ayam',
      price: 43000,
      categoryId: 'ramen',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-spicy-ramen',
      name: 'Spicy Ramen',
      description: 'Ramen pedas dengan kaldu ayam dan bumbu pedas khas, topping chashu ayam dan sayuran',
      price: 47000,
      categoryId: 'ramen',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-gyoza',
      name: 'Gyoza (6 pcs)',
      description: 'Dumpling isi daging ayam dan sayuran, disajikan dengan saus gyoza',
      price: 25000,
      categoryId: 'appetizer',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-takoyaki',
      name: 'Takoyaki (8 pcs)',
      description: 'Bola-bola gurih berisi gurita dengan saus takoyaki dan mayones',
      price: 28000,
      categoryId: 'appetizer',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-edamame',
      name: 'Edamame',
      description: 'Kacang kedelai muda rebus dengan garam laut',
      price: 15000,
      categoryId: 'appetizer',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-chicken-karaage',
      name: 'Chicken Karaage',
      description: 'Ayam goreng krispi ala Jepang dengan saus ponzu',
      price: 30000,
      categoryId: 'appetizer',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-chashu-don',
      name: 'Chashu Ayam Don',
      description: 'Nasi dengan potongan chashu ayam, telur, dan sayuran segar',
      price: 35000,
      categoryId: 'rice',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-teriyaki-chicken-don',
      name: 'Teriyaki Chicken Don',
      description: 'Nasi dengan ayam teriyaki, sayuran, dan saus teriyaki',
      price: 32000,
      categoryId: 'rice',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-chicken-katsu-don',
      name: 'Chicken Katsu Don',
      description: 'Nasi dengan ayam katsu, telur, dan saus katsu',
      price: 38000,
      categoryId: 'rice',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-japanese-purin',
      name: 'Japanese Purin Caramel',
      description: 'Pudding Jepang dengan saus karamel yang lembut dan manis',
      price: 25000,
      categoryId: 'dessert',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-burnt-cheese-cake',
      name: 'Burnt Cheese Cake',
      description: 'Cheesecake dengan tekstur lembut dan rasa gurih yang khas',
      price: 25000,
      categoryId: 'dessert',
      dineInAvailable: true,
      takeawayAvailable: false,
    },
    {
      id: 'dine-in-green-tea',
      name: 'Green Tea',
      description: 'Teh hijau Jepang yang segar dan menyehatkan',
      price: 8000,
      categoryId: 'drink',
      dineInAvailable: true,
      takeawayAvailable: true,
    },
    {
      id: 'dine-in-ramune',
      name: 'Ramune',
      description: 'Minuman soda Jepang dengan rasa lemon yang menyegarkan',
      price: 15000,
      categoryId: 'drink',
      dineInAvailable: true,
      takeawayAvailable: true,
    },
    {
      id: 'dine-in-calpico',
      name: 'Calpico',
      description: 'Minuman susu fermentasi dengan rasa buah yang unik',
      price: 12000,
      categoryId: 'drink',
      dineInAvailable: true,
      takeawayAvailable: true,
    },
    {
      id: 'dine-in-es-kopi-susu',
      name: 'Es Kopi Susu Platera',
      description: 'Kopi susu dingin dengan tekstur yang creamy dan nikmat',
      price: 20000,
      categoryId: 'drink',
      dineInAvailable: true,
      takeawayAvailable: true,
    },
  ]

  // Create Take Away menu items
  const takeawayMenuItems = [
    {
      id: 'takeaway-tori-paitan',
      name: 'Tori Paitan (Take Away)',
      description: 'Ramen dengan kaldu ayam yang kental dan creamy, dikemas khusus untuk take away',
      price: 40000,
      categoryId: 'ramen',
      dineInAvailable: false,
      takeawayAvailable: true,
      packagingOption: true,
    },
    {
      id: 'takeaway-shoyu-ramen',
      name: 'Shoyu Ramen (Take Away)',
      description: 'Ramen dengan kaldu ayam dan kecap asin, dikemas untuk take away',
      price: 42000,
      categoryId: 'ramen',
      dineInAvailable: false,
      takeawayAvailable: true,
      packagingOption: true,
    },
    {
      id: 'takeaway-miso-ramen',
      name: 'Miso Ramen (Take Away)',
      description: 'Ramen dengan kaldu miso yang kaya rasa, dikemas untuk take away',
      price: 43000,
      categoryId: 'ramen',
      dineInAvailable: false,
      takeawayAvailable: true,
      packagingOption: true,
    },
    {
      id: 'takeaway-gyoza',
      name: 'Gyoza (6 pcs) - Take Away',
      description: 'Dumpling isi daging ayam dan sayuran, dikemas untuk take away',
      price: 25000,
      categoryId: 'appetizer',
      dineInAvailable: false,
      takeawayAvailable: true,
    },
    {
      id: 'takeaway-edamame',
      name: 'Edamame - Take Away',
      description: 'Kacang kedelai muda rebus dengan garam laut, dikemas untuk take away',
      price: 15000,
      categoryId: 'appetizer',
      dineInAvailable: false,
      takeawayAvailable: true,
    },
    {
      id: 'takeaway-chicken-karaage',
      name: 'Chicken Karaage - Take Away',
      description: 'Ayam goreng krispi ala Jepang dengan saus ponzu, dikemas untuk take away',
      price: 30000,
      categoryId: 'appetizer',
      dineInAvailable: false,
      takeawayAvailable: true,
    },
    {
      id: 'takeaway-chashu-don',
      name: 'Chashu Ayam Don - Take Away',
      description: 'Nasi dengan potongan chashu ayam, telur, dan sayuran segar, dikemas untuk take away',
      price: 35000,
      categoryId: 'rice',
      dineInAvailable: false,
      takeawayAvailable: true,
      packagingOption: true,
    },
    {
      id: 'takeaway-teriyaki-chicken-don',
      name: 'Teriyaki Chicken Don - Take Away',
      description: 'Nasi dengan ayam teriyaki, sayuran, dan saus teriyaki, dikemas untuk take away',
      price: 32000,
      categoryId: 'rice',
      dineInAvailable: false,
      takeawayAvailable: true,
      packagingOption: true,
    },
    {
      id: 'takeaway-chicken-katsu-don',
      name: 'Chicken Katsu Don - Take Away',
      description: 'Nasi dengan ayam katsu, telur, dan saus katsu, dikemas untuk take away',
      price: 38000,
      categoryId: 'rice',
      dineInAvailable: false,
      takeawayAvailable: true,
      packagingOption: true,
    },
    {
      id: 'takeaway-green-tea',
      name: 'Green Tea - Take Away',
      description: 'Teh hijau Jepang yang segar dan menyehatkan, dikemas untuk take away',
      price: 8000,
      categoryId: 'drink',
      dineInAvailable: false,
      takeawayAvailable: true,
    },
    {
      id: 'takeaway-ramune',
      name: 'Ramune - Take Away',
      description: 'Minuman soda Jepang dengan rasa lemon yang menyegarkan, dikemas untuk take away',
      price: 15000,
      categoryId: 'drink',
      dineInAvailable: false,
      takeawayAvailable: true,
    },
    {
      id: 'takeaway-calpico',
      name: 'Calpico - Take Away',
      description: 'Minuman susu fermentasi dengan rasa buah yang unik, dikemas untuk take away',
      price: 12000,
      categoryId: 'drink',
      dineInAvailable: false,
      takeawayAvailable: true,
    },
    {
      id: 'takeaway-es-kopi-susu',
      name: 'Es Kopi Susu Platera - Take Away',
      description: 'Kopi susu dingin dengan tekstur yang creamy dan nikmat, dikemas untuk take away',
      price: 20000,
      categoryId: 'drink',
      dineInAvailable: false,
      takeawayAvailable: true,
    },
  ]

  // Create all menu items
  for (const item of [...dineInMenuItems, ...takeawayMenuItems]) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        price: item.price, // Price is already in Rupiah
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
