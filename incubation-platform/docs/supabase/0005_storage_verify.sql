-- Introspection + verification queries

-- 1) Confirm buckets exist
select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
order by id;

-- 2) List policies on storage.objects
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'storage' and tablename = 'objects'
order by policyname;

-- 3) (Optional) Check current user org/role mapping
select u.id as user_id, u.organization_id, u.role
from public.users u
where u.id = auth.uid();

-- 4) (Optional) Show example of enforcing name prefix for avatars
--    This simply demonstrates how the policy will evaluate the name path
select split_part('00000000-0000-0000-0000-000000000001/avatar.jpg','/',1) as prefix;

