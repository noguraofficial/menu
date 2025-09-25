# 🚀 Panduan Deployment ke Netlify

Aplikasi Nogura Ramen Menu sudah siap untuk deployment ke Netlify! Berikut langkah-langkah lengkapnya:

## ✅ Yang Sudah Disiapkan

- ✅ **Repository GitHub**: https://github.com/noguraofficial/menu.git
- ✅ **Netlify Configuration**: `netlify.toml`
- ✅ **Static Export**: Next.js dikonfigurasi untuk static generation
- ✅ **Netlify Functions**: API endpoints siap pakai
- ✅ **Build Scripts**: Package.json sudah dikonfigurasi
- ✅ **Environment Template**: `.env.example` tersedia

## 🚀 Langkah 1: Deploy ke Netlify

### Opsi A: Deploy dari GitHub (Recommended)

1. **Buka Netlify Dashboard**
   - Kunjungi [netlify.com](https://netlify.com)
   - Login atau daftar akun

2. **Connect Repository**
   - Klik "New site from Git"
   - Pilih "GitHub" sebagai provider
   - Pilih repository `noguraofficial/menu`

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   Node version: 18
   ```

4. **Deploy**
   - Klik "Deploy site"
   - Tunggu proses build selesai

### Opsi B: Deploy Manual

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod --dir=out
```

## 🗄️ Langkah 2: Setup Database

### Pilihan Database (Pilih salah satu):

#### A. Supabase (Recommended - Free)
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat project baru
3. Dapatkan connection string dari Settings > Database
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`

#### B. PlanetScale (Free)
1. Kunjungi [planetscale.com](https://planetscale.com)
2. Buat database baru
3. Dapatkan connection string

#### C. Railway (Free)
1. Kunjungi [railway.app](https://railway.app)
2. Buat PostgreSQL database
3. Dapatkan connection string

### Setup Database Schema

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push

# Seed dengan data awal (opsional)
npm run db:seed
```

## ⚙️ Langkah 3: Environment Variables

Di Netlify Dashboard, tambahkan environment variables:

### Required Variables:
```
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-site-name.netlify.app
```

### Cara Menambahkan:
1. Buka Netlify Dashboard
2. Pilih site Anda
3. Go to Site settings > Environment variables
4. Add variable untuk setiap environment variable di atas

## 🔧 Langkah 4: Konfigurasi Netlify Functions

Aplikasi sudah dikonfigurasi dengan Netlify Functions:

- `/.netlify/functions/menu` - API untuk menu items
- `/.netlify/functions/orders` - API untuk orders
- `/.netlify/functions/categories` - API untuk categories
- `/.netlify/functions/upload` - API untuk upload (placeholder)

## 📱 Langkah 5: Testing

1. **Test Frontend**
   - Buka URL Netlify Anda
   - Pastikan menu loading dengan benar
   - Test cart functionality

2. **Test API**
   - Test: `https://your-site.netlify.app/.netlify/functions/menu`
   - Test: `https://your-site.netlify.app/.netlify/functions/categories`

3. **Test Admin Panel**
   - Buka: `https://your-site.netlify.app/admin`
   - Test CRUD operations

## 🎯 Langkah 6: Custom Domain (Opsional)

1. **Di Netlify Dashboard**
   - Go to Site settings > Domain management
   - Add custom domain
   - Follow DNS setup instructions

2. **Update Environment Variables**
   - Update `NEXTAUTH_URL` dengan domain baru

## 🔍 Troubleshooting

### Build Fails
- Check Node version (harus 18)
- Check build command: `npm run build`
- Check publish directory: `out`

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database accessibility
- Ensure SSL is enabled (add `?sslmode=require`)

### API Not Working
- Check Netlify Functions logs
- Verify function files exist in `netlify/functions/`
- Check CORS settings

### Images Not Loading
- Ensure `unoptimized: true` in next.config.js
- Check image paths in public folder

## 📊 Monitoring

### Netlify Analytics
- Enable di Netlify Dashboard
- Monitor traffic dan performance

### Function Logs
- Check function logs di Netlify Dashboard
- Monitor error rates

## 🚀 Production Checklist

- [ ] Database connected dan working
- [ ] Environment variables set
- [ ] Custom domain configured (jika ada)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error monitoring setup
- [ ] Backup strategy implemented

## 📞 Support

Jika mengalami masalah:

1. **Check Logs**: Netlify Dashboard > Functions > Logs
2. **GitHub Issues**: [Create issue](https://github.com/noguraofficial/menu/issues)
3. **Documentation**: Lihat `NETLIFY_DEPLOYMENT.md`

## 🎉 Selamat!

Aplikasi Nogura Ramen Menu Anda sudah live di Netlify! 

**URL Aplikasi**: `https://your-site-name.netlify.app`

---

**Nogura Ramen Bar** - Authentic Japanese Ramen Experience 🍜
