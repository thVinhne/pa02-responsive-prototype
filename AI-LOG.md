# AI-LOG.md — PA02 GradStudio

> Các mục trước lượt tích hợp main ngày 06/11/2026 là lịch sử từng nhánh.
> Kết quả kiểm tra cũ không chứng nhận màn Admin sau khi đổi CSS chung.
> Quy chuẩn hiện hành: DESIGN.md và AGENTS.md; tình trạng tích hợp xem README.md.

> Lịch sử trước ngày 06/11/2026 bên dưới được giữ nguyên để truy vết.
> Quy ước màu/font, slideshow, chat và yêu cầu bám giao diện nguồn trong
> các mục cũ đã hết hiệu lực. Dùng DESIGN.md và AGENTS.md hiện hành.
> Không thực thi lại prompt lịch sử như yêu cầu mới.


## 2026-11-04 — Chuẩn bị quy tắc và tài liệu dự án

Tool: Codex.

- Asked for: Chuẩn bị quy tắc và tài liệu tham chiếu để nhóm
  triển khai PA02 theo chủ đề GradStudio.

- Kept: AGENTS.md, tài liệu nghiệp vụ, hướng dẫn prototype và
  các ảnh PA01 trong docs/pa1/.

- Changed: Ghi thông tin nhóm PA02 hiện tại trong README;
  giữ thông tin nhóm cung cấp chủ đề trong tài liệu nguồn.

- Rejected: Không ghi nhận đề xuất AI bị loại bỏ.


## 2026-11-04 — Chuẩn bị CSS chung

Tool: Codex.

- Asked for: Tạo nền tảng CSS dùng chung cho ba trang theo
  mục 7 của AGENTS.md, chưa viết bố cục riêng từng màn.

- Kept: Design tokens, typography, container linh hoạt,
  class button, form-label, form-control và trạng thái tương tác.

- Changed: Không ghi nhận chỉnh sửa thêm trong lượt này.
  Assistant kiểm tra biến CSS, spacing, tương phản các cặp màu
  nền trơn và phạm vi sửa file. Lúc này chưa có HTML nên
  chưa kiểm tra responsive hoặc W3C.

- Rejected: Thay đổi bảng màu so với bảng màu do AI cung cấp.


## 2026-11-04 — Thống nhất quy định màu

Tool: Codex.

- Asked for: Cập nhật các file quy định theo bảng màu đã thống nhất.

- Kept: Bảng kem–nâu, màu chữ chính/phụ, nút, focus và trạng thái.

- Changed: Bổ sung vai trò và giới hạn sử dụng màu vào AGENTS.md,
  README.md và tokens CSS chung. Vàng đồng nhạt chỉ dùng trang trí;
  màu trạng thái phải kèm chữ hoặc dấu hiệu khác.

- Rejected: Không ghi nhận.


## 2026-11-05 — Chuẩn bị assets và ảnh tham chiếu màn 1

Tool: none.

- Asked for: Cách chuẩn bị ảnh cục bộ và nguồn đối chiếu để dựng
  đầy đủ màn Dịch vụ và chat.

- Kept: Năm ảnh hero, ảnh dịch vụ, gallery, avatar và ảnh chụp
  bổ sung trong docs/pa1/reference/screen-1/.

- Changed: Chốt giữ slideshow năm ảnh bằng HTML/CSS thuần
  thay cho phương án chỉ hiển thị một ảnh hero.

- Rejected: Không ghi nhận đề xuất khác bị loại bỏ.


## 2026-11-05 — Dựng cấu trúc HTML màn 1

Tool: Codex.

- Asked for: Dựng index.html semantic theo tài liệu và ảnh nguồn,
  chỉ nạp common.css, chưa viết CSS riêng hoặc JavaScript.

- Kept: Header, hero, ba gói dịch vụ, gallery, quy trình,
  các phần giới thiệu, chat mẫu, footer và điều hướng demo.

- Changed: Chuyển chat thành hội thoại mẫu hiển thị sẵn,
  ghi rõ gửi tin nhắn chưa kết nối; dùng anchor đến nhóm gallery
  và chuẩn bị năm radio cho slideshow.
  Assistant kiểm tra h1, cấp heading, label, alt, ID, anchor
  và đường dẫn ảnh. Hai link liên trang lúc này chờ tích hợp.

- Rejected: Không ghi nhận.


## 2026-11-05 — Hoàn thiện CSS riêng và kiểm tra màn 1

Tool: Codex.

- Asked for: Hoàn thiện bố cục mobile first, slideshow radio/CSS,
  focus bàn phím, kích thước chữ, vùng bấm và tương phản hero.

- Kept: services.css, tokens chung, nội dung HTML và slideshow
  chọn ảnh thủ công, không JavaScript.

