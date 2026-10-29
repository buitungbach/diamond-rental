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
  ai_persona_setup: ["Hồ sơ và hướng dẫn nhập vai được lưu trên Supabase. Khi cấu hình Cloudflare Workers AI trong Supabase Edge Function Secrets, nhân vật tự dùng hệ thống chat hiện có; không cần thêm Edge Function riêng.", "The profile and persona instructions are stored in Supabase. Once Cloudflare Workers AI is configured in Supabase Edge Function Secrets, the character uses the existing chat system; no per-character function is needed.", "プロフィールとペルソナ指示はSupabaseに保存されます。Supabase Edge Function SecretsでCloudflare Workers AIを設定すると、キャラクターごとの関数を追加せず既存のチャットを利用できます。"],
  admin_add_character: ["+ Thêm nhân vật AI", "+ Add AI character", "+ AIキャラクターを追加"],
  renter_add_profile: ["+ Tạo hồ sơ của tôi", "+ Create my profile", "+ 自分のプロフィールを作成"],
  renter_edit_profile: ["Sửa hồ sơ của tôi", "Edit my profile", "自分のプロフィールを編集"],
  ai_persona_prompt_hint: ["Ví dụ: tính cách, cách xưng hô, sở thích, bối cảnh, cách phản hồi; luôn nói rõ đây là AI hư cấu và không hẹn gặp ngoài đời.", "Example: personality, speaking style, interests, background, response style; always disclose this is fictional AI and never arrange in-person meetings.", "例：性格、話し方、好み、背景、応答方法。架空のAIであることを明示し、対面を約束しないでください。"],
  profile_preview: ["Hồ sơ mẫu · chưa nhận đặt lịch", "Sample profile · not available to book", "サンプルプロフィール・予約不可"],
  ai_badge: ["Nhân vật AI · hư cấu", "Fictional AI character", "架空のAIキャラクター"],
  ai_book: ["Thuê ngay", "Book now", "今すぐ予約"],
  ai_booking_notice: ["Đây là nhân vật AI hư cấu. Lịch đặt chỉ dành cho trải nghiệm chat trực tuyến; không có cuộc gặp ngoài đời. Tin nhắn được gửi tới Cloudflare Workers AI để tạo câu trả lời; vui lòng không gửi thông tin nhạy cảm.", "This is a fictional AI character. Bookings are for online chat only; no in-person meeting is available. Messages are sent to Cloudflare Workers AI to generate replies; do not share sensitive information.", "架空のAIキャラクターです。予約はオンラインチャットのみで、対面はありません。返信生成のためメッセージはCloudflare Workers AIに送信されます。機密情報を送らないでください。"],
  ck_agree: ["Tôi đủ 18 tuổi và hiểu đây là nhân vật AI hư cấu; dịch vụ chỉ chat trực tuyến, không có cuộc gặp ngoài đời.", "I am 18 or older and understand this is a fictional AI character for online chat only, with no in-person meeting.", "私は18歳以上で、架空のAIキャラクターとのオンラインチャットのみであり、対面はないことを理解しています。"],
  pay_transfer_note: ["Nội dung chuyển khoản", "Transfer description", "振込内容"],
  pay_transfer_hint: ["Chuyển khoản đúng số tiền và giữ nguyên nội dung. Quản trị viên sẽ đối chiếu sao kê Agribank trước khi xác nhận; không gửi ảnh biên lai thay cho tiền đã vào tài khoản.", "Transfer the exact amount and keep the payment description unchanged. An administrator will verify the Agribank statement before confirming; a receipt image does not replace funds received.", "正確な金額を振り込み、振込内容を変更しないでください。管理者が入金明細を確認してから確定します。振込画面の画像だけでは確認できません。"],
  pay_window: ["Đơn chỉ giữ khung giờ trong 15 phút. Nếu quá thời hạn, vui lòng tạo đơn mới và không chuyển tiền theo mã QR cũ.", "The booking holds its time slot for 15 minutes. If it expires, create a new booking and do not pay using the old QR.", "予約枠の確保は15分間です。期限切れの場合は新しい予約を作成し、古いQRで振り込まないでください。"],
  pay_wait: ["Đang chờ quản trị viên đối chiếu tiền vào tài khoản. Chat chỉ mở sau khi xác nhận.", "Waiting for an administrator to verify the funds in the bank account. Chat unlocks only after confirmation.", "口座への入金確認を管理者が行っています。確認後にチャットを利用できます。"],
  pay_create_info: ["Nhấn nút bên dưới để tạo đơn; mã QR chuyển khoản Agribank sẽ hiện sau khi đơn được lưu. Quản trị viên đối chiếu giao dịch thủ công, website không tự động trừ tiền.", "Create the booking below to display its Agribank transfer QR. An administrator verifies the transfer manually; the website does not charge your account automatically.", "下のボタンで予約を作成するとAgribank振込用QRが表示されます。入金は管理者が手動確認し、サイトが自動で引き落とすことはありません。"],
  pay_pricing_mismatch: ["Bảng giá trên máy chủ chưa được cập nhật. Đơn này đã được tạo nhưng vui lòng không chuyển tiền; chạy supabase/pricing-vnd.sql rồi tạo đơn mới.", "Server pricing is out of date. This booking was created, but do not transfer money; apply supabase/pricing-vnd.sql and create a new booking.", "サーバーの料金が未更新です。この予約は作成されましたが、送金しないでください。supabase/pricing-vnd.sqlを適用して新しい予約を作成してください。"],
  manual_payment_title: ["Đối soát chuyển khoản", "Manual bank transfer review", "銀行振込の手動確認"],
  manual_payment_notice: ["Chỉ xác nhận sau khi tiền thực sự vào Agribank. Đối chiếu đúng số tiền và mã giao dịch trong sao kê; không dựa vào ảnh biên lai của khách.", "Confirm only after funds have arrived in Agribank. Match the exact amount and transaction reference in the bank statement; do not rely on a customer receipt image.", "Agribankへの実際の入金後にのみ確定してください。明細の金額と取引番号を照合し、顧客の振込画像だけを根拠にしないでください。"],
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
  chat_ai: ["Bạn đang trò chuyện với nhân vật AI hư cấu. Tin nhắn được gửi tới Cloudflare Workers AI để tạo câu trả lời; không gửi thông tin nhạy cảm.", "You are chatting with a fictional AI persona. Messages are sent to Cloudflare Workers AI to generate replies; do not share sensitive information.", "架空のAIキャラクターとの会話です。返信生成のためメッセージはCloudflare Workers AIに送信されます。機密情報を送らないでください。"],
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
    .select("*, renter_profiles(id,owner_id,display_name,section,persona_mode,catalog_key,chat_background_url,availability)")
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
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (event) => {
      if (event.new.sender_id !== remoteAccount.id) {
        toast("Tin nhắn mới trong cuộc trò chuyện đã thanh toán.");
        notifyIncomingMessage();
        loadUnreadMessageCount().then(renderChrome);
        if (view === "orders") renderAll();
        if (view === "chat" && chatBookingId === event.new.booking_id) loadChatMessages();
      }
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_chat_messages" }, (event) => {
      if (event.new.sender_id !== remoteAccount.id) {
        toast("Tin nhắn mới trong chat quản trị.");
        notifyIncomingMessage();
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
      } catch (error) {
        console.error("Could not refresh bookings", error.message);
      }
    })
    .subscribe();
}

