# Deployment Guide

## Option 1: Vercel (Recommended - Easiest)

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Create React App

3. **Add Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add:
     - `REACT_APP_SUPABASE_URL` = your Supabase URL
     - `REACT_APP_SUPABASE_ANON_KEY` = your Supabase anon key

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Custom Domain
- Go to Vercel project → Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

## Option 2: Netlify

### Steps

1. **Build the Project**
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Drag and drop the `build` folder
   - Or connect GitHub repository

3. **Add Environment Variables**
   - Site settings → Environment variables
   - Add the same variables as Vercel

4. **Configure Build Settings** (if using GitHub)
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `frontend`

---

## Option 3: AWS S3 + CloudFront

### Prerequisites
- AWS account
- AWS CLI installed

### Steps

1. **Build the Project**
```bash
cd frontend
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://your-bucket-name
aws s3 website s3://your-bucket-name --index-document index.html
```

3. **Upload Files**
```bash
aws s3 sync build/ s3://your-bucket-name
```

4. **Set Bucket Policy**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}
```

5. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Set default root object: `index.html`

---

## Environment Variables

All deployment platforms need these:

```env
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
```

**Important:** Never commit `.env` files to Git!

---

## Post-Deployment Checklist

### Security
- [ ] Add authentication to `/admin` route
- [ ] Update Supabase RLS policies for production
- [ ] Enable HTTPS (usually automatic)
- [ ] Set up CORS in Supabase if needed

### SEO
- [ ] Add Google Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Add meta tags with `react-helmet`
- [ ] Set up Google Tag Manager

### Performance
- [ ] Enable CDN (CloudFront/Vercel Edge)
- [ ] Optimize images
- [ ] Enable compression
- [ ] Test with Lighthouse

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor Supabase usage
- [ ] Set up uptime monitoring
- [ ] Configure alerts

---

## Updating the Site

### Vercel/Netlify (Auto-deploy)
Just push to GitHub:
```bash
git add .
git commit -m "Update content"
git push
```

### Manual Deploy
```bash
npm run build
# Then upload build folder to your host
```

---

## Custom Domain Setup

### Vercel
1. Project Settings → Domains
2. Add your domain
3. Update DNS:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com

### Netlify
1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS:
   - Type: CNAME
   - Name: www
   - Value: your-site.netlify.app

---

## Troubleshooting

### Build Fails
- Check Node version (use 16+)
- Run `npm install --legacy-peer-deps`
- Check for console errors

### Environment Variables Not Working
- Restart build after adding variables
- Variables must start with `REACT_APP_`
- Check for typos in variable names

### 404 on Refresh
Add `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Slow Loading
- Enable CDN
- Optimize images
- Use lazy loading
- Check Supabase region (should be close to users)

---

## Cost Estimates

### Free Tier (Perfect for Starting)
- **Vercel/Netlify:** Free (100GB bandwidth)
- **Supabase:** Free (500MB database, 2GB bandwidth)
- **Total:** $0/month

### Production (Medium Traffic)
- **Vercel Pro:** $20/month (1TB bandwidth)
- **Supabase Pro:** $25/month (8GB database, 50GB bandwidth)
- **Custom Domain:** $12/year
- **Total:** ~$45/month

---

## Backup Strategy

### Database Backups
- Supabase Pro includes daily backups
- Free tier: Export manually from dashboard
- Set up weekly exports to S3

### Code Backups
- GitHub is your backup
- Tag releases: `git tag v1.0.0`
- Keep production branch separate

---

## Support

- **Vercel:** https://vercel.com/support
- **Netlify:** https://www.netlify.com/support/
- **Supabase:** https://supabase.com/docs

---

## Quick Deploy Commands

```bash
# Build
npm run build

# Test build locally
npx serve -s build

# Deploy to Vercel (with CLI)
npx vercel

# Deploy to Netlify (with CLI)
npx netlify deploy --prod
```

---

That's it! Your site should now be live and accessible worldwide. 🚀
