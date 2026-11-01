-- Allow administrators to manage published photo galleries for AI profiles.
-- Human renters retain the existing pending-review upload flow.

grant insert (renter_profile_id, media_url, media_type, caption, status, is_ai_generated)
  on public.renter_gallery to authenticated;

drop policy if exists "Admins add AI character gallery photos" on public.renter_gallery;
create policy "Admins add AI character gallery photos"
  on public.renter_gallery for insert to authenticated
  with check (
    status = 'published'
    and not is_ai_generated
    and media_type = 'image'
    and exists (
      select 1
      from public.renter_profiles renter
      join public.profiles profile on profile.id = (select auth.uid())
      where renter.id = renter_gallery.renter_profile_id
        and renter.persona_mode = 'ai'
        and renter.owner_id is null
        and profile.role = 'admin'
    )
  );

drop policy if exists "Admins remove AI character gallery photos" on public.renter_gallery;
create policy "Admins remove AI character gallery photos"
  on public.renter_gallery for delete to authenticated
  using (
    exists (
      select 1
      from public.renter_profiles renter
      join public.profiles profile on profile.id = (select auth.uid())
      where renter.id = renter_gallery.renter_profile_id
        and renter.persona_mode = 'ai'
        and renter.owner_id is null
        and profile.role = 'admin'
    )
  );

drop policy if exists "Admins upload AI character gallery photos" on storage.objects;
create policy "Admins upload AI character gallery photos"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'renter-social-media'
    and exists (
      select 1
      from public.renter_profiles renter
      join public.profiles profile on profile.id = (select auth.uid())
      where renter.id::text = (storage.foldername(name))[1]
        and renter.persona_mode = 'ai'
        and renter.owner_id is null
        and profile.role = 'admin'
    )
  );

drop policy if exists "Admins remove AI character gallery photos from storage" on storage.objects;
create policy "Admins remove AI character gallery photos from storage"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'renter-social-media'
    and exists (
      select 1
      from public.renter_profiles renter
      join public.profiles profile on profile.id = (select auth.uid())
      where renter.id::text = (storage.foldername(name))[1]
        and renter.persona_mode = 'ai'
        and renter.owner_id is null
        and profile.role = 'admin'
    )
  );