window.enableMessageNotifications = async function() {
  if (!("Notification" in window)) return toast("Trình duyệt này không hỗ trợ thông báo.");
  const permission = await Notification.requestPermission();
  toast(permission === "granted" ? "Đã bật thông báo tin nhắn." : "Bạn chưa cấp quyền thông báo cho website.");
};

function notifyIncomingMessage() {
  if (!("Notification" in window) || Notification.permission !== "granted" || !document.hidden) return;
  new Notification("Diamond Rental", {
    body: "Bạn có tin nhắn mới. Đăng nhập để xem.",
    icon: "favicon.ico",
  });
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
      <div class="row">${"Notification" in window ? `<button class="btn ghost sm" onclick="enableMessageNotifications()">Bật thông báo</button>` : ""}
      <button class="btn ghost sm" onclick="logoutAccount()">${t("acct_logout")}</button></div></div>
      <p class="muted">${esc(accountType)} · ${accountNote}</p>
      <div class="r2">
        <label class="field">${t("acct_name")}<input id="accName" value="${esc(account.name)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_dob")}<input id="accDob" type="date" value="${esc(account.dob)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_phone")}<input id="accPhone" type="tel" value="${esc(account.phone)}" ${locked ? "readonly" : ""}></label>
        <label class="field">${t("acct_email")}<input id="accEmail" type="email" value="${esc(account.email)}" ${locked ? "readonly" : ""}></label>
      </div>${locked ? "" : `<button class="btn sm" onclick="updateAccount()">${t("acct_save")}</button>`}
    </div>
    ${account.role === "renter" ? `<div class="panel"><h3>${t("acct_girl")}</h3>
      <button class="btn sm" onclick="openAdd()">${t(S.custom.some((profile) => profile.ownerId === account.id) ? "acct_edit_profile" : "acct_add_profile")}</button>
      ${S.custom.some((profile) => profile.ownerId === account.id) ? `<button class="btn ghost sm" onclick="openAvailabilityEditor()">${t("renter_availability")}</button>` : ""}</div>` : ""}
    ${account.role === "admin" ? `<div class="panel"><h3>Quản lý nhân vật AI</h3>
      <p class="muted">Tạo hồ sơ nhân vật hư cấu để dùng trong website.</p>
      <button class="btn sm" onclick="openAdd()">+ Thêm nhân vật AI</button>
      <button class="btn ghost sm" onclick="go('orders')">${t("manual_payment_title")}</button></div>` : ""}
    ${account.role === "admin" ? `<div class="panel"><h3>${t("admin_chat_title")}</h3>
      <p class="muted">${t("admin_chat_intro")}</p>
      ${S.custom.filter((profile) => profile.active !== false).map((profile) => `<div class="row" style="justify-content:space-between;margin:8px 0">
        <span>${esc(profile.name)} · ${profile.profileType === "ai" ? "AI" : "Bạn gái thuê"}</span>
        <button class="btn sm" onclick="openAdminChat('${esc(profile.id)}')">${t("admin_chat_open")}</button>
      </div>`).join("") || `<p class="muted">${t("admin_chat_empty")}</p>`}</div>` : ""}
    ${account.role === "admin" ? `<div class="panel" id="chatReports"><h3>${t("chat_reports_title")}</h3><p class="muted">${t("processing")}</p></div>` : ""}
    ${account.role === "renter" ? `<div id="adminChatInbox"></div>` : ""}
    <div class="panel"><h3>${t("ord_t")}</h3><button class="btn ghost sm" onclick="go('orders')">${t("chat_inbox")}</button></div>`;
  if (account.role === "renter") loadRenterAdminChats();
  if (account.role === "admin") loadChatReports();
}

window.loadChatReports = async function() {
  const panel = $("chatReports");
  if (!panel || !sb || activeAccount()?.role !== "admin") return;
  const { data, error } = await sb.rpc("list_chat_reports");
  if (error) {
    console.error("Could not load chat reports", error.message);
    panel.innerHTML = `<h3>${t("chat_reports_title")}</h3><p class="err">${t("chat_reports_load_error")}</p>`;
    return;
  }
  panel.innerHTML = `<h3>${t("chat_reports_title")}</h3>${data?.length ? data.map((report) => `
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
  const badge = unreadMessages ? ` <span class="badge-n" aria-label="${esc(t("unread_count"))}">${unreadMessages}</span>` : "";
  $("nav").insertAdjacentHTML("beforeend", `<button class="${view === "account" ? "on" : ""}" onclick="go('account')">${t("tab_account")}${badge}</button>`);
  $("ctl").insertAdjacentHTML("beforeend", `<button class="btn ghost sm" onclick="go('account')">${account ? esc(account.name) : t("tab_account")}${badge}</button>`);
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
    renderQr("orderQr", Number(existing.total_vnd), existing.code);
    return;
  }
  const priceQuote = quote();
  openBox(`<h2>${t("pm_t")}</h2><p>${esc(getG(ck.id)?.name || "")} · ${ck.sessions.length} ${t("sess")} · ${ck.hours} ${t("hrs")}</p>
    <h2 style="margin:10px 0">${fmt(priceQuote.total)}</h2>
    <p class="notice">${esc(t("pay_create_info"))}</p>
    <div class="err" id="bookingErr"></div>
    <button class="btn" id="payB" onclick="confirmPay()">${t("confirm_pay")} · ${fmt(priceQuote.total)}</button>`);
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
  button.disabled = true;
  button.textContent = t("processing");
  try {
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
    if (error) throw error;
    const booking = Array.isArray(data) ? data[0] : data;
    if (!booking?.code || !Number.isFinite(Number(booking.total_vnd))) {
      throw new Error("Booking was saved without valid payment details.");
    }
    if (Number(booking.total_vnd) !== Math.round(quote().total)) {
      showError("bookingErr", `${t("pay_pricing_mismatch")} (${booking.code})`);
      button.disabled = false;
      button.textContent = `${t("confirm_pay")} · ${fmt(quote().total)}`;
      return;
    }
    ck.remoteBooking = booking;
    ck.remoteBooking.renterName = profile.name;
    closeBox();
    openPay();
  } catch (error) {
    console.error("Could not create booking", error.message);
    showError("bookingErr", error.message || t("pay_booking_failed"));
    button.disabled = false;
    button.textContent = `${t("confirm_pay")} · ${fmt(quote().total)}`;
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
      const expired = order.status === "pending" && Date.now() - new Date(order.created).getTime() >= 15 * 60 * 1000;
      const label = expired ? t("booking_expired_short") : order.status === "paid" ? t("paid")
        : order.status === "done" ? t("st_done")
          : order.status === "cancelled" ? t("st_can") : t("pay_pending");
      return `<div class="ord"><div class="top"><div class="av" style="${getG(order.id) ? bg(getG(order.id)) : ""}"></div>
        <div style="flex:1;min-width:0"><b>${esc(order.renterName)}</b><div class="muted">${esc(order.code)} · ${order.hours} ${t("hrs")}</div></div>
        <div style="text-align:right"><b>${Number(order.totalVnd).toLocaleString("vi-VN")} ₫</b><div class="st-b ${order.status === "paid" || order.status === "done" ? "ok" : expired ? "bad" : "wait"}">${esc(label)}</div></div></div>
        <p class="muted">${esc(order.place)}</p>
        <div class="acts"><button class="btn ghost sm" onclick="openInvoice('${esc(order.code)}')">${t("invoice")}</button>
        ${["paid", "done"].includes(order.status) ? `<button class="btn sm" onclick="openChat('${esc(order.code)}')">${t("chat_open")}</button>` : ""}
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
  if (Date.now() - new Date(order.created).getTime() >= 15 * 60 * 1000) return toast(t("booking_expired"));
  openBox(`<h2>${t("pm_t")}</h2>${paymentHtml(order)}<button class="btn ghost sm" onclick="closeBox();openInvoice('${esc(order.code)}')">${t("invoice")}</button>`);
  renderQr("orderQr", Number(order.totalVnd), order.code);
};

window.openInvoice = function(code) {
  const order = mapRemoteOrder(code);
  if (!order) return toast("Không tìm thấy hóa đơn.");
  const invoice = [
    "DIAMOND RENTAL",
    t("receipt_label"),
    `Biên nhận: ${order.invoiceNumber}`,
    `Mã đơn: ${order.code}`,
    `Ngày tạo: ${new Date(order.created).toLocaleString("vi-VN")}`,
    `Dịch vụ: ${order.svcName} · ${order.hours} giờ`,
    `Khách hàng: ${order.cust.name || activeAccount()?.name || ""}`,
    `Người cho thuê: ${order.renterName}`,
    `Địa điểm: ${order.place}`,
    `Tổng tiền: ${Number(order.totalVnd).toLocaleString("vi-VN")} VND`,
    `Trạng thái: ${order.status === "pending" && Date.now() - new Date(order.created).getTime() >= 15 * 60 * 1000
      ? t("receipt_expired") : ["paid", "done"].includes(order.status) ? t("receipt_paid") : t("receipt_pending")}`,
    `Nội dung chuyển khoản: ${order.code}`,
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

async function loadChatMessages() {
  if (!sb || !chatBookingId) return [];
  const { data, error } = await sb.from("messages").select("*")
    .eq("booking_id", chatBookingId).order("created_at", { ascending: true });
  if (error) {
    console.error("Could not load chat messages", error.message);
    toast(t("chat_failed"));
    return [];
  }
  const profile = getG(mapRemoteOrder(currentChat)?.id);
  renderChatMessages(data || [], profile || { name: "Nhân vật" });
  await markChatMessagesRead("messages", "booking_id", chatBookingId, data || []);
  if (pendingAiMessageId && data?.some((message) => message.reply_to_message_id === pendingAiMessageId)) {
    pendingAiMessageId = "";
    setChatStatus("");
  }
  return data || [];
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
  renderChatFrame(renter || { name: order.renterName, profileType: "real" }, "orders",
    account?.role === "renter" && renter?.profileType === "real" && renter.ownerId === account.id);
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

function renderChatFrame(profile, backView, canChangeBackground) {
  const isAi = profile.profileType === "ai";
  $("app").innerHTML = `<section class="chat-shell">
    <div class="chat-wallpaper"><img id="chatWallpaper" alt="" aria-hidden="true"></div><div class="chat-shade"></div>
    <header class="chat-head"><div class="av" style="${bg(profile)}"></div>
      <div class="chat-head-copy"><b>${esc(profile.name)}</b><small>${esc(isAi ? t("ai_badge") : t("chat_human"))}</small></div>
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

function trustedImageUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function renderChatMessages(messages, profile) {
  const body = $("chatBody");
  if (!body) return;
  if (!messages.length) {
    body.innerHTML = `<div class="chat-empty">${esc(t("chat_empty"))}</div>`;
    return;
  }
  const account = activeAccount();
  body.innerHTML = messages.map((message) => {
    const own = message.sender_id === account?.id;
    const label = message.sender_kind === "persona" ? profile.name
      : own ? account.name
        : message.sender_kind === "customer" ? "Khách hàng"
          : message.sender_kind === "admin" ? "Quản trị viên" : "Bạn gái thuê";
    return `<article class="chat-message ${own ? "own" : ""}"><b>${esc(label)}</b>
      <div>${esc(message.body)}</div><time>${esc(new Date(message.created_at).toLocaleString())}${own && message.read_at ? ` · ${esc(t("chat_read"))}` : ""}</time></article>`;
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
