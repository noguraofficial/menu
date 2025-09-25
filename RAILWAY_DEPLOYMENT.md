# 🚀 Panduan Deployment ke Railway

## Persiapan Awal

### 1. Install Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login ke Railway
railway login
```

### 2. Test Build Lokal
```bash
# Install dependencies
npm install

# Test build
npm run build

# Test production build
npm start
```

## Deploy ke Railway

### Opsi A: Menggunakan Railway Dashboard (Recommended)

1. **Buka Railway Dashboard**
   - Kunjungi [railway.app](https://railway.app)
   - Login dengan GitHub account
   - Klik "New Project"

2. **Connect GitHub Repository**
   - Pilih "Deploy from GitHub repo"
   - Pilih repository `noguraofficial/ourmenu`
   - Klik "Deploy"

3. **Setup Database**
   - Di project dashboard, klik "New"
   - Pilih "Database" → "PostgreSQL"
   - Railway akan otomatis generate `DATABASE_URL`

4. **Configure Environment Variables**
   - Di project dashboard, klik "Variables"
   - Tambahkan variables berikut:
     ```
     DATABASE_URL=<dari Railway PostgreSQL>
     NODE_ENV=production
     ```

### Opsi B: Menggunakan Railway CLI

```bash
# Navigate ke project directory
cd /Users/hanafip/Documents/Website\ Design/menu.nogura.id

# Initialize Railway project
railway init

# Link ke existing project (jika sudah ada)
railway link

# Deploy
railway up
```

## Konfigurasi Database

### 1. Setup PostgreSQL di Railway
Railway akan otomatis:
- Create PostgreSQL database
- Generate `DATABASE_URL` environment variable
- Setup connection pooling

### 2. Run Database Migrations
```bash
# Set DATABASE_URL dari Railway
export DATABASE_URL="postgresql://..."

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed database (opsional)
npx prisma db seed
```

### 3. Setup Database via Railway CLI
```bash
# Add PostgreSQL service
railway add postgresql

# Set environment variables
railway variables set DATABASE_URL=$DATABASE_URL

# Deploy dan run migrations
railway up
```

## Environment Variables

### Required Variables
```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

### Optional Variables
```
NEXT_PUBLIC_RESTAURANT_NAME=Nogura Ramen Bar
NEXT_PUBLIC_RESTAURANT_PHONE=+62-xxx-xxx-xxxx
NEXT_PUBLIC_RESTAURANT_ADDRESS=Your Address
```

## Custom Domain (Opsional)

### 1. Setup Custom Domain
- Di Railway dashboard, masuk ke project
- Klik "Settings" → "Domains"
- Tambahkan custom domain
- Update DNS records sesuai instruksi Railway

### 2. SSL Certificate
Railway otomatis setup SSL certificate untuk custom domain

## Monitoring & Logs

### 1. View Logs
```bash
# Via CLI
railway logs

# Via Dashboard
- Masuk ke project dashboard
- Klik "Deployments" → pilih deployment
- View logs di tab "Logs"
```

### 2. Monitor Performance
- Railway dashboard menampilkan:
  - CPU usage
  - Memory usage
  - Network traffic
  - Response times

## Update & Maintenance

### Deploy Updates
```bash
# Commit changes
git add .
git commit -m "Update application"

# Push ke GitHub
git push origin main

# Railway akan otomatis deploy
```

### Manual Deploy
```bash
# Deploy manual
railway up

# Deploy specific service
railway up --service web
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   railway logs --deployment <deployment-id>
   
   # Test build locally
   npm run build
   ```

2. **Database Connection Issues**
   ```bash
   # Check DATABASE_URL
   railway variables
   
   # Test connection
   railway run npx prisma db push
   ```

3. **Environment Variables**
   ```bash
   # List all variables
   railway variables
   
   # Set variable
   railway variables set KEY=value
   ```

### Performance Optimization

1. **Enable Caching**
   - Railway otomatis enable caching untuk static assets
   - Next.js Image Optimization otomatis enabled

2. **Database Optimization**
   - Railway PostgreSQL sudah optimized
   - Connection pooling otomatis enabled

## Cost Management

### Railway Pricing
- **Hobby Plan**: $5/month (512MB RAM, 1GB storage)
- **Pro Plan**: $20/month (8GB RAM, 100GB storage)

### Tips Menghemat Cost
- Monitor resource usage
- Optimize images dan assets
- Use efficient database queries
- Enable caching

## Security

### Environment Variables
- Railway encrypt environment variables
- Tidak expose sensitive data di logs
- Secure database connections

### Database Security
- PostgreSQL dengan SSL encryption
- Automatic backups
- Access control via Railway dashboard

## Next Steps

Setelah deploy berhasil:
1. ✅ Test semua fitur aplikasi
2. ✅ Setup monitoring dan alerts
3. ✅ Configure custom domain
4. ✅ Setup database backups
5. ✅ Monitor performance metrics
6. ✅ Setup CI/CD pipeline

## Support

Jika mengalami masalah:
1. Check Railway documentation
2. Review deployment logs
3. Test build lokal terlebih dahulu
4. Contact Railway support
