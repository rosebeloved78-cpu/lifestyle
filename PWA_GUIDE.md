# Zimbabwe Hearts - Progressive Web App (PWA) Guide

## Overview
Zimbabwe Hearts is now a fully functional Progressive Web App that works seamlessly on both web browsers and as a native-like mobile app.

## Features Enabled

### 1. **Offline Functionality**
- Service Worker caches assets for offline access
- Users can browse previously loaded profiles even without internet
- Background sync queues messages/actions for syncing when online
- Offline banner appears when connection is lost

### 2. **Installability**
Users can install the app on:
- **Android**: Chrome, Edge, Firefox
- **iOS**: Safari (iOS 16.4+)
- **Desktop**: Chrome, Edge, Safari (Mac)

### 3. **App Shortcuts**
When installed, users can quick-access:
- Browse Profiles
- Diaspora Connect

### 4. **Push Notifications**
Service Worker ready for:
- New match notifications
- Message alerts
- Special offers/promotions

### 5. **Home Screen Icon**
- Adaptive icons for all device types
- Custom splash screens
- App appears as standalone app (no browser UI)

## File Structure

```
.
├── index.html                 # Updated with PWA metadata
├── manifest.json             # Web app manifest
├── public/
│   └── sw.js                 # Service Worker
└── src/
    ├── main.tsx              # App with offline detection
    ├── components/
    │   └── PWAPrompt.tsx      # Install prompt component
    └── ...
```

## Installation Instructions

### For End Users

#### Android (Chrome, Edge, Firefox)
1. Open app in browser
2. Browser shows install prompt at bottom
3. Tap "Install" button
4. App installs to home screen
5. Launch app directly from home screen

#### iOS (Safari)
1. Open app in Safari
2. Tap Share button
3. Scroll and select "Add to Home Screen"
4. Name the app and tap "Add"
5. App appears on home screen
6. Tap icon to launch full-screen app

#### Desktop (Chrome/Edge)
1. Open app in Chrome/Edge
2. Click install icon in address bar (or three-dot menu)
3. Select "Install app"
4. App appears in Start Menu/Applications

### For Developers - Setup Instructions

#### 1. Local Development
```bash
npm install
npm run dev
```
- App is accessible at http://localhost:5173
- Service Worker registers automatically
- Press Ctrl+Shift+Delete to clear cache if needed

#### 2. Production Deployment

You need to ensure two files are properly served:

**File 1: manifest.json**
```
Location: https://yourdomain.com/manifest.json
MIME Type: application/json
Cache Control: max-age=3600 (1 hour)
```

**File 2: Service Worker**
```
Location: https://yourdomain.com/sw.js
MIME Type: application/javascript
Headers: Service-Worker-Allowed: /
Cache Control: max-age=3600 (1 hour)
```

#### 3. Server Configuration Examples

**Nginx:**
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    root /var/www/zimbabwe-hearts/dist;

    # SSL certificates (required for PWA)
    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Manifest configuration
    location = /manifest.json {
        add_header Content-Type "application/json; charset=utf-8";
        expires 1h;
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }

    # Service Worker configuration
    location = /sw.js {
        add_header Content-Type "application/javascript; charset=utf-8";
        add_header Service-Worker-Allowed "/";
        expires 1h;
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }

    # Main HTML
    location = /index.html {
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }

    # All requests go to index.html (SPA routing)
    try_files $uri /index.html;

    # Cache static assets long-term
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Manifest configuration
<Files "manifest.json">
    AddType application/json .json
    <IfModule mod_headers.c>
        Header set Cache-Control "public, max-age=3600, must-revalidate"
    </IfModule>
</Files>

# Service Worker configuration
<Files "sw.js">
    AddType application/javascript .js
    <IfModule mod_headers.c>
        Header set Service-Worker-Allowed "/"
        Header set Cache-Control "public, max-age=3600, must-revalidate"
    </IfModule>
</Files>

# Cache HTML minimally
<Files "index.html">
    <IfModule mod_headers.c>
        Header set Cache-Control "public, max-age=3600, must-revalidate"
    </IfModule>
</Files>

# Cache static assets aggressively
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$">
    <IfModule mod_headers.c>
        Header set Cache-Control "public, max-age=31536000, immutable"
    </IfModule>
</FilesMatch>
```

**Node/Express:**
```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files
app.use(express.static(join(__dirname, 'dist')));

// Manifest configuration
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(join(__dirname, 'dist/manifest.json'));
});

// Service Worker configuration
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(join(__dirname, 'public/sw.js'));
});

// Cache busting for other files
app.use((req, res, next) => {
  if (req.path.match(/\.(js|css|jpg|jpeg|png|gif|svg|woff|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});

// SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Vercel (via vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/manifest.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/json"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/javascript"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/!(*.html)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## HTTPS Requirement
PWA features (Service Worker, Install, Notifications) require **HTTPS** in production. 
- Use Let's Encrypt for free SSL certificates
- Self-signed certificates work for localhost development

## Testing

### Test Service Worker
1. Open DevTools (F12)
2. Go to Application tab
3. Check Service Workers section
4. Verify manifest.json loads correctly in Network tab

### Test Offline
1. Open DevTools
2. Go to Network tab
3. Check "Offline" checkbox
4. App should still work with cached content

### Test Install Prompt
1. Open in Chrome/Edge on Android
2. Refresh if prompt doesn't appear
3. Tap "Install" to test installation

## Monitoring

### Google Lighthouse
```bash
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

### PWA Check
Visit: https://www.pwabuilder.com/
Enter your domain to verify PWA implementation

## Security Considerations

1. **HTTPS Only**: Service Workers and Push Notifications require HTTPS
2. **CORS**: API calls from the app should have proper CORS headers
3. **CSP Headers**: Implement Content Security Policy for additional protection
4. **Service Worker Scope**: Limited to `/` scope by default

## Troubleshooting

### Service Worker not registering
- Check browser console for errors
- Verify manifest.json is served with correct MIME type
- Clear browser cache and reload
- Try in different browser

### Install prompt not showing
- Only shows on Android Chrome/Edge
- Website must have manifest.json
- Must be on HTTPS (except localhost)
- Install prompt may be dismissed - show manually via PWAPrompt component

### Offline features not working
- Check Service Workers tab in DevTools
- Verify cache storage quota
- Some APIs may not work offline (e.g., video calls)

### Push notifications not working
- Requires user permission
- HTTPS required
- Check browser notification settings

## Future Enhancements

1. Add push notification system for matches
2. Implement background sync for offline messaging
3. Add voice/video call capabilities
4. Create native app wrappers for app stores
5. Implement payment gateway for subscriptions
6. Add real database backend

## Support

For PWA-related issues:
- Check browser console (F12)
- Review Service Worker logs in DevTools
- Test on different devices/browsers
- Visit https://web.dev/progressive-web-apps/ for more info
