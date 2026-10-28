/* Supabase-backed accounts, bookings, payments and chat for Diamond Rental. */
Object.assign(T, {
  acct_password: ["Mật khẩu", "Password", "パスワード"],
  acct_config_required: ["Cần cấu hình Supabase để đăng nhập và lưu dữ liệu trực tuyến.", "Configure Supabase to sign in and store data online.", "オンラインでログインしてデータを保存するにはSupabaseの設定が必要です。"],
  acct_backend_pending: ["Backend chưa được khởi tạo. Để bảo vệ dữ liệu của bạn, đăng ký, đặt lịch và thanh toán đang tạm khóa. Hãy chạy supabase/schema.sql theo hướng dẫn trong supabase/SETUP.md.", "The backend is not initialized. Registration, booking, and payment are disabled to protect your data. Run supabase/schema.sql as described in supabase/SETUP.md.", "バックエンドが初期化されていません。データ保護のため登録、予約、支払いを停止しています。supabase/SETUP.md の手順に従い supabase/schema.sql を実行してください。"],
  acct_auth_error: ["Không đăng nhập được. Kiểm tra email và mật khẩu; nếu chưa xác nhận email, hãy dùng nút gửi lại email xác nhận bên dưới.", "Could not sign in. Check your email and password; if your email is unconfirmed, use the resend confirmation button below.", "ログインできません。メールアドレスとパスワードを確認してください。メール未確認の場合は、下の確認メール再送ボタンを使用してください。"],
  acct_confirm_email: ["Hãy xác nhận email theo liên kết Supabase gửi trước khi đăng nhập.", "Confirm your email using the link sent by Supabase before signing in.", "Supabaseから届いたリンクでメールを確認してからログインしてください。"],
  acct_resend_confirmation: ["Gửi lại email xác nhận", "Resend confirmation email", "確認メールを再送"],
  acct_resend_sent: ["Đã yêu cầu gửi email xác nhận. Kiểm tra Hộp thư đến và Spam.", "Confirmation email requested. Check your inbox and spam folder.", "確認メールを再送しました。受信トレイと迷惑メールを確認してください。"],
  acct_smtp_domain_error: ["Supabase chưa gửi được email vì domain người gửi trong Resend chưa xác minh. Hãy xác minh domain trong Resend rồi đặt Sender email cùng domain trong Supabase SMTP Settings. Tài khoản không bị xóa.", "Supabase could not send the email because the sender domain is not verified in Resend. Verify the domain in Resend and use that same domain for Supabase's SMTP Sender email. Your account was not deleted.", "Resendで送信元ドメインが未確認のため、メールを送信できません。Resendでドメインを確認し、Supabase SMTPの送信元メールにも同じドメインを設定してください。アカウントは削除されていません。"],
  acct_smtp_rate_error: ["Email đang bị giới hạn gửi. Đừng bấm gửi liên tục; kiểm tra SMTP và thử lại sau khi hạn mức hồi phục.", "Email sending is rate-limited. Do not retry repeatedly; verify SMTP settings and try again after the limit resets.", "メール送信が制限されています。繰り返し再送せず、SMTP設定を確認し、制限解除後に再試行してください。"],
  acct_resend_error: ["Không gửi được email xác nhận. Kiểm tra domain và thông tin SMTP trong Supabase, rồi thử lại sau.", "Could not send the confirmation email. Check the domain and SMTP settings in Supabase, then try again later.", "確認メールを送信できません。SupabaseのドメインとSMTP設定を確認し、後でもう一度お試しください。"],
  acct_underage: ["Bạn phải đủ 18 tuổi để đăng ký.", "You must be at least 18 to register.", "登録には18歳以上である必要があります。"],
  acct_email_confirm: ["Đã gửi yêu cầu đổi email. Hãy xác nhận email mới theo hướng dẫn của Supabase.", "Email change requested. Confirm the new address using Supabase's email.", "メール変更をリクエストしました。Supabaseからのメールで新しいアドレスを確認してください。"],
  acct_admin_note: ["Tài khoản quản trị chỉ dùng để quản lý hồ sơ AI.", "Admin accounts are limited to managing AI profiles.", "管理者アカウントはAIプロフィール管理専用です。"],
  ai_persona_setup: ["Hồ sơ và hướng dẫn nhập vai sẽ được lưu cùng nhau trên Supabase. Khi OPENAI_API_KEY đã được cấu hình, nhân vật tự dùng hệ thống chat AI hiện có; không cần sửa mã hoặc thêm Edge Function riêng cho từng nhân vật.", "The profile and persona instructions are saved together in Supabase. Once OPENAI_API_KEY is configured, the character automatically uses the existing AI chat system; no code changes or per-character Edge Function are needed.", "プロフィールとペルソナ指示はSupabaseに一緒に保存されます。OPENAI_API_KEYの設定後、キャラクターは既存のAIチャットを自動的に使用し、キャラクターごとのコード変更やEdge Functionは不要です。"],
  admin_add_character: ["+ Thêm nhân vật AI", "+ Add AI character", "+ AIキャラクターを追加"],
  renter_add_profile: ["+ Tạo hồ sơ của tôi", "+ Create my profile", "+ 自分のプロフィールを作成"],
  renter_edit_profile: ["Sửa hồ sơ của tôi", "Edit my profile", "自分のプロフィールを編集"],
  ai_persona_prompt_hint: ["Ví dụ: tính cách, cách xưng hô, sở thích, bối cảnh, cách phản hồi; luôn nói rõ đây là AI hư cấu và không hẹn gặp ngoài đời.", "Example: personality, speaking style, interests, background, response style; always disclose this is fictional AI and never arrange in-person meetings.", "例：性格、話し方、好み、背景、応答方法。架空のAIであることを明示し、対面を約束しないでください。"],
  profile_preview: ["Hồ sơ mẫu · chưa nhận đặt lịch", "Sample profile · not available to book", "サンプルプロフィール・予約不可"],
  ai_badge: ["Nhân vật AI · hư cấu", "Fictional AI character", "架空のAIキャラクター"],
  ai_book: ["Thuê ngay", "Book now", "今すぐ予約"],
  ai_booking_notice: ["Đây là nhân vật AI hư cấu. Lịch đặt chỉ dành cho trải nghiệm chat trực tuyến; không có cuộc gặp ngoài đời. Tin nhắn được gửi tới OpenAI để tạo câu trả lời, vui lòng không gửi thông tin nhạy cảm.", "This is a fictional AI character. Bookings are for online chat only; no in-person meeting is available. Messages are sent to OpenAI to generate replies; do not share sensitive information.", "架空のAIキャラクターです。予約はオンラインチャット体験のみで、対面はありません。返信生成のためメッセージはOpenAIに送信されます。機密情報を送らないでください。"],
  ck_agree: ["Tôi đủ 18 tuổi và hiểu đây là nhân vật AI hư cấu; dịch vụ chỉ chat trực tuyến, không có cuộc gặp ngoài đời.", "I am 18 or older and understand this is a fictional AI character for online chat only, with no in-person meeting.", "私は18歳以上で、架空のAIキャラクターとのオンラインチャットのみであり、対面はないことを理解しています。"],
  pay_transfer_note: ["Nội dung chuyển khoản", "Transfer description", "振込内容"],
  pay_transfer_hint: ["Chuyển khoản đúng số tiền và giữ nguyên nội dung. Quản trị viên sẽ đối chiếu sao kê Agribank trước khi xác nhận; không gửi ảnh biên lai thay cho tiền đã vào tài khoản.", "Transfer the exact amount and keep the payment description unchanged. An administrator will verify the Agribank statement before confirming; a receipt image does not replace funds received.", "正確な金額を振り込み、振込内容を変更しないでください。管理者が入金明細を確認してから確定します。振込画面の画像だけでは確認できません。"],
  pay_wait: ["Đang chờ quản trị viên đối chiếu tiền vào tài khoản. Chat chỉ mở sau khi xác nhận.", "Waiting for an administrator to verify the funds in the bank account. Chat unlocks only after confirmation.", "口座への入金確認を管理者が行っています。確認後にチャットを利用できます。"],
  manual_payment_title: ["Đối soát chuyển khoản", "Manual bank transfer review", "銀行振込の手動確認"],
  manual_payment_notice: ["Chỉ xác nhận sau khi tiền thực sự vào Agribank. Đối chiếu đúng số tiền và mã giao dịch trong sao kê; không dựa vào ảnh biên lai của khách.", "Confirm only after funds have arrived in Agribank. Match the exact amount and transaction reference in the bank statement; do not rely on a customer receipt image.", "Agribankへの実際の入金後にのみ確定してください。明細の金額と取引番号を照合し、顧客の振込画像だけを根拠にしないでください。"],
  manual_payment_reference: ["Mã giao dịch trong sao kê Agribank", "Transaction reference from the Agribank statement", "Agribank明細の取引番号"],
  manual_payment_confirm: ["Xác nhận đã nhận tiền", "Confirm funds received", "入金を確認"],
  manual_payment_empty: ["Không có đơn đang chờ thanh toán.", "No bookings are awaiting payment.", "支払い待ちの予約はありません。"],
  manual_payment_sql_missing: ["Chưa cài quy trình xác nhận thủ công. Quản trị viên cần chạy supabase/manual-payment.sql trong SQL Editor của Supabase.", "Manual confirmation is not installed. An administrator must run supabase/manual-payment.sql in the Supabase SQL Editor.", "手動確認が未設定です。管理者はSupabase SQL Editorで supabase/manual-payment.sql を実行してください。"],
  pay_qr_failed: ["Không tạo được QR. Kiểm tra thư viện QR rồi thử lại.", "Could not render the QR. Check the QR library and try again.", "QRを表示できません。QRライブラリを確認してください。"],
  pay_booking_failed: ["Không tạo được đơn. Vui lòng thử lại.", "Could not create the booking. Please try again.", "予約を作成できませんでした。もう一度お試しください。"],
  acct_access_denied: ["Tài khoản này không có quyền thực hiện thao tác.", "This account is not allowed to perform this action.", "このアカウントには操作権限がありません。"],
  chat_paid_only: ["Chat chỉ mở sau khi quản trị viên xác nhận đã nhận đủ tiền.", "Chat opens after an administrator confirms full payment.", "管理者が全額入金を確認した後にチャットを利用できます。"],
  demo: ["Chuyển khoản Agribank đang được quản trị viên đối chiếu thủ công; đơn và chat chỉ được mở sau khi xác nhận nhận đủ tiền.", "Agribank transfers are verified manually; bookings and chat unlock only after the funds are confirmed.", "Agribankへの振込は手動で確認されます。全額入金の確認後に予約とチャットが有効になります。"],
  chat_failed: ["Không tải được cuộc trò chuyện.", "Could not load the conversation.", "会話を読み込めませんでした。"],
  chat_send_failed: ["Không gửi được tin nhắn.", "Could not send the message.", "メッセージを送信できませんでした。"],
  chat_ai: ["Bạn đang trò chuyện với nhân vật AI hư cấu. Tin nhắn được gửi tới OpenAI để tạo câu trả lời; không gửi thông tin nhạy cảm.", "You are chatting with a fictional AI persona. Messages are sent to OpenAI to generate replies; do not share sensitive information.", "架空のAIキャラクターとの会話です。返信生成のためメッセージはOpenAIに送信されます。機密情報を送らないでください。"],
  acct_login: ["Đăng nhập", "Sign in", "ログイン"],
  acct_register: ["Đăng ký", "Create account", "アカウント作成"],
  chat_open: ["Mở trò chuyện", "Open chat", "チャットを開く"],
  chat_placeholder: ["Nhập tin nhắn", "Type a message", "メッセージを入力"],
  chat_send: ["Gửi", "Send", "送信"],
  chat_human: ["Tin nhắn được lưu trực tuyến và chỉ hai bên trong đơn thuê có thể truy cập.", "Messages are stored online and accessible only to the booking participants.", "メッセージはオンラインに保存され、予約の参加者のみが閲覧できます。"],
  notice: ["Nhân vật AI là hư cấu và chỉ có trải nghiệm chat trực tuyến, không gặp ngoài đời. Hồ sơ người thật do người dùng tự khai báo; hãy xác minh tuổi, thông tin và điều kiện gặp trước khi thanh toán.", "AI characters are fictional and available for online chat only, with no in-person meetings. Human profiles are self-reported; verify age, details, and meeting arrangements before paying.", "AIキャラクターは架空で、オンラインチャットのみ利用でき、対面はありません。人間のプロフィールは自己申告です。支払い前に年齢、情報、待ち合わせ条件を確認してください。"],
});

