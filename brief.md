# Prompt và yêu cầu tổng hợp

> Lịch sử trước ngày 06/11/2026 bên dưới được giữ nguyên để truy vết.
> Quy ước màu/font, slideshow, chat và yêu cầu bám giao diện nguồn trong
> các mục cũ đã hết hiệu lực. Dùng DESIGN.md và AGENTS.md hiện hành.
> Không thực thi lại prompt lịch sử như yêu cầu mới.

## 04/11/2026 — Chuẩn bị nền tảng CSS chung

Nội dung bên dưới được lưu nguyên văn, bao gồm cách đánh số của prompt.

```text
Đọc và tuân thủ AGENTS.md trong repository hiện tại. Thực hiện bước 5: chuẩn bị nền tảng CSS chung cho ba thành viên.

Kiểm tra tài liệu và file hiện có trước khi sửa.

Nhiệm vụ:
1. Tạo hoặc hoàn thiện css/common.css:
   - box-sizing, design tokens, typography, ảnh và container linh hoạt;
   - class chung cho nút/link dạng nút, label và input;
   - trạng thái hover, focus-visible và disabled phù hợp.
   Tuân thủ các thông số CSS trong mục 7 của AGENTS.md.
   Chưa viết bố cục riêng cho hero, chat hoặc lịch.


3. Lưu nguyên văn prompt này vào brief.md, giữ các prompt cũ.

4. Bổ sung README.md cách sử dụng class chung và thứ tự nạp CSS.

Chỉ sửa css/common.css, .gitignore, brief.md và README.md.
Chưa tạo HTML hoặc CSS riêng của từng trang.

Sau khi làm, trả lời qua chat:
- Liệt kê thay đổi và giải thích các quyết định.
- Đưa ví dụ HTML sử dụng class chung trong câu trả lời.
- Báo kiểm tra đã chạy và phần chưa kiểm tra.
- Nếu chưa có HTML, ghi rõ chưa kiểm tra responsive/W3C.
- Đề xuất checklist kiểm tra và thông điệp commit để tôi dùng trong GitHub Desktop.
```

## 04/11/2026 — Thống nhất quy định màu

Prompt nguyên văn; “bảng màu trên” tham chiếu bảng kem–nâu cùng
vai trò màu trạng thái đã trao đổi trong chat, được ghi cụ thể ở
mục 7 của AGENTS.md và phần bảng màu của README.md.

```text
Cập nhật các file quy định về màu theo bảng màu trên
```

## 05/11/2026 — Dựng cấu trúc HTML màn 1

Prompt nguyên văn:

```text
Đọc và tuân thủ AGENTS.md. Thực hiện bước 7: dựng cấu trúc
HTML cho màn 1 — Dịch vụ và chat.

Trước khi sửa, đọc README.md, docs/pa1/PROPOSAL.md,
docs/pa1/LINK.md; xem ảnh chính màn 1 và các ảnh bổ sung trong
docs/pa1/reference/screen-1/. Kiểm tra assets/images/ hiện có.

Yêu cầu:
1. Tạo index.html ở gốc repository, đủ các phần của màn nguồn:
   header, hero, gói dịch vụ, gallery, quy trình, chat và footer.
   Đối chiếu tài liệu để xác định nội dung; nêu rõ nếu nguồn thiếu.

2. Giữ slideshow hero, dùng hero-01.avif đến hero-05.avif.
   Chuẩn bị cấu trúc HTML để triển khai bằng CSS thuần ở bước 8.
   Lượt này chưa cần hiệu ứng chuyển ảnh.

3. Dùng HTML semantic: doctype, lang="vi", UTF-8, viewport,
   một h1, heading đúng cấp, landmark phù hợp, label hiển thị
   cho input và alt phù hợp cho ảnh.

4. Nạp css/common.css và sử dụng các class chung trong README.
   Chưa tạo hoặc nạp css/services.css; chưa viết CSS inline,
   thẻ style hoặc JavaScript.

5. Thực hiện hành vi tĩnh theo mục Chuẩn bị màn 1 trong README:
   #packages, #chat, my-appointments.html và
   admin-scheduling.html. Ghi rõ chuyển sang góc nhìn Admin.
   Chat mẫu hiển thị sẵn; gửi tin nhắn thật chưa kết nối.

6. Dữ liệu viết trực tiếp trong HTML; có nội dung dài để kiểm tra
   xuống dòng. Giữ nội dung quan trọng của PA01.

7. Lưu nguyên văn prompt này vào cuối brief.md, giữ prompt cũ.

Chỉ tạo/sửa index.html và brief.md.
Không tạo trang của thành viên khác hoặc sửa CSS chung.

Sau khi làm, báo nội dung đã dựng, phần nguồn còn thiếu,
kiểm tra đã chạy và phần chưa kiểm tra.
Không tuyên bố đạt responsive hoặc W3C nếu chưa kiểm tra.
```

## 05/11/2026 — Hoàn thiện CSS riêng màn 1

Prompt nguyên văn:

