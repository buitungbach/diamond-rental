/* Supabase-backed accounts, bookings, payments and chat for Diamond Rental. */
Object.assign(T, {
  theme_light: ["Chuyển sang giao diện sáng", "Switch to light theme", "ライトテーマに切り替え"],
  theme_dark: ["Chuyển sang giao diện tối", "Switch to dark theme", "ダークテーマに切り替え"],
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
  ai_persona_setup: ["Hồ sơ và hướng dẫn nhập vai được lưu trên Supabase. Khi cấu hình Cloudflare Workers AI trong Supabase Edge Function Secrets, nhân vật tự dùng hệ thống chat hiện có; không cần thêm Edge Function riêng.", "The profile and persona instructions are stored in Supabase. Once Cloudflare Workers AI is configured in Supabase Edge Function Secrets, the character uses the existing chat system; no per-character function is needed.", "プロフィールとペルソナ指示はSupabaseに保存されます。Supabase Edge Function SecretsでCloudflare Workers AIを設定すると、キャラクターごとの関数を追加せず既存のチャットを利用できます。"],
  admin_add_character: ["+ Thêm nhân vật AI", "+ Add AI character", "+ AIキャラクターを追加"],
  renter_add_profile: ["+ Tạo hồ sơ của tôi", "+ Create my profile", "+ 自分のプロフィールを作成"],
  renter_edit_profile: ["Sửa hồ sơ của tôi", "Edit my profile", "自分のプロフィールを編集"],
  ai_persona_prompt_hint: ["Ví dụ: tính cách, cách xưng hô, sở thích, bối cảnh, cách phản hồi; luôn nói rõ đây là AI hư cấu và không hẹn gặp ngoài đời.", "Example: personality, speaking style, interests, background, response style; always disclose this is fictional AI and never arrange in-person meetings.", "例：性格、話し方、好み、背景、応答方法。架空のAIであることを明示し、対面を約束しないでください。"],
  profile_preview: ["Hồ sơ mẫu · chưa nhận đặt lịch", "Sample profile · not available to book", "サンプルプロフィール・予約不可"],
  ai_badge: ["Nhân vật AI · hư cấu", "Fictional AI character", "架空のAIキャラクター"],
  renter_self_reported: ["Người thật · tự khai", "Human · self-reported", "実在の利用者・自己申告"],
  renter_verified_detail: ["Hồ sơ người thật đã được quản trị viên đánh dấu xác minh. Điều này không bảo đảm an toàn hoặc thay thế việc tự kiểm tra trước khi gặp.", "This human profile has been marked as verified by an administrator. This is not a safety guarantee; use your own judgment before meeting.", "このプロフィールは管理者が確認済みとしていますが、安全を保証するものではありません。会う前にご自身でも確認してください。"],
  renter_self_reported_detail: ["Thông tin hồ sơ người thật do chủ tài khoản tự khai và chưa được xác minh. Hãy xác nhận các chi tiết cần thiết trước khi đặt lịch.", "This human profile is self-reported and has not been verified. Confirm the details you need before booking.", "このプロフィール情報は本人の申告で、未確認です。予約前に必要な情報を確認してください。"],
  policy_safety_title: ["Thông tin đặt lịch, quyền riêng tư & an toàn", "Booking, privacy & safety information", "予約・プライバシー・安全について"],
  policy_profile_identity: ["Hồ sơ AI được ghi rõ là nhân vật hư cấu và chỉ chat trực tuyến. Hồ sơ người thật là tự khai; nhãn xác minh chỉ cho biết quản trị viên đã đánh dấu hồ sơ, không bảo đảm danh tính hay an toàn.", "AI profiles are fictional and online-chat only. Human profiles are self-reported; a verification badge means an administrator marked the profile as verified, not a guarantee of identity or safety.", "AIプロフィールは架空で、オンラインチャット専用です。人間のプロフィールは自己申告です。確認済み表示は管理者が確認済みにしたことを示すだけで、本人確認や安全を保証しません。"],
  policy_booking_price: ["Hồ sơ hiển thị giá theo 2 giờ và lịch nhận đặt. Trước khi tạo đơn, kiểm tra ngày, giờ và tổng tiền cuối cùng trong bảng tóm tắt; QR chỉ dành cho đúng mã đơn và số tiền đó.", "Profiles show the price per 2 hours and booking availability. Before creating an order, check the date, time, and final total in the summary; use the QR only for that booking code and amount.", "プロフィールには2時間あたりの料金と予約可能時間が表示されます。注文前に日付、時間、最終金額を確認し、QRはその予約コードと金額にのみ使用してください。"],
  policy_cancel_refund: ["Có thể hủy đơn đang chờ thanh toán; đơn đã thanh toán chỉ có thể hủy trước buổi đầu ít nhất 24 giờ. Website không tự hoàn tiền: quản trị viên xử lý riêng và xác nhận điều kiện, số tiền, thời gian hoàn.", "Pending unpaid bookings can be cancelled; paid bookings can only be cancelled at least 24 hours before the first session. Refunds are not automatic: an administrator handles them separately and confirms eligibility, amount, and timing.", "未払いの予約はキャンセルできます。支払い済みの予約は最初の予定時刻の24時間前までキャンセルできます。返金は自動ではなく、管理者が個別に対応し、可否・金額・時期を確認します。"],
  policy_meeting_safety: ["Khi gặp trực tiếp, ưu tiên địa điểm công cộng, báo cho người bạn tin tưởng biết lịch trình, tự chủ phương tiện di chuyển và rời đi nếu cảm thấy không an toàn. Không chuyển thêm tiền ngoài thông tin đơn.", "For in-person meetings, choose a public place, tell someone you trust your plans, arrange your own transport, and leave if you feel unsafe. Do not send extra money outside the booking details.", "対面時は公共の場所を選び、信頼できる人に予定を伝え、自分で移動手段を確保し、不安を感じたらその場を離れてください。予約内容以外の追加送金はしないでください。"],
  policy_privacy: ["Không đăng số điện thoại, địa chỉ nhà, giấy tờ tùy thân hoặc thông tin nhạy cảm lên hồ sơ công khai hay trong chat. Địa điểm đặt lịch được lưu cùng đơn, không hiển thị trên hồ sơ công khai.", "Do not post phone numbers, home addresses, identity documents, or sensitive information on public profiles or in chat. Meeting locations are stored with the booking and are not shown on public profiles.", "電話番号、自宅住所、身分証明書、機密情報を公開プロフィールやチャットに投稿しないでください。待ち合わせ場所は予約情報に保存され、公開プロフィールには表示されません。"],
  booking_location_privacy: ["Địa điểm này được lưu trong đơn đặt lịch, không hiển thị trên hồ sơ công khai. Chỉ nhập thông tin cần thiết để thống nhất điểm gặp.", "This location is saved with the booking and is not shown on public profiles. Enter only the details needed to agree on a meeting place.", "この場所は予約情報に保存され、公開プロフィールには表示されません。待ち合わせに必要な情報のみ入力してください。"],
  profile_report: ["Báo cáo hồ sơ", "Report profile", "プロフィールを報告"],
  profile_report_signin: ["Đăng nhập để báo cáo hồ sơ.", "Sign in to report a profile.", "プロフィールを報告するにはログインしてください。"],
  profile_report_prompt: ["Mô tả vấn đề với hồ sơ này (10–1000 ký tự):", "Describe the issue with this profile (10–1000 characters):", "このプロフィールの問題を入力してください（10～1000文字）："],
  profile_report_length: ["Nội dung báo cáo phải dài từ 10 đến 1000 ký tự.", "A report must be between 10 and 1000 characters.", "報告は10～1000文字で入力してください。"],
  profile_report_sent: ["Đã gửi báo cáo hồ sơ để quản trị viên xem xét.", "Profile report submitted for administrator review.", "管理者確認のためプロフィール報告を送信しました。"],
  profile_report_error: ["Không thể gửi báo cáo hồ sơ.", "Could not submit the profile report.", "プロフィール報告を送信できませんでした。"],
  profile_reports_title: ["Báo cáo hồ sơ", "Profile reports", "プロフィール報告"],
  profile_reports_empty: ["Chưa có báo cáo hồ sơ cần xử lý.", "No profile reports to review.", "確認が必要なプロフィール報告はありません。"],
  profile_reports_load_error: ["Không tải được báo cáo hồ sơ.", "Could not load profile reports.", "プロフィール報告を読み込めませんでした。"],
  profile_report_resolved: ["Đã cập nhật trạng thái báo cáo hồ sơ.", "Profile report status updated.", "プロフィール報告の状態を更新しました。"],
  ai_book: ["Thuê ngay", "Book now", "今すぐ予約"],
  ck_agree: ["Tôi đủ 18 tuổi và hiểu đây là trải nghiệm chat với nhân vật AI, không có gặp mặt trực tiếp.", "I am 18 or older and understand this is an AI chat experience with no in-person meeting.", "私は18歳以上で、対面のないAIチャット体験であることを理解しています。"],
  pay_transfer_note: ["Nội dung chuyển khoản", "Transfer description", "振込内容"],
  pay_transfer_hint: ["Chuyển khoản đúng số tiền và giữ nguyên nội dung. Quản trị viên sẽ đối chiếu sao kê Agribank trước khi xác nhận; không gửi ảnh biên lai thay cho tiền đã vào tài khoản.", "Transfer the exact amount and keep the payment description unchanged. An administrator will verify the Agribank statement before confirming; a receipt image does not replace funds received.", "正確な金額を振り込み、振込内容を変更しないでください。管理者が入金明細を確認してから確定します。振込画面の画像だけでは確認できません。"],
  pay_window: ["Đơn chỉ giữ khung giờ trong 15 phút. Nếu quá thời hạn, vui lòng tạo đơn mới và không chuyển tiền theo mã QR cũ.", "The booking holds its time slot for 15 minutes. If it expires, create a new booking and do not pay using the old QR.", "予約枠の確保は15分間です。期限切れの場合は新しい予約を作成し、古いQRで振り込まないでください。"],
  pay_cash_wait: ["Bạn thanh toán tiền mặt trực tiếp khi gặp. Chat chỉ mở sau khi quản trị viên xác nhận đã nhận tiền.", "Pay cash in person at the meeting. Chat opens only after an administrator confirms receipt.", "当日、対面で現金をお支払いください。管理者が受領を確認した後にチャットが開きます。"],
  pay_cash_admin: ["Xác nhận đã nhận tiền mặt", "Confirm cash received", "現金受領を確認"],
  pay_cash_admin_notice: ["Chỉ xác nhận sau khi đã trực tiếp nhận đủ tiền mặt từ khách.", "Confirm only after you have received the full cash payment from the customer in person.", "お客様から現金を全額直接受け取った後にのみ確認してください。"],
  pay_cash_method: ["Tiền mặt khi gặp", "Cash at the meeting", "対面時に現金"],
  pay_cash_create: ["Tạo đơn · thanh toán khi gặp", "Create booking · pay at the meeting", "予約を作成・当日支払い"],
  pay_cash_confirm: ["Xác nhận đã nhận tiền mặt cho đơn {code} · {amount} ₫?", "Confirm cash received for booking {code} · {amount} ₫?", "予約{code}の現金 {amount} ₫ の受領を確認しますか？"],
  pay_method_required: ["Vui lòng chọn phương thức thanh toán.", "Choose a payment method.", "支払い方法を選択してください。"],
  pay_wait: ["Đang chờ quản trị viên đối chiếu tiền vào tài khoản. Chat chỉ mở sau khi xác nhận.", "Waiting for an administrator to verify the funds in the bank account. Chat unlocks only after confirmation.", "口座への入金確認を管理者が行っています。確認後にチャットを利用できます。"],
  pay_create_info: ["Nhấn nút bên dưới để tạo đơn; mã QR chuyển khoản Agribank sẽ hiện sau khi đơn được lưu. Quản trị viên đối chiếu giao dịch thủ công, website không tự động trừ tiền.", "Create the booking below to display its Agribank transfer QR. An administrator verifies the transfer manually; the website does not charge your account automatically.", "下のボタンで予約を作成するとAgribank振込用QRが表示されます。入金は管理者が手動確認し、サイトが自動で引き落とすことはありません。"],
  pay_pricing_mismatch: ["Bảng giá trên máy chủ chưa được cập nhật. Đơn này đã được tạo nhưng vui lòng không chuyển tiền; chạy supabase/pricing-vnd.sql rồi tạo đơn mới.", "Server pricing is out of date. This booking was created, but do not transfer money; apply supabase/pricing-vnd.sql and create a new booking.", "サーバーの料金が未更新です。この予約は作成されましたが、送金しないでください。supabase/pricing-vnd.sqlを適用して新しい予約を作成してください。"],
  manual_payment_title: ["Đối soát chuyển khoản", "Manual bank transfer review", "銀行振込の手動確認"],
  manual_payment_notice: ["Với QR, chỉ xác nhận sau khi tiền thực sự vào Agribank và đã đối chiếu sao kê. Với tiền mặt, chỉ xác nhận sau khi trực tiếp nhận đủ tiền từ khách.", "For QR, confirm only after funds arrive in Agribank and match the bank statement. For cash, confirm only after receiving the full amount in person.", "QRはAgribankへの入金と明細を確認してから確定してください。現金は対面で全額を受け取った後にのみ確定してください。"],
  manual_payment_reference: ["Mã giao dịch trong sao kê Agribank", "Transaction reference from the Agribank statement", "Agribank明細の取引番号"],
  manual_payment_confirm: ["Xác nhận đã nhận tiền", "Confirm funds received", "入金を確認"],
  manual_payment_empty: ["Không có đơn đang chờ thanh toán.", "No bookings are awaiting payment.", "支払い待ちの予約はありません。"],
  manual_payment_sql_missing: ["Chưa cài quy trình xác nhận thủ công. Quản trị viên cần chạy supabase/manual-payment.sql trong SQL Editor của Supabase.", "Manual confirmation is not installed. An administrator must run supabase/manual-payment.sql in the Supabase SQL Editor.", "手動確認が未設定です。管理者はSupabase SQL Editorで supabase/manual-payment.sql を実行してください。"],
  pay_qr_failed: ["Không tạo được QR. Kiểm tra thư viện QR rồi thử lại.", "Could not render the QR. Check the QR library and try again.", "QRを表示できません。QRライブラリを確認してください。"],
  pay_booking_failed: ["Không tạo được đơn. Vui lòng thử lại.", "Could not create the booking. Please try again.", "予約を作成できませんでした。もう一度お試しください。"],
  acct_access_denied: ["Tài khoản này không có quyền thực hiện thao tác.", "This account is not allowed to perform this action.", "このアカウントには操作権限がありません。"],
  acct_login_to_book: ["Vui lòng đăng nhập tài khoản khách hàng trước khi đặt lịch.", "Sign in with a customer account before booking.", "予約するには顧客アカウントでログインしてください。"],
  acct_customer_only: ["Tài khoản quản trị/bạn gái thuê không thể tạo đơn. Hãy đăng xuất và đăng nhập bằng tài khoản khách hàng để đặt lịch.", "Admin and renter accounts cannot create bookings. Sign out and use a customer account to book.", "管理者・レンタル相手アカウントでは予約できません。ログアウトして顧客アカウントで予約してください。"],
  chat_paid_only: ["Chat mở sau khi quản trị viên xác nhận thanh toán.", "Chat opens after an administrator confirms payment.", "管理者が支払いを確認した後にチャットを利用できます。"],
  demo: ["Chuyển khoản Agribank đang được quản trị viên đối chiếu thủ công; đơn và chat chỉ được mở sau khi xác nhận nhận đủ tiền.", "Agribank transfers are verified manually; bookings and chat unlock only after the funds are confirmed.", "Agribankへの振込は手動で確認されます。全額入金の確認後に予約とチャットが有効になります。"],
  chat_failed: ["Không tải được cuộc trò chuyện.", "Could not load the conversation.", "会話を読み込めませんでした。"],
  chat_send_failed: ["Không gửi được tin nhắn.", "Could not send the message.", "メッセージを送信できませんでした。"],
  chat_ai: ["Chat với nhân vật AI; tin nhắn được xử lý bằng Cloudflare Workers AI. Không gửi thông tin nhạy cảm.", "Chat with an AI character; messages are processed by Cloudflare Workers AI. Do not share sensitive information.", "AIキャラクターとのチャットです。メッセージはCloudflare Workers AIで処理されます。機密情報を送信しないでください。"],
  chat_ai_typing: ["Nhân vật đang soạn câu trả lời…", "The character is typing…", "キャラクターが入力中…"],
  chat_empty: ["Chưa có tin nhắn. Hãy bắt đầu trò chuyện nhé!", "No messages yet. Start the conversation!", "メッセージはまだありません。会話を始めましょう！"],
  chat_ai_not_deployed: ["Chưa triển khai dịch vụ trả lời AI trên Supabase. Hãy chạy lệnh deploy ai-chat-reply.", "The AI reply function is not deployed. Deploy ai-chat-reply to Supabase.", "AI返信機能が未デプロイです。ai-chat-replyをSupabaseにデプロイしてください。"],
  chat_ai_secret_missing: ["Dịch vụ AI chưa được cấu hình. Hãy thêm CLOUDFLARE_ACCOUNT_ID và CLOUDFLARE_API_TOKEN trong Supabase Edge Function Secrets.", "The AI service is not configured. Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN to Supabase Edge Function Secrets.", "AIサービスが未設定です。Supabase Edge Function SecretsにCLOUDFLARE_ACCOUNT_IDとCLOUDFLARE_API_TOKENを追加してください。"],
  chat_ai_quota_exceeded: ["Cloudflare Workers AI đang giới hạn yêu cầu hoặc đã chạm hạn mức dùng. Chờ một lúc rồi thử lại; nếu vẫn lỗi, kiểm tra mức dùng và giới hạn trong Cloudflare Dashboard.", "Cloudflare Workers AI is throttling requests or the usage limit was reached. Wait and try again; if it persists, check usage and limits in the Cloudflare dashboard.", "Cloudflare Workers AIのリクエスト制限または利用上限に達しました。少し待って再試行し、続く場合はCloudflare Dashboardで使用量と上限を確認してください。"],
  chat_ai_rate_limited: ["Cloudflare Workers AI đang giới hạn yêu cầu. Chờ một lúc rồi gửi lại; tránh bấm gửi liên tục.", "Cloudflare Workers AI is rate-limiting requests. Wait a little and try again; avoid repeated sends.", "Cloudflare Workers AIのリクエストが制限されています。少し待ってから再送してください。連続送信は避けてください。"],
  chat_ai_key_rejected: ["Cloudflare từ chối API token. Kiểm tra token và quyền Workers AI trong Cloudflare, rồi cập nhật CLOUDFLARE_API_TOKEN trong Supabase Secrets.", "Cloudflare rejected the API token. Check its Workers AI permissions in Cloudflare, then update CLOUDFLARE_API_TOKEN in Supabase Secrets.", "CloudflareがAPIトークンを拒否しました。CloudflareでWorkers AI権限を確認し、Supabase SecretsのCLOUDFLARE_API_TOKENを更新してください。"],
  chat_ai_provider_error: ["Cloudflare Workers AI chưa xử lý được yêu cầu. Kiểm tra model và trạng thái dịch vụ trong Cloudflare Dashboard.", "Cloudflare Workers AI could not process the request. Check the model and service status in the Cloudflare dashboard.", "Cloudflare Workers AIがリクエストを処理できませんでした。Cloudflare Dashboardでモデルとサービス状態を確認してください。"],
  chat_ai_network_error: ["Supabase không kết nối được tới Cloudflare Workers AI. Kiểm tra trạng thái dịch vụ Cloudflare rồi thử lại.", "Supabase could not connect to Cloudflare Workers AI. Check Cloudflare service status and try again.", "SupabaseからCloudflare Workers AIに接続できませんでした。Cloudflareのサービス状態を確認して再試行してください。"],
  chat_ai_model_error: ["Cloudflare từ chối yêu cầu model (mã lỗi {code}). Kiểm tra model Workers AI và quyền API token trong Cloudflare Dashboard.", "Cloudflare rejected the model request (error code {code}). Check the Workers AI model and API token permissions in the Cloudflare dashboard.", "Cloudflareがモデル要求を拒否しました（エラーコード {code}）。Cloudflare DashboardでモデルとAPIトークン権限を確認してください。"],
  chat_ai_http_error: ["Cloudflare trả lỗi HTTP {status} (mã {code}). Kiểm tra model đang bật và quyền Workers AI của API token trong Cloudflare Dashboard.", "Cloudflare returned HTTP {status} (code {code}). Check that the model is available and the API token has Workers AI permissions in the Cloudflare dashboard.", "CloudflareがHTTP {status}（コード {code}）を返しました。モデルの利用可否とAPIトークンのWorkers AI権限を確認してください。"],
  chat_ai_route_error: ["Cloudflare báo mã 7003: không tìm thấy đường dẫn API. Hãy kiểm tra CLOUDFLARE_ACCOUNT_ID là Account ID (không phải Zone ID). Model mặc định hiện là @cf/meta/llama-3.2-3b-instruct; nếu có secret CLOUDFLARE_AI_MODEL ghi đè, hãy đặt đúng model này hoặc model đang được Cloudflare hỗ trợ.", "Cloudflare error 7003 means the API route was not found. Verify CLOUDFLARE_ACCOUNT_ID is your Account ID (not the Zone ID). The default model is now @cf/meta/llama-3.2-3b-instruct; if CLOUDFLARE_AI_MODEL is set, use this or another model currently supported by Cloudflare.", "Cloudflareエラー7003はAPIルートが見つからないことを示します。CLOUDFLARE_ACCOUNT_IDがZone IDではなくAccount IDであることを確認してください。既定モデルは@cf/meta/llama-3.2-3b-instructです。CLOUDFLARE_AI_MODELを設定している場合は、Cloudflareが現在サポートするモデルを指定してください。"],
  chat_ai_failed: ["Tin nhắn đã gửi nhưng AI chưa trả lời được. Kiểm tra log của Edge Function ai-chat-reply trong Supabase.", "Message sent, but the AI could not reply. Check the ai-chat-reply Edge Function logs in Supabase.", "メッセージは送信されましたが、AIが返信できませんでした。Supabaseのai-chat-replyログを確認してください。"],
  chat_background_change: ["Đổi hình nền chat", "Change chat background", "チャット背景を変更"],
  chat_background_saving: ["Đang cập nhật hình nền…", "Updating chat background…", "チャット背景を更新中…"],
  chat_background_saved: ["Đã cập nhật hình nền chat cho hồ sơ; các bên sẽ cùng thấy nền mới.", "Profile chat background updated; everyone will see the new background.", "プロフィールのチャット背景を更新しました。全員に新しい背景が表示されます。"],
  chat_background_error: ["Không cập nhật được hình nền. Hãy thử ảnh JPG, PNG hoặc WebP nhỏ hơn 8 MB.", "Could not update the background. Use a JPG, PNG, or WebP under 8 MB.", "背景を更新できません。8MB未満のJPG、PNG、WebPをお試しください。"],
  admin_chat_title: ["Chat quản trị không cần thanh toán", "Admin chats (no payment required)", "管理者チャット（支払い不要）"],
  admin_chat_intro: ["Chọn hồ sơ để bắt đầu chat trực tiếp. Với hồ sơ bạn gái thuê thật, tin nhắn sẽ được gửi đến tài khoản của họ.", "Choose a profile to start a direct chat. Messages to real renters are delivered to their account.", "プロフィールを選んで直接チャットを開始します。実際のレンタル相手にはアカウントへメッセージが届きます。"],
  admin_chat_open: ["Chat", "Chat", "チャット"],
  admin_chat_inbox: ["Tin nhắn từ quản trị viên", "Messages from admin", "管理者からのメッセージ"],
  admin_chat_empty: ["Chưa có tin nhắn quản trị viên.", "No admin messages yet.", "管理者からのメッセージはありません。"],
  admin_chat_label: ["Chat quản trị", "Admin chat", "管理者チャット"],
  renter_availability: ["Quản lý lịch rảnh", "Manage availability", "空き時間を管理"],
  availability_help: ["Chọn ngày và khung giờ nhận lịch hằng tuần. Khách chỉ thấy các khung giờ này.", "Choose weekly days and hours when you accept bookings. Customers only see these windows.", "予約を受け付ける曜日と時間を設定します。お客様には設定した時間のみ表示されます。"],
  availability_saved: ["Đã cập nhật lịch rảnh.", "Availability updated.", "空き時間を更新しました。"],
  availability_load_error: ["Không tải được lịch. Hãy chạy supabase/feature-upgrades.sql.", "Could not load availability. Run supabase/feature-upgrades.sql.", "空き時間を読み込めません。supabase/feature-upgrades.sqlを実行してください。"],
  from: ["Từ", "From", "開始"],
  to: ["Đến", "To", "終了"],
  chat_read: ["Đã xem", "Seen", "既読"],
  chat_block: ["Chặn cuộc trò chuyện", "Block chat", "チャットをブロック"],
  chat_unblock: ["Bỏ chặn", "Unblock", "ブロック解除"],
  chat_blocked: ["Cuộc trò chuyện đã bị chặn. Bạn không thể gửi tin nhắn.", "This chat is blocked. You cannot send messages.", "このチャットはブロックされています。メッセージを送信できません。"],
  chat_block_confirm: ["Chặn người này? Hai bên sẽ không thể gửi tin nhắn trong cuộc trò chuyện này.", "Block this participant? Neither side will be able to send messages in this conversation.", "この相手をブロックしますか？この会話では双方がメッセージを送信できなくなります。"],
  chat_report: ["Báo cáo", "Report", "報告"],
  chat_report_prompt: ["Mô tả lý do báo cáo (tối thiểu 10 ký tự):", "Describe the reason for the report (at least 10 characters):", "報告理由を入力してください（10文字以上）："],
  chat_report_sent: ["Đã gửi báo cáo để quản trị viên xem xét.", "Report submitted for administrator review.", "管理者確認のため報告を送信しました。"],
  chat_report_empty: ["Chưa có báo cáo.", "No reports found.", "報告はありません。"],
  chat_report_resolve: ["Đánh dấu đã xử lý", "Mark resolved", "解決済みにする"],
  chat_report_dismiss: ["Bỏ qua", "Dismiss", "却下"],
  booking_complete_confirm: ["Xác nhận hoàn thành", "Confirm completed", "完了を確認"],
  booking_complete_wait: ["Đã ghi nhận xác nhận của bạn; đơn hoàn tất khi bên còn lại cũng xác nhận.", "Your confirmation is saved; the booking completes when the other participant confirms.", "確認を記録しました。相手も確認すると予約が完了します。"],
  booking_expired: ["Đơn quá 15 phút chưa thanh toán và không còn giữ lịch. Vui lòng đặt lại trước khi chuyển khoản.", "This unpaid booking expired after 15 minutes and no longer holds the time slot. Create a new booking before transferring.", "未払い予約は15分で期限切れとなり、枠は確保されません。振込前に新しい予約を作成してください。"],
  booking_expired_short: ["Hết hạn", "Expired", "期限切れ"],
  booking_review_verified: ["Đánh giá sau khi hai bên xác nhận hoàn thành", "Review after both participants confirm completion", "双方の完了確認後にレビューできます。"],
  review_not_eligible: ["Chỉ khách hàng của đơn đã hoàn thành mới có thể đánh giá.", "Only the customer on a completed booking can review.", "完了した予約の顧客のみレビューできます。"],
  chat_reports_title: ["Báo cáo cần xem xét", "Reports to review", "確認が必要な報告"],
  chat_reports_load_error: ["Không tải được báo cáo chat.", "Could not load chat reports.", "チャット報告を読み込めませんでした。"],
  chat_report_resolved: ["Đã cập nhật trạng thái báo cáo.", "Report status updated.", "報告の状態を更新しました。"],
  receipt_paid: ["Đã xác nhận thanh toán", "Payment verified", "支払い確認済み"],
  receipt_pending: ["Chưa xác nhận thanh toán", "Payment not yet verified", "支払い未確認"],
  receipt_expired: ["Đơn đã hết hạn · chưa xác nhận thanh toán", "Booking expired · payment not verified", "予約期限切れ・支払い未確認"],
  receipt_print: ["In / Lưu PDF", "Print / Save PDF", "印刷 / PDF保存"],
  receipt_label: ["Biên nhận giao dịch (không phải hóa đơn VAT)", "Payment receipt (not a tax invoice)", "支払領収書（税務インボイスではありません）"],
  receipt_unpaid: ["Biên nhận tạm tính · khoản thanh toán chưa được quản trị viên xác nhận", "Provisional receipt · payment has not been verified by an administrator", "仮領収書・管理者による入金確認前"],
  receipt_paid: ["Đã thanh toán · được quản trị viên xác nhận", "Paid · verified by an administrator", "支払済み・管理者確認済み"],
  receipt_print: ["In / Lưu PDF", "Print / Save PDF", "印刷 / PDF保存"],
  unread_count: ["Tin nhắn chưa đọc", "Unread messages", "未読メッセージ"],
  acct_login: ["Đăng nhập", "Sign in", "ログイン"],
  acct_register: ["Đăng ký", "Create account", "アカウント作成"],
  chat_open: ["Mở trò chuyện", "Open chat", "チャットを開く"],
  chat_placeholder: ["Nhập tin nhắn", "Type a message", "メッセージを入力"],
  chat_send: ["Gửi", "Send", "送信"],
  chat_human: ["Tin nhắn được lưu trực tuyến và chỉ hai bên trong đơn thuê có thể truy cập.", "Messages are stored online and accessible only to the booking participants.", "メッセージはオンラインに保存され、予約の参加者のみが閲覧できます。"],
  notice: ["Nhân vật AI là hư cấu và chỉ có trải nghiệm chat trực tuyến, không gặp ngoài đời. Hồ sơ người thật do người dùng tự khai báo; hãy xác minh tuổi, thông tin và điều kiện gặp trước khi thanh toán.", "AI characters are fictional and available for online chat only, with no in-person meetings. Human profiles are self-reported; verify age, details, and meeting arrangements before paying.", "AIキャラクターは架空で、オンラインチャットのみ利用でき、対面はありません。人間のプロフィールは自己申告です。支払い前に年齢、情報、待ち合わせ条件を確認してください。"],
  social_upload_rights: ["Chỉ đăng ảnh/video bạn sở hữu hoặc có quyền sử dụng. Bài đăng sẽ chờ quản trị viên duyệt.", "Only upload media you own or have permission to use. Posts await admin approval.", "所有または使用許可のあるメディアのみ投稿してください。投稿は管理者の承認待ちです。"],
  social_upload_failed: ["Không thể tải media lên.", "Could not upload media.", "メディアをアップロードできませんでした。"],
  social_posted: ["Đã gửi bài để quản trị viên duyệt.", "Post submitted for admin review.", "投稿を管理者の確認に送信しました。"],
  social_report_reason: ["Mô tả lý do báo cáo (tối thiểu 10 ký tự):", "Describe the reason for the report (at least 10 characters):", "報告理由を入力してください（10文字以上）："],
  social_comments_empty: ["Chưa có bình luận.", "No comments yet.", "コメントはまだありません。"],
  social_login_required: ["Đăng nhập để sử dụng tính năng này.", "Sign in to use this feature.", "この機能を使うにはログインしてください。"],
  admin_expansion: ["Bảng điều khiển", "Dashboard", "ダッシュボード"],
  admin_moderation: ["Nội dung chờ duyệt", "Pending content", "承認待ちコンテンツ"],
  admin_reports: ["Báo cáo bài viết", "Post reports", "投稿の報告"],
  admin_verification: ["Hồ sơ chờ xác minh", "Profiles to verify", "確認待ちプロフィール"],
  admin_approve: ["Duyệt", "Approve", "承認"],
  admin_reject: ["Từ chối", "Reject", "却下"],
  admin_verify: ["Xác minh", "Verify", "確認"],
  admin_unverify: ["Bỏ xác minh", "Remove verification", "確認を解除"],
  admin_load_failed: ["Không tải được dữ liệu quản trị.", "Could not load admin data.", "管理データを読み込めませんでした。"],
  acct_privacy: ["Quyền riêng tư và dữ liệu", "Privacy and data", "プライバシーとデータ"],
  customer_public_profile: ["Thông tin hiển thị công khai", "Public profile", "公開プロフィール"],
  customer_public_profile_help: ["Tên hiển thị và ảnh đại diện này sẽ xuất hiện trong chat và bình luận. Thông tin cá nhân đăng ký vẫn được giữ riêng tư.", "This display name and avatar appear in chats and comments. Your registration details remain private.", "表示名とアバターはチャットとコメントに表示されます。登録時の個人情報は非公開です。"],
  customer_display_name: ["Tên hiển thị", "Display name", "表示名"],
  customer_avatar_change: ["Đổi ảnh đại diện", "Change avatar", "アバターを変更"],
  customer_avatar_remove: ["Xóa ảnh đại diện", "Remove avatar", "アバターを削除"],
  customer_profile_save: ["Lưu thông tin hiển thị", "Save public profile", "公開プロフィールを保存"],
  customer_profile_error: ["Không tải được hồ sơ công khai. Hãy kiểm tra migration customer-public-profiles.sql.", "Could not load the public profile. Check the customer-public-profiles.sql migration.", "公開プロフィールを読み込めません。customer-public-profiles.sqlの適用を確認してください。"],
  renter_paid_bookings: ["Đơn thuê đã thanh toán", "Paid bookings", "支払い済みの予約"],
  renter_paid_bookings_empty: ["Chưa có đơn thuê đã thanh toán.", "No paid bookings yet.", "支払い済みの予約はありません。"],
  renter_chat_inbox: ["Chat với khách", "Customer chats", "お客様とのチャット"],
  renter_chat_customer: ["Khách hàng", "Customer", "お客様"],
  chat_identity_error: ["Không tải được tên và ảnh đại diện trong chat. Hãy kiểm tra migration customer-public-profiles.sql.", "Could not load chat names and avatars. Check the customer-public-profiles.sql migration.", "チャットの名前とアバターを読み込めません。customer-public-profiles.sqlの適用を確認してください。"],
  chat_booking_new_message: ["Có tin nhắn mới trong đơn thuê này.", "There is a new message in this booking.", "この予約に新しいメッセージがあります。"],
  acct_email_notifications: ["Nhận thông báo qua email", "Receive email notifications", "メール通知を受け取る"],
  push_enable: ["Bật thông báo trên thiết bị này", "Enable notifications on this device", "この端末で通知を有効にする"],
  push_disable: ["Tắt thông báo trên thiết bị này", "Disable notifications on this device", "この端末で通知を無効にする"],
  push_enabled: ["Đã bật thông báo đơn thuê và tin nhắn trên thiết bị này.", "Booking and message notifications are enabled on this device.", "この端末で予約とメッセージの通知を有効にしました。"],
  push_disabled: ["Đã tắt thông báo trên thiết bị này.", "Notifications are disabled on this device.", "この端末の通知を無効にしました。"],
  push_missing_key: ["Thông báo đẩy chưa được cấu hình. Quản trị viên cần thêm khóa VAPID công khai vào supabase-config.js.", "Push notifications are not configured. The administrator must add the public VAPID key to supabase-config.js.", "プッシュ通知が未設定です。管理者がsupabase-config.jsに公開VAPIDキーを設定する必要があります。"],
  push_unsupported: ["Trình duyệt này chưa hỗ trợ thông báo đẩy. Trên iPhone/iPad, hãy thêm website vào Màn hình chính và mở từ đó.", "This browser does not support push notifications. On iPhone/iPad, add the website to the Home Screen and open it from there.", "このブラウザーはプッシュ通知に対応していません。iPhone/iPadではWebサイトをホーム画面に追加して開いてください。"],
  push_denied: ["Quyền thông báo đang bị chặn trong cài đặt trình duyệt.", "Notifications are blocked in your browser settings.", "ブラウザー設定で通知がブロックされています。"],
  push_error: ["Không thể thiết lập thông báo đẩy. Vui lòng thử lại.", "Could not set up push notifications. Please try again.", "プッシュ通知を設定できませんでした。もう一度お試しください。"],
  push_ios_hint: ["iPhone/iPad: thêm website vào Màn hình chính, mở ứng dụng từ biểu tượng đó rồi bật thông báo.", "iPhone/iPad: add this website to the Home Screen, open it from its icon, then enable notifications.", "iPhone/iPadではWebサイトをホーム画面に追加し、そのアイコンから開いて通知を有効にしてください。"],
  install_app: ["Thêm VELORA vào màn hình chính", "Add VELORA to Home Screen", "VELORAをホーム画面に追加"],
  install_app_title: ["Cài VELORA", "Install VELORA", "VELORAをインストール"],
  install_android_help: ["Trong Chrome, mở menu ⋮ rồi chọn “Cài đặt ứng dụng” hoặc “Thêm vào màn hình chính”.", "In Chrome, open the ⋮ menu and choose “Install app” or “Add to Home screen”.", "Chromeの⋮メニューを開き、「アプリをインストール」または「ホーム画面に追加」を選択してください。"],
  install_ios_help: ["Trong Safari, chạm nút Chia sẻ, chọn “Thêm vào Màn hình chính”, rồi chạm “Thêm”. Biểu tượng VELORA sẽ xuất hiện trên màn hình chính.", "In Safari, tap Share, choose “Add to Home Screen”, then tap “Add”. The VELORA icon will appear on your Home Screen.", "Safariで共有ボタンをタップし、「ホーム画面に追加」を選んでから「追加」をタップしてください。VELORAのアイコンが表示されます。"],
  install_desktop_help: ["Hãy mở trang này trên iPhone hoặc Android để thêm VELORA vào màn hình chính.", "Open this website on an iPhone or Android device to add VELORA to its Home Screen.", "iPhoneまたはAndroidでこのサイトを開くと、ホーム画面に追加できます。"],
  acct_export: ["Tải dữ liệu tài khoản", "Export account data", "アカウントデータをエクスポート"],
  acct_delete: ["Xóa tài khoản và dữ liệu", "Delete account and data", "アカウントとデータを削除"],
  acct_delete_confirm: ["Xóa vĩnh viễn tài khoản và dữ liệu liên quan? Thao tác này không thể hoàn tác.", "Permanently delete your account and related data? This cannot be undone.", "アカウントと関連データを完全に削除しますか？この操作は取り消せません。"],
  acct_privacy_failed: ["Không thể hoàn tất yêu cầu quyền riêng tư.", "Could not complete the privacy request.", "プライバシー要求を完了できませんでした。"],
  acct_deleted: ["Tài khoản và dữ liệu đã được xóa.", "Account and data deleted.", "アカウントとデータを削除しました。"],
  gallery_pending_notice: ["Ảnh bạn thêm sẽ hiển thị ngay trong hồ sơ của mình.", "Photos you add appear on your profile immediately.", "追加した写真はプロフィールにすぐ表示されます。"],
  gallery_remove: ["Xóa ảnh", "Remove photo", "写真を削除"],
  gallery_admin_help: ["Ảnh bạn thêm cho nhân vật AI sẽ hiển thị ngay trong hồ sơ.", "Photos you add to AI characters appear on their profile immediately.", "AIキャラクターに追加した写真はプロフィールにすぐ表示されます。"],
  gallery_pending: ["Chờ duyệt", "Pending", "承認待ち"],
  gallery_published: ["Đang hiển thị", "Published", "公開中"],
  gallery_rejected: ["Đã từ chối", "Rejected", "却下済み"],
  gallery_empty: ["Chưa có ảnh trong thư viện.", "No gallery photos yet.", "ギャラリー写真はまだありません。"],
  gallery_caption_prompt: ["Chú thích ảnh (không bắt buộc):", "Photo caption (optional):", "写真の説明（任意）："],
  gallery_saved: ["Đã thêm ảnh vào thư viện.", "Photo added to the gallery.", "写真をギャラリーに追加しました。"],
  gallery_human_help: ["Bạn có thể tự thêm hoặc xóa ảnh trong hồ sơ của mình. Ảnh sẽ hiển thị ngay.", "You can add or remove photos on your own profile. Photos appear immediately.", "自分のプロフィール写真を追加・削除できます。写真はすぐに表示されます。"],
  booking_reschedule: ["Đổi lịch", "Reschedule", "予約を変更"],
  booking_cancel: ["Hủy lịch", "Cancel booking", "予約をキャンセル"],
  booking_cancel_confirm: ["Bạn có chắc chắn muốn hủy lịch này? Đơn đã thanh toán chỉ được hủy trước buổi đầu ít nhất 24 giờ. Website không tự hoàn tiền; quản trị viên xử lý hoàn tiền riêng.", "Cancel this booking? Paid bookings can only be cancelled at least 24 hours before the first session. Refunds are not automatic and are handled separately by the administrator.", "この予約をキャンセルしますか？支払い済み予約は最初の予定時刻の24時間前までキャンセルできます。返金は自動ではなく、管理者が個別に対応します。"],
  booking_rescheduled: ["Đã gửi yêu cầu đổi lịch.", "Booking rescheduled.", "予約を変更しました。"],
  booking_cancelled: ["Đã hủy lịch. Nếu đơn đã thanh toán, quản trị viên sẽ xử lý việc hoàn tiền riêng và xác nhận điều kiện, số tiền, thời gian.", "Booking cancelled. If it was paid, an administrator will handle the refund separately and confirm eligibility, amount, and timing.", "予約をキャンセルしました。支払い済みの場合、返金は管理者が個別に対応し、可否・金額・時期を確認します。"],
  booking_change_failed: ["Không thể thay đổi lịch. Kiểm tra thời hạn và khung giờ còn trống.", "Could not change the booking. Check the deadline and availability.", "予約を変更できません。期限と空き状況を確認してください。"],
});

