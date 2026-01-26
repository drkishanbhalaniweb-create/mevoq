# Fix: Supabase Authentication on Vercel

## Problem
You're getting this error on your live site:
```
@supabase/ssr: Your project's URL and API key are required to create a Supabase client!
```

**Root Cause:** Environment variables in `.env.local` are NOT automatically deployed to Vercel. They only work locally.

---

## Solution: Add Environment Variables to Vercel

### Method 1: Via Vercel Dashboard (Recommended - 2 minutes)

1. **Go to your Vercel project:**
   - Visit: https://vercel.com/dashboard
   - Select your project (maglinc or mevoq)

2. **Navigate to Settings:**
   - Click "Settings" tab
   - Click "Environment Variables" in the left sidebar

3. **Add these 2 variables:**

   **Variable 1:**
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://scnomhsoweqblursbeul.supabase.co
   Environment: Production, Preview, Development (check all 3)
   ```

   **Variable 2:**
   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbm9taHNvd2VxYmx1cnNiZXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NjgwMTIsImV4cCI6MjA3ODM0NDAxMn0.6B3Av6F0Mdnnf4YHxTxb51c0MlJ56lVpoMfX3hYy6To
   Environment: Production, Preview, Development (check all 3)
   ```

4. **Save and Redeploy:**
   - Click "Save" for each variable
   - Go to "Deployments" tab
   - Click the "..." menu on the latest deployment
   - Click "Redeploy"
   - ✅ Wait for deployment to complete (~2 minutes)

5. **Test:**
   - Go to your live site: https://maglinc.vercel.app/admin/login
   - Try logging in with your credentials
   - ✅ Should work now!

---

### Method 2: Via Vercel CLI (Alternative)

If you prefer command line:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://scnomhsoweqblursbeul.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbm9taHNvd2VxYmx1cnNiZXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NjgwMTIsImV4cCI6MjA3ODM0NDAxMn0.6B3Av6F0Mdnnf4YHxTxb51c0MlJ56lVpoMfX3hYy6To

# Repeat for preview and development environments
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview

vercel env add NEXT_PUBLIC_SUPABASE_URL development
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development

# Redeploy
vercel --prod
```

---

## Why This Happens

### Local Development (Works ✅)
```
Your Computer
  ↓
Reads .env.local file
  ↓
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://..."
  ↓
Supabase client created successfully ✅
```

### Vercel Deployment (Fails ❌)
```
Vercel Server
  ↓
.env.local NOT deployed (gitignored)
  ↓
process.env.NEXT_PUBLIC_SUPABASE_URL = undefined
  ↓
Supabase client creation fails ❌
```

### After Adding to Vercel (Works ✅)
```
Vercel Server
  ↓
Reads environment variables from Vercel settings
  ↓
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://..."
  ↓
Supabase client created successfully ✅
```

---

## Important Notes

### 1. **NEXT_PUBLIC_ Prefix**
Variables with `NEXT_PUBLIC_` prefix are exposed to the browser. This is safe for:
- ✅ Supabase URL (public)
- ✅ Supabase Anon Key (public, rate-limited)

**Never expose:**
- ❌ Service Role Key (admin access)
- ❌ Database passwords
- ❌ API secrets

### 2. **Environment Scopes**
- **Production:** Live site (maglinc.vercel.app)
- **Preview:** Pull request deployments
- **Development:** Local development (optional)

**Recommendation:** Add to all 3 for consistency

### 3. **Redeployment Required**
Environment variables are only applied to NEW deployments. You must:
- Redeploy after adding variables
- Or push a new commit to trigger deployment

### 4. **Verification**
After deployment, check the build logs:
```
✓ Environment variables loaded
✓ NEXT_PUBLIC_SUPABASE_URL
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## Additional Environment Variables to Add (Optional)

While you're in Vercel settings, consider adding:

### For SEO (from your sitemap config)
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://maglinc.vercel.app
(or https://mevoq.com when ready)
Environment: Production, Preview, Development
```

This ensures your sitemap uses the correct domain.

---

## Troubleshooting

### Still Getting the Error After Adding Variables?

**1. Check Variable Names (Case-Sensitive)**
```
✅ NEXT_PUBLIC_SUPABASE_URL
❌ next_public_supabase_url
❌ NEXT_PUBLIC_SUPABASE_URI
```

**2. Check for Typos in Values**
```
✅ https://scnomhsoweqblursbeul.supabase.co
❌ https://scnomhsoweqblursbeul.supabase.co/ (trailing slash)
❌ scnomhsoweqblursbeul.supabase.co (missing https://)
```

**3. Verify Deployment Used New Variables**
- Go to Vercel Dashboard → Deployments
- Click on the latest deployment
- Scroll to "Environment Variables" section
- Confirm both variables are listed

**4. Clear Browser Cache**
```bash
# Hard refresh in browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

**5. Check Vercel Build Logs**
- Go to Deployments → Click deployment → View Build Logs
- Look for environment variable errors
- Should see: "✓ Environment variables loaded"

**6. Test in Incognito/Private Window**
- Sometimes cached JavaScript causes issues
- Open incognito window
- Try logging in again

---

## Security Best Practices

### Current Setup (Good ✅)
- ✅ Using anon key (not service role key)
- ✅ RLS policies protect data
- ✅ Admin routes excluded from search engines
- ✅ Environment variables not in git

### Recommendations for Production

**1. Rotate Keys After Public Exposure**
If you've accidentally committed keys to git:
```
1. Go to Supabase Dashboard
2. Settings → API
3. Click "Reset" on Anon Key
4. Update .env.local and Vercel
5. Redeploy
```

**2. Enable Email Verification**
```
Supabase Dashboard → Authentication → Providers
Enable "Confirm email" for new signups
```

**3. Add Rate Limiting**
Consider adding Vercel Edge Config for rate limiting on `/admin/login`

**4. Monitor Auth Logs**
```
Supabase Dashboard → Authentication → Logs
Check for suspicious login attempts
```

---

## Quick Checklist

Before marking this as complete:

- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to Vercel
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
- [ ] Selected all 3 environments (Production, Preview, Development)
- [ ] Redeployed the site
- [ ] Waited for deployment to complete
- [ ] Tested login on live site
- [ ] Login works successfully ✅
- [ ] Can access admin dashboard ✅
- [ ] Can create/edit content ✅

---

## Expected Result

**Before Fix:**
```
Console Error: @supabase/ssr: Your project's URL and API key are required...
Login: ❌ Fails
Dashboard: ❌ Can't access
```

**After Fix:**
```
Console: ✅ Clean (no errors)
Login: ✅ Works
Dashboard: ✅ Accessible
Admin Actions: ✅ Functional
```

---

## Next Steps After Fix

Once authentication works on production:

1. **Test All Admin Features:**
   - Create a blog post
   - Upload an image
   - Edit a service
   - Add a testimonial
   - View contacts

2. **Set Up Monitoring:**
   - Vercel Analytics
   - Supabase Auth logs
   - Error tracking (Sentry)

3. **Configure Email Provider:**
   - For password resets
   - For user invitations

4. **Add More Admin Users:**
   - Invite team members
   - Set up proper roles (if needed)

5. **Implement Middleware:**
   - For session refresh
   - Better UX (no unexpected logouts)

---

## Summary

**Problem:** Environment variables in `.env.local` don't deploy to Vercel

**Solution:** Add them manually in Vercel Dashboard → Settings → Environment Variables

**Time to Fix:** 2 minutes

**Impact:** Authentication will work on production ✅

Go ahead and add those variables now, then redeploy. Your login should work immediately after!