const sbConfig = window.DIAMOND_SUPABASE_CONFIG || {};
const sb = window.supabase?.createClient && sbConfig.url && sbConfig.anonKey
  ? window.supabase.createClient(sbConfig.url, sbConfig.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  })
  : null;
if (!sb) {
  T.notice = [
    "Đây là bản xem trước. Dịch vụ và thanh toán chưa hoạt động; không nhập hoặc gửi thông tin cá nhân thật.",
    "Preview only. The service and payments are not active; do not enter or send real personal information.",
    "プレビューのみです。サービスと支払いは利用できません。実際の個人情報を入力・送信しないでください。",
  ];
}
let remoteAccount = null;
let backendReady = false;
let adminPendingPayments = [];
let chatBookingId = "";
let chatChannel = null;
let notificationsChannel = null;
let bookingsChannel = null;
const localSave = window.save;
const localOpenProfile = window.openProfile;

window.save = function() {
  if (!sb) return localSave();
  try {
    localStorage.setItem(KEY, JSON.stringify({
      fav: S.fav,
      lang: S.lang,
      cur: S.cur,
      theme: S.theme,
    }));
  } catch (error) {
    console.error("Could not save local preferences", error.message);
    toast(t("storage_full"));
  }
};

function activeAccount() {
  return remoteAccount;
}