```text
Đọc và tuân thủ AGENTS.md. Thực hiện bước 8: hoàn thiện CSS
riêng cho màn 1 — Dịch vụ và chat.

Trước khi sửa:
- Đọc index.html, css/common.css và README.md.
- Xem ảnh chính và ảnh bổ sung màn 1 trong docs/pa1/.
- Kiểm tra các class services-* và tài nguyên đang sử dụng.

Nhiệm vụ:
1. Tạo css/services.css và nạp sau common.css trong index.html.
   Viết CSS mobile first, dùng tokens và quy ước ở mục 7 AGENTS.md.

2. Hoàn thiện header, menu, avatar, hero, gói dịch vụ, gallery,
   quy trình, các phần giới thiệu, chat, footer và điều hướng demo.
   Bám ảnh nguồn, giữ đầy đủ nội dung HTML đã có.

3. Giữ slideshow hero với năm ảnh hiện có. Sử dụng radio :checked
   và CSS để chọn ảnh, không JavaScript.
   Có trạng thái ảnh đang chọn và focus rõ ràng.
   Không làm mất khả năng thao tác radio bằng bàn phím.
   Chưa thêm tự động chuyển ảnh; ưu tiên bộ chọn ảnh hoạt động tốt.

4. Ở màn nhỏ, chat nằm trong luồng trang và không che nội dung.
   Menu, nội dung chính và liên kết luôn sử dụng được khi tắt JS.
   Skip link cần hiện rõ khi được focus.

5. Kiểm tra bố cục tại 360, 768 và 1280 px.
   Không cuộn ngang toàn trang hoặc dùng overflow-x:hidden để che lỗi.
   Ảnh giữ tỉ lệ/cắt ảnh có chủ đích; tên dài xuống dòng.
   Chữ nội dung tối thiểu 16px, vùng bấm đứng riêng tối thiểu 44px.
   Kiểm tra tương phản chữ trên từng ảnh hero.

6. Chỉ sửa cấu trúc HTML tối thiểu nếu CSS thực sự cần;
   giữ heading, label, alt, nội dung và đích liên kết.
   Không sửa common.css hoặc trang của thành viên khác.

7. Lưu nguyên văn prompt này vào cuối brief.md, giữ prompt cũ.

Chỉ tạo/sửa css/services.css, index.html và brief.md.
Không thêm dependency hoặc JavaScript.

Sau khi làm:
- Giải thích các quyết định bố cục và slideshow.
- Báo kiểm tra đã chạy, kết quả và phần chưa kiểm tra.
- Nếu không mở được trình duyệt, ghi rõ chưa kiểm tra trực quan;
  không tuyên bố đạt responsive chỉ từ việc đọc CSS.
```

## 05/11/2026 — Khôi phục khung chat nổi có thể thu gọn

```text
Tôi muốn giữ phần chat như trong prototupe, hãy chỉnh sửa lại các file cần thiết
```

Các prompt màn Lịch chụp dưới đây được đối chiếu với chat “Dựng màn Lịch chụp của tôi”. Các yêu cầu cũ được ghi để truy vết. Quy ước hiện hành nằm trong AGENTS.md và DESIGN.md.

## 05/11/2026 — Dựng màn Lịch chụp ban đầu (prompt thực tế)

