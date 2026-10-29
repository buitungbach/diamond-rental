alter table public.renter_profiles
  add column if not exists chat_background_url text;

drop policy if exists "Renters delete own chat backgrounds" on storage.objects;
create policy "Renters delete own chat backgrounds"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'renter-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (storage.foldername(name))[2] = 'chat-backgrounds'
    and exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'renter'
    )
  );
