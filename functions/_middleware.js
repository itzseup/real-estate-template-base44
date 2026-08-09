// Cloudflare Pages Functions - SPA fallback
// This ensures client-side routing works by serving index.html for all non-asset routes
// https://developers.cloudflare.com/pages/functions/

export function onRequest(context) {
  const { request, next } = context
  const url = new URL(request.url)

  // Skip for asset requests (JS, CSS, images, etc.)
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif)$/i)) {
    return next()
  }

  // For all other routes, try to serve the static file first, then fall back to index.html
  return next().catch(() => {
    return next({
      // Re-write to /index.html
      request: new Request(new URL('/index.html', url).toString(), request),
    })
  })
}
