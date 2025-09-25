# 🗄️ Setup Supabase Database

Panduan lengkap untuk menghubungkan aplikasi Nogura Ramen Menu dengan Supabase.

## 🚀 Langkah 1: Buat Project Supabase

### 1.1 Daftar/Login ke Supabase
- Kunjungi [supabase.com](https://supabase.com)
- Login atau daftar akun baru
- Klik "New Project"

### 1.2 Buat Project Baru
- **Name**: `nogura-ramen-menu`
- **Database Password**: Buat password yang kuat (simpan baik-baik!)
- **Region**: Pilih region terdekat (Singapore untuk Indonesia)
- **Pricing Plan**: Free tier (cukup untuk development)

### 1.3 Tunggu Setup Selesai
- Proses setup memakan waktu 2-3 menit
- Jangan tutup browser sampai selesai

## 🔑 Langkah 2: Dapatkan Connection String

### 2.1 Akses Database Settings
- Di Supabase Dashboard, pilih project Anda
- Go to **Settings** > **Database**
- Scroll ke bagian **Connection string**

### 2.2 Copy Connection String
- Pilih **URI** tab
- Copy connection string yang terlihat seperti:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 2.3 Update Environment Variables
Ganti `[YOUR-PASSWORD]` dengan password yang Anda buat:

```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres?schema=public"
```

## 🛠️ Langkah 3: Setup Database Schema

### 3.1 Install Dependencies (jika belum)
```bash
npm install
```

### 3.2 Generate Prisma Client
```bash
npx prisma generate
```

### 3.3 Push Schema ke Database
```bash
npx prisma db push
```

### 3.4 Seed Database (Opsional)
```bash
npm run db:seed
```

## 🔍 Langkah 4: Verifikasi Setup

### 4.1 Test Connection
```bash
npx prisma studio
```
- Buka browser ke `http://localhost:5555`
- Pastikan tabel sudah terbuat

### 4.2 Test API Endpoints
```bash
# Test menu API
curl http://localhost:3000/.netlify/functions/menu

# Test categories API  
curl http://localhost:3000/.netlify/functions/categories
```

## 🌐 Langkah 5: Deploy ke Netlify

### 5.1 Update Netlify Environment Variables
Di Netlify Dashboard:
- Go to **Site settings** > **Environment variables**
- Add/Update:
  ```
  DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres?schema=public
  NEXTAUTH_SECRET=your-secret-key-here
  NEXTAUTH_URL=https://your-site.netlify.app
  ```

### 5.2 Redeploy
- Netlify akan otomatis rebuild
- Atau manual trigger di dashboard

## 📊 Database Schema

### Tables yang Akan Dibuat:

#### `categories`
- `id` (String, Primary Key)
- `name` (String)
- `description` (String, Optional)
- `icon` (String, Optional)
- `isActive` (Boolean, Default: true)
- `priority` (Int, Default: 0)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### `menu_items`
- `id` (String, Primary Key)
- `name` (String)
- `description` (String)
- `price` (Int) - Price in Rupiah
- `image` (String, Optional)
- `categoryId` (String, Foreign Key)
- `isAvailable` (Boolean, Default: true)
- `dineInAvailable` (Boolean, Default: true)
- `takeawayAvailable` (Boolean, Default: false)
- `packagingOption` (Boolean, Default: false)
- `priority` (Int, Default: 0)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### `orders`
- `id` (String, Primary Key)
- `customerName` (String)
- `customerPhone` (String, Optional)
- `orderType` (Enum: DINE_IN, TAKEAWAY)
- `status` (Enum: PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED)
- `totalAmount` (Int) - Total in Rupiah
- `notes` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### `order_items`
- `id` (String, Primary Key)
- `orderId` (String, Foreign Key)
- `menuItemId` (String, Foreign Key)
- `quantity` (Int)
- `unitPrice` (Int) - Price per unit in Rupiah
- `useRestaurantPackaging` (Boolean, Default: false)
- `notes` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## 🔒 Security Features

### Row Level Security (RLS)
Supabase akan mengaktifkan RLS secara default. Untuk aplikasi ini, kita akan:
- Disable RLS untuk public access (karena ini menu public)
- Atau setup proper authentication jika diperlukan

### Connection Security
- SSL enabled by default
- Connection string sudah include SSL parameters

## 📱 Testing

### Local Testing
```bash
# Start development server
npm run dev

# Test database connection
npx prisma studio

# Test API endpoints
curl http://localhost:3000/.netlify/functions/menu
```

### Production Testing
- Deploy ke Netlify
- Test semua endpoints
- Verify data persistence

## 🚨 Troubleshooting

### Connection Issues
- Pastikan password benar
- Check project reference ID
- Verify region selection

### Schema Issues
- Run `npx prisma db push` lagi
- Check Prisma schema file
- Verify table creation di Supabase dashboard

### API Issues
- Check Netlify Functions logs
- Verify environment variables
- Test database connection

## 📞 Support

Jika mengalami masalah:
1. Check Supabase dashboard logs
2. Check Netlify Functions logs
3. Create issue di GitHub repository

---

**Happy Coding!** 🍜✨
