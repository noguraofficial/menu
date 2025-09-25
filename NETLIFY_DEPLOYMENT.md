# Netlify Deployment Guide

## Prerequisites

1. **Database Setup**: You'll need a PostgreSQL database. Recommended options:
   - [Supabase](https://supabase.com) (Free tier available)
   - [PlanetScale](https://planetscale.com) (Free tier available)
   - [Railway](https://railway.app) (Free tier available)
   - [Neon](https://neon.tech) (Free tier available)

2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)

## Deployment Steps

### 1. Database Setup

1. Create a PostgreSQL database using one of the services above
2. Get your database connection string (DATABASE_URL)
3. Run the following commands to set up your database:

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database (optional)
npm run db:seed
```

### 2. Netlify Deployment

#### Option A: Deploy from Git Repository

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Set the following build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18`

#### Option B: Deploy from Local Build

1. Build the project locally:
```bash
npm run build
```

2. Deploy the `out` folder to Netlify

### 3. Environment Variables

In your Netlify dashboard, go to Site settings > Environment variables and add:

```
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-site-name.netlify.app
```

### 4. Database Migration

After deployment, you need to run database migrations on your production database:

```bash
# Connect to your production database
npx prisma db push --schema=./prisma/schema.prisma
```

## File Structure for Netlify

The following files have been created/configured for Netlify deployment:

- `netlify.toml` - Netlify configuration
- `netlify/functions/` - Serverless functions
- `public/_redirects` - URL redirects for SPA
- `next.config.js` - Updated for static export

## API Endpoints

The following API endpoints are available as Netlify Functions:

- `/.netlify/functions/menu` - Menu items CRUD
- `/.netlify/functions/orders` - Order management
- `/.netlify/functions/categories` - Category management
- `/.netlify/functions/upload` - Image upload (placeholder)

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **Database Connection**: Verify `DATABASE_URL` is correct
3. **API Routes Not Working**: Check Netlify Functions logs
4. **Images Not Loading**: Ensure `unoptimized: true` in next.config.js

### Database Connection Issues

If you're having database connection issues:

1. Check your `DATABASE_URL` format
2. Ensure your database allows connections from Netlify's IP ranges
3. Check if SSL is required (add `?sslmode=require` to your DATABASE_URL)

### Performance Optimization

1. Enable Netlify's CDN
2. Use Netlify's image optimization
3. Consider using a headless CMS for content management

## Support

For issues specific to this deployment, check:
- Netlify documentation: https://docs.netlify.com
- Next.js static export: https://nextjs.org/docs/advanced-features/static-html-export
- Prisma deployment: https://www.prisma.io/docs/guides/deployment