```text
Tôi là người 3, phụ trách màn Lịch chụp của tôi trong repo PA02 GradStudio.

Đọc AGENTS.md, README.md, css/common.css, phần Màn 3 trong docs/pa1/PROPOSAL.md và docs/pa1/LINK.md; xem docs/pa1/03-customer-appointment.png. Đọc rubric PA02 nếu đã được đính kèm. Kiểm tra HTML, CSS và assets thực tế trước khi sửa. Nếu file mới xuất hiện, tiếp tục trên bản hiện có, không ghi đè thay đổi của người khác.

Chỉ thực hiện màn 3. Được tạo/sửa my-appointments.html, css/my-appointments.css và tài nguyên mới riêng cho trang này trong assets/ nếu cần. Giữ nguyên css/common.css, AGENTS.md, README.md, brief.md, docs/pa1/ và các trang/CSS của người khác. Chưa tổng hợp PROTOTYPE.md, AI-LOG.md hoặc bảng tự chấm. Không tự commit, push, merge, đổi nhánh hoặc cấu hình Git.

HTML5 và CSS thuần, không dependency hoặc bước build. Không dùng JavaScript, script, onclick, backend, localStorage hay CSS framework. Nội dung mẫu viết trực tiếp trong HTML. Nạp css/common.css trước css/my-appointments.css. Class riêng bắt đầu bằng appointments-. Dùng token màu, font, khoảng cách hiện có; không chép lại bộ token hoặc tự đổi mã màu chung.

Dựng gần ảnh PA#1 về bố cục và trang trí, bằng phần tử HTML thật, không dùng ảnh chụp nguyên màn hình làm giao diện. Nội dung gồm:
1. Header GradStudio, Dịch vụ, Lịch chụp của tôi, avatar và tên Linh.
2. H1 Lịch chụp của tôi và mô tả.
3. Bộ lọc Tất cả 1 / Chờ cọc 1 / Đã đặt lịch 0 / Hoàn thành 0. Dùng radio có label hiển thị và CSS để lọc, vẫn dùng được bằng bàn phím. Tất cả và Chờ cọc hiện booking mẫu; hai mục còn lại hiện thông báo danh sách trống. Không gán ARIA tabs nếu không triển khai đầy đủ tương tác tabs.
4. Lịch tuần tháng 10/2026, tuần 43, các ngày 19–25 và chọn thứ Bảy 24.
5. Timeline 09:00 bị gạch vì makeup Mai đã bận; makeup với Mai 13:00–14:00, chụp với Tuấn 14:00–16:00 tại Phòng B. Có mặt sớm 10 phút trước makeup.
6. Booking GS-1024, Tốt nghiệp Premium, makeup và 2 giờ chụp, trạng thái Đã thống nhất lịch · Chờ cọc 30%. Tổng 1.800.000đ, cọc 540.000đ, còn lại 1.260.000đ thanh toán sau buổi chụp.
7. Mục Thanh toán cọc 30% dùng details/summary có kiểu nút để mở thông tin cọc minh họa ngay trong trang. Ghi rõ chưa kết nối thanh toán. Không có nút thành công giả, không thay trạng thái hoặc số lượng booking; summary dùng được bằng Enter/Space.
8. Thẻ studio và bản đồ minh họa dựng bằng HTML/CSS hoặc SVG cục bộ. Không thêm bản đồ nhúng cần mạng hoặc địa chỉ thực chưa được cung cấp. Xem đường đi chưa kết nối phải thể hiện trung thực.

Ảnh/avatar phải nằm trong repo. Nếu có avatar dùng chung phù hợp thì dùng lại. Nếu chưa có, lấy đúng nguồn Avatar Linh trong docs/pa1/IMAGE_SOURCES.md, lưu assets/images/appointments-linh-avatar.jpg; chỉ tham chiếu file cục bộ. Nếu không tải được, báo rõ; dùng tạm avatar chữ L và ghi nhận khác biệt, không tự nhận đã dùng đúng ảnh. Không tải font ngoài.

Responsive mobile first: 360 px một cột; 768 px bố cục đủ rộng để đọc; 1280 px hai cột, lịch/timeline trái, booking và studio phải. Dùng minmax(0, ...) hoặc min-width:0 ở vùng cần co. Không fixed width cho toàn trang, không overflow-x:hidden, không !important. Dùng spacing token; nội dung và tên dài được xuống dòng. Điều hướng demo không che nội dung trên điện thoại.

HTML có lang=vi, UTF-8, viewport; một h1; heading đúng cấp, landmark phù hợp, alt; radio có label hiển thị liên kết đúng. Nội dung và chữ trên nút từ 16px, tương phản tối thiểu 4.5:1, vùng bấm nút/link đứng riêng và label lọc tối thiểu 44px; focus bàn phím rõ.

Logo/Dịch vụ dùng href="index.html"; tự đọc xem file đích đã tồn tại chưa. Không tạo index.html hoặc admin-scheduling.html giả để làm link có vẻ hoàn thành. Nếu chưa có, ghi rõ cần kiểm tra lại sau tích hợp. Link nội trang phải có id đích thật.

Sau khi làm, trả lời: file đã đổi, cách mở my-appointments.html, cách dùng bộ lọc và thông tin cọc, khác biệt so với PA#1, kiểm tra thực sự đã chạy và chưa chạy. Nếu có công cụ trình duyệt, kiểm tra 360/768/1280 với JavaScript tắt. Không ghi PASS cho W3C hoặc kiểm tra trình duyệt khi chưa chạy. Không tự tạo screenshot hoặc log giả.
```

## 05/11/2026 — Rà font và luồng cọc màn Lịch chụp (prompt thực tế)