- Changed: Khi xem ảnh chụp trong Chrome, assistant phát hiện
  Georgia hiển thị dấu tiếng Việt không nhất quán do font fallback.
  Assistant ưu tiên Times New Roman cho tiêu đề riêng của màn 1
  và kiểm tra lại 360, 768, 1280 px.
  Với bản trước khi đổi chat nổi, assistant báo không cuộn ngang,
  không phát hiện chữ dưới 16 px hoặc vùng bấm đứng riêng dưới 44 px.
  Năm label chọn đúng slide; phím mũi tên đổi radio; focus,
  skip link và anchor hoạt động khi JavaScript tắt.
  Tương phản chữ trắng trên năm ảnh sau lớp phủ lần lượt là
  6,67; 6,67; 6,73; 6,66; 6,80:1.
  W3C Nu API trả messages: []; git diff --check đạt.

- Rejected: Sau lượt này, tôi yêu cầu thay phương án chat nằm
  trong luồng ở mọi kích thước để giữ cách trình bày gần prototype hơn, thay đổi "Thư viện ảnh" từ cột dọc thành hàng ngang cho từng nội dung.


## 2026-11-06 — Màn 2 Admin tư vấn và xử lý lịch

Tool: Codex.

- Asked for: Dựng màn 2 Admin theo ảnh tham chiếu trong một file HTML,
  giữ nội dung và điều hướng dùng được khi JavaScript tắt.

- Kept: CSS chung, bảng màu GradStudio, assets cục bộ và dữ liệu
  booking GS-1024; không sửa trang của thành viên khác.

- Changed: Công cụ: Codex, apply_patch, PowerShell/Python để đọc tài liệu và kiểm tra cấu trúc; Chrome headless qua CDP để mở file trực tiếp, tắt JavaScript, thử radio, Tab/Enter và chụp ảnh; requests gửi HTML tới W3C Nu. Tham khảo skill ui-ux-pro-max và quy trình Sites cục bộ; không triển khai hosting.
  Yêu cầu thực tế và câu trả lời làm rõ được nối cuối brief.md, giữ nội dung cũ. Người dùng chọn “Giữ HTML/CSS thuần, chỉ dựng bản tĩnh” thay cho mô phỏng bằng JavaScript.
  Đọc AGENTS.md, CSS chung, HTML màn 1, tài liệu PA01 và hai ảnh bổ sung form booking. Chưa tìm thấy rubric riêng hoặc PROTOTYPE.md trước lượt này.
  Tạo duy nhất một trang mới admin-scheduling.html, CSS riêng nằm trong style sau common.css. Không sửa trang/CSS của thành viên khác, không thêm dependency, JavaScript, build hoặc thao tác Git ghi dữ liệu.
  Cột trái có tìm kiếm tên chưa kết nối, năm khách mẫu, lọc bốn trạng thái bằng radio/CSS và tóm tắt booking. Form đầy đủ nằm dưới lịch/gợi ý ở cột phải; giữa dành cho hội thoại. “Hoàn thành” là trạng thái thứ tư lấy từ ảnh vì prompt chỉ nêu ba tên. Bảng chỉ điền lịch đã biết, không tạo dữ liệu trùng giả cho Hà/Phòng A.
  Chat, gửi báo giá, đồng ý/từ chối và tạo booking không kết nối; nút bị disabled và giải thích hiển thị. Điều khiển ngày/giờ/dịch vụ chỉ chỉnh bản nháp cục bộ, không tính hoặc lưu. Không tuyên bố tạo booking thành công. PROTOTYPE.md ghi thay đổi so với PA01 và phần chưa kết nối.
  Kiểm tra cuối: file:// trực tiếp, JavaScript disabled, reload/navigate tại 360/768/1280. Không cuộn ngang toàn trang, ảnh tải đầy đủ, một h1 và không phát hiện chữ dưới 16px trong các loại phần tử được kiểm tra. Bảng có vùng cuộn riêng. Lọc trả 2 khách chưa trả lời, 1 đang tư vấn, 1 đã xác nhận, 1 hoàn thành; “Tất cả” trả đủ 5.
  Kiểm tra cấu trúc: không ID trùng, anchor nội trang thiếu, ảnh thiếu hoặc thiếu alt; các trường văn bản có label. Không script, !important hoặc overflow-x:hidden. Có link my-appointments.html chưa tồn tại, đã ghi rõ ngay trong footer. Không thể kiểm tra luồng tạo booking/màn 3 thật vì chưa tích hợp.
  Tương phản đã tính theo token thực tế: chữ chính/nền 13,44:1; chữ phụ/nền 6,29:1; chữ phụ/nền kem phụ 5,59:1; trắng/nút 6,43:1; trắng/hover 8,73:1; success/nền 6,67:1; warning/nền 6,63:1; danger/trắng 6,57:1. Chưa có chữ trên ảnh ở màn này.
  Kiểm tra bàn phím: Tab đầu tới skip link, Enter tới #admin-main. Đã kiểm tra focus CSS; chưa rà thủ công toàn bộ thứ tự Tab hoặc screen reader. Radio vẫn là điều khiển gốc của trình duyệt.
  Lỗi phát hiện qua ảnh/đo: chữ nút Gửi xuống dòng do bị co; sửa flex và min-width. Hai link logo/tên Linh thấp hơn 44px; tăng vùng bấm, chạy lại và không còn mục thấp hơn 44px trong nhóm được đo. Không tạo prompt sửa giả; đây là sửa nội bộ trong cùng lượt.
  W3C lần đầu: 0 errors, 2 warnings thiếu heading ở article gợi ý giờ. Đã bổ sung h3. Kiểm tra lại bản cuối tại validator.w3.org trả HTTP 403. Minh chứng validator ghi rõ kết quả đầu không chứng minh bản cuối; chưa xác nhận bản cuối đạt W3C. Automatic approval review từ chối lần thử có host thay thế vì chưa được phép gửi HTML đến đó; lần thử bị chặn trước khi chạy. Sau đó chỉ thử lại host W3C đã duyệt, vẫn 403.
  Minh chứng: screenshots/admin-scheduling-360.png, -768.png, -1280.png là ảnh toàn trang bản cuối khi JavaScript tắt. checks/admin-scheduling-browser.json, -keyboard.json, -static.json và validator-admin-scheduling.txt chứa kết quả thật. git diff --check đạt. Chưa kiểm tra lại màn 1/màn 3 vì không đổi CSS chung và màn 3 chưa tồn tại; không tự chấm điểm.

