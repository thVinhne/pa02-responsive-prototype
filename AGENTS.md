# Quy tắc làm việc cho PA02 GradStudio

## 1. Mục tiêu và phạm vi

Xây dựng ba màn hình GradStudio thành ba trang HTML/CSS tĩnh:

1. index.html — Dịch vụ và chat của khách.
2. admin-scheduling.html — Admin tư vấn và xử lý lịch.
3. my-appointments.html — Lịch chụp của khách.

Ba trang phải mở trực tiếp từ thư mục, liên kết với nhau bằng đường
dẫn tương đối và sử dụng được khi JavaScript bị tắt.


## 2. Tài liệu cần đọc trước khi làm

- Đọc AGENTS.md trước khi thực hiện nhiệm vụ.
- Đọc rubric PA02 do người dùng cung cấp.
- Đọc tài liệu và xem ảnh liên quan trong docs/pa1/.
- Đọc PROTOTYPE.md nếu file đã tồn tại.
- Kiểm tra HTML/CSS hiện có trước khi tạo hoặc sửa thành phần.

Nguồn ban đầu chỉ dùng để tham khảo và sao chép tài nguyên.
HTML/CSS bàn giao không được tham chiếu file ngoài repository.

Ảnh chính màn 2 chưa thể hiện hết form booking. Khi làm hoặc kiểm tra
màn 2, phải xem thêm hai ảnh bổ sung trong thư mục reference của
tài liệu nguồn.

Nếu nguồn chưa đủ hoặc có mâu thuẫn, nêu rõ phần thiếu. Không trình
bày nội dung tự suy đoán như thông tin đã được xác nhận.

## 3. Công nghệ

- Dùng HTML5 và CSS thuần.
- Dữ liệu mẫu phải được viết trực tiếp trong HTML.
- Không dùng React, Vue hoặc JavaScript framework.
- Không thêm JavaScript để dựng nội dung hoặc điều hướng.
- Không thêm dependency, package manager hoặc bước build.
- Lưu ảnh, icon và font sử dụng thực tế trong repository.
- Nếu cần đổi công nghệ, nêu lý do để nhóm thống nhất trước.

Không xây backend, đăng nhập, chat, kiểm tra tài nguyên hoặc thanh
toán thật trong milestone này.

## 4. Cấu trúc và phạm vi sửa file

Cấu trúc chính:

    index.html
    admin-scheduling.html
    my-appointments.html
    css/
      common.css
      services.css
      admin-scheduling.css
      my-appointments.css
    assets/
      images/
    docs/
      pa1/
    screenshots/
    checks/
    AGENTS.md
    brief.md
    PROTOTYPE.md
    AI-LOG.md
    SELF_ASSESSMENT_REPORT.md
    README.md

Chỉ tạo assets/fonts/ hoặc assets/icons/ khi thực sự sử dụng.

Phân công:

- Người 1: index.html, css/services.css, css/common.css, AGENTS.md,
  tổng hợp brief.md và tích hợp.
- Người 2: admin-scheduling.html, css/admin-scheduling.css.
- Người 3: my-appointments.html, css/my-appointments.css;
  tổng hợp PROTOTYPE.md, AI-LOG.md và báo cáo tự chấm.
- Mỗi người tự cung cấp prompt, log và minh chứng trang mình.

Chỉ sửa các file cần thiết cho nhiệm vụ được giao. Không viết lại
trang của thành viên khác hoặc sửa ngoài phạm vi để tiện triển khai.

Khi thay đổi CSS chung, giải thích tác động và kiểm tra lại các
trang sử dụng thành phần đó.

Không xóa hoặc ghi đè thay đổi hiện có không thuộc nhiệm vụ.

## 5. Dữ liệu và luồng thống nhất

Câu chuyện mẫu:

- Khách Linh hỏi lịch 09:00 ngày 24/10/2026.
- Mai đã bận 08:00–12:00.
- Hai bên thống nhất makeup 13:00–14:00 với Mai.
- Chụp 14:00–16:00 với Tuấn, tại Phòng B.
- Booking: GS-1024.
- Gói: Tốt nghiệp Premium.
- Tổng giá: 1.800.000đ.
- Cọc 30%: 540.000đ.
- Còn lại: 1.260.000đ, thanh toán sau buổi chụp.

13:00 là giờ makeup; 14:00 là giờ bắt đầu chụp.

Màn 2 có thể hiển thị sẵn hội thoại đã chốt giờ và form đã điền.
Tạo booking dẫn sang màn 3 ở trạng thái Chờ cọc.

Ghi thay đổi so với tương tác PA01 vào PROTOTYPE.md.

Màn 2 là góc nhìn Admin. Liên kết demo chuyển sang màn này phải ghi
rõ chuyển vai trò; không biến nút gửi chat của khách thành nút vào
trang quản trị.

## 6. HTML và điều hướng

- Có doctype, lang="vi", UTF-8 và viewport phù hợp.
- Mỗi trang có một h1; heading theo thứ tự hợp lý, không nhảy cấp.
- Dùng header, nav, main, section và footer đúng ý nghĩa.
- Dùng a href cho điều hướng.
- Dùng button cho hành động; khai báo type phù hợp.
- Mỗi input có label hiển thị và liên kết đúng với trường nhập.
- Placeholder không thay thế label.
- Mọi img có alt phù hợp; ảnh trang trí dùng alt rỗng.
- Không dùng div hoặc span để giả làm nút.