```text
Sửa và hoàn thiện màn 3 hiện có, không dựng lại từ đầu hoặc
thay bằng một giao diện khác.

Đọc:
- AGENTS.md và README.md;
- my-appointments.html;
- css/my-appointments.css;
- css/common.css;
- css/services.css, đặc biệt cách màn 1 xử lý font tiếng Việt;
- phần Màn 3 trong docs/pa1/LINK.md và PROPOSAL.md;
- ảnh docs/pa1/03-customer-appointment.png;
- ảnh lỗi tôi đính kèm.

Mục tiêu: giao diện bám PA#1, font tiếng Việt đúng, có đủ tương tác
mô phỏng của màn 3 để kiểm thử.

PHẠM VI
Được sửa my-appointments.html, css/my-appointments.css.
Có thể tạo js/my-appointments.js để điều khiển tương tác mô phỏng.
Dùng script thường có defer, không dùng module vì trang phải mở
trực tiếp bằng file://.

Giữ nguyên common.css, AGENTS.md, trang 1, trang 2 và tài liệu nguồn.
Không tự commit, push, merge hoặc đổi nhánh.

1. ĐIỀU TRA VÀ SỬA FONT

Không kết luận mọi lỗi chữ đều do thiếu font.

Kiểm tra:
- HTML có UTF-8 và lang="vi";
- nội dung tiếng Việt có bị sai ký tự, chèn khoảng trắng hoặc
  tách chữ/dấu qua nhiều span hay không;
- font-family thực tế và font fallback;
- letter-spacing, word-spacing, line-height;
- font-size, font-weight và CSS ghi đè.

Màn 1 đã ghi nhận Georgia bị trộn glyph fallback tiếng Việt.
Đối chiếu cách sửa trong css/services.css.
Nếu màn 3 gặp cùng nguyên nhân, ưu tiên Times New Roman cho
tiêu đề và giờ trong phạm vi appointments-, giữ font hệ thống
cho nội dung. Không đổi token font chung của cả nhóm.

Kiểm tra trực quan các chuỗi:
"Lịch chụp của tôi"
"Chụp ảnh tốt nghiệp"
"Tháng 10, 2026"
"Nguyễn Thùy Linh"
"Đã thống nhất lịch"
"13:00–14:00"

Chữ và dấu phải liền mạch, không bị tách, lệch hoặc cắt.
Không sửa bằng cách biến chữ thành ảnh.

2. HOÀN THIỆN GIAO DIỆN

Đối chiếu ảnh PA#1 và giữ đủ:
- header GradStudio, điều hướng, avatar và tên Linh;
- tiêu đề và mô tả;
- bộ lọc trạng thái;
- lịch tuần và timeline;
- thẻ booking;
- thông tin tiền;
- phần thanh toán;
- thẻ studio và bản đồ minh họa.

Kiểm tra toàn trang trước khi kết luận phần nào bị thiếu;
ảnh lỗi của tôi chỉ chụp một vị trí cuộn.

Tinh chỉnh:
- thứ bậc kích thước chữ, độ đậm và khoảng cách;
- đường viền thẻ nhẹ và đồng nhất;
- bộ lọc có trạng thái được chọn rõ ràng, không để tất cả mục
  giống nhau hoặc gạch chân như đang cùng được chọn;
- các dòng nhãn và giá trị trong booking căn chỉnh ổn định;
- trạng thái booking có kiểu badge gọn, xuống dòng đẹp khi hẹp;
- giữ bảng màu và spacing token của common.css.

Các dòng giải thích kỹ thuật như "Thông tin minh họa",
"chưa kết nối" không được rải thành các đoạn lớn ngoài bố cục.
Đưa thông báo mô phỏng ngắn gọn vào phần thanh toán phù hợp.
Không thay một chức năng bằng một đoạn văn mô tả rồi coi là xong.

3. KHÔI PHỤC ĐỦ LUỒNG MÔ PHỎNG THANH TOÁN

Toàn bộ nội dung chính phải được viết sẵn trong HTML.
JavaScript chỉ điều khiển tương tác và trạng thái của các phần
đã có; không dựng toàn trang bằng innerHTML, không điều hướng
bằng JavaScript, không gọi backend hoặc thanh toán thật.

Trạng thái ban đầu:
- một booking GS-1024;
- Chờ cọc 30%;
- Tất cả 1, Chờ cọc 1, Đã đặt lịch 0, Hoàn thành 0;
- tổng 1.800.000đ, cọc 540.000đ;
- còn lại 1.260.000đ thanh toán sau buổi chụp.

Khi bấm Thanh toán cọc 30%:
- mở hộp Mô phỏng thanh toán trên chính màn 3;
- hiển thị GS-1024, tên gói và khoản cọc 540.000đ;
- có hai lựa chọn Hủy và Thanh toán thành công;
- ghi rõ đây là mô phỏng, không phát sinh giao dịch thật.

Ưu tiên dialog HTML nguyên bản cho hộp thoại.
Có tên truy cập, focus hợp lý, dùng được bằng bàn phím;
đóng bằng Hủy hoặc Escape và trả focus về nút mở.

Nhánh Hủy:
- đóng hộp;
- booking và số lượng các bộ lọc không đổi;
- có thể mở lại để thử tiếp.

Nhánh Thanh toán thành công:
- đóng hộp;
- chuyển booking sang Đã đặt lịch trong demo;
- đánh dấu cọc 540.000đ đã thanh toán trong demo;
- Chờ cọc giảm về 0, Đã đặt lịch tăng lên 1;
- Tất cả vẫn là 1, Hoàn thành vẫn là 0;
- thay thao tác trả cọc bằng thông tin đã cọc và nhắc đến
  lúc 13:00 để makeup;
- giữ nguyên khoản còn lại 1.260.000đ;
- không tạo thêm booking và không cho trả cọc lặp lại.

Chỉ đổi trạng thái sau khi người xem chọn thành công.
Bấm mở hộp hoặc đóng hộp không được tự đánh dấu đã thanh toán.

4. BỘ LỌC VÀ ĐẶT LẠI DEMO

Bộ lọc phải hoạt động theo trạng thái hiện tại:
- Tất cả: hiện booking;
- Chờ cọc: hiện booking khi chưa cọc, trống sau khi đã cọc;
- Đã đặt lịch: trống trước cọc, hiện booking sau mô phỏng thành công;
- Hoàn thành: vẫn trống.

Mục trống hiện "Chưa có lịch chụp nào ở mục này."
Đổi bộ lọc không làm thay đổi trạng thái booking.

Đặt lại demo:
- đóng phần thanh toán nếu đang mở;
- khôi phục booking về Chờ cọc;
- khôi phục các số lượng ban đầu;
- chọn lại Tất cả;
- cho phép thử lại cả nhánh Hủy và Thành công.

Dữ liệu demo trong bộ nhớ là đủ, không cần lưu tài khoản,
localStorage hoặc đồng bộ với backend.

5. BẢN KHÔNG JAVASCRIPT VẪN PHẢI ĐẠT PA02

Khi tắt JavaScript và reload:
- toàn bộ thông tin lịch, timeline, booking, giá, cọc và studio
  vẫn hiện bằng HTML;
- các liên kết liên trang vẫn là href tương đối;
- bộ lọc HTML/CSS hiện có vẫn hoạt động nếu đã triển khai;
- phần thông tin cọc vẫn tiếp cận được bằng HTML nguyên bản;
- thao tác mô phỏng cần JavaScript phải có phương án thay thế
  hoặc trạng thái giải thích phù hợp, không để nút bấm im lặng;
- không để lớp phủ, dialog hoặc trạng thái loading che trang.

Đây là bổ sung tương tác tùy chọn; không để trang phụ thuộc
JavaScript mới có nội dung hoặc điều hướng.

6. DỮ LIỆU VÀ PHẠM VI NGHIỆP VỤ

Giữ:
- ngày 24/10/2026;
- makeup với Mai 13:00–14:00;
- chụp với Tuấn 14:00–16:00 tại Phòng B;
- có mặt sớm 10 phút trước makeup;
- gói Tốt nghiệp Premium.

Xem đường đi và menu tài khoản chưa có chức năng thật trong
PA#1 thì ghi nhận đúng phạm vi; không tự thêm địa chỉ, đăng nhập
hoặc nghiệp vụ mới để làm giao diện có vẻ nhiều chức năng hơn.

7. RESPONSIVE VÀ KIỂM TRA

Kiểm tra 360, 768, 1280px:
- không cuộn ngang, cắt chữ hoặc chồng thành phần;
- popup không vượt màn hình, nội dung dài cuộn được;
- vùng bấm tối thiểu 44px;
- chữ nội dung từ 16px, tương phản tối thiểu 4.5:1;
- focus rõ và không bị che;
- không dùng overflow-x:hidden hoặc !important để che lỗi.

Kiểm tra cả JavaScript bật và tắt.
Chạy các ca Hủy, Thành công, lọc và Đặt lại demo.
Kiểm tra HTML bằng W3C nếu có khả năng truy cập công cụ.

Sau khi sửa, báo:
- nguyên nhân font đã xác minh và cách sửa;
- file thay đổi;
- các tương tác đã hoàn thiện;
- bảng ca kiểm thử với kết quả thật;
- khác biệt với PA#1 và mục cần cập nhật trong PROTOTYPE.md.
Chưa chạy kiểm tra nào thì ghi NOT RUN.
```