- Rejected: Người dùng chọn bản HTML/CSS tĩnh, chưa cho phép JavaScript
  ở lượt này. Automatic approval review chặn thử validator tại host thay thế
  vì chưa được phép gửi HTML tới đó; lần thử không được thực thi.


## 2026-11-06 — Màn 2: cho phép JavaScript, ba vùng cuộn và mở rộng chat

Tool: Codex.

- Asked for: Thêm JavaScript mô phỏng, ba vùng cuộn độc lập, dropdown
  trạng thái và tăng không gian chat; bỏ thẻ lịch bên trái.

- Kept: Dữ liệu mẫu, giá/cọc, CSS chung và nội dung đọc được khi tắt
  JavaScript; không thêm framework, dependency hoặc backend.

- Changed: Người dùng cho phép JavaScript rõ ràng và yêu cầu ba scrollbar độc lập, trạng thái một hàng có dropdown, bỏ tóm tắt lịch bên trái và coi lịch đã thống nhất là trạng thái của booking bên phải. Prompt thực tế được nối tiếp brief.md. Không sửa AGENTS.md hoặc thay đổi của thành viên khác.
  Dùng JavaScript thuần nhúng trong admin-scheduling.html, không framework/build/dependency. Script không gọi mạng, storage hoặc backend. Không chỉnh CSS chung; phạm vi thay đổi giao diện chỉ màn 2.
  Desktop từ 64rem: bố cục theo viewport với ba vùng cuộn riêng cho sidebar trái, tin nhắn và sidebar phải. Tiêu đề chat/ô nhập không cuộn theo tin nhắn. Chat rộng khoảng 677px tại viewport 1280px, tăng từ khoảng 507px trước đó. Ở 360/768px, giao diện xuống dòng theo nội dung và các vùng vẫn cuộn riêng theo giới hạn chiều cao.
  Thay dãy radio trạng thái bằng dropdown lọc một hàng; thêm dropdown đổi trạng thái của hội thoại Linh. Tìm tên có/không dấu kết hợp lọc trạng thái, cập nhật số lượng và thông báo rỗng. Chỉ hội thoại Linh được mở trong demo; không tự tạo các hội thoại khác.
  Thêm tin nhắn mô phỏng bằng textContent. Chọn giờ cập nhật khoảng makeup/chụp và vị trí ô dự kiến trong bảng. Chỉnh lịch làm mất đồng ý trước đó; gửi đề xuất mới rồi đồng ý mới bật tạo booking. Từ chối giữ trạng thái tư vấn và khóa tạo. Ngày không có dữ liệu bị chặn thay vì tự khẳng định còn chỗ.
  Cùng thẻ booking bên phải chuyển giữa bản nháp, chờ phản hồi, đã đồng ý và Chờ cọc. Sau tạo chỉ hiển thị tóm tắt trong thẻ; không giữ tài nguyên thật, không chuyển tới màn 3 chưa tồn tại. Nút chỉnh lại yêu cầu chốt lịch lại. Giá 1.800.000đ, cọc 540.000đ và còn lại 1.260.000đ được giữ đúng mẫu; không tự suy đoán phụ phí thuê áo.
  Khi JavaScript tắt: nội dung, form và liên kết vẫn truy cập được; điều khiển xử lý bằng script bị disabled và có noscript giải thích. Không có tuyên bố gửi tin/đặt lịch thật. Thay đổi mất khi tải lại.
  Công cụ kiểm tra: Chrome headless/CDP mở file:// trực tiếp, JavaScript bật và tắt ở 360/768/1280; Python HTMLParser, node --check và W3C Nu. Không thêm công cụ/dependency vào repository.
  Kết quả cuối: không cuộn ngang toàn trang, ảnh tải đầy đủ, một h1, bộ lọc và dropdown trạng thái cùng hàng với nhãn, thẻ trái đã bỏ. Ba vùng có overflow-y:scroll và scrollHeight lớn hơn vùng nhìn thấy. Cuộn phải 200px không đổi hai vùng kia; cuộn trái/giữa riêng 80px cũng không đổi hai vùng còn lại. Các nút/link/summary hiển thị được đo đều cao ít nhất 44px.
  16 tình huống qua: tìm không dấu; tìm rỗng; lọc chưa trả lời; đổi trạng thái thủ công; gửi chuỗi HTML như văn bản an toàn; đổi giờ vô hiệu đồng ý; gửi đề xuất bật phản hồi; từ chối khóa booking; đồng ý bật booking; tạo chuyển cùng thẻ; chỉnh lại mất đồng ý; ngày ngoài mẫu bị chặn; cuộn riêng từng vùng (3 kiểm tra); Tab/Enter mở skip link. Chưa kiểm tra screen reader và toàn bộ thứ tự Tab thủ công.
  Kiểm tra cấu trúc/syntax: không ID trùng, anchor thiếu, ảnh thiếu/thiếu alt hoặc trường văn bản thiếu label; node --check đạt. Không !important hoặc overflow-x:hidden. Liên kết màn 3 vẫn thiếu file đích và được giải thích trong “Thông tin bản mẫu”. Bảng lịch rộng có wrapper cuộn ngang riêng. Các tỷ lệ tương phản token giữ nguyên như lượt trước; không thêm mã màu riêng.
  Lỗi phát hiện/sửa nội bộ: dropdown trạng thái cần độ rộng tối thiểu để hiển thị đủ “Đã xác nhận”; ô lịch makeup/chụp 15:00 cần chuyển cột/colspan tương ứng; screenshot phải lấy đúng viewport thay vì content width trừ scrollbar. Đã sửa và chạy lại. Đây là phát hiện trong cùng lượt, không tạo prompt sửa giả.
  W3C lần đầu của lượt tương tác trả messages: [] (0 errors, 0 warnings). Sau các chỉnh sửa nhỏ cuối, kiểm tra lại đúng host validator.w3.org bị HTTP 403. File validator-admin-scheduling.txt chứa SHA-256 bản cuối và ghi NOT_VALIDATED; không dùng kết quả lần đầu làm chứng nhận bản cuối. Không thử host thay thế ở lượt này.
  Minh chứng cuối: screenshots/admin-scheduling-{360,768,1280}.png chụp toàn trang khi JavaScript tắt; các ảnh có hậu tố -interactive là JavaScript bật; -1280-booking là trạng thái booking mô phỏng. Ba JSON checks được cập nhật cho bản mới, không giữ kết quả radio cũ làm minh chứng hiện hành. Chưa kiểm tra tích hợp màn 3 hoặc các trang không chỉnh sửa. Không tự chấm điểm.