Liên kết liên trang dùng tên file tương đối:
admin-scheduling.html hoặc my-appointments.html.

Không dùng đường dẫn ổ đĩa, đường dẫn bắt đầu bằng /, hoặc chỉ tên
thư mục cho các trang trong luồng chính.

Liên kết trong trang như #packages hoặc #chat phải trỏ tới id tồn tại.
Không dùng href="#" làm đích giả cho luồng chính.

Không để nội dung hoặc menu cần thiết bị ẩn khi JavaScript tắt.
Các chức năng chưa kết nối phải được ghi rõ trong PROTOTYPE.md;
không tuyên bố thao tác đã thành công khi chưa có xử lý.

## 7. CSS và responsive

- Viết CSS mobile first.
- Kiểm tra từng trang ở 360, 768 và 1280 px.
- Không cuộn ngang toàn trang, cắt chữ, tràn ảnh hoặc chồng nội dung.
- Không dùng overflow-x: hidden để che lỗi bố cục.
- Bảng rộng có thể cuộn trong wrapper riêng.
- Không dùng chiều rộng cố định cho toàn bộ trang.
- Ảnh phải co theo vùng chứa; giữ tỉ lệ khi phù hợp.
- Tên và tiêu đề dài phải xuống dòng.
- Không dùng !important trong CSS tự viết.

Nạp css/common.css trước CSS riêng của trang.

Dùng CSS custom properties cho màu, font và spacing dùng chung.
Thang khoảng cách khởi đầu: 4, 8, 12, 16, 24, 32, 48, 64 px.

Breakpoint khởi đầu: 48rem và 64rem; điều chỉnh theo nội dung.
Ba độ rộng kiểm tra không nhất thiết là ba breakpoint.

- Chữ nội dung tối thiểu 16 px.
- Tương phản chữ nội dung và chữ trên nút tối thiểu 4.5:1.
- Ở 360 px, nút và link đứng riêng cao tối thiểu 44 px.
- Có trạng thái focus nhìn thấy khi dùng bàn phím.
- Mỗi trang có thứ bậc thị giác và nội dung chính rõ ràng.

Dùng class chung cho thành phần dùng lại; class riêng có tiền tố
services-, admin- hoặc appointments- để hạn chế ảnh hưởng chéo.

## 8. Làm việc với assistant và ghi nhận

- Chia công việc thành nhiệm vụ có phạm vi rõ ràng.
- Đọc kết quả và diff trước khi chấp nhận.
- Giữ prompt nguyên văn trong brief.md, theo thứ tự sử dụng.
- Phân biệt prompt mẫu với prompt thực sự đã gửi.
- Ghi AI log theo từng trang hoặc nhiệm vụ.
- Ghi công cụ, yêu cầu, thay đổi, phần từ chối và cách kiểm tra.
- Khi phát hiện lỗi, ghi tình huống tái hiện, kiểm tra phát hiện lỗi
  và yêu cầu sửa đã gửi.
- Không tạo lỗi giả, log giả, ảnh giả hoặc kết quả kiểm tra giả.
- Nếu chưa chạy kiểm tra, ghi rõ chưa chạy.
- Không tự chấm điểm thay nhóm khi chưa được yêu cầu.

## 9. Kiểm tra và minh chứng

Trước khi báo hoàn thành:

1. Mở HTML trực tiếp từ thư mục.
2. Tắt JavaScript và reload.
3. Kiểm tra cả ba độ rộng yêu cầu.
4. Thử các liên kết và form action thuộc luồng chính.
5. Kiểm tra nội dung dài, ảnh, kích thước nút và tương phản.
6. Kiểm tra landmark, heading, label, alt và thao tác bàn phím.
7. Upload từng HTML lên W3C Nu checker; yêu cầu 0 errors.
   Warnings được phép nhưng cần đọc để biết ý nghĩa.
8. Kiểm tra lại sau tích hợp hoặc sau khi sửa CSS chung.

Minh chứng cuối:

- screenshots/<page>-360.png
- screenshots/<page>-768.png
- screenshots/<page>-1280.png
- checks/validator-<page>.png hoặc .txt

<page> là tên file HTML bỏ phần .html.
Ảnh responsive phải là ảnh toàn trang, chụp khi JavaScript tắt.

Minh chứng phải khớp bản cuối. Sửa HTML thì kiểm tra W3C lại;
sửa giao diện thì chụp lại các ảnh bị ảnh hưởng.

Báo cáo kết quả phải phân biệt rõ đã kiểm tra, chưa kiểm tra và
vấn đề còn tồn tại.

## 10. Git và bàn giao

Nhóm thao tác Git bằng GitHub Desktop.

Assistant không tự commit, push, merge, đổi nhánh hoặc sửa cấu hình
Git khi người dùng chưa yêu cầu.

Giữ nguyên dữ liệu .git của repo PA02.

Lịch sử công việc cần thể hiện:
- Quy tắc dự án trước khi triển khai.
- Công việc của từng trang.
- Lượt chỉnh responsive.
- Thông điệp commit mô tả thay đổi cụ thể.

Không đưa file tạm hoặc node_modules vào bài nộp.
Không bỏ qua HTML, CSS, assets, tài liệu và minh chứng cần nộp.
