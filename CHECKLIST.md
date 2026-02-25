# ✅ Deployment Checklist

## Before You Start

- [ ] GitHub account created
- [ ] Vercel account created (use GitHub to sign up)
- [ ] Git installed on your computer
- [ ] All project files downloaded

## Step 1: GitHub Setup (5 minutes)

- [ ] Go to https://github.com/new
- [ ] Create repository: `bistronomy-attendance`
- [ ] Don't initialize with README
- [ ] Click "Create repository"
- [ ] Copy the repository URL

## Step 2: Push Code to GitHub (2 minutes)

Open terminal in the `bistronomy-attendance` folder and run:

- [ ] `git init`
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] `git branch -M main`
- [ ] `git remote add origin YOUR_REPO_URL`
- [ ] `git push -u origin main`
- [ ] Verify files appear on GitHub

## Step 3: Deploy to Vercel (3 minutes)

- [ ] Go to https://vercel.com
- [ ] Click "Sign Up" or "Login"
- [ ] Choose "Continue with GitHub"
- [ ] Grant Vercel access to repositories
- [ ] Click "Add New..." → "Project"
- [ ] Find and select `bistronomy-attendance`
- [ ] Click "Import"
- [ ] Verify settings:
  - [ ] Framework: Vite (auto-detected)
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Click "Deploy"
- [ ] Wait for deployment (1-2 minutes)
- [ ] Copy your live URL

## Step 4: Test Your Deployment (2 minutes)

- [ ] Visit your Vercel URL
- [ ] Test login with admin credentials:
  - Username: `admin`
  - Password: `admin123`
- [ ] Try marking attendance
- [ ] Check if data persists after refresh
- [ ] Test on mobile browser

## Step 5: Secure Your App (Important!)

- [ ] Login as admin
- [ ] Go to "User Management"
- [ ] Change admin password
- [ ] Change security passwords
- [ ] Add/remove users as needed

## Optional Enhancements

- [ ] Add custom domain in Vercel settings
- [ ] Enable Vercel Analytics
- [ ] Set up email notifications (requires backend)
- [ ] Add custom branding/logo

## Troubleshooting

If deployment fails, check:
- [ ] All files are in GitHub repository
- [ ] package.json exists and is correct
- [ ] vite.config.js exists
- [ ] vercel.json exists
- [ ] View Vercel deployment logs for errors

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide
- React Docs: https://react.dev

---

## 🎉 Success!

Once complete, you'll have:
- ✅ Live web app
- ✅ Automatic deployments on git push
- ✅ SSL certificate (HTTPS)
- ✅ Global CDN
- ✅ Preview deployments for branches

**Your live URL:** `https://bistronomy-attendance.vercel.app`

---

**Estimated Total Time:** 15-20 minutes

**Questions?** See DEPLOYMENT.md for detailed instructions.
