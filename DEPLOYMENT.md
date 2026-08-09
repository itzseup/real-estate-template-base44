# Deployment Guide

## Deploy to Cloudflare

### Build & Deploy Commands
```bash
# Build locally
npm run build

# Deploy as a Worker (used by GitHub CI)
npx wrangler deploy

# Deploy as Pages (manual override)
npx wrangler pages deploy dist --project-name=real-estate-template
```

### Project Configuration (`wrangler.toml`)
- **Project name:** `real-estate-template-base44`
- **Build output:** `dist/` (Vite production build)
- **SPA routing:** `[assets]` with `not_found_handling = "single-page-application"`
- **Caching headers:** `public/_headers` (1yr for assets, no-cache for HTML)

### Cloudflare URLs
- **Pages:** https://real-estate-template-5pw.pages.dev
- **Workers:** https://real-estate-template-base44.shahoodaiesh297.workers.dev

### Environment Variables (set in Cloudflare dashboard)
| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_BASE44_URL` | Supabase project URL (base44 compat) |
| `VITE_BASE44_ANON_KEY` | Supabase anon key (base44 compat) |

### Custom Domain
`citywalk.realestatellc.com` — add via Cloudflare Dashboard → Pages → Custom domains

---

## GoDaddy Deployment (Legacy)

### Build Output
After running `npm run build`, the following files are generated in `dist/`:
- `index.html` - Main HTML file
- `assets/index-*.js` - JavaScript bundle (can be large, ~600KB)
- `assets/index-*.css` - CSS styles
- `.htaccess` - SPA routing rules (needed for client-side routing)

### Deployment Steps

### Option 1: Upload via FTP
1. Use an FTP client (FileZilla, WinSCP) to connect to your GoDaddy hosting
2. Upload all files from `dist/` to your `public_html/` directory
3. Ensure `.htaccess` is uploaded (it's required for React Router to work)

### Option 2: Upload via cPanel File Manager
1. Log into cPanel
2. Go to File Manager
3. Navigate to `public_html/`
4. Upload the `dist/` folder contents
5. Make sure `.htaccess` is included

### Option 3: ZIP Upload
1. ZIP the contents of `dist/`
2. Upload the ZIP to cPanel
3. Extract it to `public_html/`

### Important Notes

1. **Environment Variables**: The app uses Supabase. You need to:
   - Create a `.env` file with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-key
     ```
   - For production, you'll need to set up a `.env.production` and rebuild, OR
   - Use a `.env` file on the server (GoDaddy Linux hosting supports this)

2. **SPA Routing**: The `.htaccess` file ensures that all routes fall back to `index.html`
   This is required for React Router's client-side routing to work on Apache servers.

3. **Large JS Bundle**: The JS bundle is ~608KB. Consider:
   - Enabling gzip compression on your GoDaddy host
   - Adding code splitting for better performance
   - Using Vite's `manualChunks` option to split bundles

4. **Database Setup**: You need to create Supabase tables:
   - `agents` - Real estate agents
   - `properties` - Property listings
   - `blog_posts` - Blog articles
   - `testimonials` - Client testimonials
   - `inquiries` - Contact form submissions

### Testing Your Deployment
After uploading:
1. Visit your domain: `https://yourdomain.com/`
2. Navigate to `/about`, `/properties`, `/contact` to test routing
3. Verify all pages load correctly