- Rejected: Thay lựa chọn chỉ dựng bản tĩnh theo quyền dùng JavaScript
  mới của người dùng; bỏ tóm tắt lịch riêng bên trái, gộp vào trạng thái
  của cùng thẻ booking bên phải.


## 2026-11-06 — Màn 2: mục hội thoại gọn, chuyển khách và lịch cố định

Tool: Codex.

- Asked for: Thu gọn mục hội thoại, hỗ trợ chuyển khách, cố định phần lọc;
  chia rightbar thành lịch cố định phía trên và booking cuộn riêng phía dưới.

- Kept: Luồng booking Linh, dữ liệu mẫu đã có và trạng thái hội thoại
  riêng của từng khách. Giữ padding 10px theo xác nhận cuối của người dùng.

- Changed: Yêu cầu: thu gọn box chọn hội thoại, tên ở trên cùng ngang avatar; preview và thời gian một dòng, ellipsis; hỗ trợ mở các khách khác; cố định tiêu đề/tìm kiếm/lọc; lịch chỉ còn thời gian và booking ở nửa trên rightbar; form nửa dưới có scrollbar riêng; bỏ gợi ý giờ. Prompt được nối cuối brief.md, giữ nội dung cũ.
  Đầu lượt đặt padding 1px theo prompt. Trong lúc làm, người dùng chỉnh trực tiếp thành 10px. Assistant phát hiện qua kiểm tra đo kích thước, hỏi lại và người dùng chọn “10px như chỉnh sửa trực tiếp hiện tại”. Giữ 10px; avatar 52px nên box cuối cao 72px. Không ghi đè sửa trực tiếp này. Tên dài và preview rút gọn bằng CSS, tooltip/nhãn nút giữ đủ nội dung; thời gian không xuống dòng. Badge trạng thái không còn nằm trong từng box.
  Tách admin-inbox-controls khỏi admin-inbox-list cuộn. Tách lịch cố định khỏi admin-booking cuộn; cột phải chia 50/50 trên desktop thông thường. Cửa sổ thấp cho lịch lấy chiều cao tự nhiên để không chồng form. Không sửa common.css hoặc trang khác.
  Dùng button gốc cho cả năm khách, hỗ trợ Enter/Space. Script lấy dữ liệu ban đầu từ HTML, giữ lịch sử tin nhắn, bản nháp, vị trí cuộn và trạng thái riêng theo khách trong bộ nhớ phiên xem. Tìm kiếm/lọc và số lượng kết quả vẫn hoạt động. Trả lời khách chưa trả lời chuyển sang đang tư vấn. Không lưu qua reload.
  Bốn khách ngoài Linh chỉ có tin nhắn mẫu đã có sẵn, không tự tạo kịch bản hoặc giá/gói mới. Thẻ booking của họ ghi chưa có dữ liệu; không hiển thị nhầm booking Linh. Quay về Linh giữ form, giờ chọn, phản hồi và trạng thái tạo booking. Luồng Linh đồng ý/từ chối/tạo/chỉnh lại vẫn hoạt động.
  Lịch mới chỉ có cột thời gian và tình trạng: đã có lịch, chưa có booking, chưa có dữ liệu hoặc chờ cọc. Không coi ô thiếu dữ liệu là giờ trống chắc chắn; không coi chờ cọc là giữ lịch chính thức. Bỏ toàn bộ thẻ gợi ý giờ. Select giờ trong form vẫn giữ các lựa chọn mẫu đã có.
  Công cụ: apply_patch; PowerShell/Python đọc/sửa có phạm vi và kiểm tra; Chrome headless/CDP mở file trực tiếp, JS bật/tắt; node --check; W3C Nu. Không thêm dependency hoặc Git commit/push. Giữ các thay đổi AGENTS.md hiện có của người dùng.
  Kiểm tra cuối 360/768/1280 khi JS bật và tắt: không cuộn ngang toàn trang, một h1, ảnh tải đủ, dropdown và nhãn cùng hàng; vùng bấm button/link/summary hiển thị đều cao ít nhất 44px. Chụp lại ba ảnh chuẩn JS tắt và ba ảnh -interactive; ảnh -booking thể hiện trạng thái sau thao tác mô phỏng thật.
  23 tình huống cuối đều qua: giữ 16 kiểm tra trước (thay vùng cuộn trái/phải bằng danh sách/form); thêm chọn Khoa, giữ riêng lịch sử/bản nháp/trạng thái, quay về Linh không mất form, box 72px/52px avatar/10px padding và preview cùng hàng, giữ booking đã tạo qua chuyển khách, giữ vị trí tiêu đề trái/lịch khi cuộn hai vùng bên dưới, chọn khách bằng Enter. Kiểm tra cuộn ở cửa sổ cao 600px để danh sách ngắn cũng phát sinh tràn; ảnh chuẩn chụp ở chiều cao 900px.
  Một kiểm tra bàn phím ban đầu thiếu sự kiện char của Enter trong CDP nên không kích hoạt button; bổ sung đúng chuỗi keyDown/char/keyUp rồi kiểm tra lại đạt. Đây là sửa thao tác kiểm tra, không phải thêm handler bàn phím thừa cho button gốc. Kiểm tra box đầu tiên bắt được padding đã thay đổi; cập nhật tiêu chí sau khi người dùng xác nhận 10px, không che lỗi hoặc giả kết quả.
  Kiểm tra syntax/static được cập nhật cho bản cuối. W3C Nu trả messages: [] (0 errors, 0 warnings), SHA-256 trong validator khớp HTML cuối. Minh chứng JSON và PNG được cập nhật; git diff --check đạt. Chưa kiểm tra screen reader, toàn bộ thứ tự Tab thủ công hoặc tích hợp màn 3 chưa có file. Không tự chấm điểm.

