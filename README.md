# PA02 GradStudio

Bản mẫu HTML/CSS cho ba bước của một cuộc hẹn chụp ảnh. Linh xem dịch vụ,
studio tư vấn và tạo booking mẫu, rồi Linh xem lịch đã thống nhất và
thử cọc mô phỏng.

## Mở bản mẫu

Mở [index.html](index.html) trực tiếp từ thư mục đã giải nén. Cuối trang,
chọn **Nhân viên studio: Mở hội thoại** để vào [Admin](admin-scheduling.html).
Từ chân trang Admin, chọn **Màn 3 · Lịch chụp của khách** để xem
[Lịch chụp](my-appointments.html). Link Dịch vụ ở màn Lịch chụp đưa về
trang đầu. Bản mẫu dùng tài nguyên cục bộ và mở được qua `file://`.

Nội dung chính và các liên kết chạy với JavaScript tắt. Bật JavaScript để
thử chuyển album, tìm khách, tạo booking mẫu, thanh toán mô phỏng và góc
studio. Dữ liệu demo được giữ riêng trong từng trang.

## Thành viên và phân công

| MSSV | Họ và tên | Công việc |
| --- | --- | --- |
| 24120157 | Lê Thái Vinh | Dịch vụ và chat, CSS chung, quy tắc, brief và tích hợp |
| 24120394 | Nguyễn Đặng Khôi Nguyên | Admin tư vấn và xử lý lịch |
| 24120136 | Trần Lê Xuân Tân | Lịch chụp, tài liệu prototype, AI log và báo cáo tự chấm |

## Tài liệu và minh chứng

- [PROTOTYPE.md](PROTOTYPE.md) ghi luồng ba màn, ảnh đối chiếu và phạm vi mô phỏng.
- [AGENTS.md](AGENTS.md) ghi quy tắc dự án. [DESIGN.md](DESIGN.md) ghi token,
  typography và thành phần dùng chung.
- Đặc tả riêng cho [Dịch vụ](docs/design/services.md),
  [Admin](docs/design/admin-scheduling.md) và [Lịch chụp](docs/design/my-appointments.md).
- [docs/pa1](docs/pa1/README.md) giữ bộ tham chiếu GradStudio, có ghi tác giả
  nguồn. Minh chứng của giao diện trước đổi hướng nằm trong lịch sử Git.
- [brief.md](brief.md) lưu prompt đã dùng. [AI-LOG.md](AI-LOG.md) ghi nhật
  ký theo từng thành viên và các lượt tích hợp chung.
- [screenshots](screenshots/) giữ chín ảnh toàn trang khi tắt JavaScript.
  [checks](checks/) giữ kết quả W3C Nu theo tệp HTML và SHA-256 của dữ liệu
  đã gửi.

## Kiểm tra trước khi nộp

Tắt JavaScript, tải lại bằng `file://` và thử 360, 768, 1280 px. Dùng
Accessibility pane để rà landmark, heading, label và tên điều khiển.
Thử link và bàn phím, xem chữ dài, ảnh, zoom 200%, reduced motion và
tương phản trên nền thực. Khi HTML thay đổi, upload lại tệp đó lên W3C Nu
và cập nhật minh chứng theo bản cuối.

HTML5 và CSS thuần, với script tương đối có `defer` để nâng cấp tương
tác. Ba trang nạp `css/common.css` trước CSS riêng. Font và giấy phép OFL
nằm trong `assets/fonts/shared/`.