window.profileAddButtonHtml = function() {
  const account = activeAccount();
  if (!account || !["admin", "renter"].includes(account.role)) return "";
  const label = account.role === "admin" ? t("admin_add_character")
    : S.custom.some((profile) => profile.ownerId === account.id) ? t("renter_edit_profile")
      : t("renter_add_profile");
  return `<button class="btn sm ghost" onclick="openAdd()">${label}</button>`;
};

function authNotice() {
  return `<p class="notice">${esc(sb ? "Thông tin cá nhân được lưu trong tài khoản trực tuyến của bạn." : t("acct_config_required"))}</p>`;
}

function showError(id, message) {
  const el = $(id);
  if (el) el.textContent = message;
  else toast(message);
}

function rowToRenter(row) {
  if (!row) return null;
  const profile = {
    id: row.id,
    name: row.display_name,
    section: row.section,
    price: SECTIONS[row.section]?.price || SECTIONS.silver.price,
    color: "#7048e8",
    tags: Array.isArray(row.tags) ? row.tags : [],
    avail: { days: [0, 1, 2, 3, 4, 5, 6], from: 10, to: 22 },
    profile: [["Giới thiệu", row.bio || ""]],
    story: [],
    custom: true,
    profileType: row.persona_mode === "ai" ? "ai" : "real",
    catalogKey: row.catalog_key || null,
    ownerId: row.owner_id,
    avatarUrl: row.avatar_url,
  };
  if (row.avatar_url) S.imgs[row.id] = row.avatar_url;
  return profile;
}

async function loadRenterProfiles() {
  if (!sb) return;
  backendReady = false;
  const { data, error } = await sb.from("renter_profiles")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Could not load renter profiles", error.message);
    toast("Không tải được hồ sơ bạn gái thuê.");
    return;
  }
  S.custom = (data || []).map(rowToRenter);
  backendReady = true;
}

async function loadBookingRows() {
  if (!sb || !remoteAccount) return [];
  const { data, error } = await sb.from("bookings")
    .select("*, renter_profiles(id,owner_id,display_name,section,persona_mode,catalog_key)")
    .order("created_at", { ascending: false });
  if (error) throw error;

  S.orders = (data || []).map((row) => {
    const renter = Array.isArray(row.renter_profiles) ? row.renter_profiles[0] : row.renter_profiles;
    if (renter) {
      S.custom = S.custom.filter((profile) => profile.id !== renter.id);
      S.custom.unshift(rowToRenter(renter));
    }
    const guest = remoteAccount.role === "customer";
    return {
      code: row.code,
      invoiceNumber: row.invoice_number,
      id: row.renter_profile_id,
      svc: row.service_id,
      svcName: SVC.find((service) => service.id === row.service_id)?.n[0] || row.service_id,
      hours: row.hours,
      pkg: row.package_id,
      sessions: Array.isArray(row.sessions) ? row.sessions : [],
      place: row.meeting_place,
      cust: {
        name: guest ? remoteAccount.name : "",
        phone: guest ? remoteAccount.phone : "",
        email: guest ? remoteAccount.email : "",
        accountId: row.customer_id,
      },
      note: row.note || "",
      coupon: row.coupon || "",
      method: "qr",
      status: row.status === "completed" ? "done" : row.status,
      created: row.created_at,
      total: row.total_jpy,
      totalVnd: row.total_vnd,
      renterName: renter?.display_name || getG(row.renter_profile_id)?.name || "",
      renterOwnerId: renter?.owner_id || null,
      raw: row,
    };
  });
  return S.orders;
}

async function hydrateSession(user) {
  remoteAccount = null;
  if (!sb || !user) {
    S.orders = [];
    S.activeAccountId = null;
    currentChat = "";
    chatBookingId = "";
    if (sb) {
      if (notificationsChannel) sb.removeChannel(notificationsChannel);
      if (bookingsChannel) sb.removeChannel(bookingsChannel);
      if (chatChannel) sb.removeChannel(chatChannel);
      notificationsChannel = bookingsChannel = chatChannel = null;
    }
    if (typeof renderAll === "function") renderAll();
    return;
  }
  const { data, error } = await sb.from("profiles").select("*").eq("id", user.id).single();
  if (error) {
    console.error("Could not load account profile", error.message);
    toast("Không tải được hồ sơ tài khoản.");
    S.orders = [];
    S.activeAccountId = null;
    renderAll();
    return;
  }
  remoteAccount = {
    id: data.id,
    role: data.role,
    name: data.full_name,
    dob: data.date_of_birth,
    phone: data.phone,
    email: data.email || user.email || "",
  };
  S.activeAccountId = remoteAccount.id;
  if (remoteAccount.role === "renter") {
    const { data: own, error: ownError } = await sb.from("renter_profiles")
      .select("*").eq("owner_id", remoteAccount.id).maybeSingle();
    if (ownError) {
      console.error("Could not load the renter's profile", ownError.message);
      toast("Không tải được hồ sơ bạn gái thuê.");
    } else if (own && !S.custom.some((profile) => profile.id === own.id)) {
      S.custom.unshift(rowToRenter(own));
    }
  }
  try {
    await loadBookingRows();
  } catch (bookingError) {
    console.error("Could not load bookings", bookingError.message);
  }
  subscribeToNotifications();
  renderAll();
}

