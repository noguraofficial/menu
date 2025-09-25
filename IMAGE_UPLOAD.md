# Image Upload Feature

Fitur upload gambar untuk menu telah ditambahkan ke aplikasi. Berikut adalah detail implementasinya:

## 🚀 Fitur yang Tersedia

### 1. **API Upload** (`/api/upload`)
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Validasi**:
  - Hanya file gambar yang diperbolehkan
  - Maksimal ukuran file: 5MB
  - Format yang didukung: PNG, JPG, GIF, WebP
- **Response**: 
  ```json
  {
    "success": true,
    "url": "/uploads/filename.jpg",
    "filename": "filename.jpg"
  }
  ```

### 2. **Komponen ImageUpload**
- Drag & drop interface
- Preview gambar sebelum upload
- Validasi file otomatis
- Loading state saat upload
- Tombol hapus gambar

### 3. **Admin Menu Management**
- Form tambah/edit menu dengan upload gambar
- Preview gambar di daftar menu
- Gambar tersimpan di database

### 4. **Tampilan Menu**
- Gambar ditampilkan di halaman menu utama
- Fallback ke emoji jika tidak ada gambar
- Responsive design

## 📁 Struktur File

```
public/
  uploads/          # Folder untuk menyimpan gambar (di-ignore oleh git)
    [timestamp]-[random].jpg

app/api/upload/
  route.ts          # API endpoint untuk upload

components/
  ImageUpload.tsx   # Komponen upload gambar

app/admin/menu/
  page.tsx          # Admin menu dengan fitur upload
```

## 🔧 Cara Penggunaan

### Untuk Admin:
1. Buka halaman admin menu (`/admin/menu`)
2. Klik "Add Menu Item" atau edit item yang ada
3. Di form, gunakan komponen upload gambar
4. Drag & drop atau klik untuk memilih file
5. Gambar akan otomatis diupload dan preview ditampilkan
6. Simpan menu item

### Untuk Pengguna:
- Gambar menu akan otomatis ditampilkan di halaman menu utama
- Jika tidak ada gambar, akan menampilkan emoji default

## ⚙️ Konfigurasi

### Ukuran File Maksimal
Ubah di `app/api/upload/route.ts`:
```typescript
if (file.size > 5 * 1024 * 1024) { // 5MB
```

### Format File yang Diizinkan
Ubah di `app/api/upload/route.ts`:
```typescript
if (!file.type.startsWith('image/')) {
```

### Folder Upload
Default: `public/uploads/`
Ubah di `app/api/upload/route.ts`:
```typescript
const uploadsDir = join(process.cwd(), 'public', 'uploads')
```

## 🛡️ Keamanan

- Validasi file type di server
- Validasi ukuran file
- Nama file di-generate secara random untuk mencegah konflik
- Folder uploads di-ignore oleh git

## 🚨 Troubleshooting

### Error "File must be an image"
- Pastikan file yang diupload adalah gambar
- Cek format file (PNG, JPG, GIF, WebP)

### Error "File size must be less than 5MB"
- Kompres gambar sebelum upload
- Atau ubah batas ukuran di API

### Gambar tidak muncul
- Cek apakah folder `public/uploads` ada
- Pastikan file berhasil diupload (cek network tab)
- Cek path gambar di database

## 📝 Catatan

- Gambar disimpan di `public/uploads/` dan dapat diakses langsung via URL
- Nama file menggunakan timestamp + random string untuk mencegah konflik
- Folder uploads tidak di-commit ke git untuk keamanan
