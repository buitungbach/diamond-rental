create or replace function public.list_pending_manual_payments()
returns table (
  booking_id uuid,
  code text,
  invoice_number text,
  customer_name text,
  renter_name text,
  total_vnd bigint,
  transfer_reference text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;

  return query
  select
    b.id,
    b.code,
    b.invoice_number,
    customer.full_name,
    renter.display_name,
    b.total_vnd,
    b.transfer_reference,
    b.created_at
  from public.bookings b
  join public.profiles customer on customer.id = b.customer_id
  join public.renter_profiles renter on renter.id = b.renter_profile_id
  where b.status = 'pending'
  order by b.created_at desc;
end;
$$;

revoke all on function public.list_pending_manual_payments() from public, anon;
grant execute on function public.list_pending_manual_payments() to authenticated;

create or replace function public.confirm_manual_bank_payment(
  p_code text,
  p_reference_code text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor_id uuid := (select auth.uid());
  v_reference text := upper(trim(coalesce(p_reference_code, '')));
  v_transaction_id text;
  v_booking public.bookings%rowtype;
  v_existing public.payment_transactions%rowtype;
begin
  if not exists (
    select 1
    from public.profiles p
    where p.id = v_actor_id
      and p.role = 'admin'
  ) then
    raise exception 'Administrator access required';
  end if;

  if p_code is null or length(trim(p_code)) not between 8 and 32 then
    raise exception 'Invalid booking code';
  end if;
  if v_reference = '' or length(v_reference) > 160 then
    raise exception 'A valid bank transaction reference is required';
  end if;

  v_transaction_id := 'MANUAL:' || v_reference;

  select *
  into v_booking
  from public.bookings b
  where b.code = upper(trim(p_code))
  for update;

  if not found then
    raise exception 'Booking not found';
  end if;

  select *
  into v_existing
  from public.payment_transactions t
  where t.transaction_id = v_transaction_id;

  if found then
    if v_existing.booking_id = v_booking.id
       and v_existing.amount_vnd = v_booking.total_vnd
       and v_booking.status in ('paid', 'completed') then
      return true;
    end if;
    raise exception 'Bank transaction reference has already been used';
  end if;

  if v_booking.status <> 'pending' then
    raise exception 'Booking is not awaiting payment';
  end if;

  insert into public.payment_transactions (
    transaction_id,
    booking_id,
    amount_vnd,
    reference_code,
    payload
  ) values (
    v_transaction_id,
    v_booking.id,
    v_booking.total_vnd,
    v_reference,
    jsonb_build_object(
      'provider', 'manual_bank_transfer',
      'confirmed_by', v_actor_id,
      'booking_code', v_booking.code
    )
  );

  update public.bookings
  set status = 'paid', paid_at = now()
  where id = v_booking.id;

  return true;
end;
$$;

revoke all on function public.confirm_manual_bank_payment(text, text) from public, anon;
grant execute on function public.confirm_manual_bank_payment(text, text) to authenticated;