## 05/11/2026 — Đổi hướng thiết kế màn Lịch chụp (prompt thực tế)

```text
Tôi đổi định hướng thiết kế màn 3. Dùng [$ui-ux-pro-max](C:\Users\tranl\\.codex\skills\ui-ux-pro-max\SKILL.md) \
\
Repo GradStudio ban đầu chỉ tham khảo CHỨC NĂNG và nghiệp vụ.\
Giao diện phải được thiết kế mới, không sao chép bố cục, màu sắc\
hoặc cách trang trí của bản mẫu.\
\
Đọc DESIGN.md mới ở gốc repo và triển khai theo đặc tả đó.\
Đọc AGENTS.md, README.md và code hiện có để giữ đúng yêu cầu kỹ thuật.\
Yêu cầu thiết kế mới này thay phần giữ giao diện cũ cho riêng màn 3.\
\
Viết lại hoàn toàn:\
\- my-appointments.html;\
\- css/my-appointments.css;\
\- js/my-appointments.js nếu cần cho tương tác;\
\- tài nguyên riêng cần thiết theo mục 12 của DESIGN.md.\
\
Dựng bố cục mới: hero kiểu nhật ký ảnh phim, bộ lọc và ngày,\
vé hẹn ngang, nhật ký buổi chụp, góc chuẩn bị, ảnh Polaroid và FAQ.\
Không chỉ đổi màu trên bố cục hiện tại.\
\
Hoàn thiện các tương tác I01–I09, đúng trạng thái và dữ liệu mẫu\
trong DESIGN.md. Dùng bảng nghiệm thu A01–A15 để kiểm tra.\
\
Giữ nội dung chính được viết sẵn bằng HTML. JavaScript chỉ nâng cấp\
tương tác; tắt JavaScript vẫn đọc đủ lịch, tiền, ảnh, thông tin cọc\
và sử dụng được điều hướng tương đối.\
\
Scope CSS và token trong appointments-page để không ảnh hưởng\
trang khác. Không sửa common.css, trang/CSS của người 1, người 2\
hoặc tự thay quy tắc toàn nhóm.\
\
Kiểm tra font tiếng Việt, responsive 360/768/1280, bàn phím,\
dialog, bộ lọc, Hủy/Thành công, in phiếu và Đặt lại demo.\
Kiểm tra cả khi JavaScript bật và tắt.\
\
Không tự commit, push, merge hoặc đổi nhánh.\
Báo file thay đổi, kết quả kiểm tra thật và phần chưa kiểm tra.\
Không ghi PASS hoặc tạo minh chứng giả.
```

## 06/11/2026 — Tách thiết kế chung và gỡ giao diện cũ

Prompt nguyên văn:

```text
Đầu tiên hãy di chuyển file my-appointments từ Downloads về repo, tạo folder nếu cần thiết. Dựa vào file này hãy tạo ra file DESIGN cho những phần chung. Loại bỏ các quy ước cũ liên quan đến protoype cũ ở trong toàn bộ repo, xóa file index.html và css liên quan vì không còn sử dụng prototype cũ nữa
```