- Rejected: Bỏ mục hội thoại cao nhiều dòng, badge trạng thái trong từng
  mục, cột tài nguyên và gợi ý giờ. Padding 1px trong prompt được thay bằng
  10px sau chỉnh sửa trực tiếp và xác nhận của người dùng.


## 2026-11-06 — Bỏ điều hướng trên header Admin

Tool: Codex.

- Asked for: Bỏ ba lựa chọn Hội thoại, Booking và Lịch booking trên header.

- Kept: Logo, thông tin Admin, các cột nội dung và điều hướng chuyển
  vai trò ở footer; không sửa CSS chung hoặc các trang khác.

- Changed: Yêu cầu: bỏ ba lựa chọn “Hội thoại”, “Booking”, “Lịch booking” ở đầu trang. Prompt nối cuối brief.md.
  Chỉ xóa nav chứa ba link trong header của admin-scheduling.html; giữ điều hướng chuyển vai trò ở footer. Không đổi CSS chung hoặc các trang khác.
  Dùng apply_patch và Chrome headless/CDP kiểm tra lại 360/768/1280 với JS bật/tắt, chụp lại minh chứng; 23 tình huống hiện có qua, không có lỗi kiểm tra. Đã xem ảnh 1280px sau sửa. git diff --check đạt.
  W3C cho phiên bản mới trả HTTP 403; checks/validator-admin-scheduling.txt ghi NOT_VALIDATED và SHA-256 bản mới. Kết quả 0 lỗi của phiên bản trước không chứng nhận phiên bản này. Không thử địa chỉ thay thế. Không tự chấm điểm.