const sbConfig = window.DIAMOND_SUPABASE_CONFIG || {};
const authRedirectUrl = "https://buitungbach.github.io/diamond-rental/";
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
let chatThreadId = "";
let chatThreadMode = "booking";
let pendingAiMessageId = "";
let chatBlockedByMe = false;
let chatBlockedByOther = false;
let chatChannel = null;
let notificationsChannel = null;
let bookingsChannel = null;
let unreadMessages = 0;
let pushNotificationsEnabled = false;
let deferredInstallPrompt = null;
let appInstalled = false;
const installIsIos = /iphone|ipad|ipod/i.test(navigator.userAgent)
  || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const installIsAndroid = /android/i.test(navigator.userAgent);
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

async function loadCustomerPublicProfile() {
  const account = activeAccount();
  if (!sb || account?.role !== "customer") return;
  const { data, error } = await sb.from("customer_public_profiles")
    .select("display_name,avatar_path").eq("user_id", account.id).maybeSingle();
  if (error) {
    console.error("Could not load customer public profile", error.message);
    account.publicProfileError = true;
    return;
  }
  account.publicProfileError = false;
  account.publicName = data?.display_name || "";
  account.avatarPath = data?.avatar_path || "";
}

function customerAvatarPublicUrl(path) {
  if (!sb || !path) return "";
  const { data } = sb.storage.from("customer-avatars").getPublicUrl(path);
  return trustedImageUrl(data.publicUrl);
}