function subscribeToNotifications() {
  if (!sb || !remoteAccount) return;
  if (notificationsChannel) sb.removeChannel(notificationsChannel);
  notificationsChannel = sb.channel(`messages:${remoteAccount.id}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (event) => {
      if (event.new.sender_id !== remoteAccount.id) {
        toast("Tin nhắn mới trong cuộc trò chuyện đã thanh toán.");
        if (view === "orders") renderAll();
        if (view === "chat" && chatBookingId === event.new.booking_id) loadChatMessages();
      }
    })
    .subscribe();
  if (bookingsChannel) sb.removeChannel(bookingsChannel);
  bookingsChannel = sb.channel(`bookings:${remoteAccount.id}`)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "bookings" }, async () => {
      try {
        await loadBookingRows();
        if (view === "orders" || view === "account") renderAll();
      } catch (error) {
        console.error("Could not refresh bookings", error.message);
      }
    })
    .subscribe();
}

function renderRemoteAccountForm(mode) {
  $("app").innerHTML = `<h2>${t("acct_title")}</h2>${authNotice()}
    <div class="panel"><div class="r2">
      ${mode === "register" ? `<label class="field">${t("acct_role")}<select id="accRole">
        <option value="customer">${t("acct_customer")}</option>
        <option value="renter">${t("acct_girl")}</option>
      </select></label>` : ""}
      ${mode === "register" ? `<label class="field">${t("acct_name")}<input id="accName" maxlength="80" autocomplete="name" required></label>
      <label class="field">${t("acct_dob")}<input id="accDob" type="date" autocomplete="bday" required></label>
      <label class="field">${t("acct_phone")}<input id="accPhone" type="tel" autocomplete="tel" required></label>` : ""}
      <label class="field">${t("acct_email")}<input id="accEmail" type="email" autocomplete="email" required></label>
      <label class="field">${t("acct_password")}<input id="accPassword" type="password" minlength="8" autocomplete="${mode === "register" ? "new-password" : "current-password"}" required></label>
    </div><div class="err" id="accErr"></div>
    <div class="row"><button class="btn sm" onclick="accountAction('${mode}')">${t(mode === "register" ? "acct_register" : "acct_login")}</button>
      <button class="btn ghost sm" onclick="accountForm('${mode === "register" ? "login" : "register"}')">${t(mode === "register" ? "acct_login" : "acct_register")}</button>
      ${mode === "login" ? `<button class="btn ghost sm" id="accResend" onclick="resendConfirmationEmail()">${t("acct_resend_confirmation")}</button>` : ""}</div></div>`;
  const role = $("accRole");
  if (role) role.value = S.pendingAccountRole || "customer";
}

function accountForm(mode) {
  if (!sb) {
    $("app").innerHTML = `<h2>${t("acct_title")}</h2>${authNotice()}<p class="muted">Cấu hình URL và anon key trong <code>supabase-config.js</code> để bật đăng ký.</p>`;
    return;
  }
  if (!backendReady) {
    $("app").innerHTML = `<h2>${t("acct_title")}</h2><p class="notice">${t("acct_backend_pending")}</p>`;
    return;
  }
  renderRemoteAccountForm(mode);
}

async function accountAction(mode) {
  if (!sb) return showError("accErr", t("acct_config_required"));
  if (!backendReady) return accountForm(mode);
  const role = mode === "register" ? $("accRole").value : "";
  const email = emailKey($("accEmail").value);
  const password = $("accPassword").value;
  const errorEl = $("accErr");
  errorEl.textContent = "";
  if (!email || password.length < 8) {
    errorEl.textContent = t("acct_missing");
    return;
  }
  try {
    if (mode === "register") {
      const name = $("accName").value.trim();
      const dob = $("accDob").value;
      const phone = $("accPhone").value.trim();
      if (!name || !dob || !phone || !/^[0-9+\s().-]{8,20}$/.test(phone)) {
        errorEl.textContent = t("acct_missing");
        return;
      }
      if (accountAge(dob) < 18) {
        errorEl.textContent = t("acct_underage");
        return;
      }
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, date_of_birth: dob, phone, role },
        },
      });
      if (error) throw error;
      S.pendingAccountRole = role;
      if (!data.session) {
        errorEl.textContent = t("acct_confirm_email");
        return;
      }
      await hydrateSession(data.user);
      return;
    }
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await hydrateSession(data.user);
  } catch (error) {
    console.error("Authentication request failed", error.message);
    const message = String(error.message || "").toLowerCase();
    if (message.includes("domain is not verified")) {
      errorEl.textContent = t("acct_smtp_domain_error");
    } else if (message.includes("email rate limit exceeded")) {
      errorEl.textContent = t("acct_smtp_rate_error");
    } else if (message.includes("already registered")) {
      errorEl.textContent = `${t("acct_taken")} ${t("acct_auth_error")}`;
    } else if (message.includes("invalid login")) {
      errorEl.textContent = t("acct_auth_error");
    } else if (message.includes("could not send email") || message.includes("error sending confirmation email")) {
      errorEl.textContent = t("acct_resend_error");
    } else {
      errorEl.textContent = error.message;
    }
  }
}

window.resendConfirmationEmail = async function() {
  const email = emailKey($("accEmail")?.value || "");
  const errorEl = $("accErr");
  const button = $("accResend");
  if (!sb || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    if (errorEl) errorEl.textContent = t("acct_bad_email");
    return;
  }
  if (button) {
    button.disabled = true;
    button.textContent = t("processing");
  }
  if (errorEl) errorEl.textContent = "";
  const { error } = await sb.auth.resend({ type: "signup", email });
  if (error) {
    console.error("Could not resend confirmation email", error.message);
    const message = String(error.message || "").toLowerCase();
    if (errorEl) {
      errorEl.textContent = message.includes("domain is not verified")
        ? t("acct_smtp_domain_error")
        : message.includes("email rate limit exceeded")
          ? t("acct_smtp_rate_error")
          : t("acct_resend_error");
    }
    if (button) {
      button.disabled = false;
      button.textContent = t("acct_resend_confirmation");
    }
    return;
  }
  if (errorEl) errorEl.textContent = t("acct_resend_sent");
  if (button) button.textContent = t("acct_resend_sent");
};

function renderAccount() {
  const account = activeAccount();
  if (!account) return accountForm("login");
  const locked = account.role !== "renter";
  const accountType = account.role === "admin" ? "Quản trị viên"
    : t(account.role === "customer" ? "acct_customer" : "acct_girl");
  const accountNote = account.role === "admin" ? t("acct_admin_note")
    : t(locked ? "acct_readonly" : "acct_renter_note");
  $("app").innerHTML = `<h2>${t("acct_title")}</h2>
    <div class="panel"><div class="row" style="justify-content:space-between"><h3>${t(account.role === "customer" ? "acct_customer" : "acct_girl")}</h3>
      <button class="btn ghost sm" onclick="logoutAccount()">${t("acct_logout")}</button></div>
      <p class="muted">${esc(accountType)} · ${accountNote}</p>
      <div class="r2">
        <label class="field">${t("acct_name")}<input id="accName" value="${esc(account.name)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_dob")}<input id="accDob" type="date" value="${esc(account.dob)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_phone")}<input id="accPhone" type="tel" value="${esc(account.phone)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_email")}<input id="accEmail" type="email" value="${esc(account.email)}" ${locked ? "readonly" : ""}></label>
      </div>${locked ? "" : `<button class="btn sm" onclick="updateAccount()">${t("acct_save")}</button>`}
    </div>
    ${account.role === "renter" ? `<div class="panel"><h3>${t("acct_girl")}</h3>
      <button class="btn sm" onclick="openAdd()">${t(S.custom.some((profile) => profile.ownerId === account.id) ? "acct_edit_profile" : "acct_add_profile")}</button></div>` : ""}
    ${account.role === "admin" ? `<div class="panel"><h3>Quản lý nhân vật AI</h3>
      <p class="muted">Tạo hồ sơ nhân vật hư cấu; hệ thống sẽ trả lời bằng AI sau khi đơn được thanh toán.</p>
      <button class="btn sm" onclick="openAdd()">+ Thêm nhân vật AI</button>
      <button class="btn ghost sm" onclick="go('orders')">${t("manual_payment_title")}</button></div>` : ""}
    <div class="panel"><h3>${t("ord_t")}</h3><button class="btn ghost sm" onclick="go('orders')">${t("chat_inbox")}</button></div>`;
}

async function updateAccount() {
  const account = activeAccount();
  if (!sb || !account || account.role !== "renter") return toast(t("acct_access_denied"));
  const name = $("accName").value.trim();
  const dob = $("accDob").value;
  const phone = $("accPhone").value.trim();
  const email = emailKey($("accEmail").value);
  if (!name || !dob || accountAge(dob) < 18 || !/^[0-9+\s().-]{8,20}$/.test(phone)) {
    return toast(t("acct_missing"));
  }
  const { error } = await sb.from("profiles").update({
    full_name: name,
    date_of_birth: dob,
    phone,
  }).eq("id", account.id);
  if (error) {
    console.error("Could not update renter account", error.message);
    return toast(error.message);
  }
  account.name = name;
  account.dob = dob;
  account.phone = phone;
  if (email && email !== emailKey(account.email)) {
    const { error: emailError } = await sb.auth.updateUser({ email });
    if (emailError) {
      console.error("Could not request email update", emailError.message);
      return toast(emailError.message);
    }
    renderAll();
    return toast(t("acct_email_confirm"));
  }
  renderAll();
  toast(t("acct_profile_saved"));
}

function logoutAccount() {
  if (!sb) return;
  sb.auth.signOut().then(({ error }) => {
    if (error) {
      console.error("Sign out failed", error.message);
      return toast(error.message);
    }
    remoteAccount = null;
    S.activeAccountId = null;
    go("account");
  });
}

function openAdd() {
  const account = activeAccount();
  if (!account || !["renter", "admin"].includes(account.role)) {
    toast(t("acct_access_denied"));
    go("account");
    return;
  }
  const isAdmin = account.role === "admin";
  const existing = isAdmin ? null : S.custom.find((profile) => profile.ownerId === account.id);
  newImg = "";
  openBox(`<h2>${t(existing ? "acct_edit_profile" : "nc_title")}</h2>
    <p class="muted">${t(isAdmin ? "ai_persona_setup" : "acct_renter_note")}</p>
    ${isAdmin ? `<label class="field">${t("acct_name")}<input id="ncName" maxlength="80"></label>` : `<label class="field">${t("acct_name")}<input value="${esc(account.name)}" readonly></label>`}
    <label class="field">${t("nc_sec")}<select id="ncSec">${SEC_ORDER.map((key) => `<option value="${key}" ${existing?.section === key ? "selected" : ""}>${t("sec_" + key)} · ${fmt(SECTIONS[key].price)}</option>`).join("")}</select></label>
    <label class="field">${t("nc_tags")}<input id="ncTags" maxlength="80" value="${esc(existing?.tags.join(", ") || "")}"></label>
    <label class="field">${t("nc_bio")}<textarea id="ncBio" maxlength="1000">${esc(existing?.profile?.[0]?.[1] || "")}</textarea></label>
    <div class="row" style="margin-bottom:10px"><button class="btn ghost sm" onclick="fileImg(700,u=>{newImg=u;$('ncPrev').style.backgroundImage='url('+u+')'})">${t("photo")}</button>
      <div class="av" id="ncPrev" style="${existing ? bg(existing) : ""}"></div></div>
    ${isAdmin ? `<label class="field">Hướng dẫn tính cách cho AI<textarea id="personaPrompt" maxlength="4000" placeholder="${esc(t("ai_persona_prompt_hint"))}" required></textarea></label>` : ""}
    <div class="err" id="ncErr"></div>
    <button class="btn" onclick="saveChar()">${isAdmin ? "Tạo nhân vật AI" : t(existing ? "acct_save_profile" : "nc_save")}</button>`);
}

async function saveChar() {
  const account = activeAccount();
  if (!sb || !account || !["renter", "admin"].includes(account.role)) return toast(t("acct_access_denied"));
  const isAdmin = account.role === "admin";
  const displayName = isAdmin ? $("ncName").value.trim() : account.name.trim();
  const section = $("ncSec").value;
  const tags = $("ncTags").value.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 5);
  const bio = $("ncBio").value.trim();
  if (!displayName || !SECTIONS[section]) return showError("ncErr", t("nc_need"));

  let avatarUrl = S.custom.find((profile) => profile.ownerId === account.id)?.avatarUrl || null;
  if (newImg) {
    try {
      const blob = await fetch(newImg).then((response) => response.blob());
      const { data: uploaded, error: uploadError } = await sb.storage.from("renter-photos")
        .upload(`${isAdmin ? "ai" : account.id}/${crypto.randomUUID()}.jpg`, blob, {
          contentType: "image/jpeg",
          upsert: false,
        });
      if (uploadError) throw uploadError;
      avatarUrl = sb.storage.from("renter-photos").getPublicUrl(uploaded.path).data.publicUrl;
    } catch (error) {
      console.error("Could not upload profile photo", error.message);
      return showError("ncErr", error.message);
    }
  }

  if (isAdmin) {
    const systemPrompt = $("personaPrompt").value.trim();
    if (!systemPrompt) return showError("ncErr", "Hãy nhập hướng dẫn tính cách cho AI.");
    const { error } = await sb.rpc("create_ai_persona", {
      p_name: displayName,
      p_section: section,
      p_tags: tags.length ? tags : ["AI"],
      p_bio: bio,
      p_avatar_url: avatarUrl,
      p_system_prompt: systemPrompt,
    });
    if (error) {
      console.error("Could not create AI persona", error.message);
      return showError("ncErr", error.message);
    }
    await loadRenterProfiles();
    closeBox();
    view = "list";
    renderAll();
    toast("Đã thêm nhân vật AI.");
    return;
  }

  const { data, error } = await sb.from("renter_profiles").upsert({
    owner_id: account.id,
    display_name: displayName,
    section,
    tags: tags.length ? tags : ["Mới"],
    bio,
    avatar_url: avatarUrl,
    persona_mode: "human",
  }, { onConflict: "owner_id" }).select("*").single();
  if (error) {
    console.error("Could not save renter profile", error.message);
    return showError("ncErr", error.message);
  }
  const updated = rowToRenter(data);
  S.custom = S.custom.filter((profile) => profile.ownerId !== account.id);
  S.custom.unshift(updated);
  closeBox();
  view = "list";
  renderAll();
  toast(t("acct_profile_saved"));
}

window.renderChrome = function() {
  coreRenderChrome();
  const account = activeAccount();
  $("nav").insertAdjacentHTML("beforeend", `<button class="${view === "account" ? "on" : ""}" onclick="go('account')">${t("tab_account")}</button>`);
  $("ctl").insertAdjacentHTML("beforeend", `<button class="btn ghost sm" onclick="go('account')">${account ? esc(account.name) : t("tab_account")}</button>`);
};

window.renderAll = function() {
  renderChrome();
  if (view === "account") renderAccount();
  else if (view === "chat") renderChatPage();
  else if (view === "orders") renderRemoteOrders();
  else if (view === "list") {
    renderList();
    const addButton = document.querySelector('.tb-row button[onclick="openAdd()"]');
    if (addButton) addButton.hidden = !["renter", "admin"].includes(activeAccount()?.role);
    document.querySelectorAll('button[onclick^="chImg("]').forEach((button) => { button.hidden = true; });
  }
  else if (view === "rank") renderRank();
  else if (view === "vip") renderVip();
  else if (view === "checkout" && ck) renderCk();
};

async function renderAdminPaymentReview() {
  const app = $("app");
  app.innerHTML = `<h2>${t("manual_payment_title")}</h2><p class="notice">${t("manual_payment_notice")}</p><p class="muted">Đang tải...</p>`;
  const { data, error } = await sb.rpc("list_pending_manual_payments");
  if (view !== "orders") return;
  if (error) {
    console.error("Could not load manual payment review queue", error.message);
    app.innerHTML = `<h2>${t("manual_payment_title")}</h2><p class="notice">${t("manual_payment_sql_missing")}</p><p class="err">${esc(error.message)}</p>`;
    return;
  }

  adminPendingPayments = data || [];
  app.innerHTML = `<h2>${t("manual_payment_title")}</h2>
    <p class="notice">${t("manual_payment_notice")}</p>
    ${adminPendingPayments.length ? adminPendingPayments.map((payment, index) => `
      <div class="ord">
        <div class="top">
          <div style="flex:1;min-width:0">
            <b>${esc(payment.customer_name)}</b>
            <div class="muted">${esc(payment.renter_name)} · ${esc(payment.code)}</div>
            <div class="muted">Mã đối chiếu: <code>${esc(payment.transfer_reference)}</code> · ${esc(new Date(payment.created_at).toLocaleString("vi-VN"))}</div>
          </div>
          <div style="text-align:right"><b>${Number(payment.total_vnd).toLocaleString("vi-VN")} ₫</b><div class="st-b wait">${t("pay_pending")}</div></div>
        </div>
        <label class="field">${t("manual_payment_reference")}<input id="manualRef${index}" maxlength="160" autocomplete="off" required></label>
        <button class="btn sm" onclick="confirmManualPayment(${index})">${t("manual_payment_confirm")}</button>
      </div>`).join("") : `<p class="sub">${t("manual_payment_empty")}</p>`}`;
}

window.confirmManualPayment = async function(index) {
  const account = activeAccount();
  const payment = adminPendingPayments[index];
  const referenceInput = $(`manualRef${index}`);
  const reference = referenceInput?.value.trim() || "";
  if (!sb || !backendReady || account?.role !== "admin" || !payment) {
    return toast(t("acct_access_denied"));
  }
  if (!reference || reference.length > 160) {
    referenceInput?.focus();
    return toast(t("acct_missing"));
  }
  if (!window.confirm(`Chỉ xác nhận sau khi đã thấy tiền vào Agribank.\n\nĐối chiếu sao kê cho đơn ${payment.code}, đúng ${Number(payment.total_vnd).toLocaleString("vi-VN")} ₫ và mã giao dịch ${reference}.\n\nXác nhận đã nhận đủ tiền?`)) {
    return;
  }
  const button = referenceInput.closest(".ord")?.querySelector("button");
  if (button) button.disabled = true;
  const { error } = await sb.rpc("confirm_manual_bank_payment", {
    p_code: payment.code,
    p_reference_code: reference,
  });
  if (error) {
    console.error("Could not confirm manual bank payment", error.message);
    toast(error.message || "Không xác nhận được giao dịch.");
    if (button) button.disabled = false;
    return;
  }
  toast("Đã ghi nhận khoản tiền vào Agribank.");
  await renderAdminPaymentReview();
};

window.openProfile = function(id, index) {
  localOpenProfile(id, index);
  const box = $("box");
  if (!box || $("ov").hidden) return;
  box.querySelectorAll("#delc, button[onclick^='chImg('], button[onclick^='addPic('], button[onclick^='delPic('], .thumbs .del")
    .forEach((button) => button.remove());
  const addPhoto = [...box.querySelectorAll(".thumbs button")]
    .find((button) => button.textContent.includes(t("addphoto")));
  if (addPhoto) addPhoto.remove();
};

window.chImg = function() { toast("Ảnh hồ sơ được quản lý trong mục Tài khoản."); };
window.addPic = function() { toast("Thư viện ảnh chưa được kết nối backend."); };
window.delPic = function() { toast("Thư viện ảnh chưa được kết nối backend."); };
window.delChar = function() { toast("Hãy quản lý hồ sơ trong mục Tài khoản."); };

window.startCk = function(id) {
  const account = activeAccount();
  if (!sb || !account || account.role !== "customer") {
    toast(t("acct_access_denied"));
    go("account");
    return;
  }
  const selected = getG(id);
  const backendProfile = S.custom.find((profile) => profile.id === id || profile.id === selected?.backendId);
  if (!backendProfile) {
    toast("Chỉ nhận đặt lịch với hồ sơ đã kết nối backend.");
    return;
  }
  coreStartCk(backendProfile.id);
  ck.name = account.name;
  ck.phone = account.phone;
  ck.email = account.email;
  ck.age = accountAge(account.dob);
  renderCk();
};

function qrPayload(amountVnd, reference) {
  const tlv = (id, value) => id + String(value.length).padStart(2, "0") + value;
  const accountNumber = "6440205910363";
  const bankBin = "970405";
  const merchantAccount = tlv("00", "A000000727")
    + tlv("01", tlv("00", bankBin) + tlv("01", accountNumber))
    + tlv("02", "QRIBFTTA");
  const additionalData = tlv("08", reference);
  const content = tlv("00", "01") + tlv("01", "12")
    + tlv("38", merchantAccount) + tlv("53", "704")
    + tlv("54", String(amountVnd)) + tlv("58", "VN")
    + tlv("59", "BUI TUNG BACH") + tlv("62", additionalData) + "6304";
  let crc = 0xffff;
  for (let i = 0; i < content.length; i++) {
    crc ^= content.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return content + crc.toString(16).toUpperCase().padStart(4, "0");
}

function renderQr(elementId, amountVnd, reference) {
  const target = $(elementId);
  if (!target || !window.QRCode) return toast(t("pay_qr_failed"));
  target.replaceChildren();
  new window.QRCode(target, {
    text: qrPayload(amountVnd, reference),
    width: 280,
    height: 280,
    correctLevel: window.QRCode.CorrectLevel.M,
  });
}

function paymentHtml(booking) {
  const amount = Number(booking.total_vnd ?? booking.totalVnd).toLocaleString("vi-VN");
  return `<div id="orderQr" class="qr-image" style="width:280px;height:280px;padding:8px" aria-label="VietQR thanh toán Agribank"></div>
    <p class="notice">${esc(t("pay_transfer_hint"))}</p>
    <p><b>${esc(t("pay_transfer_note"))}:</b> <code>${esc(booking.code)}</code></p>
    <p><b>Người nhận:</b> BUI TUNG BACH · Agribank · 6440205910363</p>
    <p><b>Số tiền:</b> ${amount} ₫</p>
    <p class="muted">${esc(t("pay_wait"))}</p>`;
}

window.openPay = function() {
  if (!ck) return;
  const existing = ck.remoteBooking;
  if (existing) {
    openBox(`<h2>${t("pm_t")}</h2><p>${esc(existing.renterName || getG(existing.renter_profile_id || ck.id)?.name || "")} · ${existing.sessions?.length || 0} ${t("sess")}</p>
      ${paymentHtml(existing)}<div class="row"><button class="btn ghost sm" onclick="closeBox();openInvoice('${esc(existing.code)}')">${t("invoice")}</button><button class="btn sm" onclick="closeBox();go('orders')">${t("view_ord")}</button></div>`);
    renderQr("orderQr", Number(existing.total_vnd), existing.code);
    return;
  }
  const quote = quote();
  openBox(`<h2>${t("pm_t")}</h2><p>${esc(getG(ck.id)?.name || "")} · ${ck.sessions.length} ${t("sess")} · ${ck.hours} ${t("hrs")}</p>
    <h2 style="margin:10px 0">${fmt(quote.total)}</h2>
    <p class="notice">QR VietQR về tài khoản Agribank. Đơn sẽ được quản trị viên đối chiếu thủ công trong sao kê trước khi mở chat.</p>
    <div class="err" id="bookingErr"></div>
    <button class="btn" id="payB" onclick="confirmPay()">${t("confirm_pay")} · ${fmt(quote.total)}</button>`);
};

window.confirmPay = async function() {
  const button = $("payB");
  const account = activeAccount();
  const profile = getG(ck?.id);
  if (!sb || !backendReady || !account || account.role !== "customer" || !profile || !ck) {
    showError("bookingErr", t("acct_access_denied"));
    return;
  }
  button.disabled = true;
  button.textContent = t("processing");
  const { data, error } = await sb.rpc("create_booking", {
    p_renter_profile_id: profile.id,
    p_service_id: profile.profileType === "ai" ? "cafe" : ck.svc,
    p_hours: ck.hours,
    p_package_id: ck.pkg,
    p_sessions: ck.sessions.map((session) => ({ d: session.d, t: session.t })),
    p_meeting_place: [ck.place.trim(), ck.addr.trim()].filter(Boolean).join(" - "),
    p_note: ck.note.trim(),
    p_coupon: ck.coupon || "",
  });
  if (error) {
    console.error("Could not create booking", error.message);
    showError("bookingErr", error.message || t("pay_booking_failed"));
    button.disabled = false;
    button.textContent = `${t("confirm_pay")} · ${fmt(quote().total)}`;
    return;
  }
  ck.remoteBooking = data;
  ck.remoteBooking.renterName = profile.name;
  closeBox();
  openPay();
};

function mapRemoteOrder(code) {
  return S.orders.find((order) => order.code === code);
}

window.renderRemoteOrders = async function() {
  const app = $("app");
  app.innerHTML = `<h2>${t("ord_t")}</h2><p class="muted">Đang tải...</p>`;
  if (!sb || !activeAccount()) {
    app.innerHTML = `<h2>${t("ord_t")}</h2>${authNotice()}<button class="btn sm" onclick="go('account')">${t("tab_account")}</button>`;
    return;
  }
  if (activeAccount().role === "admin") {
    await renderAdminPaymentReview();
    return;
  }
  try {
    await loadBookingRows();
    if (view !== "orders") return;
    app.innerHTML = `<h2>${t("ord_t")}</h2>${S.orders.length ? S.orders.map((order) => {
      const customer = activeAccount().role === "customer";
      const label = order.status === "paid" ? t("paid")
        : order.status === "done" ? t("st_done")
          : order.status === "cancelled" ? t("st_can") : t("pay_pending");
      return `<div class="ord"><div class="top"><div class="av" style="${getG(order.id) ? bg(getG(order.id)) : ""}"></div>
        <div style="flex:1;min-width:0"><b>${esc(order.renterName)}</b><div class="muted">${esc(order.code)} · ${order.hours} ${t("hrs")}</div></div>
        <div style="text-align:right"><b>${Number(order.totalVnd).toLocaleString("vi-VN")} ₫</b><div class="st-b ${order.status === "paid" ? "ok" : "wait"}">${esc(label)}</div></div></div>
        <p class="muted">${esc(order.place)}</p>
        <div class="acts"><button class="btn ghost sm" onclick="openInvoice('${esc(order.code)}')">${t("invoice")}</button>
        ${order.status === "paid" ? `<button class="btn sm" onclick="openChat('${esc(order.code)}')">${t("chat_open")}</button>` : ""}
        ${customer && order.status === "pending" ? `<button class="btn sm" onclick="openPayForBooking('${esc(order.code)}')">${t("pay")}</button>` : ""}</div></div>`;
    }).join("") : `<p class="sub">${t("ord_none")}</p>`}`;
  } catch (error) {
    console.error("Could not render bookings", error.message);
    app.innerHTML = `<h2>${t("ord_t")}</h2><p class="err">${esc(error.message || "Không tải được đơn.")}</p>`;
  }
};

window.openPayForBooking = function(code) {
  const order = mapRemoteOrder(code);
  if (!order || order.status !== "pending" || activeAccount()?.role !== "customer") return toast(t("acct_access_denied"));
  openBox(`<h2>${t("pm_t")}</h2>${paymentHtml(order)}<button class="btn ghost sm" onclick="closeBox();openInvoice('${esc(order.code)}')">${t("invoice")}</button>`);
  renderQr("orderQr", Number(order.totalVnd), order.code);
};

window.openInvoice = function(code) {
  const order = mapRemoteOrder(code);
  if (!order) return toast("Không tìm thấy hóa đơn.");
  const invoice = [
    "DIAMOND RENTAL",
    `Hóa đơn: ${order.invoiceNumber}`,
    `Mã đơn: ${order.code}`,
    `Ngày tạo: ${new Date(order.created).toLocaleString("vi-VN")}`,
    `Dịch vụ: ${order.svcName} · ${order.hours} giờ`,
    `Khách hàng: ${order.cust.name || activeAccount()?.name || ""}`,
    `Người cho thuê: ${order.renterName}`,
    `Địa điểm: ${order.place}`,
    `Tổng tiền: ${Number(order.totalVnd).toLocaleString("vi-VN")} VND`,
    `Trạng thái: ${order.status === "paid" ? "Đã thanh toán" : "Chưa xác nhận thanh toán"}`,
    `Nội dung chuyển khoản: ${order.code}`,
  ].join("\n");
  openBox(`<h2>${t("invoice")}</h2><div class="inv" id="invT">${esc(invoice)}</div>
    <div class="row" style="margin-top:12px"><button class="btn sm" onclick="downloadInvoice('${esc(order.code)}')">Tải hóa đơn</button></div>`);
};

window.downloadInvoice = function(code) {
  const order = mapRemoteOrder(code);
  if (!order) return toast("Không tìm thấy hóa đơn.");
  const text = $("invT")?.textContent || "";
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${order.invoiceNumber || order.code}.txt`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};

