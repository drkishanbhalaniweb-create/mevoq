-- Blog Posts Migration
-- Run this ONLY if you already have the other tables created

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    author_role TEXT,
    featured_image TEXT,
    category TEXT DEFAULT 'general',
    tags JSONB DEFAULT '[]'::jsonb,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for blog posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Enable RLS for blog posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for published posts" ON blog_posts;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON blog_posts;

-- Public read access for published posts
CREATE POLICY "Enable read access for published posts" ON blog_posts 
FOR SELECT USING (published = true);

-- Authenticated users can manage all posts
CREATE POLICY "Enable all access for authenticated users" ON blog_posts 
FOR ALL USING (auth.role() = 'authenticated');