function avatarMarkup(label, url, className = "chat-avatar") {
  const imageUrl = trustedImageUrl(url);
  return imageUrl
    ? `<img class="${className}" src="${esc(imageUrl)}" alt="${esc(label)}" loading="lazy">`
    : `<span class="${className} avatar-placeholder" aria-hidden="true">${esc((label || "?").trim().charAt(0).toUpperCase())}</span>`;
}

function renderCustomerPublicProfile() {
  const account = activeAccount();
  if (account?.role !== "customer") return "";
  if (account.publicProfileError) {
    return `<div class="panel"><h3>${t("customer_public_profile")}</h3><p class="err">${t("customer_profile_error")}</p></div>`;
  }
  const avatarUrl = customerAvatarPublicUrl(account.avatarPath);
  return `<div class="panel"><h3>${t("customer_public_profile")}</h3>
    <p class="muted">${t("customer_public_profile_help")}</p>
    <div class="row">${avatarMarkup(account.publicName || t("acct_customer"), avatarUrl, "customer-avatar")}
      <label class="field" style="flex:1">${t("customer_display_name")}<input id="customerPublicName" maxlength="50" value="${esc(account.publicName || "")}" placeholder="${esc(account.name)}"></label>
    </div>
    <div class="row" style="margin-top:10px">
      <button class="btn sm" onclick="updateCustomerPublicProfile()">${t("customer_profile_save")}</button>
      <button class="btn ghost sm" onclick="chooseCustomerAvatar()">${t("customer_avatar_change")}</button>
      ${account.avatarPath ? `<button class="btn ghost sm" onclick="removeCustomerAvatar()">${t("customer_avatar_remove")}</button>` : ""}
    </div><p id="customerPublicProfileStatus" class="muted" role="status"></p></div>`;
}

window.updateCustomerPublicProfile = async function() {
  const account = activeAccount();
  if (!sb || account?.role !== "customer") return toast(t("acct_access_denied"));
  const displayName = $("customerPublicName")?.value.trim() || "";
  if (displayName.length > 50) return toast(t("acct_missing"));
  const { error } = await sb.from("customer_public_profiles").upsert({
    user_id: account.id,
    display_name: displayName || null,
    avatar_path: account.avatarPath || null,
  }, { onConflict: "user_id" });
  if (error) {
    console.error("Could not save customer public profile", error.message);
    return toast(error.message || t("customer_profile_error"));
  }
  account.publicName = displayName;
  account.publicProfileError = false;
  socialFeedCache = null;
  renderAccount();
  toast(t("customer_profile_save"));
};

window.chooseCustomerAvatar = function() {
  const account = activeAccount();
  if (!sb || account?.role !== "customer") return toast(t("acct_access_denied"));
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/jpeg,image/png,image/webp";
  picker.onchange = async () => {
    const file = picker.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 8 * 1024 * 1024) {
      return toast(t("social_upload_failed"));
    }
    const status = $("customerPublicProfileStatus");
    if (status) status.textContent = t("processing");
    let objectUrl = "";
    let uploadedPath = "";
    try {
      objectUrl = URL.createObjectURL(file);
      const image = new Image();
      const loaded = new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Could not read the selected image"));
      });
      image.src = objectUrl;
      await loaded;
      const scale = Math.min(1, 512 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Image processing is unavailable");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
      if (!blob) throw new Error("Could not compress the selected image");
      uploadedPath = `${account.id}/${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await sb.storage.from("customer-avatars").upload(uploadedPath, blob, {
        contentType: "image/jpeg", cacheControl: "3600", upsert: false,
      });
      if (uploadError) throw uploadError;
      const oldPath = account.avatarPath;
      const displayName = $("customerPublicName")?.value.trim() || account.publicName || "";
      const { error: profileError } = await sb.from("customer_public_profiles").upsert({
        user_id: account.id, display_name: displayName || null, avatar_path: uploadedPath,
      }, { onConflict: "user_id" });
      if (profileError) throw profileError;
      account.publicName = displayName;
      account.avatarPath = uploadedPath;
      account.publicProfileError = false;
      socialFeedCache = null;
      if (oldPath) {
        const { error: removeError } = await sb.storage.from("customer-avatars").remove([oldPath]);
        if (removeError) console.error("Could not remove previous customer avatar", removeError.message);
      }
      renderAccount();
    } catch (error) {
      if (uploadedPath) {
        const { error: removeError } = await sb.storage.from("customer-avatars").remove([uploadedPath]);
        if (removeError) console.error("Could not clean up failed customer avatar upload", removeError.message);
      }
      console.error("Could not update customer avatar", error.message);
      if (status) status.textContent = error.message || t("customer_profile_error");
    } finally {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    }
  };
  picker.click();
};

window.removeCustomerAvatar = async function() {
  const account = activeAccount();
  if (!sb || account?.role !== "customer" || !account.avatarPath) return toast(t("acct_access_denied"));
  const oldPath = account.avatarPath;
  const { error } = await sb.from("customer_public_profiles").upsert({
    user_id: account.id,
    display_name: account.publicName || null,
    avatar_path: null,
  }, { onConflict: "user_id" });
  if (error) {
    console.error("Could not remove customer avatar from profile", error.message);
    return toast(error.message || t("customer_profile_error"));
  }
  account.avatarPath = "";
  socialFeedCache = null;
  const { error: removeError } = await sb.storage.from("customer-avatars").remove([oldPath]);
  if (removeError) console.error("Could not remove previous customer avatar", removeError.message);
  renderAccount();
};

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
  const windows = Array.isArray(row.availability) ? row.availability
    .map((item) => ({ day: Number(item.day), from: Number(item.from), to: Number(item.to) }))
    .filter((item) => Number.isInteger(item.day) && item.day >= 0 && item.day <= 6
      && Number.isInteger(item.from) && item.from >= 0
      && Number.isInteger(item.to) && item.to <= 24 && item.from < item.to)
    : [0, 1, 2, 3, 4, 5, 6].map((day) => ({ day, from: 10, to: 22 }));
  const profile = {
    id: row.id,
    name: row.display_name,
    section: row.section,
    price: SECTIONS[row.section]?.price || SECTIONS.silver.price,
    color: "#7048e8",
    tags: Array.isArray(row.tags) ? row.tags : [],
    avail: {
      days: windows.map((item) => item.day),
      from: windows.length ? Math.min(...windows.map((item) => item.from)) : 10,
      to: windows.length ? Math.max(...windows.map((item) => item.to)) : 22,
      windows,
    },
    profile: [["Giới thiệu", row.bio || ""]],
    story: [],
    custom: true,
    profileType: row.persona_mode === "ai" ? "ai" : "real",
    catalogKey: row.catalog_key || null,
    ownerId: row.owner_id,
    isVerified: row.is_verified === true,
    avatarUrl: row.avatar_url,
    active: row.is_active,
    chatBackgroundUrl: row.chat_background_url || "",
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
    .select("*, renter_profiles(id,owner_id,display_name,section,persona_mode,catalog_key,avatar_url,chat_background_url,availability)")
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
      method: row.payment_method || "qr",
      status: row.status === "completed" ? "done" : row.status,
      created: row.created_at,
      total: row.total_vnd,
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
    unreadMessages = 0;
    pushNotificationsEnabled = false;
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
    emailNotificationsEnabled: data.email_notifications_enabled !== false,
  };
  S.activeAccountId = remoteAccount.id;
  if (remoteAccount.role === "customer") await loadCustomerPublicProfile();
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
  await loadUnreadMessageCount();
  renderAll();
}

async function loadUnreadMessageCount() {
  if (!sb || !remoteAccount) {
    unreadMessages = 0;
    return;
  }
  const [bookingResult, adminResult] = await Promise.all([
    sb.from("messages").select("id", { count: "exact", head: true })
      .is("read_at", null).or(`sender_id.is.null,sender_id.neq.${remoteAccount.id}`),
    sb.from("admin_chat_messages").select("id", { count: "exact", head: true })
      .is("read_at", null).or(`sender_id.is.null,sender_id.neq.${remoteAccount.id}`),
  ]);
  if (bookingResult.error || adminResult.error) {
    console.error("Could not load unread message count", bookingResult.error?.message || adminResult.error?.message);
    unreadMessages = 0;
    return;
  }
  unreadMessages = (bookingResult.count || 0) + (adminResult.count || 0);
}

async function markChatMessagesRead(table, conversationColumn, conversationId, messages) {
  if (!sb || !remoteAccount || !conversationId) return;
  const unreadIds = messages.filter((message) => message.sender_id !== remoteAccount.id && !message.read_at)
    .map((message) => message.id);
  if (!unreadIds.length) return;
  const { error } = await sb.from(table).update({ read_at: new Date().toISOString() })
    .in("id", unreadIds).eq(conversationColumn, conversationId);
  if (error) {
    console.error("Could not mark chat messages as read", error.message);
    return;
  }
  await loadUnreadMessageCount();
  renderChrome();
}

function subscribeToNotifications() {
  if (!sb || !remoteAccount) return;
  if (notificationsChannel) sb.removeChannel(notificationsChannel);
  notificationsChannel = sb.channel(`messages:${remoteAccount.id}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "app_notifications", filter: `user_id=eq.${remoteAccount.id}` }, (event) => {
      if (view === "account") loadAccountNotifications();
      notifyAccountNotification(event.new);
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (event) => {
      if (event.new.sender_id !== remoteAccount.id) {
        toast("Tin nhắn mới trong cuộc trò chuyện đã thanh toán.");
        loadUnreadMessageCount().then(renderChrome);
        if (view === "orders") renderAll();
        if (view === "chat-inbox" && remoteAccount.role === "renter") renderRenterChatInbox();
        if (view === "chat" && chatBookingId === event.new.booking_id) loadChatMessages();
      }
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_chat_messages" }, (event) => {
      if (event.new.sender_id !== remoteAccount.id) {
        toast("Tin nhắn mới trong chat quản trị.");
        loadUnreadMessageCount().then(renderChrome);
        if (view === "account" && remoteAccount.role === "renter") loadRenterAdminChats();
        if (view === "chat" && chatThreadMode === "admin" && chatThreadId === event.new.thread_id) loadAdminChatMessages();
      }
    })
    .subscribe();
  if (bookingsChannel) sb.removeChannel(bookingsChannel);
  bookingsChannel = sb.channel(`bookings:${remoteAccount.id}`)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "bookings" }, async () => {
      try {
        await loadBookingRows();
        if (view === "orders" || view === "account") renderAll();
        if (view === "chat-inbox" && remoteAccount.role === "renter") renderRenterChatInbox();
      } catch (error) {
        console.error("Could not refresh bookings", error.message);
      }
    })
    .subscribe();
}

function pushIsSupported() {
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}

function decodePushKey(key) {
  const padded = key.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(key.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

function updatePushControls() {
  const button = $("pushNotificationButton");
  if (!button) return;
  button.textContent = t(pushNotificationsEnabled ? "push_disable" : "push_enable");
  button.setAttribute("aria-pressed", String(pushNotificationsEnabled));
  button.disabled = !pushIsSupported() || (!sbConfig.vapidPublicKey && !pushNotificationsEnabled);
  const status = $("pushNotificationStatus");
  if (status) {
    status.textContent = !pushIsSupported() ? t("push_unsupported")
      : !sbConfig.vapidPublicKey ? t("push_missing_key") : t("push_ios_hint");
  }
}

async function loadPushSubscriptionStatus() {
  pushNotificationsEnabled = false;
  if (!pushIsSupported()) return updatePushControls();
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();
    if (subscription && remoteAccount) {
      const { data, error } = await sb.from("push_subscriptions").select("endpoint")
        .eq("endpoint", subscription.endpoint).eq("user_id", remoteAccount.id).maybeSingle();
      if (error) throw error;
      pushNotificationsEnabled = Boolean(data);
    }
  } catch (error) {
    console.error("Could not check push subscription", error.message);
  }
  updatePushControls();
}

window.togglePushNotifications = async function() {
  if (!sb || !remoteAccount) return toast(t("acct_login_to_book"));
  if (!pushIsSupported()) return toast(t("push_unsupported"));
  if (!sbConfig.vapidPublicKey && !pushNotificationsEnabled) return toast(t("push_missing_key"));
  const button = $("pushNotificationButton");
  if (button) button.disabled = true;
  try {
    const registration = await navigator.serviceWorker.register(new URL("./sw.js", window.location.href), { scope: "./" });
    let subscription = await registration.pushManager.getSubscription();
    if (subscription && pushNotificationsEnabled) {
      const { error } = await sb.from("push_subscriptions").delete()
        .eq("endpoint", subscription.endpoint).eq("user_id", remoteAccount.id);
      if (error) throw error;
      await subscription.unsubscribe();
      pushNotificationsEnabled = false;
      toast(t("push_disabled"));
    } else {
      if (Notification.permission === "denied") throw new Error(t("push_denied"));
      if (Notification.permission !== "granted" && await Notification.requestPermission() !== "granted") {
        throw new Error(t("push_denied"));
      }
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: decodePushKey(sbConfig.vapidPublicKey),
        });
      }
      const keys = subscription.toJSON().keys;
      if (!keys?.p256dh || !keys.auth) throw new Error(t("push_error"));
      const { error } = await sb.from("push_subscriptions").upsert({
        endpoint: subscription.endpoint,
        user_id: remoteAccount.id,
        p256dh: keys.p256dh,
        auth: keys.auth,
        updated_at: new Date().toISOString(),
      }, { onConflict: "endpoint" });
      if (error) throw error;
      pushNotificationsEnabled = true;
      toast(t("push_enabled"));
    }
  } catch (error) {
    console.error("Could not update push subscription", error.message);
    toast(error.message || t("push_error"));
  } finally {
    updatePushControls();
  }
};

