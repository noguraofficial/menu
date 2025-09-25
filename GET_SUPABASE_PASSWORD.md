# 🔑 Cara Mendapatkan Password Supabase

Untuk menghubungkan aplikasi dengan Supabase, Anda perlu mendapatkan password database yang benar.

## 🚀 Langkah-langkah

### 1. Buka Supabase Dashboard
- Kunjungi [https://supabase.com/dashboard](https://supabase.com/dashboard)
- Login ke akun Anda
- Pilih project `nogura-ramen-menu` (atau project yang Anda buat)

### 2. Akses Database Settings
- Di sidebar kiri, klik **Settings**
- Pilih **Database**
- Scroll ke bawah ke bagian **Connection string**

### 3. Dapatkan Connection String
- Di bagian **Connection string**, Anda akan melihat beberapa opsi
- Pilih tab **URI**
- Copy connection string yang terlihat seperti:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.szukelilsmmpsllwtbrd.supabase.co:5432/postgres
  ```

### 4. Dapatkan Password
Ada beberapa cara untuk mendapatkan password:

#### Opsi A: Dari Connection String
- Jika connection string sudah menampilkan password (bukan `[YOUR-PASSWORD]`), gunakan itu
- Password akan terlihat seperti: `postgresql://postgres:actualpassword123@db.szukelilsmmpsllwtbrd.supabase.co:5432/postgres`

#### Opsi B: Reset Password
- Jika tidak ingat password, klik **Reset database password**
- Buat password baru yang kuat
- Simpan password ini dengan baik!

#### Opsi C: Cek Project Settings
- Di **Settings** > **General**
- Scroll ke **Database password**
- Klik **Show** untuk melihat password

### 5. Update Environment File
Setelah mendapatkan password, update file `.env.local`:

```bash
# Buka file .env.local
nano .env.local

# Atau edit dengan editor favorit Anda
code .env.local
```

Ganti `[YOUR-PASSWORD]` dengan password yang sebenarnya:
```env
DATABASE_URL="postgresql://postgres:ACTUAL_PASSWORD_HERE@db.szukelilsmmpsllwtbrd.supabase.co:5432/postgres?schema=public"
```

### 6. Test Connection
```bash
# Test koneksi database
npm run db:test

# Atau jalankan script test
node test-supabase-connection.js
```

## 🔍 Troubleshooting

### Password Tidak Ditemukan
- Coba reset password di Supabase Dashboard
- Pastikan Anda login ke project yang benar
- Check apakah project sudah fully provisioned

### Connection Failed
- Pastikan password benar (tanpa spasi atau karakter khusus)
- Check apakah project status "Active"
- Verify connection string format

### Permission Denied
- Pastikan menggunakan password yang benar
- Check apakah database sudah ready
- Tunggu beberapa menit jika project baru dibuat

## ✅ Verifikasi

Setelah update password, jalankan:
```bash
npm run db:test
```

Harus menampilkan:
- ✅ Database connection successful!
- 📊 PostgreSQL version: [version info]

## 🚀 Next Steps

Setelah koneksi berhasil:
1. Run: `npx prisma generate`
2. Run: `npx prisma db push`
3. Run: `npm run db:seed`
4. Test aplikasi: `npm run dev`

---

**Need Help?** Check Supabase documentation atau create issue di GitHub repository.
