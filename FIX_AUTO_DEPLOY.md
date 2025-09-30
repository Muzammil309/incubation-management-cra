# Fix Automatic Vercel Deployments - Step-by-Step Guide

## 🎯 **Goal**
Enable automatic Vercel deployments when you push to the `main` branch on GitHub.

---

## 📋 **Prerequisites**
- ✅ GitHub repository: `Muzammil309/incubation-management-cra`
- ✅ Vercel project: `incubation-management-cra`
- ✅ Vercel CLI installed and authenticated
- ✅ Git configured with GitHub credentials

---

## 🔧 **Step-by-Step Fix**

### **Step 1: Access Vercel Dashboard**

1. Open your browser and go to: https://vercel.com/dashboard
2. Log in with your account
3. Find and click on your project: **incubation-management-cra**

### **Step 2: Check Git Integration**

1. In your project dashboard, click on **Settings** (top navigation)
2. Click on **Git** in the left sidebar
3. You should see:
   ```
   Connected Git Repository
   Repository: Muzammil309/incubation-management-cra
   Branch: main
   ```

**If you DON'T see a connected repository:**
- Click **Connect Git Repository**
- Select **GitHub**
- Authorize Vercel if prompted
- Select your repository: `Muzammil309/incubation-management-cra`
- Click **Connect**

### **Step 3: Configure Production Branch**

Still in **Settings** → **Git**:

1. Find **Production Branch** setting
2. Ensure it's set to: `main`
3. If not, change it to `main` and click **Save**

### **Step 4: Disable Ignored Build Step**

In **Settings** → **Git**:

1. Scroll to **Ignored Build Step**
2. Make sure it's **NOT** enabled
3. If there's a custom command, remove it or set it to return `1` (to always build)

### **Step 5: Check Deployment Settings**

Go to **Settings** → **General**:

1. **Framework Preset**: Should be `Create React App`
2. **Build Command**: `npm run build` (or leave empty to use default)
3. **Output Directory**: `build`
4. **Install Command**: `npm install` (or leave empty to use default)
5. **Root Directory**: `./` (leave empty for project root)

Click **Save** if you made any changes.

### **Step 6: Verify GitHub Webhook**

1. Go to your GitHub repository: https://github.com/Muzammil309/incubation-management-cra
2. Click **Settings** (repository settings, not your account)
3. Click **Webhooks** in the left sidebar
4. Look for a webhook with:
   - Payload URL: `https://api.vercel.com/v1/integrations/deploy/...`
   - Content type: `application/json`
   - SSL verification: Enabled
   - Active: ✅ (green checkmark)

**If webhook is missing or inactive:**
- Go back to Vercel dashboard
- Settings → Git → Disconnect repository
- Then reconnect it (this will recreate the webhook)

**If webhook exists but shows errors:**
- Click on the webhook
- Scroll to **Recent Deliveries**
- Check for failed deliveries
- Click **Redeliver** to test

### **Step 7: Test Automatic Deployment**

1. Make a small change to your code (e.g., update README.md)
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```
3. Go to Vercel dashboard
4. You should see a new deployment starting automatically
5. Wait for it to complete

### **Step 8: Verify Deployment**

1. In Vercel dashboard, click on **Deployments**
2. The latest deployment should show:
   - Source: `main` branch
   - Commit: Your latest commit message
   - Status: ✅ Ready (after build completes)

---

## 🚨 **Troubleshooting**

### **Problem: Webhook Not Triggering**

**Solution 1: Recreate Webhook**
1. Vercel Dashboard → Settings → Git
2. Click **Disconnect** (if connected)
3. Click **Connect Git Repository**
4. Select GitHub and your repository
5. This will create a fresh webhook

**Solution 2: Manual Webhook Test**
1. GitHub → Settings → Webhooks
2. Click on Vercel webhook
3. Scroll to **Recent Deliveries**
4. Click **Redeliver** on the latest delivery
5. Check if it triggers a deployment

### **Problem: Builds Are Ignored**

**Check Ignored Build Step:**
1. Vercel → Settings → Git → Ignored Build Step
2. Make sure it's disabled OR
3. If you have a custom command, ensure it returns `1` (exit code for "build")

**Example of WRONG configuration:**
```bash
git diff HEAD^ HEAD --quiet . # This will skip builds if no changes
```

**Example of CORRECT configuration:**
```bash
# Leave empty or use:
exit 1  # Always build
```

### **Problem: Wrong Branch Deploying**

1. Vercel → Settings → Git
2. Check **Production Branch** is set to `main`
3. Check **Preview Branches** settings
4. Make sure you're pushing to the correct branch

### **Problem: Build Fails**

1. Check build logs in Vercel dashboard
2. Look for errors (ESLint, TypeScript, missing dependencies)
3. Test build locally: `npm run build`
4. Fix errors and push again

---

## ✅ **Verification Checklist**

After completing all steps, verify:

- [ ] GitHub repository is connected in Vercel
- [ ] Production branch is set to `main`
- [ ] Ignored Build Step is disabled
- [ ] GitHub webhook exists and is active
- [ ] Test push triggers automatic deployment
- [ ] Deployment completes successfully
- [ ] Production URL updates with new changes

---

## 🎯 **Expected Workflow After Fix**

1. **Make changes** to your code locally
2. **Commit** changes: `git commit -m "Your message"`
3. **Push** to GitHub: `git push origin main`
4. **Automatic deployment** starts on Vercel (within seconds)
5. **Build completes** (usually 30-60 seconds)
6. **Production URL** updates automatically
7. **Notification** (if enabled) sent to your email/Slack

---

## 📊 **Monitoring Deployments**

### **Vercel Dashboard**
- View all deployments: https://vercel.com/muzammil309s-projects/incubation-management-cra
- Check build logs for errors
- Monitor deployment status

### **GitHub Actions (Optional)**
You can also set up GitHub Actions to run tests before deployment:
1. Create `.github/workflows/test.yml`
2. Add test commands
3. Vercel will wait for checks to pass

### **Vercel CLI**
```bash
# List recent deployments
vercel ls

# Check specific deployment
vercel inspect <deployment-url>

# View logs
vercel logs <deployment-url>
```

---

## 🔔 **Enable Deployment Notifications**

1. Vercel Dashboard → Settings → Notifications
2. Enable notifications for:
   - Deployment Started
   - Deployment Ready
   - Deployment Failed
3. Choose notification method:
   - Email
   - Slack
   - Discord
   - Webhook

---

## 📝 **Quick Reference Commands**

```bash
# Manual production deployment
vercel --prod

# Manual preview deployment
vercel

# List deployments
vercel ls

# Check deployment status
vercel inspect <url>

# View deployment logs
vercel logs <url>

# Force rebuild (clear cache)
vercel --prod --force

# Check Vercel CLI version
vercel --version

# Login to Vercel
vercel login

# Link project
vercel link
```

---

## 🎉 **Success Indicators**

You'll know automatic deployments are working when:

1. ✅ Push to `main` branch triggers deployment within 5-10 seconds
2. ✅ Vercel dashboard shows new deployment with correct commit
3. ✅ Build completes successfully
4. ✅ Production URL updates automatically
5. ✅ You receive deployment notifications (if enabled)

---

## 📞 **Need Help?**

If automatic deployments still don't work after following all steps:

1. **Check Vercel Status**: https://www.vercel-status.com/
2. **Vercel Support**: https://vercel.com/support
3. **Community Forum**: https://github.com/vercel/vercel/discussions
4. **Documentation**: https://vercel.com/docs

---

**Good luck! Your automatic deployments should be working now! 🚀**

