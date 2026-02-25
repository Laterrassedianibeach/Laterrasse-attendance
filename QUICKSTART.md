# Quick Reference Card

## 🚀 Deploy to Vercel (5 Minutes)

### Commands to Run

```bash
# 1. Navigate to project folder
cd bistronomy-attendance

# 2. Initialize git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 3. Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/bistronomy-attendance.git
git push -u origin main

# 4. Go to vercel.com
# - Sign in with GitHub
# - Click "Import Project"
# - Select bistronomy-attendance
# - Click "Deploy"
```

## 🔑 Default Credentials

| Role     | Username  | Password  |
|----------|-----------|-----------|
| Admin    | admin     | admin123  |
| Security | security1 | gate123   |
| Security | security2 | gate123   |

## 📁 Project Structure

```
bistronomy-attendance/
├── src/
│   ├── App.jsx          # Main application
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Build config
├── vercel.json         # Vercel settings
└── README.md           # Documentation
```

## 🔄 Update Your App

```bash
# After making changes:
git add .
git commit -m "Your change description"
git push

# Vercel auto-deploys in 1-2 minutes
```

## 🌐 Your Live URLs

- **Production:** `https://bistronomy-attendance.vercel.app`
- **Custom Domain:** Configure in Vercel settings

## 🛠️ Local Development

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (localhost:5173)
npm run build  # Build for production
```

## ⚡ Features Checklist

- ✅ Employee Management (Add/Edit/Delete)
- ✅ Daily Attendance Marking
- ✅ Monthly Reports
- ✅ Department Analytics
- ✅ User Management
- ✅ Role-based Access Control
- ✅ Data Export (CSV)
- ✅ Responsive Design

## 📱 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 💾 Data Storage

- Uses browser localStorage
- Data persists per browser/device
- No backend required
- Can be backed up via export feature

---

**Need Help?** Check DEPLOYMENT.md for detailed instructions
