# Nogura Ramen Bar - Menu Pemesanan

Aplikasi pemesanan menu untuk Nogura Ramen Bar yang memungkinkan pelanggan untuk memesan menu dine-in dan takeaway secara online.

## 🍜 Fitur Utama

- **Menu Interaktif**: Tampilan menu dengan kategori (Ramen, Appetizer, Rice Bowl, Minuman)
- **Keranjang Belanja**: Sistem keranjang dengan kemampuan menambah/mengurangi item
- **Pemesanan Fleksibel**: Opsi dine-in dan takeaway
- **Checkout Lengkap**: Form informasi pelanggan dan konfirmasi pesanan
- **Responsive Design**: Tampilan optimal di desktop dan mobile
- **Local Storage**: Data keranjang tersimpan di browser

## 🚀 Teknologi yang Digunakan

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management untuk keranjang

## 📦 Instalasi

1. Clone repository ini:
```bash
git clone <repository-url>
cd nogura-ramen-menu
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 🏗️ Build untuk Production

```bash
npm run build
npm start
```

## 🚀 Deploy ke Vercel

1. Push code ke GitHub repository
2. Connect repository ke Vercel
3. Deploy otomatis akan berjalan

Atau gunakan Vercel CLI:
```bash
npx vercel
```

## 📱 Struktur Aplikasi

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── checkout/
│   │   └── page.tsx         # Checkout page
│   └── confirmation/
│       └── page.tsx         # Order confirmation
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── CartDrawer.tsx       # Shopping cart drawer
│   ├── Hero.tsx             # Hero section
│   ├── MenuSection.tsx      # Menu display
│   └── AboutSection.tsx     # About section
├── context/
│   └── CartContext.tsx      # Cart state management
├── data/
│   └── menu.ts              # Menu data
└── utils/
    └── format.ts            # Utility functions
```

## 🎨 Customization

### Mengubah Menu
Edit file `data/menu.ts` untuk menambah, mengubah, atau menghapus item menu.

### Mengubah Styling
Modifikasi `tailwind.config.js` untuk mengubah tema dan warna.

### Mengubah Informasi Restoran
Update informasi di komponen `Hero.tsx` dan `AboutSection.tsx`.

## 📄 Lisensi

MIT License - bebas digunakan untuk keperluan komersial dan non-komersial.

## 🤝 Kontribusi

Pull requests dan suggestions sangat diterima! Untuk perubahan besar, silakan buat issue terlebih dahulu.

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.
