# 🚀 Vercel Deployment Guide

## Prerequisites

1. **GitHub Repository** - Pastikan kode sudah di-push ke GitHub
2. **Vercel Account** - Daftar di [vercel.com](https://vercel.com)
3. **PostgreSQL Database** - Gunakan database hosted (Supabase, PlanetScale, Neon, dll)

## Deployment Steps

### 1. **Setup Database (Pilih salah satu)**

#### Option A: Supabase (Recommended)
1. Daftar di [supabase.com](https://supabase.com)
2. Buat project baru
3. Copy connection string dari Settings > Database
4. Format: `postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres?schema=public`

#### Option B: PlanetScale
1. Daftar di [planetscale.com](https://planetscale.com)
2. Buat database baru
3. Copy connection string dari Connect
4. Format: `mysql://[USERNAME]:[PASSWORD]@[HOST]/[DATABASE]?sslaccept=strict`

#### Option C: Neon
1. Daftar di [neon.tech](https://neon.tech)
2. Buat database baru
3. Copy connection string
4. Format: `postgresql://[USERNAME]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require`

### 2. **Deploy ke Vercel**

1. **Login ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub

2. **Import Project**
   - Klik "New Project"
   - Pilih repository `noguraofficial/menu`
   - Klik "Import"

3. **Configure Environment Variables**
   - Di halaman project, klik "Settings"
   - Pilih "Environment Variables"
   - Tambah variable:
     - `DATABASE_URL` = connection string database Anda

4. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai

### 3. **Setup Database Schema**

Setelah deploy, jalankan command untuk setup database:

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Link ke project
vercel link

# Push database schema
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

### 4. **Verify Deployment**

1. **Test API Endpoints:**
   - `https://your-app.vercel.app/api/categories`
   - `https://your-app.vercel.app/api/menu`

2. **Test Admin Panel:**
   - `https://your-app.vercel.app/admin`

3. **Test Upload:**
   - Upload gambar di admin panel

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://user:pass@host:5432/db` |

## Troubleshooting

### Database Connection Issues
- Pastikan `DATABASE_URL` benar
- Pastikan database accessible dari internet
- Cek firewall settings

### Build Errors
- Pastikan semua dependencies terinstall
- Cek `package.json` scripts
- Lihat build logs di Vercel dashboard

### API Errors
- Cek Prisma schema
- Pastikan database tables exist
- Cek environment variables

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Prisma Docs: [prisma.io/docs](https://prisma.io/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