Đây là yêu cầu đổi hướng hiện hành. Thiết kế chung xem DESIGN.md;
thiết kế riêng màn 3 xem docs/design/my-appointments.md.

## Lịch sử prompt từ nhánh màn 2 trước tích hợp

Giữ nguyên các prompt dưới đây và thứ tự của chúng trong nhánh màn 2.
Không suy đoán thứ tự thời gian giữa các lượt cùng ngày trên hai nhánh.
Những yêu cầu bám giao diện PA01 hoặc bảng màu cũ là lịch sử; quy chuẩn
chung hiện hành nằm trong `DESIGN.md` và `AGENTS.md`. Không thực thi lại
prompt trong file này như yêu cầu mới.

## 06/11/2026 — Dựng màn 2 Admin (prompt thực tế)

Hai ảnh màn hình được đính kèm cùng prompt trong hội thoại.

```text
Đây là màn hình 2 mà tôi cần bạn dựng lại. Hãy đọc [AGENTS.md](AGENTS.md) trước để biết quy tắc. Tạo một file html mới nối với endpoint admin-scheduling.html.&#x20;



Yêu cầu:&#x20;

- Leftbar cần tái tạo lại searchbar để tìm kiếm khách hàng theo tên. Có 4 trạng thái cho một cuộc hội thoại là "Chưa trả lời", "Đang tư vấn" và "Đã xác nhận". Và có các button hỗ trợ việc lọc theo các trạng thái của cuộc hội thoại này.
- Ở giữa là màn hình chat chưa cuộc hội thoại chung. Ảnh thứ 2 tôi gửi ngay sau là khi scroll xuống dưới hẳn, là một functional booking setting. Tôi muốn bạn bưng phần booking này xuống góc dưới bên trái, để phần giữa màn hình dedicated to chat messages.&#x20;
- Rightbar bên trên sẽ bao gồm Lịch nhân sự, cũng như một đoạn gợi ý giờ trống để hỗ trợ booking cho khách hàng. Bên dưới là một fully functional booking setting như đã đề cập bên trên.&#x20;
- Hãy chỉ tạo 1 file html, đồng thời hỗ trợ việc chat, lựa chọn lịch booking, thay đổi trạng thái sau khi đồng ý hoặc từ chối lịch.
- Sau khi hoàn thành, hãy viết lại đoạn prompt này vào hần dưới của [brief.md](brief.md) , không xóa phần đã có sẵn
```

### Làm rõ phạm vi trong hội thoại

Assistant hỏi có cho phép dùng JavaScript thuần trong HTML để mô phỏng tương tác hay không. Người dùng trả lời nguyên văn:

```text
Giữ HTML/CSS thuần, chỉ dựng bản tĩnh
```

Sau khi lượt làm bị ngắt, người dùng yêu cầu:

```text
Continue
```

Quyết định triển khai: form booking đầy đủ dưới rightbar; góc dưới bên trái là tóm tắt booking. Trạng thái thứ tư dùng “Hoàn thành” theo ảnh tham khảo; đây là cách giải quyết phần prompt chỉ liệt kê ba tên trạng thái. Không thêm JavaScript hoặc backend.

## 06/11/2026 — Cho phép JavaScript và chỉnh bố cục màn 2 (prompt thực tế)

```text
Cho phép javascript. Leftbar, màn hình giữa và rightbar sử dụng 3 scrollbar khác nhau. Thanh trạng thái hội thoại nằm trên cùng một dòng và sẽ có dropbox để chọn trạng thái khác. div chứa lịch đã thống nhất (bên leftbar) là không cần thiết, và div đó nên được coi là trạng thái khác của div booking mới (bên rightbar). Tăng phần không gian cho chat
```

Yêu cầu này thay lựa chọn giữ bản tĩnh ở lượt trước: cho phép JavaScript thuần để mô phỏng trong phiên xem, vẫn giữ nội dung và điều hướng dùng được khi JavaScript tắt. Không thêm backend, dependency hoặc framework.

## 06/11/2026 — Thu gọn hội thoại và chia đôi rightbar (prompt thực tế)

Ảnh mục hội thoại cũ được đính kèm trong hội thoại.

```text
Giảm padding ở một box chọn hội thoại. Hỗ trợ đổi sang các cuộc hội thoại khác nữa. Cụm div chứa hội thoại và phần lọc sẽ giữ cố định, không chạy theo scroll bar. Với một box chọn hội thoại:&#x20;

- Tên người dùng hiển thị ngay trên ngang hàng với top của avatar.
- Bên dưới chứa đoạn chat và thời gian cùng nằm trên một hàng, cắt bớt đoạn chat (để ...) để phù hợp với width của box, không bị xuống dòng.&#x20;
- Height của box fit với height của avatar, padding 1px.

Phần lịch chỉ hiển thị xem khoảng thời gian đó đã có booking hay chưa, bỏ luôn cột tài nguyên. Đồng thời thu nhỏ để upper half của right bar sẽ chứa lịch, còn lowerhalf sẽ chứa bảng booking setting. Bỏ gợi ý khung giờ chụp. Cố định upper half (không chạy theo scrollbar). Lowerhalf sài scrollbar của riêng nó
```

Khi assistant đang kiểm tra, padding được chỉnh trực tiếp từ 1px thành 10px. Assistant hỏi giá trị cần giữ; người dùng xác nhận nguyên văn:

```text
10px như chỉnh sửa trực tiếp hiện tại
```

## 06/11/2026 — Bỏ ba liên kết trên header (prompt thực tế)

```text
Remove the three choices on the top of the page ("Hội thoại", "Booking", "Lịch booking")
```

## 06/11/2026 — Kiểm tra và resolve conflict với main (prompt thực tế)

```text
Check conflict giữa các file docs khi merge với main
```

Sau khi xem kết quả kiểm tra, người dùng yêu cầu:

```text
Hãy resolve theo gợi ý
```

Người dùng làm rõ phạm vi:

```text
Nó chỉ bị xung đợt docs thôi đúng chứ
```

Phạm vi thực hiện: resolve nội dung tài liệu và vị trí minh chứng lịch sử;
giữ HTML hiện có. Các thay đổi CSS chung và việc gỡ màn 1 cũ được nhận từ
main, không tự viết lại giao diện hoặc khôi phục file đã bị main gỡ.

## 06/11/2026 — Bổ sung góc studio (prompt thực tế)

```text
Đọc DESIGN.md phiên bản 1.1, đặc biệt mục 3.1.

Bổ sung góc studio tương tác vào màn 3:
- dây treo ảnh và kẹp gỗ;
- Polaroid đung đưa, kéo/thả, rơi xuống bàn và treo lại;
- máy ảnh hoài niệm có nút chụp, ống kính và khe nhả ảnh;
- nhấn chụp tạo hiệu ứng Polaroid trượt ra từ ảnh minh họa cục bộ;
- đạo cụ softbox/cuộn phim và điều khiển sắp lại góc studio.

Triển khai I10–I14 và kiểm tra A16–A21.
Dựng thành phần HTML/CSS/SVG có tương tác thật,
không thay bằng emoji hoặc ảnh nền giả.

Giữ các chức năng lịch, thanh toán và bộ lọc đã làm.
Kiểm tra bản hiện có trước khi sửa; không viết đè phần đã đúng.
```

## 06/11/2026 — Đặt điều khiển trực tiếp trên đạo cụ (prompt thực tế)

```text
Đọc DESIGN.md bản 1.2 và cập nhật riêng góc studio.

Bỏ các nút chữ điều khiển hiệu ứng. Đồ vật tự là mục tiêu bấm:
ảnh treo → rơi/treo lại; máy ảnh → nhả Polaroid;
ảnh vừa nhả → lật; cuộn phim → sắp lại cảnh.

Không tự chạy hiệu ứng lúc đầu hoặc hiển thị hướng dẫn bật mí.
Giữ khả năng dùng bàn phím và tên truy cập của đồ vật.
Giữ nguyên phần lịch, bộ lọc và thanh toán đã làm.
```

## 06/11/2026 — Tạo và treo ảnh lưu niệm (prompt thực tế)

```text
Hay cho cái máy ảnh chụp hình rồi sau đó mới treo lên được nếu có quá nhiều ảnh thì bây giờ tạo một cái khung chứa ảnh ở dưới chỉ trewo tối đa được ba ảnh à m,à các ảnh vẫn tương tác đâye nhau đồ được nha thêm trọng lực cho các ảnh để không nếu không treo thì nó sẽ rơi xuống đất
```

## 07/11/2026 — Rà thao tác giữ góc ảnh (prompt thực tế)

```text
Mạc dù tôi nắm ở góc nhưng ảnh vẫn cứ nằm ngang nè
```

## 07–08/11/2026 — Chốt màn Dịch vụ và tư vấn

```text
Dựng màn 1 GradStudio theo phong cách nhật ký ảnh phim, dùng DESIGN.md chung
và đặc tả docs/design/services.md. Chốt bố cục đã duyệt thành index.html,
css/services.css và js/services.js. Dùng đường dẫn tương đối, mở trực tiếp
từ thư mục. Dọn các bản preview sau khi xác nhận trang chính chạy đúng.

- Nạp Merriweather và Be Vietnam Pro từ font chung kèm giấy phép OFL.
- Đặt thanh điều hướng và hero trong khung mở đầu cao ít nhất một viewport.
  Dùng video ảnh GradStudio cục bộ với poster, nút tạm dừng và khung tĩnh
  khi tắt JS hoặc giảm chuyển động. Chỉ phát trong vùng nhìn thấy.
- Giữ thứ tự ảnh xem nhanh, ba gói chụp, album đầy đủ, rồi tư vấn. Trên
  desktop đặt slideshow bên cạnh các thẻ gói. Ba thẻ cùng kích cỡ và giữ
  nội dung, giá tham khảo đã chốt. Nút Xem gói chụp trên điện thoại đến
  thẳng ba thẻ gói. Căn giữa tiêu đề gói và thư viện, cỡ chữ 36–64 px.
- Slideshow đổi cặp Polaroid theo chủ đề, có thumbnail và nút trước/sau.
  Ảnh nhỏ lật để xem gợi ý phong cách và có nút tư vấn theo đúng chủ đề.
  Nút Xem bộ ảnh mở album tương ứng. Bỏ phần sổ ý tưởng đã thử.
- Kệ có ba album bìa cứng. Giữ thứ tự khi chọn, đóng hoặc đổi album, mở
  tại chỗ và giữ lượt đang xem nếu chọn lại cùng album. Lượt đầu mở bìa
  180° quanh gáy, trang ảnh đầu nằm yên. Khi lật tiếp, Trang sau từ phải
  sang trái và Trang trước chiều ngược lại. Cụm điều khiển ở giữa dưới
  sách, chừa chỗ cho chat trên điện thoại. Giữ hai trang cân nhau và
  tỉ lệ ảnh. Xem ảnh lớn, đóng bằng Escape và trả focus về ảnh.
  Trên điện thoại, hai bìa còn lại chia đều hai cột khi mở một album.
  Ẩn dòng Mở album trên bìa và giữ toàn bộ bìa bấm được.
  Giữ chiều cao khung sách và vị trí cụm điều khiển ổn định khi lật trang.
- Đặt Chat với studio màu xanh rêu, in đậm trong thanh điều hướng. Khi
  thu gọn, nút chat nổi chỉ hiện biểu tượng. Các CTA mở cùng hội thoại
  của Linh, giữ ngữ cảnh gói và tin nhắn thử trong lần xem trang.
- Giữ bố cục gọn theo các phản hồi: bỏ nhãn và ghi chú thừa, bỏ link
  tư vấn dưới album Tốt nghiệp, đưa khối tiếp tục câu chuyện xuống dưới
  điều hướng ở chân trang. Màn Admin và Lịch chụp đang chờ tích hợp.
- Giữ ảnh, video, poster, nguồn ảnh và font đã thêm. Kiểm tra bản chính
  ở 360, 768 và 1280 px với JS bật/tắt, lưu minh chứng của index.html.
```