function notifyAccountNotification(notification) {
  if (pushNotificationsEnabled || !("Notification" in window)
    || Notification.permission !== "granted" || !document.hidden) return;
  const isMessage = notification.notification_type === "new_message";
  const title = isMessage ? `VELORA · ${notification.title || "Tin nhắn mới"}`
    : `VELORA · ${notification.title || "Cập nhật đơn thuê"}`;
  const body = isMessage ? notification.body || "Bạn có tin nhắn mới. Đăng nhập để xem."
    : notification.body || (notification.notification_type === "booking_paid" ? "Thanh toán đơn thuê đã được xác nhận."
      : notification.notification_type === "booking_created" ? "Bạn có đơn thuê mới."
        : "Đơn thuê của bạn vừa được cập nhật.");
  new Notification(title, { body, icon: "velora-logo-v2.png" });
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
          emailRedirectTo: authRedirectUrl,
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
  const { error } = await sb.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: authRedirectUrl },
  });
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
      <div class="row"><button id="pushNotificationButton" class="btn ghost sm" onclick="togglePushNotifications()">${t("push_enable")}</button>
      <button class="btn ghost sm" onclick="logoutAccount()">${t("acct_logout")}</button></div></div>
      <p class="muted">${esc(accountType)} · ${accountNote}</p>
      <div class="r2">
        <label class="field">${t("acct_name")}<input id="accName" value="${esc(account.name)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_dob")}<input id="accDob" type="date" value="${esc(account.dob)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_phone")}<input id="accPhone" type="tel" value="${esc(account.phone)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_email")}<input id="accEmail" type="email" value="${esc(account.email)}" ${locked ? "readonly" : ""}></label>
      </div>${locked ? "" : `<button class="btn sm" onclick="updateAccount()">${t("acct_save")}</button>`}
    </div>
    ${account.role === "customer" ? renderCustomerPublicProfile() : ""}
    ${account.role === "renter" ? `<div class="panel"><h3>${t("acct_girl")}</h3>
      <button class="btn sm" onclick="openAdd()">${t(S.custom.some((profile) => profile.ownerId === account.id) ? "acct_edit_profile" : "acct_add_profile")}</button>
      ${S.custom.some((profile) => profile.ownerId === account.id) ? `<button class="btn ghost sm" onclick="openAvailabilityEditor()">${t("renter_availability")}</button>
      <h4>${t("gallery")}</h4><p class="muted">${t("gallery_human_help")}</p>
      <button class="btn ghost sm" onclick="chooseGalleryUpload()">${t("addphoto")}</button><div id="renterGallery"><p class="muted">${t("processing")}</p></div>` : ""}</div>` : ""}
    ${account.role === "admin" ? `<div class="panel admin-tools">
      <h3>Khu quản lý</h3>
      <div class="row admin-tool-buttons">
        <button class="btn ghost sm" aria-expanded="false" onclick="toggleAdminSection('adminAiGallerySection',this)">Ảnh nhân vật AI</button>
        <button class="btn ghost sm" aria-expanded="false" onclick="toggleAdminSection('adminAiChatSection',this)">${t("admin_chat_title")}</button>
        <button class="btn ghost sm" aria-expanded="false" onclick="toggleAdminSection('adminChatReportsSection',this)">${t("chat_reports_title")}</button>
        <button class="btn ghost sm" aria-expanded="false" onclick="toggleAdminSection('adminExpansionSection',this)">${t("admin_expansion")}</button>
      </div>
      <section id="adminAiGallerySection" class="admin-tool-content" hidden>
        <div class="row" style="margin-top:12px"><button class="btn sm" onclick="openAdd()">+ Thêm nhân vật AI</button>
        <button class="btn ghost sm" onclick="go('orders')">${t("manual_payment_title")}</button></div>
        <h4>${t("gallery")}</h4><p class="muted">${t("gallery_admin_help")}</p>
        <div class="row"><label class="field" style="flex:1">Nhân vật
          <select id="adminAiGalleryProfile" onchange="loadAdminAiGallery(this.value)">
            <option value="">Chọn nhân vật AI</option>
            ${S.custom.filter((profile) => profile.profileType === "ai").map((profile) => `<option value="${esc(profile.id)}">${esc(profile.name)}</option>`).join("")}
          </select></label>
          <button id="adminAiGalleryUpload" class="btn ghost sm" disabled onclick="chooseAiGalleryUpload($('adminAiGalleryProfile').value)">${t("addphoto")}</button>
        </div>
        <div id="adminAiGalleryItems"><p class="muted">${t("gallery_empty")}</p></div>
      </section>
      <section id="adminAiChatSection" class="admin-tool-content" hidden>
        <p class="muted">${t("admin_chat_intro")}</p>
        ${S.custom.filter((profile) => profile.active !== false).map((profile) => `<div class="row" style="justify-content:space-between;margin:8px 0">
          <span>${esc(profile.name)} · ${profile.profileType === "ai" ? "AI" : "Bạn gái thuê"}</span>
          <button class="btn sm" onclick="openAdminChat('${esc(profile.id)}')">${t("admin_chat_open")}</button>
        </div>`).join("") || `<p class="muted">${t("admin_chat_empty")}</p>`}
      </section>
      <section id="adminChatReportsSection" class="admin-tool-content" hidden>
        <div id="chatReports"><p class="muted">${t("processing")}</p></div>
        <h4>${t("profile_reports_title")}</h4>
        <div id="renterProfileReports"><p class="muted">${t("processing")}</p></div>
      </section>
      <section id="adminExpansionSection" class="admin-tool-content" hidden><div id="adminExpansion"><p class="muted">${t("processing")}</p></div></section>
    </div>` : ""}
    ${account.role === "renter" ? `<div id="adminChatInbox"></div>` : ""}
    <div class="panel"><h3>${t("acct_privacy")}</h3>
      <label class="row"><input id="emailNotificationsEnabled" type="checkbox" ${account.emailNotificationsEnabled ? "checked" : ""} onchange="updateEmailNotifications(this.checked)"> ${t("acct_email_notifications")}</label>
      <p id="pushNotificationStatus" class="muted"></p>
      ${account.role !== "admin" ? `<div class="row" style="margin-top:10px">
        <button class="btn ghost sm" onclick="exportAccountData()">${t("acct_export")}</button>
        <button class="btn ghost sm" onclick="deleteAccountData()">${t("acct_delete")}</button>
      </div>` : ""}<p id="privacyStatus" class="muted"></p></div>
    <div class="panel" id="appNotifications"><h3>Thông báo</h3><p class="muted">${t("processing")}</p></div>
    <div class="panel"><h3>${t("ord_t")}</h3><button class="btn ghost sm" onclick="go('orders')">${t("chat_inbox")}</button></div>`;
  if (account.role === "renter") {
    loadRenterAdminChats();
  }
  if (account.role === "renter" && S.custom.some((profile) => profile.ownerId === account.id)) loadRenterGallery();
  if (account.role === "admin") { loadChatReports(); loadRenterProfileReports(); loadAdminExpansionData(); }
  loadPushSubscriptionStatus();
  loadAccountNotifications();
}

window.loadRenterGallery = async function() {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.ownerId === account?.id && item.profileType === "real");
  const panel = $("renterGallery");
  if (!panel || !profile) return;
  const { data, error } = await sb.from("renter_gallery")
    .select("id,media_url,media_type,caption,status,created_at")
    .eq("renter_profile_id", profile.id).order("created_at", { ascending: false });
  if (error) {
    console.error("Could not load renter gallery", error.message);
    panel.innerHTML = `<p class="err">${esc(error.message)}</p>`;
    return;
  }
  let urls = [];
  try {
    urls = await resolveSocialMediaUrls((data || []).map((item) => item.media_url));
  } catch (mediaError) {
    console.error("Could not sign renter gallery media", mediaError.message);
  }
  panel.innerHTML = (data || []).map((item, index) => `<div class="row" style="justify-content:space-between;margin:8px 0;padding:8px;border:1px solid var(--line);border-radius:12px">
    <div class="row">${item.media_type === "image" && urls[index] ? `<img src="${esc(urls[index])}" alt="" loading="lazy" style="width:72px;height:72px;object-fit:cover;border-radius:8px">` : ""}
      <span>${esc(item.caption || item.media_type)} · ${t(item.status === "published" ? "gallery_published" : item.status === "rejected" ? "gallery_rejected" : "gallery_pending")}</span>
    </div><button class="btn ghost sm" onclick="deleteGalleryItem('${esc(item.id)}','${esc(item.media_url)}')">${t("gallery_remove")}</button>
  </div>`).join("") || `<p class="muted">${t("gallery_empty")}</p>`;
};

window.toggleAdminSection = function(sectionId, button) {
  if (activeAccount()?.role !== "admin") return toast(t("acct_access_denied"));
  const section = $(sectionId);
  if (!section) return;
  const opening = section.hidden;
  section.hidden = !opening;
  button.setAttribute("aria-expanded", String(opening));
};

window.loadAdminAiGallery = async function(profileId) {
  const account = activeAccount();
  const selector = $("adminAiGalleryProfile");
  const panel = $("adminAiGalleryItems");
  const uploadButton = $("adminAiGalleryUpload");
  const profile = S.custom.find((item) => item.id === profileId && item.profileType === "ai");
  if (!sb || account?.role !== "admin" || !selector || !panel) return;
  if (!profile) {
    if (uploadButton) uploadButton.disabled = true;
    panel.innerHTML = `<p class="muted">${t("gallery_empty")}</p>`;
    return;
  }
  selector.value = profileId;
  if (uploadButton) uploadButton.disabled = false;
  panel.innerHTML = `<p class="muted">${t("processing")}</p>`;
  const { data, error } = await sb.from("renter_gallery")
    .select("id,media_url,media_type,caption,status")
    .eq("renter_profile_id", profile.id).order("created_at", { ascending: false });
  if (selector.value !== profileId) return;
  if (error) {
    console.error("Could not load AI character gallery", error.message);
    panel.innerHTML = `<p class="err">${esc(error.message)}</p>`;
    return;
  }
  let urls = [];
  try {
    urls = await resolveSocialMediaUrls((data || []).map((item) => item.media_url));
  } catch (mediaError) {
    console.error("Could not sign AI character gallery media", mediaError.message);
  }
  if (activeAccount()?.role !== "admin" || !panel.isConnected || selector.value !== profileId) return;
  panel.innerHTML = (data || []).map((item, index) => `<div class="row" style="justify-content:space-between;margin:8px 0;padding:8px;border:1px solid var(--line);border-radius:12px">
    <div class="row">${item.media_type === "image" && urls[index] ? `<img src="${esc(urls[index])}" alt="" loading="lazy" style="width:72px;height:72px;object-fit:cover;border-radius:8px">` : ""}
      <span>${esc(item.caption || item.media_type)}</span>
    </div><button class="btn ghost sm" onclick="deleteAiGalleryItem('${esc(profile.id)}','${esc(item.id)}','${esc(item.media_url)}')">${t("gallery_remove")}</button>
  </div>`).join("") || `<p class="muted">${t("gallery_empty")}</p>`;
};

window.chooseAiGalleryUpload = function(profileId) {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.id === profileId && item.profileType === "ai");
  if (!sb || account?.role !== "admin" || !profile) return toast(t("acct_access_denied"));
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/jpeg,image/png,image/webp";
  picker.onchange = async () => {
    const file = picker.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 50 * 1024 * 1024) {
      return toast(t("social_upload_failed"));
    }
    const caption = prompt(t("gallery_caption_prompt")) || "";
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${profile.id}/gallery/${crypto.randomUUID()}.${ext}`;
    try {
      const { error: uploadError } = await sb.storage.from("renter-social-media").upload(path, file, {
        contentType: file.type, cacheControl: "3600", upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data: urlData } = sb.storage.from("renter-social-media").getPublicUrl(path);
      const { error } = await sb.from("renter_gallery").insert({
        renter_profile_id: profile.id,
        media_url: urlData.publicUrl,
        media_type: "image",
        caption,
        status: "published",
        is_ai_generated: false,
      });
      if (error) {
        const { error: cleanupError } = await sb.storage.from("renter-social-media").remove([path]);
        if (cleanupError) console.error("Could not remove media after AI gallery insert failed", cleanupError.message);
        throw error;
      }
      if ($("adminAiGalleryProfile")?.value === profile.id) await loadAdminAiGallery(profile.id);
      toast(t("gallery_saved"));
    } catch (error) {
      console.error("Could not save AI character gallery media", error.message);
      toast(error.message || t("social_upload_failed"));
    }
  };
  picker.click();
};

window.deleteAiGalleryItem = async function(profileId, itemId, mediaUrl) {
  const profile = S.custom.find((item) => item.id === profileId && item.profileType === "ai");
  if (!sb || activeAccount()?.role !== "admin" || !profile) return toast(t("acct_access_denied"));
  const { error } = await sb.from("renter_gallery").delete()
    .eq("id", itemId).eq("renter_profile_id", profile.id);
  if (error) {
    console.error("Could not delete AI gallery entry", error.message);
    return toast(error.message);
  }
  const storagePath = galleryStoragePath(mediaUrl);
  if (storagePath) {
    const { error: removeError } = await sb.storage.from("renter-social-media").remove([storagePath]);
    if (removeError) {
      console.error("Could not remove AI gallery media", removeError.message);
      await loadAdminAiGallery(profile.id);
      return toast(`Ảnh đã gỡ khỏi hồ sơ nhưng tệp lưu trữ chưa xóa được: ${removeError.message}`);
    }
  }
  await loadAdminAiGallery(profile.id);
};

function galleryStoragePath(mediaUrl) {
  try {
    const url = new URL(mediaUrl);
    const marker = "/storage/v1/object/public/renter-social-media/";
    const index = url.pathname.indexOf(marker);
    return index < 0 ? "" : decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch (error) {
    console.error("Could not parse gallery media URL", error.message);
    return "";
  }
}

window.chooseGalleryUpload = function() {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.ownerId === account?.id && item.profileType === "real");
  if (!sb || account?.role !== "renter" || !profile) return toast(t("acct_access_denied"));
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/jpeg,image/png,image/webp,video/mp4,video/webm";
  picker.onchange = async () => {
    const file = picker.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"].includes(file.type)
      || file.size > 50 * 1024 * 1024) return toast(t("social_upload_failed"));
    const caption = prompt(t("social_caption")) || "";
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `${profile.id}/gallery/${crypto.randomUUID()}.${ext}`;
    try {
      const { error: uploadError } = await sb.storage.from("renter-social-media").upload(path, file, {
        contentType: file.type, cacheControl: "3600", upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data: urlData } = sb.storage.from("renter-social-media").getPublicUrl(path);
      const { error } = await sb.from("renter_gallery").insert({
        renter_profile_id: profile.id,
        media_url: urlData.publicUrl,
        media_type: file.type.startsWith("video/") ? "video" : "image",
        caption,
        status: "published",
        is_ai_generated: false,
      });
      if (error) {
        const { error: cleanupError } = await sb.storage.from("renter-social-media").remove([path]);
        if (cleanupError) console.error("Could not remove media after gallery insert failed", cleanupError.message);
        throw error;
      }
      await loadRenterGallery();
      if (curP === profile.id && !$("ov").hidden) {
        await loadProfileGallery(profile.id, profile.backendId || profile.id, 0);
      }
      toast(t("gallery_saved"));
    } catch (error) {
      console.error("Could not save gallery media", error.message);
      toast(error.message || t("social_upload_failed"));
    }
  };
  picker.click();
};

window.deleteGalleryItem = async function(id, mediaUrl) {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.ownerId === account?.id && item.profileType === "real");
  if (!sb || !profile) return toast(t("acct_access_denied"));
  const { error } = await sb.from("renter_gallery").delete().eq("id", id).eq("renter_profile_id", profile.id);
  if (error) {
    console.error("Could not delete gallery item", error.message);
    return toast(error.message);
  }
  const storagePath = galleryStoragePath(mediaUrl);
  if (storagePath) {
    const { error: removeError } = await sb.storage.from("renter-social-media").remove([storagePath]);
    if (removeError) {
      console.error("Could not remove gallery media", removeError.message);
      await loadRenterGallery();
      return toast(`Ảnh đã gỡ khỏi hồ sơ nhưng tệp lưu trữ chưa xóa được: ${removeError.message}`);
    }
  }
  await loadRenterGallery();
};

window.addPic = function(profileId) {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.id === profileId && item.ownerId === account?.id && item.profileType === "real");
  if (!profile || account?.role !== "renter") return toast(t("acct_access_denied"));
  chooseGalleryUpload();
};

window.delPic = async function(profileId, galleryIndex) {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.id === profileId && item.ownerId === account?.id && item.profileType === "real");
  const item = S.gallery[profileId]?.[galleryIndex];
  if (!sb || !profile || account?.role !== "renter" || !item?.id) return toast(t("acct_access_denied"));
  await deleteGalleryItem(item.id, item.media_url);
  if (curP === profileId && !$("ov").hidden) {
    await loadProfileGallery(profileId, profile.backendId || profile.id, 0);
  }
};

const signedMediaUrls = new Map();
async function resolveSocialMediaUrls(mediaUrls) {
  const marker = "/storage/v1/object/public/renter-social-media/";
  const paths = new Map();
  const resolved = mediaUrls.map((mediaUrl) => {
    const parsed = new URL(mediaUrl);
    const markerIndex = parsed.pathname.indexOf(marker);
    if (markerIndex < 0) return { url: mediaUrl };
    const path = decodeURIComponent(parsed.pathname.slice(markerIndex + marker.length));
    const cached = signedMediaUrls.get(path);
    if (cached && cached.expiresAt > Date.now()) return { url: cached.url };
    if (cached) signedMediaUrls.delete(path);
    paths.set(path, null);
    return { path };
  });
  const pending = [...paths.keys()];
  if (!pending.length) return resolved.map(({ url }) => url);
  const { data, error } = await sb.storage.from("renter-social-media").createSignedUrls(pending, 3600);
  if (error) throw error;
  for (const item of data || []) {
    if (!item.path || !item.signedUrl || item.error) continue;
    signedMediaUrls.set(item.path, { url: item.signedUrl, expiresAt: Date.now() + 50 * 60 * 1000 });
    paths.set(item.path, item.signedUrl);
  }
  return resolved.map(({ path, url }) => {
    if (!path) return url;
    const signedUrl = paths.get(path);
    if (!signedUrl) console.error("Could not sign social media", path);
    return signedUrl || "";
  });
}

