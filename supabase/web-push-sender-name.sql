-- Run after web-push-immediate.sql.

create or replace function public.notify_chat_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_recipient uuid;
  v_booking_code text;
  v_sender_name text;
  v_recipient_profile public.profiles%rowtype;
begin
  if new.sender_kind = 'persona' or new.sender_id is null then
    return new;
  end if;
  if tg_table_name = 'messages' then
    select case when booking.customer_id = new.sender_id then renter.owner_id else booking.customer_id end,
      booking.code,
      case when new.sender_kind = 'customer' then sender.full_name else renter.display_name end
    into v_recipient, v_booking_code, v_sender_name
    from public.bookings booking
    left join public.renter_profiles renter on renter.id = booking.renter_profile_id
    left join public.profiles sender on sender.id = new.sender_id
    where booking.id = new.booking_id and booking.status in ('paid', 'completed');
  else
    select case when thread.admin_id = new.sender_id then renter.owner_id else thread.admin_id end,
      'ADMIN',
      case when new.sender_kind = 'admin' then sender.full_name else renter.display_name end
    into v_recipient, v_booking_code, v_sender_name
    from public.admin_chat_threads thread
    join public.renter_profiles renter on renter.id = thread.renter_profile_id
    left join public.profiles sender on sender.id = new.sender_id
    where thread.id = new.thread_id;
  end if;
  if v_recipient is null or v_recipient = new.sender_id then
    return new;
  end if;
  select * into v_recipient_profile from public.profiles where id = v_recipient;
  insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
  values (
    v_recipient,
    'new_message',
    'Tin nhắn từ ' || coalesce(nullif(trim(v_sender_name), ''), 'người dùng'),
    'Bạn có tin nhắn mới.',
    v_booking_code
  );
  perform public.enqueue_email(v_recipient, v_recipient_profile.email, 'new_message',
    jsonb_build_object('booking_code', v_booking_code, 'recipient', v_recipient_profile.full_name));
  return new;
end;
$$;
drop trigger if exists notify_booking_message_after_insert on public.messages;
create trigger notify_booking_message_after_insert after insert on public.messages
  for each row execute function public.notify_chat_message();
drop trigger if exists notify_admin_chat_message_after_insert on public.admin_chat_messages;
create trigger notify_admin_chat_message_after_insert after insert on public.admin_chat_messages
  for each row execute function public.notify_chat_message();

create or replace function public.notify_persona_chat_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_recipient uuid;
  v_reference_code text;
  v_sender_name text;
begin
  if tg_table_name = 'messages' then
    select booking.customer_id, booking.code, renter.display_name
    into v_recipient, v_reference_code, v_sender_name
    from public.bookings booking
    join public.renter_profiles renter on renter.id = booking.renter_profile_id
    where booking.id = new.booking_id
      and booking.status in ('paid', 'completed');
  else
    select thread.admin_id, 'ADMIN', renter.display_name
    into v_recipient, v_reference_code, v_sender_name
    from public.admin_chat_threads thread
    join public.renter_profiles renter on renter.id = thread.renter_profile_id
    where thread.id = new.thread_id;
  end if;
  if v_recipient is not null then
    insert into public.app_notifications (user_id, notification_type, title, body, reference_code)
    values (
      v_recipient,
      'new_message',
      'Tin nhắn từ ' || coalesce(nullif(trim(v_sender_name), ''), 'nhân vật AI'),
      'Bạn có tin nhắn mới.',
      v_reference_code
    );
  end if;
  return new;
end;
$$;
revoke all on function public.notify_persona_chat_message() from public, anon, authenticated;
drop trigger if exists notify_persona_chat_message_after_insert on public.messages;
create trigger notify_persona_chat_message_after_insert
  after insert on public.messages
  for each row when (new.sender_kind = 'persona')
  execute function public.notify_persona_chat_message();
drop trigger if exists notify_persona_admin_chat_message_after_insert on public.admin_chat_messages;
create trigger notify_persona_admin_chat_message_after_insert
  after insert on public.admin_chat_messages
  for each row when (new.sender_kind = 'persona')
  execute function public.notify_persona_chat_message();
