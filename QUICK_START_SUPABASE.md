# ⚡ Quick Start - Supabase Setup

Panduan cepat untuk menghubungkan aplikasi dengan Supabase database.

## 🚀 Langkah Cepat (5 menit)

### 1. Buat Supabase Project
1. Buka [supabase.com](https://supabase.com)
2. Klik "New Project"
3. Isi:
   - **Name**: `nogura-ramen-menu`
   - **Password**: Buat password kuat (simpan!)
   - **Region**: Singapore
4. Klik "Create new project"
5. Tunggu 2-3 menit sampai selesai

### 2. Dapatkan Connection String
1. Di Supabase Dashboard, pilih project Anda
2. Go to **Settings** > **Database**
3. Scroll ke **Connection string**
4. Pilih **URI** tab
5. Copy connection string

### 3. Update Environment Variables
1. Buka file `.env.local` di project Anda
2. Update `DATABASE_URL` dengan connection string dari Supabase
3. Ganti `[YOUR-PASSWORD]` dengan password yang Anda buat

### 4. Setup Database
```bash
# Jalankan script setup otomatis
npm run setup:supabase

# Atau manual:
npm install
npx prisma generate
npx prisma db push
npm run db:seed
```

### 5. Test Connection
```bash
# Test database connection
npm run db:test

# Buka Prisma Studio
npm run db:studio
```

## ✅ Verifikasi Setup

### Test Database Connection
```bash
npm run db:test
```
Harus menampilkan:
- ✅ Database connection successful!
- 📊 Categories in database: X
- 🍜 Menu items in database: X

### Test API Endpoints
```bash
# Test menu API
curl http://localhost:3000/.netlify/functions/menu

# Test categories API
curl http://localhost:3000/.netlify/functions/categories
```

### Test Aplikasi
1. Buka `http://localhost:3000`
2. Pastikan menu loading dengan benar
3. Test add to cart functionality
4. Test admin panel di `/admin`

## 🌐 Deploy ke Netlify

### 1. Update Netlify Environment Variables
Di Netlify Dashboard:
- Go to **Site settings** > **Environment variables**
- Add/Update:
  ```
  DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres?schema=public
  NEXTAUTH_SECRET=your-secret-key-here
  NEXTAUTH_URL=https://your-site.netlify.app
  ```

### 2. Redeploy
- Netlify akan otomatis rebuild
- Atau manual trigger di dashboard

## 🔧 Troubleshooting

### Database Connection Failed
```bash
# Check connection string format
echo $DATABASE_URL

# Test connection
npm run db:test
```

### Build Failed
```bash
# Check environment variables
cat .env.local

# Rebuild
npm run build
```

### API Not Working
- Check Netlify Functions logs
- Verify DATABASE_URL di Netlify
- Test local API endpoints

## 📊 Database Schema

Setelah setup, database akan memiliki tabel:
- `categories` - Kategori menu
- `menu_items` - Item menu
- `orders` - Pesanan
- `order_items` - Item dalam pesanan

## 🎉 Selesai!

Aplikasi Anda sekarang terhubung dengan Supabase database!

**Next Steps:**
- Test semua fitur aplikasi
- Deploy ke Netlify
- Setup monitoring dan analytics

---

**Happy Coding!** 🍜✨