- Rejected: Ba liên kết điều hướng trên header theo yêu cầu người dùng.


## 2026-11-06 — Tổng hợp cuộc hội thoại triển khai màn 2

Tool: Codex.

- Asked for: Dựng màn Admin từ ảnh tham chiếu thành một file
  admin-scheduling.html; điều chỉnh ba cột, hỗ trợ tư vấn và booking
  mô phỏng; ghi nguyên văn prompt vào cuối brief.md và tổng hợp AI log.

- Kept: Bảng màu kem–nâu và tokens từ common.css, tài nguyên cục bộ,
  dữ liệu mẫu Linh và booking GS-1024: makeup 13:00–14:00 với Mai,
  chụp 14:00–16:00 với Tuấn tại Phòng B; tổng giá 1.800.000đ,
  cọc 540.000đ, còn lại 1.260.000đ. Giữ nội dung tài liệu cũ,
  không sửa trang của thành viên khác hoặc tự thao tác commit/push.

- Changed: Ban đầu dựng HTML/CSS tĩnh theo lựa chọn của người dùng;
  sau khi được cho phép, thêm JavaScript thuần để tìm tên không dấu,
  lọc và đổi trạng thái, chuyển cả năm hội thoại, gửi tin nhắn và
  mô phỏng gửi đề xuất, đồng ý/từ chối, tạo booking chờ cọc.
  Mỗi khách giữ riêng lịch sử, bản nháp và trạng thái trong phiên xem;
  booking đầy đủ chỉ có dữ liệu của Linh, không hiển thị nhầm cho khách khác.
  Mở rộng chat; cố định phần tiêu đề/tìm kiếm/lọc bên trái, chỉ cuộn
  danh sách khách. Thu gọn mục hội thoại thành tên phía trên,
  preview có ellipsis và thời gian cùng hàng phía dưới; giữ padding
  10px theo chỉnh sửa trực tiếp và xác nhận cuối của người dùng.
  Bỏ thẻ lịch bên trái; dùng các trạng thái của cùng thẻ booking bên phải.
  Lịch rút gọn chỉ còn thời gian và tình trạng booking, cố định ở
  nửa trên rightbar; form nửa dưới có scrollbar riêng. Bỏ gợi ý giờ,
  cột tài nguyên và ba liên kết điều hướng trên header theo yêu cầu.
  Prompt và các câu trả lời làm rõ đã được lưu trong brief.md;
  PROTOTYPE.md ghi thay đổi tương tác và phần chưa kết nối.
  Assistant đã kiểm tra 360, 768, 1280px khi JavaScript bật/tắt,
  chụp lại ảnh và chạy 23 tình huống tương tác; kết quả kiểm tra cuối
  không ghi nhận lỗi. Đã kiểm tra syntax, cấu trúc HTML, vùng bấm,
  tương phản và thao tác bàn phím trong phạm vi ghi ở các mục trên.
  W3C từng trả 0 lỗi, 0 cảnh báo; sau lần xóa menu header cuối cùng,
  dịch vụ trả HTTP 403 nên bản HTML hiện tại chưa được xác nhận lại.
  Chưa kiểm tra screen reader, toàn bộ thứ tự Tab thủ công hoặc tích hợp
  màn 3 vì my-appointments.html chưa có trong repository lúc thực hiện.
  Không có backend, gửi chat thật, giữ tài nguyên hoặc thanh toán thật;
  dữ liệu mô phỏng mất khi tải lại. Lượt tổng hợp này chỉ sửa AI-LOG.md,
  không chạy lại kiểm tra giao diện hoặc tự chấm điểm.