window.openChat = async function(code) {
  if (!sb || !activeAccount()) return toast(t("acct_access_denied"));
  try {
    await loadBookingRows();
    const order = mapRemoteOrder(code);
    if (!order || order.status !== "paid") return toast(t("chat_paid_only"));
    currentChat = code;
    chatBookingId = order.raw.id;
    view = "chat";
    renderAll();
  } catch (error) {
    console.error("Could not open chat", error.message);
    toast(t("chat_failed"));
  }
};

async function loadChatMessages() {
  if (!sb || !chatBookingId) return;
  const { data, error } = await sb.from("messages").select("*")
    .eq("booking_id", chatBookingId).order("created_at", { ascending: true });
  if (error) {
    console.error("Could not load chat messages", error.message);
    return toast(t("chat_failed"));
  }
  const body = $("chatBody");
  if (!body) return;
  body.innerHTML = (data || []).map((message) => {
    const label = message.sender_kind === "persona" ? getG(mapRemoteOrder(currentChat)?.id)?.name || "Nhân vật"
      : message.sender_id === activeAccount()?.id ? activeAccount().name
        : message.sender_kind === "customer" ? "Khách hàng" : "Bạn gái thuê";
    return `<div class="rev"><b>${esc(label)}</b><div>${esc(message.body)}</div><small class="muted">${esc(new Date(message.created_at).toLocaleString())}</small></div>`;
  }).join("");
  body.scrollTop = body.scrollHeight;
}

