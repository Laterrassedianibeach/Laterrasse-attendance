# Bistronomy Attendance System

A comprehensive employee attendance tracking system for Bistronomy restaurant with role-based access control.

## Features

- 👥 Employee Management
- 📅 Daily Attendance Tracking
- 📊 Monthly Reports & Analytics
- 🔐 Role-based Access (Admin & Security)
- 📱 Responsive Design
- 💾 Local Storage Persistence

## Deployment to Vercel via GitHub

### Step 1: Push to GitHub

1. Create a new repository on GitHub (e.g., `bistronomy-attendance`)
2. In your terminal, navigate to this project folder
3. Initialize git and push:

```bash
cd bistronomy-attendance
git init
git add .
git commit -m "Initial commit: Bistronomy Attendance System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bistronomy-attendance.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New" → "Project"
3. Import your `bistronomy-attendance` repository
4. Vercel will auto-detect the framework (Vite)
5. Click "Deploy"

Your app will be live in ~2 minutes at: `https://bistronomy-attendance.vercel.app`

## Default Login Credentials

### Admin Account
- Username: `admin`
- Password: `admin123`

### Security Accounts
- Username: `security1` / Password: `gate123`
- Username: `security2` / Password: `gate123`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18
- Vite
- Local Storage for data persistence
- DM Sans font