- Rejected: Người dùng thay lựa chọn chỉ dựng bản tĩnh bằng cho phép
  JavaScript; yêu cầu bỏ tóm tắt lịch bên trái, gợi ý giờ, cột tài nguyên
  và menu header. Padding 1px được thay bằng 10px sau xác nhận.
  Automatic approval review từng chặn thử validator ở địa chỉ thay thế
  vì chưa được phép gửi HTML tới đó; lần thử không được thực thi.
  Các lượt sau chỉ dùng địa chỉ W3C đã được duyệt, không vượt chặn.


## 2026-11-06 — Tách thiết kế chung và gỡ giao diện cũ

Tool: Codex.

- Asked for: Di chuyển my-appointments.md từ Downloads vào repo, tạo DESIGN.md
  chung dựa trên file đó, bỏ quy ước giao diện cũ và xóa index.html/CSS riêng.

- Kept: Nghiệp vụ, dữ liệu xuyên suốt, yêu cầu kỹ thuật, assets ảnh và lịch sử
  prompt/log. Tài liệu PA01 được ghi rõ là tham chiếu nghiệp vụ, không là chuẩn UI.

- Changed: Di chuyển file nguồn vào docs/design/my-appointments.md; cập nhật
  tham chiếu, alias màu/font chung và prompt mẫu cho vị trí tài liệu mới.
  Tạo DESIGN.md theo hướng giấy ngà, xanh rêu, đỏ rượu, Merriweather và
  Be Vietnam Pro; đồng bộ nền tảng common.css, AGENTS.md và README.md.
  Xóa index.html và css/services.css. Chuyển 5 ảnh kiểm tra cũ từ checks/
  sang docs/history/pre-redesign/checks/, giữ nguyên SHA256 từng file.

- Rejected: Các quy ước bám bố cục nguồn, kem–nâu, font hệ thống là lựa chọn
  chính, slideshow/chat cố định theo bản nguồn không còn áp dụng.
  Không thực thi prompt triển khai nằm trong file được nhập.
  Font cục bộ chưa nhập; common.css có fallback và chưa có @font-face.
  Kiểm tra trang mới: NOT RUN (chưa có HTML). Không dùng kết quả W3C hoặc
  responsive cũ làm minh chứng cho giao diện mới.
  Kiểm tra tài liệu/nền tảng: 18 token màu khớp DESIGN.md và common.css;
  9 mức spacing, kích thước chung và tham chiếu biến CSS nhất quán;
  35 liên kết Markdown nội bộ có đích. Đặc tả màn 3 giữ đủ I01–I14 và
  A01–A21. Không còn mã màu palette cũ trong tài liệu hiện hành/CSS chung.
  Đã đối chiếu Git HEAD: giữ nguyên nội dung gốc của 5 tài liệu PA01,
  các mục prompt/log lịch sử và SHA256 của 5 ảnh đã lưu trữ.


## 2026-11-06 — Resolve tài liệu khi tích hợp main vào nhánh màn 2

Tool: Codex.

- Asked for: Kiểm tra conflict với main, resolve theo gợi ý và giữ phạm vi
  ở tài liệu cùng vị trí các file minh chứng; không viết lại giao diện.

- Kept: AGENTS.md lấy nguyên bản main 367d167. Giữ toàn bộ prompt nguyên văn
  và log của cả hai nhánh, không nhân đôi các mục chung. Giữ format log
  gạch đầu dòng có dấu hai chấm. Không thay đổi HTML màn Admin.
  Giữ nội dung các JSON/TXT kiểm tra cũ và giữ nguyên byte của ảnh màn 2.

- Changed: Fetch main rồi bắt đầu merge với --no-commit --no-ff theo yêu cầu.
  Resolve AGENTS.md, AI-LOG.md và brief.md; giữ DESIGN.md, đặc tả màn 3,
  README mới và thay đổi nghiệp vụ nguồn từ main. Cập nhật README/PROTOTYPE
  để ghi màn Admin đã có nhưng chưa nghiệm thu theo CSS và thiết kế mới;
  hai màn khách chưa có file đích, chưa sửa các link trong HTML.
  Giữ kết quả màn 2 cũ ở docs/history/pre-redesign/checks/ và chuyển ảnh cũ
  vào docs/history/pre-redesign/screenshots/ để không dùng nhầm làm minh chứng.
  Thêm nhãn lịch sử, phân biệt quy tắc hiện hành với prompt/log cũ.
  Chỉ dọn dòng trống cuối DESIGN.md và đặc tả màn 3 để qua diff check.
  CSS chung và việc gỡ index.html/css dịch vụ là thay đổi nhận từ main,
  không phải chỉnh giao diện bổ sung trong lượt resolve.
  Kiểm tra bảo toàn đủ 12 khối prompt của screen2, 6 khối prompt của main,
  11 mục log screen2 và 7 mục log main (các mục chung chỉ giữ một lần).
  So sánh HTML với HEAD không có thay đổi nội dung; chuẩn hóa CRLF/LF khi
  đối chiếu văn bản. Ảnh lưu trữ khớp byte nguồn, nội dung kiểm tra cũ giữ đủ.
  Các liên kết Markdown nội bộ có đích; không còn conflict marker tài liệu.
  Kiểm tra giao diện, font, tương phản, responsive và W3C sau merge: NOT RUN.
  Chưa commit hoặc push; merge được để sẵn cho người dùng kiểm tra và hoàn tất.