async function loadProfileGallery(displayProfileId, databaseProfileId, index) {
  const { data, error } = await sb.from("renter_gallery")
    .select("media_url,media_type,source_url,source_credit")
    .eq("renter_profile_id", databaseProfileId).eq("status", "published")
    .order("created_at", { ascending: false }).limit(50);
  if (error) {
    console.error("Could not load profile gallery", error.message);
    return;
  }
  if (curP !== displayProfileId || $("ov").hidden) return;
  try {
    const urls = await resolveSocialMediaUrls((data || []).map((item) => item.media_url));
    S.gallery[displayProfileId] = (data || []).map((item, index) => ({ ...item, media_url: urls[index] || "" }));
  } catch (mediaError) {
    console.error("Could not sign profile gallery media", mediaError.message);
    S.gallery[displayProfileId] = (data || []).map((item) => ({ ...item, media_url: "" }));
  }
  localOpenProfile(displayProfileId, Math.max(0, Math.min(index || 0, pics(getG(displayProfileId)).length - 1)));
  appendProfileNotice(displayProfileId);
}

function appendProfileNotice(id) {
  const profile = getG(id);
  const account = activeAccount();
  if (!profile || $("ov").hidden) return;
  const real = profile.profileType === "real";
  const canEditGallery = real && account?.role === "renter" && account.id === profile.ownerId;
  const verification = profile.isVerified ? `<span class="st-b ok">${t("verified_badge")}</span>` : "";
  const identityNotice = real
    ? t(profile.isVerified ? "renter_verified_detail" : "renter_self_reported_detail")
    : "";
  $("box").insertAdjacentHTML("beforeend", `${verification}${real ? `<p class="notice">${identityNotice}</p>` : ""}${canEditGallery ? `<div class="row"><button class="btn ghost sm" onclick="chooseGalleryUpload()">${t("addphoto")}</button><button class="btn ghost sm" onclick="openAdd()">${t("acct_edit_profile")}</button></div>` : ""}`);
  guardProfileEditControls();
}

window.loadAdminExpansionData = async function() {
  const panel = $("adminExpansion");
  if (!panel || !sb || activeAccount()?.role !== "admin") return;
  const { data, error } = await sb.rpc("list_admin_expansion_data");
  if (error) {
    console.error("Could not load expansion dashboard", error.message);
    panel.innerHTML = `<p class="err">${t("admin_load_failed")}</p><small>${esc(error.message)}</small>`;
    return;
  }
  const content = await Promise.all((data?.pending_content || []).map(async (item) => {
    try {
      return { ...item, display_media_url: await resolveSocialMediaUrl(item.media_url) };
    } catch (mediaError) {
      console.error("Could not sign pending moderation media", mediaError.message);
      return { ...item, display_media_url: "" };
    }
  }));
  const verification = data?.unverified_profiles || [];
  const reports = data?.open_social_reports_list || [];
  panel.innerHTML = `<div class="r2">
      <div class="notice">Chờ thanh toán: <b>${Number(data.pending_payments) || 0}</b></div>
      <div class="notice">Lịch đã thanh toán: <b>${Number(data.active_bookings) || 0}</b></div>
      <div class="notice">${t("admin_moderation")}: <b>${content.length}</b></div>
      <div class="notice">Báo cáo chat/bài viết: <b>${(Number(data.open_chat_reports) || 0) + (Number(data.open_social_reports) || 0)}</b></div>
    </div>
    <h4>${t("admin_moderation")}</h4>
    ${content.length ? content.map((item) => `<article class="report-card">
      <b>${esc(item.profile_name)} · ${item.type === "post" ? "Bài viết" : "Thư viện"}</b>
      <p>${esc(item.caption || "")}</p>
      ${!item.display_media_url ? `<p class="err">${t("social_upload_failed")}</p>` : item.media_type === "video" ? `<video src="${esc(item.display_media_url)}" controls preload="metadata" style="max-width:100%;max-height:300px"></video>` : `<img src="${esc(item.display_media_url)}" alt="" loading="lazy" style="max-width:100%;max-height:300px;border-radius:12px">`}
      <div class="row"><button class="btn sm" onclick="moderateSocialContent('${esc(item.type)}','${esc(item.id)}','published')">${t("admin_approve")}</button>
      <button class="btn ghost sm" onclick="moderateSocialContent('${esc(item.type)}','${esc(item.id)}','rejected')">${t("admin_reject")}</button></div>
    </article>`).join("") : `<p class="muted">${t("social_empty")}</p>`}
    <h4>${t("admin_verification")}</h4>
    ${verification.length ? verification.map((profile) => `<div class="row" style="justify-content:space-between;margin:8px 0">
      <span>${esc(profile.display_name)}</span>
      <button class="btn ghost sm" onclick="setRenterVerification('${esc(profile.id)}',true)">${t("admin_verify")}</button>
    </div>`).join("") : `<p class="muted">Không có hồ sơ chờ xác minh.</p>`}
    <h4>${t("admin_reports")}</h4>
    ${reports.length ? reports.map((report) => `<article class="report-card">
      <p>${esc(report.caption || "")}</p><p class="muted">${esc(report.reason)}</p>
      <button class="btn ghost sm" onclick="moderateSocialContent('post','${esc(report.post_id)}','rejected')">${t("admin_reject")}</button>
      <button class="btn ghost sm" onclick="resolveSocialReport('${esc(report.id)}','resolved')">${t("chat_report_resolve")}</button>
      <button class="btn ghost sm" onclick="resolveSocialReport('${esc(report.id)}','dismissed')">${t("chat_report_dismiss")}</button>
    </article>`).join("") : `<p class="muted">${t("chat_report_empty")}</p>`}
    <h4>Đơn gần đây</h4>
    ${(data.recent_bookings || []).slice(0, 10).map((booking) => `<p class="muted">${esc(booking.code)} · ${esc(booking.renter_name)} · ${esc(booking.status)} · ${Number(booking.total_vnd).toLocaleString("vi-VN")} ₫</p>`).join("") || `<p class="muted">${t("ord_none")}</p>`}`;
};

window.moderateSocialContent = async function(type, id, decision) {
  if (!sb || activeAccount()?.role !== "admin") return toast(t("acct_access_denied"));
  const { data, error } = await sb.rpc("moderate_social_content", {
    p_content_type: type, p_content_id: id, p_decision: decision,
  });
  if (error) {
    console.error("Could not moderate social content", error.message);
    return toast(error.message);
  }
  if (data !== true) return toast(t("admin_load_failed"));
  await loadAdminExpansionData();
  toast(decision === "published" ? t("admin_approve") : t("admin_reject"));
};

window.setRenterVerification = async function(profileId, verified) {
  if (!sb || activeAccount()?.role !== "admin") return toast(t("acct_access_denied"));
  const { data, error } = await sb.rpc("set_renter_verification", {
    p_profile_id: profileId, p_verified: verified,
  });
  if (error) {
    console.error("Could not update renter verification", error.message);
    return toast(error.message);
  }
  if (data !== true) return toast(t("admin_load_failed"));
  await loadRenterProfiles();
  await loadAdminExpansionData();
  renderAll();
};

window.resolveSocialReport = async function(reportId, status) {
  if (!sb || activeAccount()?.role !== "admin") return toast(t("acct_access_denied"));
  const { data, error } = await sb.rpc("resolve_social_report", { p_report_id: reportId, p_status: status });
  if (error) {
    console.error("Could not resolve social report", error.message);
    return toast(error.message);
  }
  if (data !== true) return toast(t("admin_load_failed"));
  await loadAdminExpansionData();
};

window.loadAccountNotifications = async function() {
  const panel = $("appNotifications");
  const account = activeAccount();
  if (!panel || !sb || !account) return;
  const { data, error } = await sb.from("app_notifications")
    .select("id,notification_type,title,body,reference_code,read_at,created_at")
    .eq("user_id", account.id).order("created_at", { ascending: false }).limit(20);
  if (error) {
    console.error("Could not load in-app notifications", error.message);
    panel.innerHTML = `<h3>Thông báo</h3><p class="err">${esc(error.message)}</p>`;
    return;
  }
  const unreadIds = (data || []).filter((item) => !item.read_at).map((item) => item.id);
  panel.innerHTML = `<h3>Thông báo</h3>${data?.length ? data.map((item) => `<article class="report-card">
    <b>${esc(item.title)}</b> ${item.read_at ? "" : `<span class="st-b wait">Mới</span>`}
    <p>${esc(item.body)}${item.reference_code ? ` · ${esc(item.reference_code)}` : ""}</p>
    ${item.notification_type === "new_message" || item.notification_type.startsWith("booking_")
      ? `<button class="btn ghost sm" onclick="go('orders')">${item.notification_type === "new_message" ? t("chat_open") : t("ord_t")}</button>` : ""}
    <small class="muted">${new Date(item.created_at).toLocaleString()}</small>
  </article>`).join("") : `<p class="muted">Chưa có thông báo.</p>`}
    ${unreadIds.length ? `<button class="btn ghost sm" onclick="markNotificationsRead()">${t("chat_read")}</button>` : ""}`;
};

window.markNotificationsRead = async function() {
  const account = activeAccount();
  if (!sb || !account) return;
  const { error } = await sb.from("app_notifications").update({ read_at: new Date().toISOString() })
    .eq("user_id", account.id).is("read_at", null);
  if (error) {
    console.error("Could not mark notifications read", error.message);
    return toast(error.message);
  }
  await loadAccountNotifications();
};

window.updateEmailNotifications = async function(enabled) {
  const account = activeAccount();
  if (!sb || !account) return;
  const { data, error } = await sb.rpc("set_email_notifications_enabled", { p_enabled: enabled });
  if (error) {
    console.error("Could not update email notification preference", error.message);
    const input = $("emailNotificationsEnabled");
    if (input) input.checked = !enabled;
    return toast(error.message);
  }
  if (data !== true) {
    const input = $("emailNotificationsEnabled");
    if (input) input.checked = !enabled;
    return toast(t("acct_privacy_failed"));
  }
  account.emailNotificationsEnabled = enabled;
};

window.exportAccountData = async function() {
  if (!sb || !activeAccount()) return toast(t("social_login_required"));
  const status = $("privacyStatus");
  if (status) status.textContent = t("processing");
  const { data, error } = await sb.functions.invoke("account-privacy", { body: { action: "export" } });
  if (error) {
    console.error("Could not export account data", error.message);
    if (status) status.textContent = error.message || t("acct_privacy_failed");
    return;
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `diamond-rental-data-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  if (status) status.textContent = t("acct_export");
};

window.deleteAccountData = async function() {
  if (!sb || !activeAccount() || !confirm(t("acct_delete_confirm"))) return;
  const status = $("privacyStatus");
  if (status) status.textContent = t("processing");
  const { error } = await sb.functions.invoke("account-privacy", { body: { action: "delete" } });
  if (error) {
    console.error("Could not delete account data", error.message);
    if (status) status.textContent = error.message || t("acct_privacy_failed");
    return;
  }
  await sb.auth.signOut();
  toast(t("acct_deleted"));
  go("account");
};

window.loadChatReports = async function() {
  const panel = $("chatReports");
  if (!panel || !sb || activeAccount()?.role !== "admin") return;
  const { data, error } = await sb.rpc("list_chat_reports");
  if (error) {
    console.error("Could not load chat reports", error.message);
    panel.innerHTML = `<p class="err">${t("chat_reports_load_error")}</p><p class="muted">${esc(error.message)}</p>`;
    return;
  }
  panel.innerHTML = `${data?.length ? data.map((report) => `
    <article class="report-card">
      <div class="row" style="justify-content:space-between"><b>${esc(report.renter_name || "")}</b>
        <span class="st-b ${report.status === "open" ? "wait" : "ok"}">${esc(report.status)}</span></div>
      <p class="muted">${esc(report.reporter_name || "")}${report.booking_code ? ` · ${esc(report.booking_code)}` : ""} · ${new Date(report.created_at).toLocaleString()}</p>
      <p>${esc(report.reason)}</p>
      ${report.status === "open" ? `<div class="row">
        <button class="btn sm" onclick="resolveChatReport('${esc(report.id)}','resolved')">${t("chat_report_resolve")}</button>
        <button class="btn ghost sm" onclick="resolveChatReport('${esc(report.id)}','dismissed')">${t("chat_report_dismiss")}</button>
      </div>` : ""}
    </article>`).join("") : `<p class="muted">${t("chat_report_empty")}</p>`}`;
};

window.loadRenterProfileReports = async function() {
  const panel = $("renterProfileReports");
  if (!panel || !sb || activeAccount()?.role !== "admin") return;
  const { data, error } = await sb.rpc("list_renter_profile_reports");
  if (error) {
    console.error("Could not load renter profile reports", error.message);
    panel.innerHTML = `<p class="err">${t("profile_reports_load_error")}</p><p class="muted">${esc(error.message)}</p>`;
    return;
  }
  panel.innerHTML = `${data?.length ? data.map((report) => `
    <article class="report-card">
      <div class="row" style="justify-content:space-between"><b>${esc(report.profile_name || "")}</b>
        <span class="st-b ${report.status === "open" ? "wait" : "ok"}">${esc(report.status)}</span></div>
      <p class="muted">${esc(report.reporter_name || "")} · ${new Date(report.created_at).toLocaleString()}</p>
      <p>${esc(report.reason)}</p>
      ${report.status === "open" ? `<div class="row">
        <button class="btn sm" onclick="resolveRenterProfileReport('${esc(report.id)}','resolved')">${t("chat_report_resolve")}</button>
        <button class="btn ghost sm" onclick="resolveRenterProfileReport('${esc(report.id)}','dismissed')">${t("chat_report_dismiss")}</button>
      </div>` : ""}
    </article>`).join("") : `<p class="muted">${t("profile_reports_empty")}</p>`}`;
};

window.resolveRenterProfileReport = async function(reportId, status) {
  if (!sb || activeAccount()?.role !== "admin") return toast(t("acct_access_denied"));
  const { data, error } = await sb.rpc("resolve_renter_profile_report", {
    p_report_id: reportId, p_status: status,
  });
  if (error) {
    console.error("Could not resolve renter profile report", error.message);
    return toast(error.message);
  }
  if (data !== true) return toast(t("profile_report_error"));
  await loadRenterProfileReports();
  toast(t("profile_report_resolved"));
};

window.resolveChatReport = async function(id, status) {
  if (!sb || activeAccount()?.role !== "admin") return toast(t("acct_access_denied"));
  const { error } = await sb.rpc("resolve_chat_report", { p_report_id: id, p_status: status });
  if (error) {
    console.error("Could not resolve chat report", error.message);
    return toast(error.message);
  }
  await loadChatReports();
  toast(t("chat_report_resolved"));
};

window.openAvailabilityEditor = function() {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.ownerId === account?.id);
  if (!sb || account?.role !== "renter" || !profile) return toast(t("acct_access_denied"));
  const days = [1, 2, 3, 4, 5, 6, 0];
  const week = WK[L()];
  const options = (selected) => Array.from({ length: 25 }, (_, hour) =>
    `<option value="${hour}" ${hour === selected ? "selected" : ""}>${String(hour).padStart(2, "0")}:00</option>`).join("");
  openBox(`<h2>${t("renter_availability")}</h2><p class="muted">${t("availability_help")}</p>
    ${days.map((day) => {
      const current = profile.avail.windows?.find((item) => item.day === day);
      return `<div class="availability-row">
        <label><input id="availabilityDay${day}" type="checkbox" ${current ? "checked" : ""}> ${week[day]}</label>
        <label class="field">${t("from")}<select id="availabilityFrom${day}">${options(current?.from ?? 10)}</select></label>
        <label class="field">${t("to")}<select id="availabilityTo${day}">${options(current?.to ?? 22)}</select></label>
      </div>`;
    }).join("")}
    <div class="err" id="availabilityError"></div>
    <button class="btn" onclick="saveAvailability()">${t("acct_save")}</button>`);
};

window.saveAvailability = async function() {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.ownerId === account?.id);
  if (!sb || account?.role !== "renter" || !profile) return toast(t("acct_access_denied"));
  const availability = [0, 1, 2, 3, 4, 5, 6].filter((day) => $(`availabilityDay${day}`).checked)
    .map((day) => ({
      day,
      from: Number($(`availabilityFrom${day}`).value),
      to: Number($(`availabilityTo${day}`).value),
    }));
  if (availability.some((item) => item.from >= item.to)) {
    showError("availabilityError", t("acct_missing"));
    return;
  }
  const { data, error } = await sb.from("renter_profiles").update({ availability })
    .eq("id", profile.id).eq("owner_id", account.id).select("*").single();
  if (error) {
    console.error("Could not save renter availability", error.message);
    showError("availabilityError", error.message);
    return;
  }
  const updated = rowToRenter(data);
  S.custom = S.custom.map((item) => item.id === profile.id ? updated : item);
  closeBox();
  renderAll();
  toast(t("availability_saved"));
};

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

async function logoutAccount() {
  if (!sb) return;
  try {
    const { error } = await sb.auth.signOut();
    if (error) throw error;
    remoteAccount = null;
    S.activeAccountId = null;
    go("account");
  } catch (error) {
    console.error("Sign out failed", error.message);
    toast(error.message);
  }
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
  const badge = unreadMessages ? ` <span class="badge-n" aria-label="${esc(t("unread_count"))}">${unreadMessages}</span>` : "";
  if (account?.role === "renter") {
    $("nav").insertAdjacentHTML("beforeend", `<button class="${view === "chat-inbox" ? "on" : ""}" onclick="go('chat-inbox')">${t("renter_chat_inbox")}${badge}</button>`);
  }
  $("nav").insertAdjacentHTML("beforeend", `<button class="${view === "account" ? "on" : ""}" onclick="go('account')">${t("tab_account")}${badge}</button>`);
  $("ctl").insertAdjacentHTML("beforeend", `<button class="btn ghost sm" onclick="go('account')">${account ? esc(account.name) : t("tab_account")}${badge}</button>`);
  renderInstallButton();
};

window.renderAll = function() {
  renderChrome();
  if (view === "account") renderAccount();
  else if (view === "chat") renderChatPage();
  else if (view === "chat-inbox") {
    if (activeAccount()?.role === "renter") renderRenterChatInbox();
    else go("account");
  }
  else if (view === "orders") renderRemoteOrders();
  else if (view === "social") renderSocialFeed();
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

let socialRequest = 0;
let socialFeedCache = null;
window.renderSocialFeed = async function() {
  const app = $("app");
  if (!sb) {
    app.innerHTML = `<h2>${t("social_title")}</h2><p class="notice">${t("acct_config_required")}</p>`;
    return;
  }
  const requestId = ++socialRequest;
  const account = activeAccount();
  const cacheKey = `${account?.id || "anonymous"}:${account?.role || "none"}:${L()}`;
  if (socialFeedCache?.key === cacheKey && Date.now() - socialFeedCache.createdAt < 60000) {
    app.innerHTML = socialFeedCache.html;
    return;
  }
  const canPost = account?.role === "renter" && S.custom.some((profile) => profile.ownerId === account.id);
  const composer = canPost ? `<section class="panel"><h3>${t("social_compose")}</h3>
    <p class="muted">${t("social_upload_rights")}</p>
    <label class="field">${t("social_caption")}<textarea id="socialCaption" maxlength="2000"></textarea></label>
    <label class="field">${t("social_media")}<input id="socialFile" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"></label>
    <button class="btn sm" onclick="submitSocialPost()">${t("social_send")}</button><span id="socialUploadStatus" class="muted"></span></section>` : "";
  app.innerHTML = `<h2>${t("social_title")}</h2><p class="muted">${t("social_subtitle")}</p>${composer}<p class="muted">${t("processing")}</p>`;
  const { data: posts, error } = await sb.from("social_posts")
    .select("id,renter_profile_id,caption,media_url,media_type,source_url,source_credit,is_ai_generated,published_at,renter_profiles(display_name,is_verified)")
    .eq("status", "published").lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false }).limit(30);
  if (requestId !== socialRequest || view !== "social") return;
  if (error) {
    console.error("Could not load social feed", error.message);
    app.innerHTML = `<h2>${t("social_title")}</h2>${composer}<p class="err">${esc(error.message || t("social_empty"))}</p>`;
    return;
  }
  let mediaUrls = [];
  try {
    mediaUrls = await resolveSocialMediaUrls((posts ?? []).map((post) => post.media_url));
  } catch (mediaError) {
    console.error("Could not sign social post media", mediaError.message);
  }
  const resolvedPosts = (posts ?? []).map((post, index) => ({
    ...post,
    display_media_url: mediaUrls[index] || "",
  }));
  if (requestId !== socialRequest || view !== "social") return;
  const ids = resolvedPosts.map((post) => post.id);
  if (!ids.length) {
    app.innerHTML = `<h2>${t("social_title")}</h2><p class="sub">${t("social_empty")}</p>${composer}`;
    socialFeedCache = { key: cacheKey, html: app.innerHTML, createdAt: Date.now() };
    return;
  }
  const [likesResult, commentsResult, myLikesResult] = await Promise.all([
    sb.from("social_likes").select("post_id").in("post_id", ids),
    sb.from("social_comments").select("id,post_id,author_label,author_avatar_path,author_avatar_url,body,created_at").in("post_id", ids)
      .order("created_at", { ascending: true }).limit(300),
    account ? sb.rpc("get_my_social_likes", { p_post_ids: ids })
      : Promise.resolve({ data: [], error: null }),
  ]);
  if (requestId !== socialRequest || view !== "social") return;
  const queryError = likesResult.error || commentsResult.error || myLikesResult.error;
  if (queryError) {
    console.error("Could not load social interactions", queryError.message);
    app.innerHTML = `<h2>${t("social_title")}</h2>${composer}<p class="err">${esc(queryError.message)}</p>`;
    return;
  }
  const likeCounts = new Map();
  (likesResult.data ?? []).forEach((like) => likeCounts.set(like.post_id, (likeCounts.get(like.post_id) || 0) + 1));
  const myLikes = new Set((myLikesResult.data ?? []).map((like) => like.post_id));
  const commentsByPost = new Map();
  (commentsResult.data ?? []).forEach((comment) => {
    const avatarUrl = comment.author_avatar_path
      ? customerAvatarPublicUrl(comment.author_avatar_path)
      : trustedImageUrl(comment.author_avatar_url);
    const list = commentsByPost.get(comment.post_id) || [];
    list.push({ ...comment, avatarUrl });
    commentsByPost.set(comment.post_id, list);
  });
  app.innerHTML = `<h2>${t("social_title")}</h2><p class="muted">${t("social_subtitle")}</p>${composer}
    <div class="social-feed">${resolvedPosts.map((post) => {
      const profile = Array.isArray(post.renter_profiles) ? post.renter_profiles[0] : post.renter_profiles;
      const comments = commentsByPost.get(post.id) || [];
      const media = !post.display_media_url ? `<p class="err">${t("social_upload_failed")}</p>` : post.media_type === "video"
        ? `<video class="social-media" src="${esc(post.display_media_url)}" controls playsinline preload="metadata"></video>`
        : `<img class="social-media" src="${esc(post.display_media_url)}" alt="${esc(post.caption)}" loading="lazy">`;
      return `<article class="panel social-card"><div class="row" style="justify-content:space-between"><b>${esc(profile?.display_name || "Diamond")}${profile?.is_verified ? " ✓" : ""}</b><small class="muted">${new Date(post.published_at).toLocaleString()}</small></div>
        ${media}<p>${esc(post.caption)}</p>
        ${post.source_credit ? `<small class="muted">${esc(post.source_credit)}${post.source_url ? ` · <a href="${esc(post.source_url)}" target="_blank" rel="noopener noreferrer">Nguồn ảnh</a>` : ""}</small>` : ""}
        <div class="row" style="margin-top:10px">
          ${account ? `<button class="btn ${myLikes.has(post.id) ? "" : "ghost"} sm" data-social-like="${esc(post.id)}" data-liked="${myLikes.has(post.id)}" data-like-count="${likeCounts.get(post.id) || 0}" onclick="toggleSocialLike('${esc(post.id)}',this.dataset.liked==='true')">♥ ${t("social_like")} · ${likeCounts.get(post.id) || 0}</button>` : `<span class="muted">♥ ${likeCounts.get(post.id) || 0}</span>`}
          ${account ? `<button class="btn ghost sm" onclick="reportSocialPost('${esc(post.id)}')">${t("social_report")}</button>` : ""}
        </div>
        <div class="social-comments" id="comments-${esc(post.id)}">${comments.length ? comments.map((comment) => `<div class="social-comment">${avatarMarkup(comment.author_label, comment.avatarUrl)}<p class="muted"><b>${esc(comment.author_label)}</b> ${esc(comment.body)}</p></div>`).join("") : `<p class="muted social-empty-comments">${t("social_comments_empty")}</p>`}
          ${account ? `<div class="row"><input class="inp" id="comment-${esc(post.id)}" maxlength="500" placeholder="${esc(t("social_comment"))}" onkeydown="if(event.key==='Enter')submitSocialComment('${esc(post.id)}')"><button class="btn ghost sm" onclick="submitSocialComment('${esc(post.id)}')">${t("social_send")}</button></div>` : `<p class="muted">${t("social_signin")}</p>`}
        </div></article>`;
    }).join("")}</div>`;
  socialFeedCache = { key: cacheKey, html: app.innerHTML, createdAt: Date.now() };
};

window.submitSocialPost = async function() {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.ownerId === account?.id && item.profileType === "real");
  const file = $("socialFile")?.files?.[0];
  const caption = $("socialCaption")?.value.trim();
  const status = $("socialUploadStatus");
  if (!sb || account?.role !== "renter" || !profile) return toast(t("acct_access_denied"));
  if (!file || !caption) return toast(t("social_upload_failed"));
  if (!["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"].includes(file.type) || file.size > 50 * 1024 * 1024) {
    return toast(t("social_upload_failed"));
  }
  const button = $("socialFile")?.closest(".panel")?.querySelector("button");
  if (button) button.disabled = true;
  if (status) status.textContent = t("processing");
  try {
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `${profile.id}/posts/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await sb.storage.from("renter-social-media").upload(path, file, {
      contentType: file.type, cacheControl: "3600", upsert: false,
    });
    if (uploadError) throw uploadError;
    const { data: urlData } = sb.storage.from("renter-social-media").getPublicUrl(path);
    const { error: postError } = await sb.from("social_posts").insert({
      renter_profile_id: profile.id, caption, media_url: urlData.publicUrl,
      media_type: file.type.startsWith("video/") ? "video" : "image",
    });
    if (postError) {
      await sb.storage.from("renter-social-media").remove([path]);
      throw postError;
    }
    socialFeedCache = null;
    toast(t("social_posted"));
    await renderSocialFeed();
  } catch (error) {
    console.error("Could not submit social post", error.message);
    if (status) status.textContent = error.message || t("social_upload_failed");
  } finally {
    if (button) button.disabled = false;
  }
};

