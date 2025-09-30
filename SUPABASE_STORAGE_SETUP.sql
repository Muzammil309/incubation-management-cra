-- ============================================
-- SUPABASE STORAGE BUCKET SETUP
-- ============================================
-- Project: incubation management (njdatlcgjhjajztcfqar)
-- Bucket: speaker-materials
-- Purpose: Store speaker presentation materials, documents, and files
-- ============================================

-- Step 1: Create the storage bucket (do this via Supabase Dashboard UI)
-- Bucket Name: speaker-materials
-- Public: Yes (enabled)
-- File size limit: 10MB
-- Allowed MIME types: 
--   - application/pdf
--   - application/vnd.ms-powerpoint
--   - application/vnd.openxmlformats-officedocument.presentationml.presentation
--   - application/msword
--   - application/vnd.openxmlformats-officedocument.wordprocessingml.document
--   - image/jpeg
--   - image/png
--   - image/gif

-- ============================================
-- Step 2: Set up Row Level Security (RLS) Policies
-- ============================================

-- Policy 1: Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'speaker-materials'
);

-- Policy 2: Allow public read access to all files
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'speaker-materials'
);

-- Policy 3: Allow authenticated users to delete files
-- Note: In production, you should restrict this to only allow users to delete their own files
CREATE POLICY "Allow authenticated users to delete files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'speaker-materials'
);

-- Policy 4: Allow authenticated users to update files
CREATE POLICY "Allow authenticated users to update files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'speaker-materials'
)
WITH CHECK (
  bucket_id = 'speaker-materials'
);

-- ============================================
-- Step 3: Enable RLS on storage.objects (if not already enabled)
-- ============================================
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ============================================
-- OPTIONAL: More Restrictive Policies for Production
-- ============================================

-- If you want to restrict deletions to only the file owner, use this instead:
-- First, you need to store the user_id in the file path or metadata
-- Then create a policy like this:

/*
CREATE POLICY "Allow users to delete only their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'speaker-materials' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
*/

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE name = 'speaker-materials';

-- Check policies on storage.objects
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- List all files in the bucket
SELECT * FROM storage.objects WHERE bucket_id = 'speaker-materials';

-- ============================================
-- MANUAL STEPS TO COMPLETE IN SUPABASE DASHBOARD
-- ============================================

/*
1. Go to https://supabase.com/dashboard
2. Select project: "incubation management" (njdatlcgjhjajztcfqar)
3. Click "Storage" in the left sidebar
4. Click "New Bucket" button
5. Configure bucket:
   - Name: speaker-materials
   - Public bucket: ✅ Enabled
   - File size limit: 10485760 (10MB in bytes)
   - Allowed MIME types: (leave empty to allow all, or specify the types listed above)
6. Click "Create Bucket"
7. Go to "Policies" tab in Storage
8. Click "New Policy" and run the SQL commands above
9. Test by uploading a file through the dashboard
10. Verify the file is accessible via the public URL
*/

-- ============================================
-- TESTING THE SETUP
-- ============================================

/*
After creating the bucket and policies, test with these steps:

1. Upload a test file through Supabase Dashboard:
   - Go to Storage > speaker-materials
   - Click "Upload File"
   - Select a PDF or image file
   - Verify it uploads successfully

2. Get the public URL:
   - Click on the uploaded file
   - Copy the public URL
   - Open it in a browser to verify public access works

3. Test deletion:
   - Select the file
   - Click "Delete"
   - Verify it deletes successfully

4. Test through the application:
   - Go to Speaker Dashboard > Materials tab
   - Try uploading a file
   - Verify it appears in the file list
   - Try downloading the file
   - Try deleting the file
*/

-- ============================================
-- TROUBLESHOOTING
-- ============================================

/*
If uploads fail:
1. Check that RLS is enabled: ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
2. Verify policies exist: SELECT * FROM pg_policies WHERE tablename = 'objects';
3. Check bucket is public: SELECT * FROM storage.buckets WHERE name = 'speaker-materials';
4. Verify user is authenticated in the application
5. Check browser console for error messages
6. Check Supabase logs in Dashboard > Logs

If downloads fail:
1. Verify the bucket is set to public
2. Check the file URL is correct
3. Verify the SELECT policy allows public access

If deletions fail:
1. Verify user is authenticated
2. Check the DELETE policy exists
3. Verify the file path matches the policy conditions
*/

-- ============================================
-- CLEANUP (if needed)
-- ============================================

/*
To remove all policies and start over:

DROP POLICY IF EXISTS "Allow authenticated users to upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update files" ON storage.objects;

To delete the bucket (WARNING: This will delete all files):
-- Do this through the Supabase Dashboard UI, not SQL
*/

