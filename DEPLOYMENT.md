# 🚀 Panduan Deployment Nogura Ramen Bar

## Persiapan untuk Deploy ke Vercel

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Build Lokal
```bash
npm run build
npm start
```

### 3. Deploy ke Vercel

#### Opsi A: Menggunakan Vercel Dashboard
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub account
3. Klik "New Project"
4. Import repository GitHub Anda
5. Vercel akan otomatis detect Next.js project
6. Klik "Deploy"

#### Opsi B: Menggunakan Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy project
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (pilih akun Anda)
# - Link to existing project? N
# - What's your project's name? nogura-ramen-menu
# - In which directory is your code located? ./
```

### 4. Konfigurasi Domain (Opsional)
- Di Vercel dashboard, masuk ke project settings
- Tambahkan custom domain jika diperlukan
- Update DNS records sesuai instruksi Vercel

## 🔧 Konfigurasi Environment

### Variables yang Diperlukan
Tidak ada environment variables yang diperlukan untuk aplikasi ini, namun Anda bisa menambahkan:

- `NEXT_PUBLIC_RESTAURANT_NAME` - Nama restoran
- `NEXT_PUBLIC_RESTAURANT_PHONE` - Nomor telepon
- `NEXT_PUBLIC_RESTAURANT_ADDRESS` - Alamat restoran

### Menambahkan Environment Variables
1. Di Vercel dashboard, masuk ke project
2. Klik tab "Settings"
3. Klik "Environment Variables"
4. Tambahkan variables yang diperlukan

## 📱 Customization untuk Production

### 1. Update Informasi Restoran
Edit file-file berikut dengan informasi restoran Anda:

- `components/Hero.tsx` - Informasi utama restoran
- `components/AboutSection.tsx` - Deskripsi restoran
- `data/menu.ts` - Menu dan harga

### 2. Update Styling
- Edit `tailwind.config.js` untuk mengubah warna tema
- Modifikasi `app/globals.css` untuk styling custom

### 3. Update Menu
Edit `data/menu.ts` untuk:
- Menambah/mengurangi item menu
- Mengubah harga
- Mengubah kategori
- Menambah gambar (upload ke folder `public/images/`)

## 🔄 Update dan Maintenance

### Deploy Update
```bash
# Commit perubahan
git add .
git commit -m "Update menu/pricing"

# Push ke GitHub
git push origin main

# Vercel akan otomatis deploy
```

### Monitoring
- Gunakan Vercel Analytics untuk monitoring traffic
- Check Vercel Functions logs untuk error handling
- Monitor performance di Vercel dashboard

## 🛠️ Troubleshooting

### Build Errors
```bash
# Clear cache dan rebuild
rm -rf .next
npm run build
```

### Runtime Errors
- Check Vercel Function logs
- Verify all imports dan dependencies
- Test di local environment dulu

### Performance Issues
- Optimize images (gunakan Next.js Image component)
- Enable Vercel Edge Functions jika diperlukan
- Monitor bundle size

## 📞 Support

Jika mengalami masalah deployment:
1. Check Vercel documentation
2. Review error logs di Vercel dashboard
3. Test build lokal terlebih dahulu
4. Pastikan semua dependencies terinstall dengan benar

## 🎯 Next Steps

Setelah deploy berhasil:
1. Test semua fitur aplikasi
2. Update menu dengan data real
3. Tambahkan analytics tracking
4. Setup monitoring dan alerts
5. Consider adding payment integration
6. Implement order management system