window.toggleSocialLike = async function(postId, liked) {
  const account = activeAccount();
  if (!sb || !account) return toast(t("social_login_required"));
  const query = liked
    ? sb.from("social_likes").delete().eq("post_id", postId).eq("user_id", account.id)
    : sb.from("social_likes").insert({ post_id: postId, user_id: account.id });
  const { error } = await query;
  if (error?.code === "23505") {
    socialFeedCache = null;
    await renderSocialFeed();
    return;
  }
  if (error) {
    console.error("Could not update social like", error.message);
    return toast(error.message);
  }
  const button = [...document.querySelectorAll("[data-social-like]")].find((item) => item.dataset.socialLike === postId);
  if (!button) return;
  const isLiked = !liked;
  const count = Math.max(0, Number(button.dataset.likeCount || 0) + (isLiked ? 1 : -1));
  button.dataset.liked = String(isLiked);
  button.dataset.likeCount = String(count);
  button.classList.toggle("ghost", !isLiked);
  button.textContent = `♥ ${t("social_like")} · ${count}`;
  if (socialFeedCache) socialFeedCache = { ...socialFeedCache, html: $("app").innerHTML, createdAt: Date.now() };
};

window.submitSocialComment = async function(postId) {
  const account = activeAccount();
  const input = $(`comment-${postId}`);
  const body = input?.value.trim();
  if (!sb || !account) return toast(t("social_login_required"));
  if (!body) return;
  const { data: comment, error } = await sb.from("social_comments").insert({
    post_id: postId, author_id: account.id, body,
  }).select("author_label,author_avatar_path,author_avatar_url,body").single();
  if (error) {
    console.error("Could not submit social comment", error.message);
    return toast(error.message);
  }
  const comments = $(`comments-${postId}`);
  const inputAfterInsert = $(`comment-${postId}`);
  if (!comments || !comment) return;
  comments.querySelector(".social-empty-comments")?.remove();
  const row = document.createElement("div");
  row.className = "social-comment";
  const avatarUrl = comment.author_avatar_path
    ? customerAvatarPublicUrl(comment.author_avatar_path)
    : trustedImageUrl(comment.author_avatar_url);
  const avatar = document.createElement(avatarUrl ? "img" : "span");
  avatar.className = avatarUrl ? "chat-avatar" : "chat-avatar avatar-placeholder";
  if (avatarUrl) {
    avatar.src = avatarUrl;
    avatar.alt = comment.author_label;
  } else {
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = (comment.author_label || "?").trim().charAt(0).toUpperCase();
  }
  const copy = document.createElement("p");
  copy.className = "muted";
  const author = document.createElement("b");
  author.textContent = comment.author_label;
  copy.append(author, document.createTextNode(` ${comment.body}`));
  row.append(avatar, copy);
  const composer = inputAfterInsert?.parentElement;
  comments.insertBefore(row, composer || null);
  if (inputAfterInsert) inputAfterInsert.value = "";
  if (socialFeedCache) socialFeedCache = { ...socialFeedCache, html: $("app").innerHTML, createdAt: Date.now() };
};

window.reportSocialPost = async function(postId) {
  if (!activeAccount()) return toast(t("social_login_required"));
  const reason = prompt(t("social_report_reason"));
  if (reason === null) return;
  const { error } = await sb.rpc("report_social_post", { p_post_id: postId, p_reason: reason.trim() });
  if (error) {
    console.error("Could not report social post", error.message);
    return toast(error.message);
  }
  toast(t("chat_report_sent"));
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
            <div class="muted">${payment.payment_method === "cash" ? esc(t("pay_cash_method")) : `Mã đối chiếu: <code>${esc(payment.transfer_reference)}</code>`} · ${esc(new Date(payment.created_at).toLocaleString("vi-VN"))}</div>
          </div>
          <div style="text-align:right"><b>${Number(payment.total_vnd).toLocaleString("vi-VN")} ₫</b><div class="st-b wait">${t("pay_pending")}</div></div>
        </div>
        ${payment.payment_method === "cash" ? `<p class="muted">${t("pay_cash_admin_notice")}</p>
          <button class="btn sm" onclick="confirmCashPayment(${index})">${t("pay_cash_admin")}</button>` : `
          <label class="field">${t("manual_payment_reference")}<input id="manualRef${index}" maxlength="160" autocomplete="off" required></label>
          <button class="btn sm" onclick="confirmManualPayment(${index})">${t("manual_payment_confirm")}</button>`}
      </div>`).join("") : `<p class="sub">${t("manual_payment_empty")}</p>`}`;
}

window.confirmManualPayment = async function(index) {
  const account = activeAccount();
  const payment = adminPendingPayments[index];
  const referenceInput = $(`manualRef${index}`);
  const reference = referenceInput?.value.trim() || "";
  if (!sb || !backendReady || account?.role !== "admin" || !payment || payment.payment_method !== "qr") {
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

window.confirmCashPayment = async function(index) {
  const payment = adminPendingPayments[index];
  if (!sb || !backendReady || activeAccount()?.role !== "admin" || !payment || payment.payment_method !== "cash") {
    return toast(t("acct_access_denied"));
  }
  const amount = Number(payment.total_vnd).toLocaleString("vi-VN");
  if (!window.confirm(t("pay_cash_confirm", { code: payment.code, amount }))) return;
  const button = $("app").querySelectorAll(".ord")[index]?.querySelector("button");
  if (button) button.disabled = true;
  const { error } = await sb.rpc("confirm_manual_cash_payment", { p_code: payment.code });
  if (error) {
    console.error("Could not confirm cash payment", error.message);
    toast(error.message);
    if (button) button.disabled = false;
    return;
  }
  toast(t("pay_cash_admin"));
  await renderAdminPaymentReview();
};

function appIsInstalled() {
  return appInstalled || window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
}

function renderInstallButton() {
  const controls = $("ctl");
  if (!controls) return;
  controls.querySelector("#installAppButton")?.remove();
  if (appIsInstalled() || (!installIsIos && !installIsAndroid && !deferredInstallPrompt)) return;
  controls.insertAdjacentHTML("afterbegin", `<button id="installAppButton" class="btn ghost sm" onclick="installApp()">${t("install_app")}</button>`);
}

window.installApp = async function() {
  if (appIsInstalled()) return;
  if (installIsAndroid && deferredInstallPrompt) {
    const prompt = deferredInstallPrompt;
    deferredInstallPrompt = null;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") appInstalled = true;
    } catch (error) {
      console.error("Could not show the app install prompt", error.message);
      toast(t("push_error"));
    }
    renderInstallButton();
    return;
  }
  const help = installIsIos ? t("install_ios_help")
    : installIsAndroid ? t("install_android_help") : t("install_desktop_help");
  openBox(`<h2>${t("install_app_title")}</h2><p class="notice">${esc(help)}</p>
    <p class="muted">${esc(t("install_app"))} · VELORA</p>`);
};

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  renderInstallButton();
});
window.addEventListener("appinstalled", () => {
  appInstalled = true;
  deferredInstallPrompt = null;
  renderInstallButton();
});

window.openProfile = function(id, index) {
  localOpenProfile(id, index);
  const box = $("box");
  if (!box || $("ov").hidden) return;
  box.querySelectorAll("#delc, button[onclick^='chImg('], button[onclick^='addPic('], button[onclick^='delPic('], .thumbs .del")
    .forEach((button) => button.remove());
  const addPhoto = [...box.querySelectorAll(".thumbs button")]
    .find((button) => button.textContent.includes(t("addphoto")));
  if (addPhoto) addPhoto.remove();
  appendProfileNotice(id);
  const profile = getG(id);
  const databaseProfileId = profile?.backendId || profile?.id;
  if (sb && /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(databaseProfileId || "")) {
    loadProfileGallery(id, databaseProfileId, index);
  }
};

window.chImg = function() { toast("Ảnh hồ sơ được quản lý trong mục Tài khoản."); };
window.delChar = function() { toast("Hãy quản lý hồ sơ trong mục Tài khoản."); };

