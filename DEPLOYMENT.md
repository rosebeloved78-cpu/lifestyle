# Deployment Instructions for Zimbabwe Hearts

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- HTTPS enabled domain (for PWA features)

### Build for Production
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Output: dist/index.html (single file with everything)
```

## Deployment Options

### 1. Vercel (Recommended - Free & Easy)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

**Benefits:**
- Automatic HTTPS
- Global CDN
- Zero-config deployment
- Free tier available

### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir dist

# Or connect GitHub repo for automatic deployments
```

**Benefits:**
- Automatic HTTPS
- Form handling
- Edge functions
- Free tier available

### 3. AWS S3 + CloudFront

```bash
# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/

# Create CloudFront distribution
# Configure origin: your S3 bucket
# Enable HTTPS certificate
# Set cache behaviors as per PWA_GUIDE.md
```

### 4. DigitalOcean App Platform

1. Connect GitHub repo
2. Auto-deploy on push
3. Automatic HTTPS via Let's Encrypt
4. Runs in containers

### 5. Self-Hosted (Nginx)

```bash
# 1. Copy dist folder to server
scp -r dist/* user@server:/var/www/zimbabwe-hearts/

# 2. Create Nginx config (see PWA_GUIDE.md)
sudo nano /etc/nginx/sites-available/zimbabwe-hearts

# 3. Enable site
sudo ln -s /etc/nginx/sites-available/zimbabwe-hearts \
           /etc/nginx/sites-enabled/

# 4. Test and reload
sudo nginx -t
sudo systemctl reload nginx

# 5. Setup SSL (Let's Encrypt)
sudo apt-get install certbot nginx-certbot
sudo certbot certonly --nginx -d yourdomain.com
```

### 6. Docker Container

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t zimbabwe-hearts .
docker run -p 80:80 zimbabwe-hearts
```

### 7. Google Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init

# Deploy
firebase deploy
```

## Post-Deployment Checklist

- [ ] HTTPS is enabled
- [ ] Manifest.json is accessible at `/manifest.json`
- [ ] Service Worker is accessible at `/sw.js`
- [ ] Both files have correct MIME types
- [ ] Cache headers are configured correctly
- [ ] Site works offline (test in DevTools)
- [ ] Install prompt appears on Android/desktop
- [ ] Lighthouse PWA audit passes (90+)
- [ ] All pages work correctly
- [ ] Images load properly
- [ ] Forms submit correctly
- [ ] No console errors

## Verify Deployment

### Test via Browser
1. Open your domain
2. Open DevTools (F12)
3. Check Application tab
4. Verify Service Worker is registered
5. Verify Manifest loads
6. Offline mode should work

### Test Install
- **Android**: Should show install prompt
- **iOS**: Share → Add to Home Screen
- **Desktop**: Click install icon in address bar

### Lighthouse Test
```bash
lighthouse https://yourdomain.com --view
```
Target PWA score: 90+

### Check with PWA Builder
https://www.pwabuilder.com/

## Environment Variables (if needed)

Create `.env` file:
```
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Zimbabwe Hearts
```

## Continuous Deployment

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## Maintenance

### Regular Tasks
- Monitor error logs
- Check Lighthouse scores monthly
- Update dependencies quarterly
- Review PWA metrics
- Backup user data

### Update Process
```bash
# Make changes
git commit -am "Update features"

# Build locally first
npm run build

# Deploy
npm run deploy  # or your deployment method
```

## Domain Setup

If using custom domain:

1. **Register domain** (GoDaddy, Namecheap, etc.)
2. **Point nameservers** to your hosting provider
3. **Enable HTTPS** (automatic on Vercel/Netlify, manual on self-hosted)
4. **Wait for DNS propagation** (up to 48 hours)

## Production URLs

After deployment, Zimbabwe Hearts will be available at:
- https://yourdomain.com/
- https://yourdomain.com/manifest.json
- https://yourdomain.com/sw.js

## Troubleshooting

### Service Worker 404
- Check file permissions on server
- Verify manifest.json MIME type
- Ensure sw.js exists in root directory

### Install prompt not showing
- Must be HTTPS
- manifest.json must be accessible
- Add to home screen works on iOS without install prompt

### Cache issues
- Clear browser cache (Ctrl+Shift+Delete)
- Unregister Service Worker in DevTools
- Hard reload (Ctrl+Shift+R)

### Database/Backend

When ready to add a backend:
```bash
npm install express cors dotenv
npm install mongoose  # if using MongoDB
```

See backend setup in separate documentation.

## Monitoring & Analytics

Add to index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Support

For deployment issues:
- Check documentation for your platform
- Review PWA_GUIDE.md for configuration
- Visit https://web.dev for PWA best practices
- Check browser console for error messages
