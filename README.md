# Maglinc Pharmaceutical Consulting Website

A modern, SEO-optimized website for pharmaceutical regulatory consulting services built with React and Supabase.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-first approach
- 🔍 SEO-optimized multi-page structure
- 📝 Blog system with admin panel
- 📧 Contact form with lead capture
- 🗄️ Supabase backend (no server needed!)
- ⚡ Fast and lightweight

## Tech Stack

- **Frontend:** React 19, React Router, Tailwind CSS
- **UI Components:** Radix UI (shadcn/ui)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Can be deployed to Vercel, Netlify, or any static host

## Project Structure

```
frontend/
├── src/
│   ├── pages/           # Page components
│   │   ├── Home.js      # Homepage
│   │   ├── About.js     # About page
│   │   ├── Services.js  # Services listing
│   │   ├── ServiceDetail.js
│   │   ├── Blog.js      # Blog listing
│   │   ├── BlogPost.js  # Individual blog post
│   │   ├── Contact.js   # Contact form
│   │   └── Admin.js     # Admin panel
│   ├── components/
│   │   ├── Layout.js    # Shared layout
│   │   └── ui/          # Reusable UI components
│   ├── lib/
│   │   ├── supabase.js  # Supabase client
│   │   └── api.js       # API helper functions
│   ├── App.js           # Main app with routing
│   └── App.css          # Global styles
└── public/

backend/
├── supabase_schema.sql       # Initial database schema
├── blog_migration.sql        # Blog tables migration
└── update_rls_policies.sql   # Row Level Security policies
```

## Setup Instructions

### 1. Supabase Setup

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run these files in order:
   - `backend/supabase_schema.sql` (creates all tables)
   - `backend/blog_migration.sql` (adds blog tables if not already created)
   - `backend/update_rls_policies.sql` (sets up security policies)

### 2. Environment Variables

Create `frontend/.env` with your Supabase credentials:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from: Supabase Dashboard → Project Settings → API

### 3. Install Dependencies

```bash
cd frontend
npm install --legacy-peer-deps
```

### 4. Run Development Server

```bash
npm start
```

The app will be available at http://localhost:3000

## Pages & Routes

- `/` - Homepage with hero, stats, and services preview
- `/about` - About page with team information
- `/services` - Services listing
- `/services/:id` - Individual service detail pages
- `/blog` - Blog listing with category filter
- `/blog/:slug` - Individual blog post pages
- `/contact` - Contact form
- `/admin` - Admin panel for managing blog posts

## Admin Panel

Access the admin panel at `/admin` to:
- Create, edit, and delete blog posts
- View contact form submissions
- Manage published/draft status
- Add categories and tags

**Note:** Currently has no authentication. Add authentication before deploying to production!

## Database Tables

- `contacts` - Contact form submissions
- `blog_posts` - Blog posts with categories and tags
- `testimonials` - Client testimonials
- `case_studies` - Success stories
- `team` - Team member profiles
- `services` - Service offerings
- `resources` - FAQs and resources

## Deployment

### Build for Production

```bash
cd frontend
npm run build
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
4. Deploy!

### Deploy to Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variables
6. Deploy!

## Security Considerations

### Before Production:

1. **Add Authentication to Admin Panel**
   - Use Supabase Auth
   - Protect `/admin` route
   - Update RLS policies to require authentication

2. **Update RLS Policies**
   - Current policies allow public insert (for demo)
   - Restrict blog post creation to authenticated users
   - Keep contact form public

3. **Environment Variables**
   - Never commit `.env` files
   - Use environment variables in hosting platform
   - Rotate keys if exposed

## SEO Optimization

The site is built with SEO in mind:
- ✅ Clean, descriptive URLs
- ✅ Separate pages for each content type
- ✅ Individual service and blog post pages
- ✅ Semantic HTML structure
- ✅ Fast loading times

### Recommended Additions:

1. **Meta Tags** - Add unique meta tags to each page using `react-helmet`
2. **Sitemap** - Generate sitemap.xml for search engines
3. **Analytics** - Add Google Analytics or similar
4. **Structured Data** - Add JSON-LD for rich snippets
5. **Open Graph Tags** - For social media sharing

## Customization

### Colors

Edit `frontend/src/App.css` to change the color scheme:

```css
:root {
  --midnight: #0b1938;
  --neon-teal: #00E6E6;
  --signal-green: #44FFAB;
  --magenta: #F640A9;
  --lemon: #FFF63B;
}
```

### Content

- Mock data is in `frontend/src/lib/api.js`
- Add real data through Supabase dashboard or admin panel
- Update company info in `frontend/src/pages/Contact.js`

## Performance

- Lazy loading for images
- Code splitting with React Router
- Optimized build with Create React App
- Direct Supabase connection (no API middleman)

## Support

For issues or questions:
1. Check Supabase dashboard for database issues
2. Check browser console for frontend errors
3. Verify environment variables are set correctly

## License

MIT License - feel free to use for your projects!

## Credits

Built with:
- [React](https://react.dev/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