window.startCk = function(id) {
  const account = activeAccount();
  if (!sb) {
    toast(t("acct_config_required"));
    go("account");
    return;
  }
  if (!account) {
    toast(t("acct_login_to_book"));
    go("account");
    return;
  }
  if (account.role !== "customer") {
    toast(t("acct_customer_only"));
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
  ck.paymentMethod = "qr";
  ck.renterProfileId = backendProfile.id;
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
  if ((booking.payment_method || booking.method) === "cash") {
    return `<p class="notice">${esc(t("pay_cash_wait"))}</p>
      <p><b>${esc(t("pay_cash_method"))}:</b> ${amount} ₫</p>`;
  }
  return `<div id="orderQr" class="qr-image" style="width:280px;height:280px;padding:8px" aria-label="VietQR thanh toán Agribank"></div>
    <p class="notice">${esc(t("pay_transfer_hint"))}</p>
    <p class="err">${esc(t("pay_window"))}</p>
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
    if ((existing.payment_method || existing.method) !== "cash") {
      renderQr("orderQr", Number(existing.total_vnd), existing.transfer_reference || existing.code);
    }
    return;
  }
  const priceQuote = quote();
  const isAi = getG(ck.id)?.profileType === "ai";
  openBox(`<h2>${t("pm_t")}</h2><p>${esc(getG(ck.id)?.name || "")} · ${ck.sessions.length} ${t("sess")} · ${ck.hours} ${t("hrs")}</p>
    <h2 style="margin:10px 0">${fmt(priceQuote.total)}</h2>
    <p class="notice">${esc(ck.paymentMethod === "cash" ? t("pay_cash_wait") : t("pay_create_info"))}</p>
    <button class="opt ${ck.paymentMethod === "qr" ? "on" : ""}" onclick="ck.paymentMethod='qr';openPay()">${t("pm_qr")}</button>
    ${!isAi ? `<button class="opt ${ck.paymentMethod === "cash" ? "on" : ""}" onclick="ck.paymentMethod='cash';openPay()">${t("pay_cash_method")}</button>` : ""}
    ${ck.paymentMethod === "cash" ? "" : `<p class="muted">${esc(t("pay_transfer_hint"))}</p>`}
    <div class="err" id="bookingErr"></div>
    <button class="btn" id="payB" onclick="confirmPay()">${ck.paymentMethod === "cash" ? t("pay_cash_create") : t("confirm_pay")} · ${fmt(priceQuote.total)}</button>`);
};

window.confirmPay = async function() {
  const button = $("payB");
  const account = activeAccount();
  const selectedProfile = getG(ck?.id);
  const profile = S.custom.find((item) => item.id === ck?.id || item.id === selectedProfile?.backendId);
  if (!button) return;
  if (!sb) {
    showError("bookingErr", t("acct_config_required"));
    return;
  }
  if (!account) {
    showError("bookingErr", t("acct_login_to_book"));
    return;
  }
  if (account.role !== "customer") {
    showError("bookingErr", t("acct_customer_only"));
    return;
  }
  if (!backendReady || !profile || !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(profile.id) || !ck) {
    showError("bookingErr", "Hồ sơ này chưa được kết nối với hệ thống đặt lịch. Vui lòng tải lại trang hoặc chọn hồ sơ khác.");
    return;
  }
  if (!["qr", "cash"].includes(ck.paymentMethod || "qr")
    || (ck.paymentMethod === "cash" && profile.profileType === "ai")) {
    showError("bookingErr", t("pay_method_required"));
    return;
  }
  button.disabled = true;
  button.textContent = t("processing");
  try {
    const { data, error } = await sb.rpc("create_booking_with_payment_method", {
      p_renter_profile_id: profile.id,
      p_service_id: profile.profileType === "ai" ? "cafe" : ck.svc,
      p_hours: ck.hours,
      p_package_id: ck.pkg,
      p_sessions: ck.sessions.map((session) => ({ d: session.d, t: session.t })),
      p_meeting_place: [ck.place.trim(), ck.addr.trim()].filter(Boolean).join(" - "),
      p_note: ck.note.trim(),
      p_coupon: ck.coupon || "",
      p_payment_method: ck.paymentMethod || "qr",
    });
    if (error) throw error;
    const booking = Array.isArray(data) ? data[0] : data;
    if (!booking?.code || !Number.isFinite(Number(booking.total_vnd))) {
      throw new Error("Booking was saved without valid payment details.");
    }
    if (Number(booking.total_vnd) !== Math.round(quote().total)) {
      showError("bookingErr", `${t("pay_pricing_mismatch")} (${booking.code})`);
      button.disabled = false;
      button.textContent = `${ck.paymentMethod === "cash" ? t("pay_cash_create") : t("confirm_pay")} · ${fmt(quote().total)}`;
      return;
    }
    ck.remoteBooking = booking;
    ck.remoteBooking.renterName = profile.name;
    ck.remoteBooking.method = ck.remoteBooking.payment_method || ck.paymentMethod || "qr";
    closeBox();
    openPay();
  } catch (error) {
    console.error("Could not create booking", error.message);
    showError("bookingErr", error.message || t("pay_booking_failed"));
    button.disabled = false;
    button.textContent = `${ck.paymentMethod === "cash" ? t("pay_cash_create") : t("confirm_pay")} · ${fmt(quote().total)}`;
  }
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
    if (activeAccount().role === "customer") {
      const { data: reviewedCodes, error: reviewFlagsError } = await sb.rpc("list_my_reviewed_booking_codes");
      if (reviewFlagsError) console.error("Could not load review eligibility", reviewFlagsError.message);
      const reviewed = new Set(reviewedCodes || []);
      S.orders.forEach((order) => { order.reviewed = reviewed.has(order.code); });
    }
    app.innerHTML = `<h2>${t("ord_t")}</h2>${S.orders.length ? S.orders.map((order) => {
      const customer = activeAccount().role === "customer";
      const expired = order.status === "pending" && order.method !== "cash"
        && Date.now() - new Date(order.created).getTime() >= 15 * 60 * 1000;
      const label = expired ? t("booking_expired_short") : order.status === "paid" ? t("paid")
        : order.status === "done" ? t("st_done")
          : order.status === "cancelled" ? t("st_can") : t("pay_pending");
      const account = activeAccount();
      const canChange = account?.role === "customer" && order.raw.customer_id === account.id
        && ["pending", "paid"].includes(order.status);
      const canCancel = account?.role === "customer" && order.raw.customer_id === account.id
        && ["pending", "paid"].includes(order.status);
      return `<div class="ord"><div class="top"><div class="av" style="${getG(order.id) ? bg(getG(order.id)) : ""}"></div>
        <div style="flex:1;min-width:0"><b>${esc(order.renterName)}</b><div class="muted">${esc(order.code)} · ${order.hours} ${t("hrs")}</div></div>
        <div style="text-align:right"><b>${Number(order.totalVnd).toLocaleString("vi-VN")} ₫</b><div class="st-b ${order.status === "paid" || order.status === "done" ? "ok" : expired ? "bad" : "wait"}">${esc(label)}</div></div></div>
        <p class="muted">${esc(order.method === "cash" ? t("pay_cash_method") : t("pm_qr"))} · ${esc(order.place)}</p>
        <p class="muted">${(order.sessions || []).map((session) => `${esc(session.d)} ${esc(session.t)}`).join(" · ")}</p>
        <div class="acts"><button class="btn ghost sm" onclick="openInvoice('${esc(order.code)}')">${t("invoice")}</button>
        ${["paid", "done"].includes(order.status) ? `<button class="btn sm" onclick="openChat('${esc(order.code)}')">${t("chat_open")}</button>` : ""}
        ${canChange && Number(order.raw.change_count || 0) < 1 ? `<button class="btn ghost sm" onclick="openRescheduleBooking('${esc(order.code)}')">${t("booking_reschedule")}</button>` : ""}
        ${canCancel ? `<button class="btn ghost sm" onclick="cancelRemoteBooking('${esc(order.code)}')">${t("booking_cancel")}</button>` : ""}
        ${order.status === "paid" && bookingEndPassed(order) ? `<button class="btn ghost sm" onclick="confirmBookingComplete('${esc(order.code)}')">${t("booking_complete_confirm")}</button>` : ""}
        ${customer && order.status === "done" && !order.reviewed ? `<button class="btn ghost sm" onclick="openReview('${esc(order.code)}')">${t("rv_send")}</button>` : ""}
        ${customer && order.status === "pending" && !expired ? `<button class="btn sm" onclick="openPayForBooking('${esc(order.code)}')">${t("pay")}</button>` : ""}</div>
        ${expired ? `<p class="err">${esc(t("booking_expired"))}</p>` : ""}</div>`;
    }).join("") : `<p class="sub">${t("ord_none")}</p>`}`;
  } catch (error) {
    console.error("Could not render bookings", error.message);
    app.innerHTML = `<h2>${t("ord_t")}</h2><p class="err">${esc(error.message || "Không tải được đơn.")}</p>`;
  }
};

window.openRescheduleBooking = function(code) {
  const order = mapRemoteOrder(code);
  const account = activeAccount();
  if (!order || account?.role !== "customer" || order.raw.customer_id !== account.id
    || !["pending", "paid"].includes(order.status)
    || Number(order.raw.change_count || 0) >= 1) return toast(t("booking_change_failed"));
  openBox(`<h2>${t("booking_reschedule")}</h2><p class="muted">${esc(order.code)} · ${t("booking_change_failed")}</p>
    ${(order.sessions || []).map((session, index) => `<div class="r2">
      <label class="field">Ngày<input id="rescheduleDate${index}" type="date" value="${esc(session.d)}" required></label>
      <label class="field">Giờ<input id="rescheduleTime${index}" type="time" value="${esc(session.t)}" required></label>
    </div>`).join("")}
    <div id="rescheduleError" class="err"></div>
    <button class="btn sm" onclick="submitBookingReschedule('${esc(order.code)}',${order.sessions.length})">${t("booking_reschedule")}</button>`);
};

window.submitBookingReschedule = async function(code, count) {
  const order = mapRemoteOrder(code);
  const account = activeAccount();
  if (!sb || account?.role !== "customer" || !order || order.raw.customer_id !== account.id
    || !Number.isInteger(count) || count !== order.sessions.length) return toast(t("booking_change_failed"));
  const sessions = [];
  for (let index = 0; index < count; index++) {
    const date = $(`rescheduleDate${index}`)?.value;
    const time = $(`rescheduleTime${index}`)?.value;
    if (!date || !time) return showError("rescheduleError", t("booking_change_failed"));
    sessions.push({ d: date, t: time });
  }
  const { error } = await sb.rpc("reschedule_booking", { p_code: code, p_sessions: sessions });
  if (error) {
    console.error("Could not reschedule booking", error.message);
    return showError("rescheduleError", error.message || t("booking_change_failed"));
  }
  closeBox();
  await loadBookingRows();
  await renderRemoteOrders();
  toast(t("booking_rescheduled"));
};

window.cancelRemoteBooking = async function(code) {
  const order = mapRemoteOrder(code);
  const account = activeAccount();
  if (!sb || account?.role !== "customer" || !order || order.raw.customer_id !== account.id
    || !["pending", "paid"].includes(order.status)) return toast(t("booking_change_failed"));
  if (!confirm(t("booking_cancel_confirm"))) return;
  const { error } = await sb.rpc("cancel_booking", { p_code: code });
  if (error) {
    console.error("Could not cancel booking", error.message);
    return toast(error.message || t("booking_change_failed"));
  }
  await loadBookingRows();
  await renderRemoteOrders();
  toast(t("booking_cancelled"));
};

function bookingEndPassed(order) {
  const end = Math.max(...order.sessions.map((session) =>
    new Date(`${session.d}T${session.t}:00+07:00`).getTime() + order.hours * 60 * 60 * 1000));
  return Number.isFinite(end) && end <= Date.now();
}

window.confirmBookingComplete = async function(code) {
  if (!sb || !activeAccount()) return toast(t("acct_access_denied"));
  const { error } = await sb.rpc("confirm_booking_complete", { p_code: code });
  if (error) {
    console.error("Could not confirm booking completion", error.message);
    return toast(error.message);
  }
  await loadBookingRows();
  renderAll();
  toast(t("booking_complete_wait"));
};

window.openReview = function(code) {
  const order = mapRemoteOrder(code);
  if (!order || activeAccount()?.role !== "customer" || order.status !== "done" || order.reviewed) {
    return toast(t("review_not_eligible"));
  }
  rvO = code;
  rvR = 0;
  openBox(`<h2>${t("rv_t", { n: esc(order.renterName) })}</h2>
    <p class="muted">${t("booking_review_verified")}</p>
    <div class="stars" id="rvS">${[1, 2, 3, 4, 5].map((rating) => `<button aria-label="${rating}" onclick="rvSet(${rating})">★</button>`).join("")}</div>
    <label class="field"><textarea id="rvT" maxlength="500" placeholder="${esc(t("rv_ph"))}"></textarea></label>
    <div class="err" id="rvE"></div><button class="btn" onclick="rvSend()">${t("rv_send")}</button>`);
};

window.rvSend = async function() {
  const order = mapRemoteOrder(rvO);
  if (!sb || !order || activeAccount()?.role !== "customer" || order.status !== "done") {
    return toast(t("review_not_eligible"));
  }
  if (!rvR) {
    showError("rvE", t("rv_pick"));
    return;
  }
  const { error } = await sb.from("renter_reviews").insert({
    booking_id: order.raw.id,
    renter_profile_id: order.raw.renter_profile_id,
    customer_id: activeAccount().id,
    rating: rvR,
    comment: $("rvT").value.trim(),
  });
  if (error) {
    console.error("Could not submit renter review", error.message);
    showError("rvE", error.code === "23505" ? t("review_not_eligible") : error.message);
    return;
  }
  order.reviewed = true;
  await loadRemoteReviews();
  closeBox();
  renderAll();
  toast(t("rv_thx"));
};

window.openPayForBooking = function(code) {
  const order = mapRemoteOrder(code);
  if (!order || order.status !== "pending" || activeAccount()?.role !== "customer") return toast(t("acct_access_denied"));
  if (order.method !== "cash" && Date.now() - new Date(order.created).getTime() >= 15 * 60 * 1000) return toast(t("booking_expired"));
  openBox(`<h2>${t("pm_t")}</h2>${paymentHtml(order)}<button class="btn ghost sm" onclick="closeBox();openInvoice('${esc(order.code)}')">${t("invoice")}</button>`);
  if (order.method !== "cash") renderQr("orderQr", Number(order.totalVnd), order.raw.transfer_reference || order.code);
};

window.openInvoice = function(code) {
  const order = mapRemoteOrder(code);
  if (!order) return toast("Không tìm thấy hóa đơn.");
  const invoice = [
    "VELORA",
    t("receipt_label"),
    `Biên nhận: ${order.invoiceNumber}`,
    `Mã đơn: ${order.code}`,
    `Ngày tạo: ${new Date(order.created).toLocaleString("vi-VN")}`,
    `Dịch vụ: ${order.svcName} · ${order.hours} giờ`,
    `Khách hàng: ${order.cust.name || activeAccount()?.name || ""}`,
    `Người cho thuê: ${order.renterName}`,
    `Địa điểm: ${order.place}`,
    `Tổng tiền: ${Number(order.totalVnd).toLocaleString("vi-VN")} VND`,
    `Trạng thái: ${order.status === "pending" && order.method !== "cash" && Date.now() - new Date(order.created).getTime() >= 15 * 60 * 1000
      ? t("receipt_expired") : ["paid", "done"].includes(order.status) ? t("receipt_paid") : t("receipt_pending")}`,
    order.method === "cash" ? `Thanh toán: ${t("pay_cash_method")}` : `Nội dung chuyển khoản: ${order.raw.transfer_reference || order.code}`,
  ].join("\n");
  openBox(`<h2>${t("invoice")}</h2><div class="inv" id="invT">${esc(invoice)}</div>
    <div class="row" style="margin-top:12px"><button class="btn sm" onclick="downloadInvoice('${esc(order.code)}')">Tải biên nhận</button>
    <button class="btn ghost sm" onclick="printInvoice('${esc(order.code)}')">${t("receipt_print")}</button></div>`);
};

window.printInvoice = function(code) {
  const order = mapRemoteOrder(code);
  const content = $("invT")?.textContent;
  if (!order || !content) return toast("Không tìm thấy biên nhận.");
  const printWindow = window.open("", "_blank");
  if (!printWindow) return toast("Trình duyệt đã chặn cửa sổ in. Hãy cho phép cửa sổ bật lên rồi thử lại.");
  printWindow.opener = null;
  printWindow.addEventListener("load", () => {
    printWindow.focus();
    printWindow.print();
  }, { once: true });
  printWindow.document.write(`<!doctype html><html lang="vi"><meta charset="utf-8"><title>${esc(order.invoiceNumber || order.code)}</title>
    <style>body{font:15px system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;color:#222}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;line-height:1.7}h1{font-size:20px}</style>
    <h1>${esc(t("receipt_label"))}</h1><pre>${esc(content)}</pre></html>`);
  printWindow.document.close();
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
    if (!order || !["paid", "done"].includes(order.status)) return toast(t("chat_paid_only"));
    currentChat = code;
    chatBookingId = order.raw.id;
    chatThreadId = "";
    chatThreadMode = "booking";
    view = "chat";
    renderAll();
  } catch (error) {
    console.error("Could not open chat", error.message);
    toast(t("chat_failed"));
  }
};

window.openAdminChat = async function(profileId) {
  const account = activeAccount();
  if (!sb || account?.role !== "admin") return toast(t("acct_access_denied"));
  const profile = S.custom.find((item) => item.id === profileId);
  if (!profile) return toast(t("chat_failed"));
  const { data, error } = await sb.rpc("open_admin_chat", { p_renter_profile_id: profile.id });
  if (error || !data) {
    console.error("Could not open admin chat", error?.message || "No thread returned");
    return toast(t("chat_failed"));
  }
  currentChat = profile.id;
  chatBookingId = "";
  chatThreadId = data;
  chatThreadMode = "admin";
  view = "chat";
  renderAll();
};

window.openRenterAdminChat = async function(threadId) {
  const account = activeAccount();
  if (!sb || account?.role !== "renter") return toast(t("acct_access_denied"));
  const { data, error } = await sb.from("admin_chat_threads")
    .select("id,renter_profile_id").eq("id", threadId).maybeSingle();
  if (error || !data) {
    console.error("Could not open renter admin chat", error?.message || "Thread unavailable");
    return toast(t("chat_failed"));
  }
  currentChat = data.renter_profile_id;
  chatBookingId = "";
  chatThreadId = data.id;
  chatThreadMode = "admin";
  view = "chat";
  renderAll();
};

async function loadRenterAdminChats() {
  const account = activeAccount();
  const container = $("adminChatInbox");
  if (!sb || account?.role !== "renter" || !container) return;
  container.innerHTML = `<div class="panel"><h3>${t("admin_chat_inbox")}</h3><p class="muted">Đang tải...</p></div>`;
  const { data: threads, error } = await sb.from("admin_chat_threads")
    .select("id,renter_profile_id,renter_profiles(display_name,catalog_key)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Could not load renter admin chats", error.message);
    container.innerHTML = `<div class="panel"><h3>${t("admin_chat_inbox")}</h3><p class="err">${t("chat_failed")}</p></div>`;
    return;
  }
  if (!threads?.length) {
    container.innerHTML = `<div class="panel"><h3>${t("admin_chat_inbox")}</h3><p class="muted">${t("admin_chat_empty")}</p></div>`;
    return;
  }
  const { data: messages, error: messageError } = await sb.from("admin_chat_messages")
    .select("thread_id,body,sender_kind,created_at")
    .in("thread_id", threads.map((thread) => thread.id))
    .order("created_at", { ascending: false });
  if (messageError) {
    console.error("Could not load renter admin chat previews", messageError.message);
    container.innerHTML = `<div class="panel"><h3>${t("admin_chat_inbox")}</h3><p class="err">${t("chat_failed")}</p></div>`;
    return;
  }
  const latest = new Map();
  for (const message of messages || []) {
    if (!latest.has(message.thread_id)) latest.set(message.thread_id, message);
  }
  container.innerHTML = `<div class="panel"><h3>${t("admin_chat_inbox")}</h3>${threads.map((thread) => {
    const profile = Array.isArray(thread.renter_profiles) ? thread.renter_profiles[0] : thread.renter_profiles;
    const message = latest.get(thread.id);
    return `<div class="row" style="justify-content:space-between;margin:8px 0">
      <span>${esc(profile?.display_name || t("admin_chat_label"))}${message ? ` · ${esc(message.body.slice(0, 70))}` : ""}</span>
      <button class="btn sm" onclick="openRenterAdminChat('${esc(thread.id)}')">${t("admin_chat_open")}</button>
    </div>`;
  }).join("")}</div>`;
}

window.renderRenterChatInbox = async function() {
  const account = activeAccount();
  const app = $("app");
  if (!app || account?.role !== "renter") return;
  app.innerHTML = `<h2>${t("renter_chat_inbox")}</h2><p class="muted">${t("processing")}</p>`;
  try {
    await loadBookingRows();
    const orders = S.orders.filter((order) => order.renterOwnerId === account.id
      && ["paid", "done"].includes(order.status));
    if (!orders.length) {
      app.innerHTML = `<h2>${t("renter_chat_inbox")}</h2><div class="panel"><p class="muted">${t("renter_paid_bookings_empty")}</p></div>`;
      return;
    }
    const customerIds = [...new Set(orders.map((order) => order.raw.customer_id).filter(Boolean))];
    const { data: customerProfiles, error: profileError } = await sb.from("customer_public_profiles")
      .select("user_id,display_name,avatar_path").in("user_id", customerIds);
    if (profileError) throw profileError;
    const publicProfiles = new Map((customerProfiles || []).map((profile) => [profile.user_id, profile]));
    if (!app.isConnected || activeAccount()?.id !== account.id || view !== "chat-inbox") return;
    app.innerHTML = `<h2>${t("renter_chat_inbox")}</h2><p class="muted">${t("renter_paid_bookings")}</p>
      <div class="renter-chat-list">${orders.map((order) => {
        const customer = publicProfiles.get(order.raw.customer_id);
        const name = customer?.display_name || t("renter_chat_customer");
        const avatar = customerAvatarPublicUrl(customer?.avatar_path);
        return `<article class="panel row" style="justify-content:space-between;margin:10px 0">
          <div class="row" style="min-width:0">${avatarMarkup(name, avatar)}
            <div style="min-width:0"><b>${esc(name)}</b><div class="muted">${esc(order.code)} · ${order.hours} ${t("hrs")}</div>
              <small class="muted">${(order.sessions || []).map((session) => `${esc(session.d)} ${esc(session.t)}`).join(" · ")}</small></div>
          </div><button class="btn sm" onclick="openChat('${esc(order.code)}')">${t("chat_open")}</button>
        </article>`;
      }).join("")}</div>`;
  } catch (error) {
    console.error("Could not load renter paid bookings", error.message);
    if (app.isConnected) app.innerHTML = `<h2>${t("renter_chat_inbox")}</h2><div class="panel"><p class="err">${esc(error.message || t("chat_failed"))}</p></div>`;
  }
};

async function loadChatMessages() {
  if (!sb || !chatBookingId) return [];
  const [messageResult, identityResult] = await Promise.all([
    sb.from("messages").select("*").eq("booking_id", chatBookingId).order("created_at", { ascending: true }),
    sb.rpc("get_booking_chat_identities", { p_booking_id: chatBookingId }),
  ]);
  if (messageResult.error) {
    console.error("Could not load chat messages", messageResult.error.message);
    toast(t("chat_failed"));
    return [];
  }
  const data = messageResult.data || [];
  let identities = [];
  if (identityResult.error) {
    console.error("Could not load booking chat identities", identityResult.error.message);
    toast(t("chat_identity_error"));
  } else {
    identities = (identityResult.data || []).map((identity) => ({
      ...identity,
      avatar: identity.avatar_path
        ? customerAvatarPublicUrl(identity.avatar_path)
        : trustedImageUrl(identity.avatar_url),
    }));
    const account = activeAccount();
    const otherParticipant = identities.find((identity) => identity.user_id !== account?.id);
    if (account?.role === "renter" && otherParticipant?.account_role === "customer") {
      const name = $("chatPeerName");
      const avatar = $("chatPeerAvatar");
      if (name) name.textContent = otherParticipant.display_name || t("renter_chat_customer");
      if (avatar) {
        const imageUrl = trustedImageUrl(otherParticipant.avatar);
        avatar.style.backgroundImage = imageUrl
          ? `url("${imageUrl.replace(/["\\\n\r]/g, "")}")`
          : "linear-gradient(135deg,#7048e8,#2a2140)";
        avatar.setAttribute("aria-label", otherParticipant.display_name || t("renter_chat_customer"));
      }
    }
  }
  const profile = getG(mapRemoteOrder(currentChat)?.id);
  renderChatMessages(data, profile || { name: "Nhân vật" }, identities);
  await markChatMessagesRead("messages", "booking_id", chatBookingId, data);
  if (pendingAiMessageId && data.some((message) => message.reply_to_message_id === pendingAiMessageId)) {
    pendingAiMessageId = "";
    setChatStatus("");
  }
  return data;
}

