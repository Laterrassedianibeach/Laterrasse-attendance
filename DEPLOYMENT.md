# Deployment Guide: Bistronomy Attendance System

## 📋 Prerequisites

1. A GitHub account
2. A Vercel account (sign up at vercel.com using GitHub)
3. Git installed on your computer

## 🚀 Step-by-Step Deployment

### Step 1: Upload Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `bistronomy-attendance`
   - Description: "Employee attendance tracking system for Bistronomy"
   - Set to Public or Private
   - DO NOT initialize with README (we already have one)
   - Click "Create repository"

2. **Push your code to GitHub:**

   Open terminal/command prompt in the `bistronomy-attendance` folder and run:

   ```bash
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Commit files
   git commit -m "Initial commit: Bistronomy Attendance System"
   
   # Rename branch to main
   git branch -M main
   
   # Add GitHub repository as remote (replace YOUR_USERNAME)
   git remote add origin https://github.com/YOUR_USERNAME/bistronomy-attendance.git
   
   # Push to GitHub
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Find and select your `bistronomy-attendance` repository
   - Click "Import"

3. **Configure Project:**
   - **Project Name:** bistronomy-attendance (or customize)
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** ./
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** dist (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes for deployment to complete
   - You'll get a live URL like: `https://bistronomy-attendance.vercel.app`

### Step 3: Test Your Deployment

1. Visit your Vercel URL
2. Try logging in with:
   - **Admin:** username: `admin`, password: `admin123`
   - **Security:** username: `security1`, password: `gate123`

## 🔄 Making Updates

After initial deployment, any changes you push to GitHub will automatically trigger a new deployment:

```bash
# Make your changes to files
# Then:
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically rebuild and deploy in ~1-2 minutes.

## 🐛 Troubleshooting

### Build Failed
- Check the Vercel deployment logs
- Ensure package.json has correct dependencies
- Verify vite.config.js is properly configured

### Can't Connect to GitHub
- Check your GitHub authentication in Vercel
- Ensure repository permissions are granted

### App Not Loading
- Check browser console for errors
- Verify vercel.json has correct configuration
- Check that index.html is in root directory

### Data Not Persisting
- This app uses localStorage (browser-based)
- Data is stored locally in each user's browser
- Clearing browser data will reset the app

## 📱 Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

## 🔐 Security Notes

- Change default passwords after first deployment
- The app stores data in browser localStorage (client-side)
- For production, consider implementing a backend database
- All data is stored locally - no server-side persistence

## 💡 Tips

- **Preview Deployments:** Every branch push creates a preview URL
- **Environment Variables:** Add in Vercel project settings if needed
- **Analytics:** Enable Vercel Analytics for usage insights
- **Custom Domain:** Free custom domain support on all plans

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Verify all files are committed to GitHub
4. Ensure vercel.json and vite.config.js are present

---

**Your app will be live at:** `https://your-project-name.vercel.app`

Enjoy your Bistronomy Attendance System! 🎉
