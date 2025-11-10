# Quick Setup Guide

## Prerequisites
- Node.js 16+ installed
- Supabase account (free tier is fine)

## Step 1: Supabase Setup (5 minutes)

1. Go to https://supabase.com and create a new project
2. Wait for the project to be ready
3. Go to **SQL Editor** in the left sidebar
4. Run these SQL files in order:

### First: Create Tables
Copy and paste `backend/supabase_schema.sql` → Click "Run"

### Second: Add Blog Tables  
Copy and paste `backend/blog_migration.sql` → Click "Run"

### Third: Set Permissions
Copy and paste `backend/update_rls_policies.sql` → Click "Run"

## Step 2: Get Your Credentials

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: https://xxx.supabase.co)
   - **anon public** key (long string starting with eyJ...)

## Step 3: Configure Frontend

1. Open `frontend/.env`
2. Replace with your values:
```env
REACT_APP_SUPABASE_URL=your_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Install & Run

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Open http://localhost:3000 🎉

## Step 5: Test Admin Panel

1. Go to http://localhost:3000/admin
2. Click "New Post"
3. Fill in the form and click "Create Post"
4. If it works, you're all set! ✅

## Troubleshooting

### "Failed to load resource" errors
- Check that Supabase URL and key are correct in `.env`
- Restart the dev server after changing `.env`

### "Row level security" errors
- Make sure you ran `update_rls_policies.sql` in Supabase
- Check Supabase Dashboard → Authentication → Policies

### Blog posts not showing
- Check Supabase Dashboard → Table Editor → blog_posts
- Make sure posts are marked as "published"

## Next Steps

### Before Production:
1. **Add Authentication** to protect `/admin` route
2. **Update RLS policies** to require auth for blog creation
3. **Add meta tags** for SEO
4. **Set up analytics**

### Deploy:
1. Push to GitHub
2. Connect to Vercel/Netlify
3. Add environment variables in hosting dashboard
4. Deploy!

## Quick Reference

**Admin Panel:** http://localhost:3000/admin  
**Supabase Dashboard:** https://supabase.com/dashboard  
**Documentation:** See README.md for full details

---

Need help? Check the browser console for errors or Supabase logs in the dashboard.
