# Git Repository Setup for Lifestyle Connect

## What is Git & GitHub?

**Git** - Version control system (tracks changes to code)
**GitHub** - Cloud platform to store your code online

## Why You Need This for Deployment

Most deployment platforms (Vercel, Netlify) work with GitHub repos. They automatically deploy whenever you push new code.

---

## STEP 1: Install Git

### Windows
1. Download from: https://git-scm.com/download/win
2. Run installer
3. Use default settings
4. Restart computer

### Mac
```bash
# Using Homebrew (if you have it)
brew install git

# Or download from:
# https://git-scm.com/download/mac
```

### Linux
```bash
sudo apt-get install git
```

**Verify installation:**
```bash
git --version
# Should show: git version 2.x.x
```

---

## STEP 2: Create GitHub Account

1. Go to https://github.com
2. Click "Sign up"
3. Enter email address
4. Create password
5. Choose username (e.g., `zimbabwe-lifestyle`)
6. Verify email
7. Done! ✓

---

## STEP 3: Configure Git Locally

**First time setup:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Example:
```bash
git config --global user.name "Grace Mubako"
git config --global user.email "grace@example.com"
```

**Verify:**
```bash
git config --global --list
```

---

## STEP 4: Create Repository on GitHub

**In GitHub:**
1. Click "+" icon (top right)
2. Select "New repository"
3. Repository name: `lifestyle-connect`
4. Description: "Zimbabwe's premier Christian dating platform"
5. Choose "Public" (anyone can see)
6. Click "Create repository"

**You'll see setup instructions. Follow them:**

```bash
# Navigate to your project folder
cd /path/to/lifestyle-connect

# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Lifestyle Connect"

# Rename branch to main
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/lifestyle-connect.git

# Push to GitHub
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- Example: `https://github.com/grace-mubako/lifestyle-connect.git`

---

## STEP 5: Verify on GitHub

1. Go to your repo: `github.com/YOUR_USERNAME/lifestyle-connect`
2. You should see all your files
3. Click "Code" button
4. Copy the HTTPS URL

Your repo is ready! ✓

---

## COMMON GIT COMMANDS

### Before Making Changes
```bash
git status
# Shows which files changed
```

### After Making Changes
```bash
# Add all changes
git add .

# Create commit with message
git commit -m "Describe your changes here"

# Push to GitHub
git push
```

### Example: After Updating Features
```bash
git add .
git commit -m "Add video call feature"
git push
```

---

## GIT WORKFLOW

```
1. Make changes to your code
   ↓
2. git add .
   ↓
3. git commit -m "description"
   ↓
4. git push
   ↓
5. Changes appear on GitHub
   ↓
6. Vercel/Netlify auto-deploys
```

---

## IF YOU HAVE AUTHENTICATION ISSUES

### Generate GitHub Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes:
   - ✓ repo (full control of private repos)
   - ✓ workflow (update Actions)
4. Click "Generate token"
5. Copy the token (save it somewhere safe!)

### Use Token Instead of Password

When Git asks for password:
- Username: YOUR_GITHUB_USERNAME
- Password: (paste the token)

---

## BRANCHING (Optional, For Teams)

### Create New Branch
```bash
git checkout -b feature/diaspora-connect
```

### List Branches
```bash
git branch
# * main
#   feature/diaspora-connect
```

### Switch Branch
```bash
git checkout main
```

### Merge Branch
```bash
git checkout main
git merge feature/diaspora-connect
git push
```

---

## USEFUL LINKS

| Link | Purpose |
|------|---------|
| https://github.com | Create account |
| https://github.com/YOUR_USERNAME/lifestyle-connect | Your repository |
| https://github.com/settings/tokens | Create personal tokens |
| https://git-scm.com/docs | Git documentation |

---

## TROUBLESHOOTING

### "fatal: not a git repository"
**Fix:**
```bash
git init
```

### "Please tell me who you are"
**Fix:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### "Permission denied (publickey)"
**Fix:**
1. Generate SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
2. Or use HTTPS token (see above)

### "Your branch is ahead of 'origin/main' by X commits"
**Fix:**
```bash
git push
```

---

## NEXT STEPS

1. ✅ Install Git
2. ✅ Create GitHub account
3. ✅ Configure Git (`git config`)
4. ✅ Create repository
5. ✅ Push code to GitHub
6. → Deploy using Vercel/Netlify (see STEP_BY_STEP_DEPLOYMENT.md)

---

## QUICK REFERENCE

```bash
# First time setup
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize repo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USER/lifestyle-connect.git
git push -u origin main

# Regular workflow
git status          # See changes
git add .           # Stage changes
git commit -m "msg" # Commit
git push            # Push to GitHub

# View history
git log
git log --oneline
```

---

## IMPORTANT NOTES

1. **Never commit passwords/secrets**
   - Use `.env` files (add to `.gitignore`)
   - Use environment variables

2. **Create `.gitignore` file**
   ```
   node_modules/
   .env
   .DS_Store
   dist/
   ```

3. **Keep commits clean**
   - Commit related changes together
   - Write descriptive messages

4. **Pull before push**
   ```bash
   git pull origin main  # Get latest
   git push              # Push your changes
   ```

---

## YOU'RE READY!

Your code is now version-controlled and ready to deploy.

**Next: See STEP_BY_STEP_DEPLOYMENT.md to deploy your app!**

---

**Need help?**
- GitHub Help: https://docs.github.com
- Git Guide: https://git-scm.com/book/en/v2
- Tutorials: https://www.youtube.com/results?search_query=git+github+tutorial
