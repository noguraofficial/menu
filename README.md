# Nogura Ramen Bar - Menu Ordering System

A modern, responsive menu ordering system for Nogura Ramen Bar with database integration and admin panel. Ready for Netlify deployment.

## 🚀 Features

- **📱 Mobile-First Design** - Optimized for mobile devices
- **🍜 Halal Menu** - Complete halal Japanese menu
- **📊 Database Integration** - PostgreSQL with Prisma ORM
- **👨‍💼 Admin Panel** - Manage menu items and categories
- **🛒 Shopping Cart** - Add items with quantity and packaging options
- **📱 WhatsApp Integration** - Send orders via WhatsApp
- **🎨 Modern UI** - Clean, minimalist design
- **☁️ Netlify Ready** - Optimized for Netlify deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Deployment**: Netlify with Functions
- **API**: Netlify Functions (Serverless)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/noguraofficial/menu.git
   cd menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/nogura_ramen?schema=public"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Netlify Deployment

### Quick Deploy

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

2. **Environment Variables**
   Add these in Netlify dashboard:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database?schema=public
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=https://your-site-name.netlify.app
   ```

3. **Database Setup**
   - Use Supabase, PlanetScale, or Railway for PostgreSQL
   - Run migrations: `npx prisma db push`

### Manual Deploy

```bash
# Build the project
npm run build

# Deploy to Netlify
npx netlify deploy --prod --dir=out
```

## 📱 Usage

### Customer Interface

1. **Browse Menu** - View available items by category
2. **Select Order Type** - Choose between Dine In or Take Away
3. **Add to Cart** - Select quantity and packaging options
4. **Checkout** - Review order and send via WhatsApp

### Admin Interface

1. **Access Admin Panel** - Navigate to `/admin`
2. **Manage Categories** - Add, edit, or delete categories
3. **Manage Menu Items** - Add, edit, or delete menu items
4. **View Orders** - Monitor incoming orders

## 🎨 Design Features

- **Responsive Design** - Works on all device sizes
- **Dark Theme** - Black, white, and gray color scheme
- **Minimalist UI** - Clean and modern interface
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages

## 📊 Database Schema

### Tables

- **categories** - Menu categories (Ramen, Appetizer, etc.)
- **menu_items** - Individual menu items with pricing
- **orders** - Customer orders with status tracking
- **order_items** - Items within each order

### Key Features

- **Price Storage** - Prices stored in cents for accuracy
- **Order Types** - Dine In vs Take Away support
- **Packaging Options** - Restaurant packaging vs bring your own
- **Order Status** - Complete order lifecycle tracking

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio
- `./deploy-netlify.sh` - Deploy to Netlify script

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret key for NextAuth
- `NEXTAUTH_URL` - Application URL

### Netlify Functions

- `/.netlify/functions/menu` - Menu API
- `/.netlify/functions/orders` - Orders API
- `/.netlify/functions/categories` - Categories API
- `/.netlify/functions/upload` - Upload API

## 📱 Mobile Optimization

- **Touch-Friendly** - Large buttons and touch targets
- **Fast Loading** - Optimized images and code splitting
- **Offline Support** - Works without internet connection
- **PWA Ready** - Can be installed as a web app

## 🎯 Features

### Customer Features

- **Menu Browsing** - Browse items by category
- **Order Type Selection** - Dine In or Take Away
- **Shopping Cart** - Add items with quantity control
- **Packaging Options** - Choose packaging for takeaway
- **WhatsApp Integration** - Send orders via WhatsApp
- **Responsive Design** - Works on all devices

### Admin Features

- **Menu Management** - Add, edit, delete menu items
- **Category Management** - Manage menu categories
- **Order Tracking** - View and manage orders
- **Settings** - Configure restaurant settings

## 🛡️ Security

- **Input Validation** - All inputs are validated
- **SQL Injection Protection** - Prisma ORM prevents SQL injection
- **XSS Protection** - React's built-in XSS protection
- **CSRF Protection** - Next.js built-in CSRF protection

## 📈 Performance

- **Code Splitting** - Automatic code splitting by Next.js
- **Image Optimization** - Next.js automatic image optimization
- **Caching** - Database query caching with Prisma
- **CDN** - Netlify's global CDN for fast delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@nogura.com or create an issue in the repository.

---

**Nogura Ramen Bar** - Authentic Japanese Ramen Experience 🍜