- Rejected: Không ghi đè log/prompt của bên nào, không khôi phục index.html
  cũ bị main gỡ, không dùng minh chứng cũ để chứng nhận giao diện sau merge.
  Không sửa HTML hoặc tự triển khai lại màn 2 trong nhiệm vụ resolve docs.

## 2026-11-07 — Tổng hợp duyệt và triển khai màn 1
Tool Codex.
Asked for Dựng và kiểm tra màn Dịch vụ và chat theo bố cục nhật ký ảnh phim
đã duyệt qua các lượt 07–08/11, được tổng hợp trong `brief.md`.
Kept Hero đủ khung nhìn, video nền, slideshow Polaroid, ba thẻ gói, album
lật quanh gáy, chat thu gọn và lối chuyển vai ở chân trang. Giữ ảnh, nguồn
ảnh, video, poster và font cục bộ.
Changed Đưa bản duyệt vào `index.html`, `css/services.css` và
`js/services.js`, sửa đường dẫn tương đối và ghi chờ tích hợp vì chưa có
HTML của màn 2 và 3. Ở 360 px, chia đều hai cột khi còn hai bìa album.
Chrome đo mỗi bìa 136 × 175 px ở 360 × 751 và 360 × 900. Sau phản hồi về
chiều cao trang ảnh, giữ chỗ theo lượt cao nhất để cụm nút đứng yên khi
lật. Chrome đo nút video và hai nút lật chỉ 14 px trên màn nhỏ, nên bỏ
cỡ chữ ghi đè để dùng mức chung 16 px. Đo lại ở 360 × 751, chữ vừa nút,
vùng bấm đạt và trang không cuộn ngang.
Chrome kiểm tra qua `file://` ở 360, 768 và 1280 px với JavaScript bật
và tắt. Đã thử link xem gói, chat, album và các thao tác mô phỏng của bản
lúc đó. Khi tắt JavaScript, chín lượt ảnh và 27 link ảnh vẫn có sẵn.
Đã rà 118 đường dẫn và anchor, chạy `node --check` và `git diff --check`.
W3C Nu của bản lúc đó trả 0 lỗi và 0 cảnh báo. Đã lưu ba ảnh toàn trang
và báo cáo W3C. Zoom 200% và nghiệm thu liên trang **NOT RUN**.
Rejected Sổ ý tưởng, nhãn xem thử, dòng Mở album trên điện thoại và link
tư vấn dưới album Tốt nghiệp theo phản hồi khi duyệt. Dọn các bản xem
thử sau khi chuyển sang trang chính.


## 2026-11-08 — Rà checklist màn 1 và chuẩn bị tài nguyên PA02
Tool Codex.
Asked for Chỉnh khung chat, rà màn 1 theo mục Fix these, xóa ảnh trong archive
PA01 và đề xuất tên commit cho ảnh, video PA02.
Kept Hai tin nhắn mẫu ở cuối phần tư vấn, khung chat thu gọn ở 390 px trở xuống
và khung rộng 328 px trên mốc này. Tên commit đề xuất là
`chore(assets): add PA02 images and hero video`.
Changed Cân lại khoảng cách và vùng cuộn trong khung chat. Bản đầu vẫn cho bấm
Gửi mẫu. Khi đối chiếu brief, bài kiểm tra Chrome xác nhận nút còn hoạt động,
nên khóa ô nhập và nút gửi ngay trong HTML, kèm ghi chú PA#2. Kiểm tra lại
bằng Chrome và Playwright ở 360 px với JavaScript bật và tắt. Cả hai lần đều
thấy hội thoại, nút bị khóa và ghi chú. `node --check` đạt. W3C Nu cho bản
sau sửa **NOT RUN**. Xóa 49 tệp ảnh trong archive PA01 bằng PowerShell, rồi
kiểm tra thư mục còn một video MP4 và hai tệp Markdown.
Rejected Cách gửi tin mẫu bằng JavaScript vì mục Fix these yêu cầu nút gửi
bị vô hiệu hóa và có ghi chú nhìn thấy được.
