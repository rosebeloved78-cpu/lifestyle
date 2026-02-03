# How to Create GitHub Repository for Lifestyle Connect

## 📍 WHAT IS THIS?

This file shows you exactly how to upload your Lifestyle Connect code to GitHub so you can deploy it to Vercel or Netlify.

---

## ✅ PREREQUISITES

Before starting, make sure you have:

- [ ] Git installed (https://git-scm.com)
- [ ] GitHub account created (https://github.com)
- [ ] Your lifestyle-connect project folder locally
- [ ] Terminal/Command Prompt access

**Don't have these?** See GIT_SETUP.md

---

## 🚀 STEP 1: CREATE REPOSITORY ON GITHUB

### Option A: Online (Easy)

1. Go to https://github.com/new
2. Sign in to your GitHub account
3. Fill in:
   - **Repository name:** `lifestyle-connect`
   - **Description:** "Zimbabwe's premier Christian dating platform"
   - **Public/Private:** Select "Public" (anyone can see)
4. Click "Create repository"

You'll see a page with setup instructions. Save the URL shown (something like `https://github.com/YOUR_USERNAME/lifestyle-connect.git`)

---

## 🖥️ STEP 2: SETUP GIT LOCALLY

### First Time Only - Configure Git

**Windows (Command Prompt):**
```cmd
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
```

**Mac/Linux (Terminal):**
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
```

### Example:
```bash
git config --global user.name "Grace Mubako"
git config --global user.email "grace.mubako@email.com"
```

### Verify it worked:
```bash
git config --global --list
```

Should show your name and email.

---

## 📁 STEP 3: INITIALIZE REPOSITORY

### Windows (Command Prompt):

```cmd
cd C:\Users\YourName\Projects\lifestyle-connect
git init
git add .
git commit -m "Initial commit: Lifestyle Connect"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lifestyle-connect.git
git push -u origin main
```

### Mac/Linux (Terminal):

```bash
cd /Users/yourname/projects/lifestyle-connect
git init
git add .
git commit -m "Initial commit: Lifestyle Connect"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lifestyle-connect.git
git push -u origin main
```

### Replace:
- `/Users/yourname/projects/lifestyle-connect` with YOUR project path
- `YOUR_USERNAME` with your GitHub username
- Example: `https://github.com/grace-mubako/lifestyle-connect.git`

---

## 🔑 STEP 4: AUTHENTICATION

### If asked for password:

GitHub now requires **personal access tokens** instead of passwords.

**Create token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Name it: "Lifestyle Connect"
4. Select scopes:
   - ✓ `repo` (full control of private repos)
   - ✓ `workflow` (update GitHub Actions)
5. Click "Generate token"
6. **COPY the token** (you won't see it again!)

**Use the token:**
- When Git asks for "password"
- Paste the token you copied
- (No actual password needed)

---

## ✅ STEP 5: VERIFY ON GITHUB

1. Go to https://github.com/YOUR_USERNAME/lifestyle-connect
2. Replace YOUR_USERNAME with your GitHub username
3. You should see:
   - All your files listed
   - "Initial commit" in history
   - Your code is online! ✅

---

## 🔄 STEP 6: MAKE FUTURE UPDATES

### After you make changes to code:

**Windows (Command Prompt):**
```cmd
git status
git add .
git commit -m "Your change description"
git push
```

**Mac/Linux (Terminal):**
```bash
git status
git add .
git commit -m "Your change description"
git push
```

### Example - After fixing a bug:
```bash
git add .
git commit -m "Fix service worker registration issue"
git push
```

---

## 📝 FULL COMMAND REFERENCE

### Clone Your Repository
```bash
git clone https://github.com/YOUR_USERNAME/lifestyle-connect.git
cd lifestyle-connect
```

### Check Status
```bash
git status
# Shows which files changed
```

### Stage All Changes
```bash
git add .
# Stages all modified files
```

### Commit Changes
```bash
git commit -m "Description of changes"
# Saves changes with a message
```

### Push to GitHub
```bash
git push
# Uploads to GitHub
# Or: git push origin main
```

### View History
```bash
git log
# Shows all commits
# Or: git log --oneline (shorter format)
```

### See Differences
```bash
git diff
# Shows what changed in files
```

### Create New Branch
```bash
git checkout -b feature/my-feature
# Creates and switches to new branch
```

### Switch Branches
```bash
git checkout main
# Switches back to main branch
```

### Merge Branch
```bash
git checkout main
git merge feature/my-feature
git push
# Merges feature branch into main
```

---

## 🆘 TROUBLESHOOTING

### "fatal: not a git repository"
**Fix:**
```bash
git init
```

### "fatal: unable to access... Could not resolve host"
**Fix:**
- Check internet connection
- Verify GitHub is up (status.github.com)

### "Permission denied (publickey)"
**Fix:**
1. Generate SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
2. Or use HTTPS with token (see Step 4)

### "Your branch is ahead of origin/main"
**Fix:**
```bash
git push
```

### Files not showing on GitHub
**Fix:**
```bash
git status
git add .
git commit -m "Add files"
git push
```

### Wrong email/name showing
**Fix:**
```bash
git config --global user.name "Correct Name"
git config --global user.email "correct@email.com"
git commit --amend --no-edit
git push --force-with-lease
```

---

## 📋 COMPLETE EXAMPLE

Here's a real example from start to finish:

```bash
# 1. Navigate to project
cd /Users/grace/Projects/lifestyle-connect

# 2. Initialize Git
git init

# 3. Add all files
git add .

# 4. First commit
git commit -m "Initial commit: Lifestyle Connect"

# 5. Rename branch to main
git branch -M main

# 6. Connect to remote
git remote add origin https://github.com/grace-mubako/lifestyle-connect.git

# 7. Push to GitHub
git push -u origin main

# Later, after making changes...
git status
git add .
git commit -m "Add diaspora feature"
git push
```

---

## 🎯 BEST PRACTICES

### Commit Messages
Be descriptive:
```bash
# ✅ Good
git commit -m "Add same-church filter feature"
git commit -m "Fix service worker registration"
git commit -m "Update colors to match branding"

# ❌ Bad
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

### Commit Frequency
- Commit after completing a feature
- Commit before major changes
- Never commit broken code

### Never Commit
```
.env files (contains secrets)
node_modules/ (recreated with npm install)
.DS_Store (Mac system files)
*.log (log files)
dist/ (generated files)
```

Add to `.gitignore`:
```
node_modules/
.env
.DS_Store
dist/
```

---

## 🚀 READY FOR DEPLOYMENT

After successfully pushing to GitHub, you can:

**Deploy to Vercel:**
1. Go to https://vercel.com
2. "New Project"
3. Select your repo
4. Deploy!

**Deploy to Netlify:**
1. Go to https://netlify.com
2. "New site from Git"
3. Select your repo
4. Deploy!

---

## 📚 USEFUL RESOURCES

| Resource | Link |
|----------|------|
| GitHub Help | https://docs.github.com |
| Git Guide | https://git-scm.com/book |
| GitHub Desktop | https://desktop.github.com |
| VS Code Git | https://code.visualstudio.com/docs/editor/versioncontrol |

---

## ✨ YOU'VE GOT THIS!

If you follow these steps, you'll have:
- ✅ Local Git repository
- ✅ GitHub account
- ✅ Code pushed to GitHub
- ✅ Ready to deploy to Vercel/Netlify

---

## 🎉 NEXT STEPS

1. Create GitHub repository (this file ✓)
2. Push your code (commands above ✓)
3. Deploy to Vercel (see QUICK_START.md)
4. Share with world!

---

## 📞 HELP

**If something goes wrong:**
1. Read the error message carefully
2. Google the error + "github"
3. Check GitHub Help: https://docs.github.com
4. Check Git Help: https://git-scm.com/help

**Having trouble?**
See: GIT_SETUP.md (complete Git guide)

---

**Your repository is about to go live!** 🚀

Good luck with Lifestyle Connect! ❤️
