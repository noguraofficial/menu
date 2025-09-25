# 🚀 Production Deployment Guide

Panduan lengkap untuk deploy aplikasi Nogura Ramen Menu ke production.

## ✅ Prerequisites

- ✅ **GitHub Repository**: https://github.com/noguraofficial/menu.git
- ✅ **Supabase Database**: Connected dan berisi data
- ✅ **Netlify Account**: Siap untuk deployment
- ✅ **Build Configuration**: Sudah dikonfigurasi

## 🚀 Langkah 1: Deploy ke Netlify

### 1.1 Buka Netlify Dashboard
1. Kunjungi [netlify.com](https://netlify.com)
2. Login ke akun Anda
3. Klik **"New site from Git"**

### 1.2 Connect Repository
1. Pilih **"GitHub"** sebagai provider
2. Cari dan pilih repository **`noguraofficial/menu`**
3. Klik **"Connect"**

### 1.3 Configure Build Settings
```
Build command: npm run build
Publish directory: out
Node version: 18
```

### 1.4 Deploy
1. Klik **"Deploy site"**
2. Tunggu proses build selesai (2-3 menit)
3. Catat URL yang diberikan (contoh: `https://amazing-name-123456.netlify.app`)

## 🔧 Langkah 2: Setup Environment Variables

### 2.1 Buka Site Settings
1. Di Netlify Dashboard, pilih site Anda
2. Go to **Site settings** > **Environment variables**
3. Klik **"Add variable"**

### 2.2 Add Required Variables
Tambahkan environment variables berikut:

```
DATABASE_URL=postgresql://postgres:Nogura123@@db.szukelilsmmpsllwtbrd.supabase.co:5432/postgres?schema=public
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXTAUTH_URL=https://your-site-name.netlify.app
```

**⚠️ IMPORTANT**: Ganti `your-secret-key-here-change-this-in-production` dengan secret key yang kuat!

### 2.3 Generate Secret Key
```bash
# Generate random secret key
openssl rand -base64 32

# Atau gunakan online generator
# https://generate-secret.vercel.app/32
```

## 🗄️ Langkah 3: Verify Database Connection

### 3.1 Test Database
```bash
# Test koneksi database
npm run db:test
```

### 3.2 Check Data
```bash
# Buka Prisma Studio
npm run db:studio
```

Pastikan data sudah ada:
- Categories: 5+ kategori
- Menu Items: 30+ item menu

## 🌐 Langkah 4: Test Production

### 4.1 Test Frontend
1. Buka URL Netlify Anda
2. Test semua halaman:
   - ✅ Home page (`/`)
   - ✅ Admin panel (`/admin`)
   - ✅ Categories (`/admin/categories`)
   - ✅ Menu (`/admin/menu`)

### 4.2 Test API Endpoints
```bash
# Test menu API
curl https://your-site.netlify.app/.netlify/functions/menu

# Test categories API
curl https://your-site.netlify.app/.netlify/functions/categories

# Test orders API
curl https://your-site.netlify.app/.netlify/functions/orders
```

### 4.3 Test Admin Functions
1. Buka `/admin/categories`
2. Test CRUD operations:
   - ✅ Create new category
   - ✅ Edit existing category
   - ✅ Delete category
   - ✅ Toggle active/inactive

## 🔍 Langkah 5: Monitoring & Maintenance

### 5.1 Enable Analytics
1. Di Netlify Dashboard
2. Go to **Analytics** > **Enable Analytics**
3. Monitor traffic dan performance

### 5.2 Setup Monitoring
1. **Function Logs**: Monitor Netlify Functions logs
2. **Database Logs**: Monitor Supabase logs
3. **Error Tracking**: Setup error monitoring

### 5.3 Backup Strategy
1. **Database Backup**: Supabase automatic backups
2. **Code Backup**: GitHub repository
3. **Environment Backup**: Export environment variables

## 🚨 Troubleshooting

### Build Fails
```bash
# Check build logs di Netlify
# Common issues:
# - Missing environment variables
# - Node version mismatch
# - Build command error
```

### Database Connection Issues
```bash
# Check DATABASE_URL format
# Verify Supabase project is active
# Check IP whitelist in Supabase
```

### API Not Working
```bash
# Check Netlify Functions logs
# Verify function deployment
# Test function URLs manually
```

### Admin Panel Issues
```bash
# Check browser console for errors
# Verify API endpoints are accessible
# Check CORS settings
```

## 📊 Production Checklist

- [ ] Site deployed successfully
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] All pages loading correctly
- [ ] Admin panel functional
- [ ] API endpoints responding
- [ ] Analytics enabled
- [ ] Error monitoring setup
- [ ] Backup strategy implemented

## 🔄 Continuous Deployment

### Auto Deploy
- Setiap push ke `main` branch akan auto deploy
- Build time: ~2-3 menit
- Zero-downtime deployment

### Manual Deploy
```bash
# Trigger manual deploy
# Di Netlify Dashboard > Deploys > Trigger deploy
```

## 📱 Mobile Testing

### Test di Mobile Device
1. Buka URL di mobile browser
2. Test responsive design
3. Test touch interactions
4. Test admin panel di mobile

### PWA Features
- Aplikasi bisa diinstall sebagai PWA
- Offline support (dengan service worker)
- Mobile-first design

## 🎯 Performance Optimization

### Netlify Features
- **CDN**: Global content delivery
- **Image Optimization**: Automatic image optimization
- **Caching**: Intelligent caching
- **Compression**: Gzip compression

### Database Optimization
- **Connection Pooling**: Supabase handles this
- **Query Optimization**: Prisma optimizes queries
- **Indexing**: Automatic indexing

## 📞 Support & Maintenance

### Regular Maintenance
- Monitor performance metrics
- Update dependencies monthly
- Check security updates
- Backup database regularly

### Support Channels
- **GitHub Issues**: Technical issues
- **Netlify Support**: Hosting issues
- **Supabase Support**: Database issues

## 🎉 Success!

Aplikasi Nogura Ramen Menu sudah live di production!

**Production URL**: `https://your-site-name.netlify.app`

---

**Happy Deploying!** 🍜✨
