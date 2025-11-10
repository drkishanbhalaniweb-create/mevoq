-- Update RLS policies to allow public access for the frontend

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON contacts;
DROP POLICY IF EXISTS "Enable insert for all users" ON contacts;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON contacts;

DROP POLICY IF EXISTS "Enable read access for published posts" ON blog_posts;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON blog_posts;

-- Contacts: Allow public insert and read
CREATE POLICY "Enable insert for all users" ON contacts 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON contacts 
FOR SELECT USING (true);

-- Blog Posts: Allow public read for published, public insert/update/delete for all
CREATE POLICY "Enable read for published posts" ON blog_posts 
FOR SELECT USING (published = true OR true);  -- Allow reading all posts (for admin)

CREATE POLICY "Enable insert for all users" ON blog_posts 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON blog_posts 
FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON blog_posts 
FOR DELETE USING (true);

-- Other tables: Allow public read
CREATE POLICY "Enable read for all users" ON testimonials 
FOR SELECT USING (true);

CREATE POLICY "Enable read for all users" ON case_studies 
FOR SELECT USING (true);

CREATE POLICY "Enable read for all users" ON team 
FOR SELECT USING (true);

CREATE POLICY "Enable read for all users" ON services 
FOR SELECT USING (true);

CREATE POLICY "Enable read for all users" ON resources 
FOR SELECT USING (true);
