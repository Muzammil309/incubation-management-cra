# Vercel Environment Variables Setup

## Issue
The deployed application at https://incubation-management-nic.vercel.app/ is redirecting to the login page instead of running in demo mode.

## Root Cause
The application checks for Supabase environment variables (`REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`) at build time. If these are not set on Vercel, the app should run in demo mode, but the current logic has an issue.

## Solution Options

### Option 1: Run in Demo Mode (No Supabase Required)
To run the application without Supabase authentication:

1. **On Vercel Dashboard:**
   - Go to: https://vercel.com/muzammil309s-projects/incubation-management-nic
   - Navigate to: Settings → Environment Variables
   - **DO NOT** add `REACT_APP_SUPABASE_URL` or `REACT_APP_SUPABASE_ANON_KEY`
   - Or set them to empty strings

2. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment

### Option 2: Enable Full Supabase Authentication
To enable full authentication with Supabase:

1. **Get Supabase Credentials:**
   - Project URL: `https://njdatlcgjhjajztcfqar.supabase.co`
   - Get the Anon Key from: https://supabase.com/dashboard/project/njdatlcgjhjajztcfqar/settings/api

2. **On Vercel Dashboard:**
   - Go to: Settings → Environment Variables
   - Add:
     ```
     REACT_APP_SUPABASE_URL=https://njdatlcgjhjajztcfqar.supabase.co
     REACT_APP_SUPABASE_ANON_KEY=<your-anon-key-here>
     ```
   - Apply to: Production, Preview, and Development

3. **Redeploy:**
   - Vercel will automatically redeploy when you save environment variables

## Current Behavior

### Demo Mode (No Supabase)
- ✅ No authentication required
- ✅ Direct access to dashboard
- ✅ All features accessible
- ❌ No data persistence
- ❌ No user management

### Full Mode (With Supabase)
- ✅ Full authentication
- ✅ Data persistence
- ✅ User management
- ✅ Multi-tenant support
- ✅ Real-time updates

## Verification

After deployment, verify the mode by checking the browser console:
- Demo mode: You'll see "Supabase is not configured. Running in demo mode without authentication."
- Full mode: No warning message, authentication required

## Troubleshooting

If the app is still redirecting to login after setting up demo mode:
1. Clear browser cache and cookies
2. Try incognito/private browsing mode
3. Check browser console for errors
4. Verify environment variables are not set on Vercel