function renderChatPage() {
  const order = mapRemoteOrder(currentChat);
  if (!order || order.status !== "paid") {
    $("app").innerHTML = `<p class="notice">${t("chat_paid_only")}</p>`;
    return;
  }
  const renter = getG(order.id);
  $("app").innerHTML = `<h2>${t("chat_title")} · ${esc(renter?.name || order.renterName)}</h2>
    <p class="notice">${esc(renter?.profileType === "ai" ? t("chat_ai") : t("chat_human"))}</p>
    <div class="panel"><div id="chatBody" style="max-height:45vh;overflow:auto"></div>
      <div class="r2"><input class="inp" id="chatInput" maxlength="2000" placeholder="${esc(t("chat_placeholder"))}" onkeydown="if(event.key==='Enter')sendChat()">
        <button class="btn sm" onclick="sendChat()">${t("chat_send")}</button></div>
      <button class="btn ghost sm" style="margin-top:10px" onclick="go('orders')">${t("ck_back")}</button></div>`;
  loadChatMessages();
  if (chatChannel) sb.removeChannel(chatChannel);
  chatChannel = sb.channel(`booking-chat:${order.raw.id}`)
    .on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "messages",
      filter: `booking_id=eq.${order.raw.id}`,
    }, loadChatMessages)
    .subscribe();
}

