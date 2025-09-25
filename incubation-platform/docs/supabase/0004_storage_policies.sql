-- Storage RLS policies for multi-tenant access
-- Assumes users are linked in public.users with organization_id and role

-- Ensure RLS is enabled on storage.objects (usually enabled by default)
alter table storage.objects enable row level security;

-- ========== Avatars bucket (public read; user-owned writes) ==========
-- Public read via CDN; also allow select through PostgREST
create policy if not exists avatars_public_read on storage.objects
for select using (bucket_id = 'avatars');

-- Only the authenticated user can write/update/delete within their own prefix: <uid>/...
create policy if not exists avatars_user_write on storage.objects
for insert to authenticated
with check (
  bucket_id = 'avatars'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy if not exists avatars_user_update on storage.objects
for update to authenticated
using (
  bucket_id = 'avatars'
  and split_part(name, '/', 1) = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and split_part(name, '/', 1) = auth.uid()::text
);

create policy if not exists avatars_user_delete on storage.objects
for delete to authenticated
using (
  bucket_id = 'avatars'
  and split_part(name, '/', 1) = auth.uid()::text
);

-- ========== Startup logos bucket (public read; org-scoped writes) ==========
create policy if not exists logos_public_read on storage.objects
for select using (bucket_id = 'startup-logos');

-- Allow admins/program_managers/founders from the same org to write/update/delete
create policy if not exists logos_org_write on storage.objects
for insert to authenticated
with check (
  bucket_id = 'startup-logos'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
);

create policy if not exists logos_org_update on storage.objects
for update to authenticated
using (
  bucket_id = 'startup-logos'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
)
with check (
  bucket_id = 'startup-logos'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
);

create policy if not exists logos_org_delete on storage.objects
for delete to authenticated
using (
  bucket_id = 'startup-logos'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
);

-- ========== Documents bucket (private; org-based access) ==========
-- Read: any org member can read documents for their org
create policy if not exists org_docs_read on storage.objects
for select to authenticated
using (
  bucket_id = 'documents'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
);

-- Write (insert/update/delete): restrict to admins/PMs/founders in the same org
create policy if not exists org_docs_insert on storage.objects
for insert to authenticated
with check (
  bucket_id = 'documents'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
);

create policy if not exists org_docs_update on storage.objects
for update to authenticated
using (
  bucket_id = 'documents'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
)
with check (
  bucket_id = 'documents'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
);

create policy if not exists org_docs_delete on storage.objects
for delete to authenticated
using (
  bucket_id = 'documents'
  and (metadata->>'organization_id')::uuid = (
    select organization_id from public.users where id = auth.uid()
  )
  and exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin','program_manager','founder')
  )
);

