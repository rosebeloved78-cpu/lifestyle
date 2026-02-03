# Lifestyle Connect - Complete Step-by-Step Deployment Guide

## 🚀 EASIEST OPTION: Deploy to Vercel (Recommended)

**Why Vercel?**
- Takes 2 minutes
- Automatic HTTPS (required for PWA)
- Free tier available
- Global CDN for fast loading
- Auto-deploys when you update code

### Step 1: Create GitHub Repository

**On GitHub:**
1. Go to https://github.com/new
2. Create new repository called "lifestyle-connect"
3. Click "Create repository"
4. You'll see commands to follow

**On Your Computer:**
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit: Lifestyle Connect"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lifestyle-connect.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 2: Deploy to Vercel

**Option A: Using Web UI (Easiest)**
1. Go to https://vercel.com
2. Click "Sign up"
3. Choose "Continue with GitHub"
4. Authorize Vercel
5. Click "New Project"
6. Select "lifestyle-connect" repository
7. Click "Import"
8. Skip environment variables (for now)
9. Click "Deploy"
10. Wait 30-60 seconds
11. Your app is live! 🎉

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Select project name: lifestyle-connect
# Deploy to Production: yes
```

**Result:**
- You'll get a free `.vercel.app` domain
- Example: https://lifestyle-connect.vercel.app

---

### Step 3: Custom Domain (Optional)

**Add Your Own Domain:**

1. Buy domain from:
   - GoDaddy
   - Namecheap
   - Google Domains

2. In Vercel Dashboard:
   - Go to Settings → Domains
   - Click "Add Domain"
   - Enter your domain: lifestyleconnect.zw
   - Follow DNS setup instructions
   - Wait 24 hours for propagation

---

## 📋 ALTERNATIVE OPTION: Deploy to Netlify

### Step 1: Connect GitHub

1. Go to https://netlify.com
2. Click "Sign up"
3. Choose "GitHub"
4. Authorize Netlify
5. Click "New site from Git"
6. Select "GitHub"
7. Choose "lifestyle-connect" repo

### Step 2: Configure Build

**Netlify will auto-detect settings:**
- Build command: `npm run build`
- Publish directory: `dist`

Just click "Deploy site"

**Result:**
- Your app is live on `lifestyle-connect-xxx.netlify.app`

---

## 🖥️ SELF-HOSTED OPTION: Deploy to Your Own Server

### Prerequisites:
- VPS or Web Hosting account
- Domain name
- SSH access
- Basic Linux knowledge

### Step 1: Get a VPS

Popular options:
- **DigitalOcean** (Simple, $5/month)
- **Linode** (Reliable)
- **Hetzner** (Cheap, powerful)
- **AWS Lightsail** (Scalable)

### Step 2: Setup Server (Ubuntu 22.04)

**Connect to your server:**
```bash
ssh root@YOUR_SERVER_IP
```

**Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm
```

**Install Nginx (web server):**
```bash
sudo apt-get install -y nginx
```

**Install Certbot (SSL certificates):**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

### Step 3: Deploy Your App