window.sendChat = async function() {
  const account = activeAccount();
  const order = mapRemoteOrder(currentChat);
  const input = $("chatInput");
  if (!sb || !account || !order || order.status !== "paid" || !input) return toast(t("chat_paid_only"));
  const text = input.value.trim();
  if (!text) return;
  const { data, error } = await sb.from("messages").insert({
    booking_id: order.raw.id,
    sender_id: account.id,
    sender_kind: account.role,
    body: text,
  }).select("id").single();
  if (error) {
    console.error("Could not send chat message", error.message);
    return toast(t("chat_send_failed"));
  }
  input.value = "";
  if (account.role === "customer" && getG(order.id)?.profileType === "ai") {
    const { error: aiError } = await sb.functions.invoke("ai-chat-reply", {
      body: { booking_id: order.raw.id, message_id: data.id },
    });
    if (aiError) {
      console.error("AI reply failed", aiError.message);
      toast("Tin nhắn đã gửi; dịch vụ AI đang tạm lỗi.");
    }
  }
};

async function initializeSupabaseApp() {
  if (!sb) {
    remoteAccount = null;
    return renderAll();
  }
  S.orders = [];
  S.accounts = [];
  S.chats = {};
  S.activeAccountId = null;
  S.custom = [];
  await loadRenterProfiles();
  const { data, error } = await sb.auth.getSession();
  if (error) {
    console.error("Could not restore Supabase session", error.message);
    toast("Không khôi phục được phiên đăng nhập.");
  } else {
    await hydrateSession(data.session?.user || null);
  }
  sb.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => hydrateSession(session?.user || null), 0);
  });
}

initializeSupabaseApp();

window.spent = function() {
  return S.orders.filter((order) => order.status === "paid" || order.status === "done")
    .reduce((total, order) => total + Number(order.total || 0), 0);
};
