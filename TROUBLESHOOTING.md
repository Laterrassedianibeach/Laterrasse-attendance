# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Build Fails on Vercel

**Error:** "Build failed" or "Command failed"

**Solutions:**
- Check Vercel build logs for specific error
- Verify `package.json` has all dependencies
- Ensure `vite.config.js` exists
- Check that `src/main.jsx` and `src/App.jsx` exist
- Try clearing Vercel cache: Deployments → ⋯ → Redeploy

### 2. White Screen / Nothing Loads

**Error:** Blank page after deployment

**Solutions:**
- Open browser console (F12) to see errors
- Check that `index.html` is in root directory
- Verify `vercel.json` has correct rewrites
- Check that build output is in `dist` folder
- Test locally first: `npm run build && npm run preview`

### 3. Can't Push to GitHub

**Error:** "Permission denied" or "Authentication failed"

**Solutions:**
- Verify you're logged into GitHub
- Check repository URL is correct
- Use personal access token instead of password
- Set up SSH keys: https://docs.github.com/en/authentication
- Try: `git remote -v` to verify remote URL

### 4. Vercel Can't Find Repository

**Error:** Repository not showing in Vercel

**Solutions:**
- Grant Vercel access to your repositories
- Go to: GitHub Settings → Applications → Vercel
- Click "Configure" and grant access
- Refresh Vercel import page

### 5. Data Disappears After Refresh

**Issue:** Attendance records not persisting

**Why:** localStorage limitations

**Solutions:**
- Check browser privacy settings
- Ensure cookies/storage not blocked
- Try different browser
- Don't use incognito/private mode
- Export data regularly as backup

### 6. Can't Login

**Error:** Login fails with correct credentials

**Solutions:**
- Check browser console for errors
- Clear localStorage: Console → `localStorage.clear()`
- Refresh page and try again
- Verify username/password (case-sensitive)
- Try default credentials: admin/admin123

### 7. Fonts Not Loading

**Issue:** Text looks wrong, DM Sans not loading

**Solutions:**
- Check internet connection
- Verify `index.html` has Google Fonts link
- Try different browser
- Check browser console for blocked requests

### 8. Mobile Display Issues

**Issue:** App looks broken on phone

**Solutions:**
- Check viewport meta tag in `index.html`
- Test in mobile browser dev tools
- Verify responsive styles are applied
- Try clearing mobile browser cache

### 9. Import Project Button Disabled

**Issue:** Can't click "Import" on Vercel

**Solutions:**
- Ensure repository has code pushed
- Check repository is not empty
- Verify you have admin access to repo
- Try refreshing Vercel page
- Log out and log back in

### 10. Custom Domain Not Working

**Issue:** Custom domain shows error

**Solutions:**
- Wait for DNS propagation (24-48 hours)
- Verify DNS records are correct
- Check domain registrar settings
- Ensure no conflicting DNS entries
- Contact Vercel support if persists

## Performance Issues

### Slow Loading

**Solutions:**
- Check network tab in browser dev tools
- Verify Vercel CDN is being used
- Clear browser cache
- Check for console errors
- Test on different network

### App Freezes

**Solutions:**
- Check for large localStorage data
- Clear old attendance records
- Export and archive old data
- Refresh browser
- Check browser RAM usage

## Development Issues

### `npm install` Fails

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install again
npm install
```

### `npm run dev` Fails

**Solutions:**
- Check Node.js version (need v16+)
- Verify port 5173 is available
- Check for syntax errors in code
- Try: `npx vite --force`

### Git Errors

**Solutions:**
```bash
# Reset git if needed
rm -rf .git
git init
git add .
git commit -m "Fresh start"

# Force push (careful!)
git push -f origin main
```

## Getting Help

### Check Logs

**Vercel:**
1. Go to your project on Vercel
2. Click on failed deployment
3. View build logs
4. Look for specific error messages

**Browser:**
1. Press F12 to open DevTools
2. Check Console tab for errors
3. Check Network tab for failed requests

### Verify Files

Ensure these files exist:
```
✅ package.json
✅ vite.config.js
✅ vercel.json
✅ index.html
✅ src/main.jsx
✅ src/App.jsx
✅ .gitignore
```

### Test Locally

Before deploying:
```bash
# Install dependencies
npm install

# Test development
npm run dev

# Test production build
npm run build
npm run preview
```

## Still Need Help?

1. **Check documentation:**
   - README.md
   - DEPLOYMENT.md
   - QUICKSTART.md

2. **Vercel support:**
   - https://vercel.com/support
   - Discord: https://vercel.com/discord

3. **Community resources:**
   - Stack Overflow
   - Vite Discord
   - React community

## Emergency Recovery

### Reset Everything

If all else fails:

```bash
# 1. Delete local repository
rm -rf bistronomy-attendance

# 2. Delete GitHub repository
# (Go to Settings → Delete this repository)

# 3. Delete Vercel project
# (Go to Settings → Delete Project)

# 4. Start fresh with downloaded files
# Follow DEPLOYMENT.md from beginning
```

---

**Remember:** Most issues are fixed by:
1. Checking logs
2. Clearing cache
3. Redeploying
4. Starting fresh

**Don't panic!** The code is solid. Usually it's a configuration issue.
