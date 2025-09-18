# Nogura Ramen Bar - Menu Ordering System

A modern, responsive menu ordering system for Nogura Ramen Bar with database integration and admin panel.

## 🚀 Features

- **📱 Mobile-First Design** - Optimized for mobile devices
- **🍜 Halal Menu** - Complete halal Japanese menu
- **📊 Database Integration** - PostgreSQL with Prisma ORM
- **👨‍💼 Admin Panel** - Manage menu items and categories
- **🛒 Shopping Cart** - Add items with quantity and packaging options
- **📱 WhatsApp Integration** - Send orders via WhatsApp
- **🎨 Modern UI** - Clean, minimalist design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd menu.nogura.id
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

4. **Setup database (optional)**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with initial data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

### Option 1: With Database (Production-like)

1. **Install PostgreSQL**
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

2. **Create database**
   ```sql
   CREATE DATABASE nogura_ramen;
   ```

3. **Update environment variables**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/nogura_ramen?schema=public"
   ```

4. **Initialize database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

### Option 2: Without Database (Fallback Mode)

The application will automatically fallback to static data if the database is not available. No additional setup required.

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

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Setup Production Database**
   - Use a production PostgreSQL database (e.g., Supabase, PlanetScale)
   - Update `DATABASE_URL` in Vercel environment variables

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret key for NextAuth
- `NEXTAUTH_URL` - Application URL

### Customization

- **Menu Items** - Edit `data/menu-dine-in.ts` and `data/menu-takeaway.ts`
- **Styling** - Modify Tailwind classes in components
- **WhatsApp Number** - Update in checkout page

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
- **CDN** - Vercel's global CDN for fast delivery

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