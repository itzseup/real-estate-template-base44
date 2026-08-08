# GoDaddy Deployment Guide

## Build Output
After running `npm run build`, the following files are generated in `dist/`:
- `index.html` - Main HTML file
- `assets/index-*.js` - JavaScript bundle (can be large, ~600KB)
- `assets/index-*.css` - CSS styles
- `.htaccess` - SPA routing rules (needed for client-side routing)

## Deployment Steps

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

## Important Notes

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

## Testing Your Deployment
After uploading:
1. Visit your domain: `https://yourdomain.com/`
2. Navigate to `/about`, `/properties`, `/contact` to test routing
3. Verify all pages load correctly