**Clone your repository:**
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/lifestyle-connect.git
cd lifestyle-connect
npm install
npm run build
```

**Copy files to web root:**
```bash
sudo cp -r dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
```

### Step 4: Configure Nginx

**Create Nginx config:**
```bash
sudo nano /etc/nginx/sites-available/lifestyle-connect
```

**Paste this config:**
```nginx
server {
    listen 80;
    server_name lifestyleconnect.zw;
    root /var/www/html;

    # Manifest configuration
    location = /manifest.json {
        add_header Content-Type "application/json; charset=utf-8";
        expires 1h;
    }

    # Service Worker configuration
    location = /sw.js {
        add_header Content-Type "application/javascript; charset=utf-8";
        add_header Service-Worker-Allowed "/";
        expires 1h;
    }

    # Main HTML
    location = /index.html {
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }

    # All requests go to index.html (SPA routing)
    try_files $uri /index.html;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

**Save (Ctrl+X, then Y, then Enter)**

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/lifestyle-connect \
           /etc/nginx/sites-enabled/
```

**Test Nginx:**
```bash
sudo nginx -t
```

**Reload Nginx:**
```bash
sudo systemctl reload nginx
```

### Step 5: Get Free SSL Certificate

```bash
sudo certbot certonly --nginx -d lifestyleconnect.zw
```

**Update Nginx to use HTTPS:**
```bash
sudo nano /etc/nginx/sites-available/lifestyle-connect
```

**Replace the first "server" block with:**
```nginx
server {
    listen 443 ssl http2;
    server_name lifestyleconnect.zw;
    root /var/www/html;

    ssl_certificate /etc/letsencrypt/live/lifestyleconnect.zw/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lifestyleconnect.zw/privkey.key;

    # Rest of config same as above...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name lifestyleconnect.zw;
    return 301 https://$server_name$request_uri;
}
```

**Reload Nginx:**
```bash
sudo systemctl reload nginx
```

### Step 6: Point Domain to Server

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find "DNS" or "Nameservers"
3. Add "A record":
   - Name: @
   - Type: A
   - Value: YOUR_SERVER_IP
4. Wait 24 hours for propagation
5. Visit https://lifestyleconnect.zw

---

## 🚀 DOCKER DEPLOYMENT (Advanced)

**Create Dockerfile:**
```dockerfile
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

**Build and run:**
```bash
docker build -t lifestyle-connect .
docker run -p 80:80 lifestyle-connect
```

---

## ✅ POST-DEPLOYMENT CHECKLIST

After deploying, verify everything works:

- [ ] Website loads at your domain
- [ ] HTTPS works (padlock icon in browser)
- [ ] All pages load (Home, SignUp, Dashboard)
- [ ] Forms work and validate
- [ ] Service Worker is registered (DevTools → Application)
- [ ] Offline mode works (DevTools → Network → Offline)
- [ ] Install prompt appears (on Android/Desktop)
- [ ] No console errors (F12 → Console)
- [ ] Images load properly
- [ ] Buttons are clickable
- [ ] Colors display correctly
- [ ] Mobile responsive (test on phone)

---

## 🔍 TEST YOUR DEPLOYMENT

### Test HTTPS
```bash
curl -I https://your-domain.com
# Should show: HTTP/1.1 200 OK
```

### Test Service Worker
1. Open https://your-domain.com
2. Press F12 (DevTools)
3. Go to "Application" tab
4. Check "Service Workers"
5. Should show registered ✓

### Test Offline
1. In DevTools → Network
2. Check "Offline"
3. Reload page
4. App should still work ✓

### Test PWA Install
**On Android (Chrome):**
1. Open your domain
2. Menu → "Install app"
3. App installs to home screen ✓

**On Desktop (Chrome):**
1. Address bar → Install icon
2. Click "Install"
3. App installs ✓

### Run Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

Should score 90+ on PWA ✓

---

## 🆘 TROUBLESHOOTING

### Service Worker 404
**Problem:** Service Worker won't register

**Solution:**
1. Check `/sw.js` exists in root
2. Verify manifest.json is at `/manifest.json`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard reload (Ctrl+Shift+R)

### Pages Not Loading
**Problem:** Blank page or 404 errors

**Solution:**
- Check Nginx config (must have `try_files $uri /index.html`)
- Restart Nginx: `sudo systemctl restart nginx`
- Check logs: `sudo tail -f /var/log/nginx/error.log`

### Install Prompt Not Showing
**Problem:** "Install app" doesn't appear

**Solution:**
- Must be HTTPS (except localhost)
- Wait 30 seconds after first visit
- manifest.json must be accessible
- Try different browser (Chrome works best)

### Domain Not Pointing
**Problem:** Domain says "Can't connect"

**Solution:**
- Wait 24-48 hours for DNS
- Check DNS records: `nslookup your-domain.com`
- Verify A record points to correct IP
- Flush DNS: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

---

## 📊 MONITORING YOUR SITE

### Google Analytics
Add to `index.html` (in `<head>`):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Get ID from: https://analytics.google.com

### Uptime Monitoring
Services like:
- UptimeRobot (Free)
- Pingdom
- Statuspages

Send alerts if site goes down

---

## 💰 COST ESTIMATES

| Option | Cost | Setup Time | Support |
|--------|------|-----------|---------|
| **Vercel** | Free | 2 min | Excellent |
| **Netlify** | Free | 2 min | Excellent |
| **DigitalOcean** | $5/mo | 30 min | Good |
| **AWS Lightsail** | $3-5/mo | 30 min | Excellent |
| **Shared Hosting** | $5-10/mo | 5 min | Basic |
| **VPS + Nginx** | $5-20/mo | 1 hour | Self |

---

## 🎯 RECOMMENDED PATH

**For beginners:**
1. Deploy to Vercel (free, easiest) ✅
2. Get custom domain ($10/year)
3. Point domain to Vercel
4. Launch and get users

**For technical users:**
1. Create GitHub repo
2. Deploy to DigitalOcean
3. Configure custom domain
4. Set up monitoring

---

## 📝 SUMMARY

**You have 4 main options:**

| Option | Pros | Cons | Time |
|--------|------|------|------|
| **Vercel** | Easy, Free, Fast | Limited customization | 2 min |
| **Netlify** | Easy, Free, Good CMS | Similar to Vercel | 2 min |
| **Self-Hosted** | Full control, Cheap | Need Linux knowledge | 1 hour |
| **Docker** | Portable, Professional | Requires container setup | 30 min |

**Quick Start (Choose One):**

**Option 1 - Vercel (Easiest):**
```bash
npm install -g vercel
vercel
# Follow prompts
```

**Option 2 - Netlify:**
1. Push to GitHub
2. Go to netlify.com
3. Connect repo
4. Deploy (click button)

**Option 3 - Docker:**
```bash
docker build -t lifestyle-connect .
docker run -p 80:80 lifestyle-connect
```

---

## 🎉 CONGRATULATIONS!

Your Lifestyle Connect app is ready to go live! 

Choose your deployment method above and you'll have a fully functional Progressive Web App serving your Zimbabwean dating community within minutes.

**Next Steps:**
1. Deploy using one method above
2. Test everything works
3. Share link with friends
4. Get first users
5. Gather feedback
6. Implement backend (payments, real database, etc.)

**Questions?**
- Vercel docs: https://vercel.com/docs
- Netlify docs: https://docs.netlify.com
- Nginx docs: https://nginx.org/en/docs/

---

**Good luck with Lifestyle Connect!** ❤️
