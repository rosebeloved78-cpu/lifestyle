# Public Files for PWA Deployment

The following files need to be copied to your deployment:

## Files to Deploy:
1. **manifest.json** - Web app manifest file (located in project root)
2. **public/sw.js** - Service Worker file

## Setup Instructions:

### For Local Development:
These files are served automatically from the project root and public folder.

### For Production Deployment:
1. Copy `manifest.json` to your web root
2. Copy `public/sw.js` to your web root as `/sw.js`
3. Ensure both files are served with proper MIME types:
   - manifest.json → application/json
   - sw.js → application/javascript

### Nginx Configuration Example:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;

    # Serve manifest.json with correct MIME type
    location /manifest.json {
        add_header Content-Type "application/json; charset=utf-8";
        expires 1h;
    }

    # Serve service worker with correct MIME type
    location /sw.js {
        add_header Content-Type "application/javascript; charset=utf-8";
        add_header Service-Worker-Allowed "/";
        expires 1h;
    }

    # Cache the main HTML file minimally
    location /index.html {
        expires 1h;
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }

    # Cache static assets long-term
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

### Apache Configuration Example:
```apache
<Files "manifest.json">
    Header set Content-Type "application/json; charset=utf-8"
    Header set Cache-Control "public, max-age=3600"
</Files>

<Files "sw.js">
    Header set Content-Type "application/javascript; charset=utf-8"
    Header set Service-Worker-Allowed "/"
    Header set Cache-Control "public, max-age=3600"
</Files>
```

## PWA Features Enabled:

✅ **Offline Support** - Service Worker caches assets
✅ **Install Prompt** - Users can install as app on phone/desktop
✅ **Push Notifications** - Ready for push notification integration
✅ **Background Sync** - Syncs data when connection is restored
✅ **App Shortcuts** - Quick access to Browse and Diaspora Connect
✅ **Adaptive Icons** - Works on all device types
✅ **Dark Mode Support** - Respects system theme preferences
✅ **Standalone Display** - Runs as full-screen app when installed

## Installation Instructions for Users:

### On Android:
1. Open Zimbabwe Hearts in Chrome
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home screen"
4. The app will be installed and can be launched from home screen

### On iOS:
1. Open Zimbabwe Hearts in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add" 
5. The app will be installed and can be launched from home screen

### On Desktop (Chrome/Edge):
1. Open Zimbabwe Hearts
2. Click the install icon in the address bar
3. Click "Install"
4. The app will be installed and appear in your applications menu