## 08/11/2026 — Rà checklist màn 1 và chuẩn bị tài nguyên PA02


**Prompt nguyên văn** theo thứ tự gửi. Hai lượt “giải thích kĩ hơn vấn đề”
và “thực hiện yêu cầu này” đều tham chiếu phần gửi tin trong khung chat.
Yêu cầu khóa nút gửi thay thế phần gửi tin nhắn thử trong mục 07–08/11.

```text
đồng ý, như vậy cho 2 tin nhắn mẫu ở cuối trang này đi

trên 390px tôi muốn kích thước hộp giảm lại so với ban đầu.

scale lại các thành phần thuộc khung chat

kiểm tra lại checklist những phần liên quan màn 1 đã hoàn thành chưa

giải thích kĩ hơn vấn đề

brief yêu cầu thao tác gửi tin ở PA#2 phải được vô hiệu hóa.

thực hiện yêu cầu này

xóa hết mấy ảnh trong archive PA01

```

## 11/11/2026 — Rà rubric và sửa bản tích hợp

Prompt nguyên văn theo thứ tự gửi.

```text
Chấm điểm thử và đưa ra màn hình chỗ nào trừ nêu rõ lí do trừ điểm
```

```text
Tự động fix tất cả để điểm trên 95
```

Tiêu chí nghiệm thu của rubric cho lượt này gồm mở file:// ở 360, 768, 1280 px với JavaScript tắt, dùng Accessibility pane để kiểm tra ngữ nghĩa và upload HTML lên W3C Nu. Dữ liệu mẫu và điều hướng tương đối theo AGENTS.md. Điểm chính thức do nhóm xác nhận.

## 11/11/2026 — Sắp xếp nhật ký AI theo thành viên

Prompt nguyên văn.

```text
[https://github.com/thVinhne/pa02-responsive-prototype.git](https://github.com/thVinhne/pa02-responsive-prototype.git) Đọc lại  Git tôi cần chia lại AI-LOG theo của từng người riêng ra
```

Người dùng làm rõ bố cục nhật ký.

```text
Ý là viết cả 3 vào AI-LOG.md mà chia ra thành nhiều mục á chứ không phải tách ra thành ba file md
```

Người dùng yêu cầu rà định dạng sau khi xem bản hiển thị.

```text
Lỗi định dạnh nè mấy cái này phải cùng cấp chứ ở dưới còn có không xuống hàng check lại AI-LOG sửa tất cả lỗi định dạng
```

```text
: đừng dùng - dài
```

## 11/11/2026 — Sửa các điểm phát hiện trước khi nộp

Prompt nguyên văn sau lượt kiểm bản chuẩn bị nộp.

```text
Sửa lại lên 100/100
```

Lượt sửa tập trung vào header Dịch vụ ở 768 px, focus bàn phím ở
Lịch chụp, ảnh nghiệm thu và báo cáo tự chấm của nhóm.

## 11/11/2026 — Sửa liên kết và bàn giao ZIP

Prompt nguyên văn sau khi kiểm tra nội dung ZIP.

```text
2. **Hai link tài liệu bị hỏng.** `README.md` dòng 35 và `AI-LOG.md` dòng 232 cùng trỏ tới `docs/history/pre-redesign/README.md`, tệp đã bị bỏ khỏi ZIP. Sửa link tới vị trí thật của minh chứng hoặc bỏ link nếu đã dọn thư mục cũ. README.md · AI-LOG.md
3. **Bản cuối chưa được commit.** ZIP đã chứa code, ảnh mới và báo cáo, còn `HEAD` vẫn ở `7e9a8ec`. `SELF_ASSESSMENT_REPORT.md` cũng chưa được Git theo dõi. Commit bản cuối rồi nén lại để lịch sử Git khớp với bài nộp.
```