async function loadAdminChatMessages() {
  if (!sb || !chatThreadId) return [];
  const { data, error } = await sb.from("admin_chat_messages").select("*")
    .eq("thread_id", chatThreadId).order("created_at", { ascending: true });
  if (error) {
    console.error("Could not load admin chat messages", error.message);
    toast(t("chat_failed"));
    return [];
  }
  renderChatMessages(data || [], getG(currentChat) || { name: "Nhân vật" });
  await markChatMessagesRead("admin_chat_messages", "thread_id", chatThreadId, data || []);
  if (pendingAiMessageId && data?.some((message) => message.reply_to_message_id === pendingAiMessageId)) {
    pendingAiMessageId = "";
    setChatStatus("");
  }
  return data || [];
}

async function requestAiReply(body, messageId, refreshMessages) {
  pendingAiMessageId = messageId;
  setChatStatus(t("chat_ai_typing"));
  let result;
  try {
    result = await sb.functions.invoke("ai-chat-reply", { body });
  } catch (error) {
    pendingAiMessageId = "";
    setChatStatus(t("chat_ai_failed"), true);
    toast(t("chat_ai_failed"));
    console.error("AI reply request failed", error.message);
    return;
  }
  const { data, error } = result;
  if (error) {
    pendingAiMessageId = "";
    const status = error.context?.status;
    let detail = "";
  let providerCode = "";
  let providerStatus = "";
  if (error.context instanceof Response) {
    try {
      const responseBody = await error.context.clone().json();
      detail = typeof responseBody.error === "string" ? responseBody.error : "";
      providerCode = responseBody.provider_code == null ? "" : String(responseBody.provider_code);
      providerStatus = responseBody.provider_status == null ? "" : String(responseBody.provider_status);
    } catch {
      detail = "";
    }
    }
    const message = detail === "cloudflare_limit_reached" ? t("chat_ai_quota_exceeded")
      : detail === "chat_rate_limited" ? t("chat_ai_rate_limited")
      : detail === "cloudflare_token_rejected" ? t("chat_ai_key_rejected")
        : detail === "cloudflare_ai_not_configured" || detail === "cloudflare_ai_model_invalid" ? t("chat_ai_secret_missing")
          : detail === "cloudflare_network_error" ? t("chat_ai_network_error")
            : detail === "cloudflare_model_error" ? t("chat_ai_model_error").replace("{code}", providerCode || "unknown")
              : detail === "cloudflare_http_error" && providerCode === "7003" ? t("chat_ai_route_error")
                : detail === "cloudflare_http_error" ? t("chat_ai_http_error")
                    .replace("{status}", providerStatus || "unknown")
                    .replace("{code}", providerCode || "unknown")
              : detail.startsWith("cloudflare_ai_") ? t("chat_ai_provider_error")
          : status === 404 ? t("chat_ai_not_deployed")
            : status === 503 ? t("chat_ai_secret_missing")
              : detail ? `${t("chat_ai_failed")} (${detail.slice(0, 180)})`
                : t("chat_ai_failed");
    setChatStatus(message, true);
    toast(message);
    console.error("AI reply request failed", status || error.message);
    return;
  }
  if (data?.skipped) {
    pendingAiMessageId = "";
    setChatStatus(t("chat_ai_failed"), true);
    return;
  }
  const messages = await refreshMessages();
  if (messages.some((message) => message.reply_to_message_id === messageId)) {
    pendingAiMessageId = "";
    setChatStatus("");
    return;
  }
  pendingAiMessageId = "";
  setChatStatus(t("chat_ai_failed"), true);
}

function renderChatPage() {
  if (chatThreadMode === "admin") {
    const account = activeAccount();
    const profile = getG(currentChat);
    if (!account || !profile || !chatThreadId || !["admin", "renter"].includes(account.role)) {
      $("app").innerHTML = `<p class="notice">${t("acct_access_denied")}</p>`;
      return;
    }
    renderChatFrame(profile, "account", account.role === "renter" && profile.profileType === "real" && profile.ownerId === account.id);
    refreshChatBlockStatus();
    loadAdminChatMessages();
    if (chatChannel) sb.removeChannel(chatChannel);
    chatChannel = sb.channel(`admin-chat:${chatThreadId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "admin_chat_messages",
        filter: `thread_id=eq.${chatThreadId}`,
      }, loadAdminChatMessages)
      .subscribe();
    return;
  }
  const order = mapRemoteOrder(currentChat);
  if (!order || !["paid", "done"].includes(order.status)) {
    $("app").innerHTML = `<p class="notice">${t("chat_paid_only")}</p>`;
    return;
  }
  const renter = getG(order.id);
  const account = activeAccount();
  const chatProfile = account?.role === "renter"
    ? { name: t("renter_chat_customer"), profileType: "real", color: "#7048e8" }
    : renter || { name: order.renterName, profileType: "real" };
  renderChatFrame(renter || { name: order.renterName, profileType: "real" },
    account?.role === "renter" ? "chat-inbox" : "orders",
    account?.role === "renter" && renter?.profileType === "real" && renter.ownerId === account.id,
    chatProfile);
  refreshChatBlockStatus();
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

function renderChatFrame(profile, backView, canChangeBackground, headerProfile = profile) {
  const isAi = profile.profileType === "ai";
  $("app").innerHTML = `<section class="chat-shell">
    <div class="chat-wallpaper"><img id="chatWallpaper" alt="" aria-hidden="true"></div><div class="chat-shade"></div>
    <header class="chat-head"><div id="chatPeerAvatar" class="av" aria-label="${esc(headerProfile.name)}" style="${bg(headerProfile)}"></div>
      <div class="chat-head-copy"><b id="chatPeerName">${esc(headerProfile.name)}</b><small>${esc(isAi ? t("ai_badge") : t("chat_human"))}</small></div>
      <button class="btn ghost sm" aria-label="${esc(t("ck_back"))}" onclick="go('${backView}')">←</button>
    </header>
    <div class="chat-body" id="chatBody"><div class="chat-empty">${esc(t("chat_empty"))}</div></div>
    <div class="chat-compose"><div class="chat-status" id="chatStatus" role="status" aria-live="polite"></div>
      <div class="r2"><input class="inp" id="chatInput" maxlength="2000" placeholder="${esc(t("chat_placeholder"))}" onkeydown="if(event.key==='Enter')sendChat()">
        <button class="btn sm" onclick="sendChat()">${t("chat_send")}</button></div>
      <div class="chat-tools">
        <button class="btn ghost sm" id="chatBlockButton" onclick="toggleChatBlock()">${t("chat_block")}</button>
        <button class="btn ghost sm" onclick="reportChat()">${t("chat_report")}</button>
      </div>
      ${canChangeBackground ? `<div class="chat-tools"><button class="btn ghost sm" onclick="changeChatBackground()">${t("chat_background_change")}</button><span class="muted" style="font-size:.75rem">Nền này hiển thị với mọi người trong chat</span></div>` : ""}
    </div>
  </section>`;
  const wallpaper = $("chatWallpaper");
  const imageUrl = trustedImageUrl(profile.chatBackgroundUrl) || trustedImageUrl(imgOf(profile));
  if (wallpaper && imageUrl) wallpaper.src = imageUrl;
}

async function refreshChatBlockStatus() {
  if (!sb || !activeAccount()) return;
  const { data, error } = await sb.rpc("get_chat_block_status", {
    p_booking_id: chatThreadMode === "booking" ? chatBookingId : null,
    p_thread_id: chatThreadMode === "admin" ? chatThreadId : null,
  });
  if (error) {
    console.error("Could not load chat block status", error.message);
    return;
  }
  chatBlockedByMe = data?.blocked_by_me === true;
  chatBlockedByOther = data?.blocked_by_other === true;
  const blocked = chatBlockedByMe || chatBlockedByOther;
  const input = $("chatInput");
  const send = document.querySelector(".chat-compose .r2 button");
  const button = $("chatBlockButton");
  if (input) input.disabled = blocked;
  if (send) send.disabled = blocked;
  if (button) {
    button.textContent = chatBlockedByMe ? t("chat_unblock") : t("chat_block");
    button.disabled = chatBlockedByOther && !chatBlockedByMe;
  }
  if (blocked) setChatStatus(t("chat_blocked"), true);
  else if ($("chatStatus")?.textContent === t("chat_blocked")) setChatStatus("");
}

window.toggleChatBlock = async function() {
  if (!sb || chatBlockedByOther && !chatBlockedByMe) return toast(t("chat_blocked"));
  const blocked = !chatBlockedByMe;
  if (blocked && !window.confirm(t("chat_block_confirm"))) return;
  const { error } = await sb.rpc("set_chat_block", {
    p_booking_id: chatThreadMode === "booking" ? chatBookingId : null,
    p_thread_id: chatThreadMode === "admin" ? chatThreadId : null,
    p_blocked: blocked,
  });
  if (error) {
    console.error("Could not update chat block", error.message);
    return toast(error.message);
  }
  await refreshChatBlockStatus();
};

window.reportChat = async function() {
  if (!sb) return toast(t("acct_config_required"));
  const reason = window.prompt(t("chat_report_prompt"));
  if (reason === null) return;
  if (reason.trim().length < 10) return toast(t("acct_missing"));
  const { error } = await sb.rpc("submit_chat_report", {
    p_booking_id: chatThreadMode === "booking" ? chatBookingId : null,
    p_thread_id: chatThreadMode === "admin" ? chatThreadId : null,
    p_reason: reason.trim(),
  });
  if (error) {
    console.error("Could not submit chat report", error.message);
    return toast(error.message);
  }
  toast(t("chat_report_sent"));
};

window.reportRenterProfile = async function(profileId) {
  const account = activeAccount();
  const profile = S.custom.find((item) => item.id === profileId && item.profileType === "real");
  if (!sb) return toast(t("acct_config_required"));
  if (!account || account.role === "admin") return toast(t("profile_report_signin"));
  if (!profile || profile.ownerId === account.id) return toast(t("acct_access_denied"));
  const reason = window.prompt(t("profile_report_prompt"));
  if (reason === null) return;
  const trimmedReason = reason.trim();
  if (trimmedReason.length < 10 || trimmedReason.length > 1000) {
    return toast(t("profile_report_length"));
  }
  const { error } = await sb.rpc("report_renter_profile", {
    p_profile_id: profileId, p_reason: trimmedReason,
  });
  if (error) {
    console.error("Could not submit renter profile report", error.message);
    return toast(error.message || t("profile_report_error"));
  }
  toast(t("profile_report_sent"));
};

function trustedImageUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function renderChatMessages(messages, profile, identities = []) {
  const body = $("chatBody");
  if (!body) return;
  if (!messages.length) {
    body.innerHTML = `<div class="chat-empty">${esc(t("chat_empty"))}</div>`;
    return;
  }
  const account = activeAccount();
  const identityByUser = new Map(identities.map((identity) => [identity.user_id, identity]));
  body.innerHTML = messages.map((message) => {
    const own = message.sender_id === account?.id;
    const identity = identityByUser.get(message.sender_id);
    const label = message.sender_kind === "persona" ? profile.name
      : identity?.display_name || (message.sender_kind === "admin" ? "Quản trị viên"
        : message.sender_kind === "customer" ? "Khách hàng"
          : own && account.role === "renter" ? profile.name
            : own ? account.publicName || account.name : "Bạn gái thuê");
    const avatar = message.sender_kind === "persona"
      ? trustedImageUrl(imgOf(profile))
      : identity?.avatar || "";
    return `<article class="chat-message ${own ? "own" : ""}">${avatarMarkup(label, avatar)}
      <div class="chat-message-copy"><b>${esc(label)}</b><div>${esc(message.body)}</div>
        <time>${esc(new Date(message.created_at).toLocaleString())}${own && message.read_at ? ` · ${esc(t("chat_read"))}` : ""}</time></div></article>`;
  }).join("");
  body.scrollTop = body.scrollHeight;
}

function setChatStatus(message = "", error = false) {
  const status = $("chatStatus");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", error);
}

async function changeChatBackground() {
  const account = activeAccount();
  const profile = getG(currentChat);
  if (!sb || account?.role !== "renter" || profile?.ownerId !== account.id || profile.profileType !== "real") {
    return toast(t("acct_access_denied"));
  }
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/jpeg,image/png,image/webp";
  picker.onchange = async () => {
    const file = picker.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 8 * 1024 * 1024) {
      return toast(t("chat_background_error"));
    }
    setChatStatus(t("chat_background_saving"));
    try {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      const loaded = new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Could not read the selected image"));
      });
      image.src = objectUrl;
      try {
        await loaded;
        const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Image processing is unavailable");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
        if (!blob) throw new Error("Could not compress the selected image");
        const path = `${account.id}/chat-backgrounds/${profile.id}-${Date.now()}.jpg`;
        const { error: uploadError } = await sb.storage.from("renter-photos").upload(path, blob, {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        });
        if (uploadError) throw uploadError;
        const { data: publicUrl } = sb.storage.from("renter-photos").getPublicUrl(path);
        const { error: updateError } = await sb.from("renter_profiles")
          .update({ chat_background_url: publicUrl.publicUrl })
          .eq("id", profile.id).eq("owner_id", account.id);
        if (updateError) {
          await sb.storage.from("renter-photos").remove([path]);
          throw updateError;
        }
        profile.chatBackgroundUrl = publicUrl.publicUrl;
        renderChatPage();
        setChatStatus(t("chat_background_saved"));
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    } catch (error) {
      console.error("Could not update chat background", error.message);
      setChatStatus(t("chat_background_error"), true);
    }
  };
  picker.click();
}

window.sendChat = async function() {
  const account = activeAccount();
  const input = $("chatInput");
  if (chatThreadMode === "admin") {
    if (!sb || !account || !chatThreadId || !input || !["admin", "renter"].includes(account.role)) {
      return toast(t("acct_access_denied"));
    }
    const text = input.value.trim();
    if (!text) return;
    const { data, error } = await sb.from("admin_chat_messages").insert({
      thread_id: chatThreadId,
      sender_id: account.id,
      sender_kind: account.role,
      body: text,
    }).select("id").single();
    if (error) {
      console.error("Could not send admin chat message", error.message);
      return toast(t("chat_send_failed"));
    }
    input.value = "";
    if (account.role === "admin" && getG(currentChat)?.profileType === "ai") {
      await requestAiReply({ admin_chat_id: chatThreadId, message_id: data.id }, data.id, loadAdminChatMessages);
    }
    return;
  }
  const order = mapRemoteOrder(currentChat);
  if (!sb || !account || !order || !["paid", "done"].includes(order.status) || !input) return toast(t("chat_paid_only"));
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
    await requestAiReply({ booking_id: order.raw.id, message_id: data.id }, data.id, loadChatMessages);
  }
};

async function initializeSupabaseApp() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(new URL("./sw.js", window.location.href), { scope: "./" });
    } catch (error) {
      console.error("Could not register the app service worker", error.message);
    }
  }
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
  await loadRemoteReviews();
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

async function loadRemoteReviews() {
  if (!sb) return;
  const { data, error } = await sb.from("renter_reviews")
    .select("renter_profile_id,rating,comment,created_at")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Could not load verified renter reviews", error.message);
    return;
  }
  S.remoteReviews = {};
  for (const review of data || []) {
    const profile = S.custom.find((item) => item.id === review.renter_profile_id);
    const key = profile?.catalogKey || review.renter_profile_id;
    (S.remoteReviews[key] ||= []).push({
      r: review.rating,
      w: "Khách đã thuê",
      x: review.comment,
    });
  }
}

window.spent = function() {
  return S.orders.filter((order) => order.status === "paid" || order.status === "done")
    .reduce((total, order) => total + Number(order.total || 0), 0);
};
