-- Storage buckets migration (compatible across Supabase Storage versions)
-- Prefer inserting into storage.buckets for maximum compatibility.
-- Run in the SQL editor or via CLI migrations.

-- Create buckets (id, name, public)
insert into storage.buckets (id, name, public)
values
  ('avatars','avatars',true),
  ('startup-logos','startup-logos',true),
  ('documents','documents',false)
on conflict (id) do nothing;

-- Optional: set file size limit and allowed mime types for the private documents bucket
-- Uncomment and adjust as needed
-- update storage.buckets
--    set file_size_limit = 10485760, -- 10 MB
--        allowed_mime_types = array['application/pdf','image/png','image/jpeg']
--  where id = 'documents';

-- Verification
-- select id, name, public, file_size_limit, allowed_mime_types from storage.buckets order by id;

