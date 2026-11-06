# PA02 GradStudio

Ba màn hình HTML/CSS của hệ thống studio ảnh: Dịch vụ và chat của khách,
Admin tư vấn và xử lý lịch, Lịch chụp của khách.

Nhóm tự thiết kế theo hướng nhật ký ảnh phim hoài niệm nhẹ. Tài liệu PA01
chỉ dùng cho nghiệp vụ, vai trò và tài nguyên có ghi nguồn.

## Thành viên và phân công

| MSSV | Họ và tên | Công việc |
| --- | --- | --- |
| 24120157 | Lê Thái Vinh | Dịch vụ và chat; CSS chung; quy tắc; tổng hợp brief; tích hợp |
| 24120394 | Nguyễn Đặng Khôi Nguyên | Admin tư vấn và xử lý lịch |
| 24120136 | Trần Lê Xuân Tân | Lịch chụp; tổng hợp prototype, AI log và tự chấm |

## Đọc tài liệu theo phạm vi

- [AGENTS.md](AGENTS.md): kỹ thuật, phân công và dữ liệu xuyên suốt.
- [DESIGN.md](DESIGN.md): thiết kế chung, tokens, font và thành phần tái sử dụng.
- [Thiết kế màn 3](docs/design/my-appointments.md): bố cục, trạng thái và tương tác riêng.
- [Nghiệp vụ nguồn](docs/pa1/README.md): chức năng và tác giả nguồn;
  không dùng giao diện trong đó làm chuẩn để sao chép.
- [brief.md](brief.md), [AI-LOG.md](AI-LOG.md): prompt và lịch sử làm việc.
- [Minh chứng trước đổi hướng](docs/history/pre-redesign/README.md): chỉ để tra cứu lịch sử.

## Trạng thái ngày 06/11/2026

- Đã nhập `my-appointments.md` từ Downloads vào `docs/design/` và điều chỉnh
  tham chiếu để phân biệt đặc tả màn 3 với `DESIGN.md` chung.
- Đã thay nền tảng màu, typography dự kiến, spacing và control trong
  `css/common.css` theo thiết kế chung.
- Đã gỡ `index.html` và `css/services.css` của giao diện trước đổi hướng.
- Đã tích hợp `admin-scheduling.html` từ nhánh màn 2. File mở trực tiếp được,
  có CSS/JavaScript riêng nhúng trong HTML theo yêu cầu trước đó. Đây là bản
  màn 2 đã có trước khi đổi thiết kế chung, chưa nghiệm thu theo `DESIGN.md`.
- Màn dịch vụ mới và màn lịch chụp chưa triển khai. Không khôi phục
  `index.html` hoặc CSS dịch vụ cũ khi ghép nhánh.
- Font Merriweather và Be Vietnam Pro chưa nhập; CSS có fallback,
  chưa khai báo `@font-face` tới file không tồn tại.
- Minh chứng cũ đã chuyển sang khu lịch sử, không dùng cho giao diện mới.

Để xem bản màn 2 hiện có, mở trực tiếp `admin-scheduling.html`.
Các liên kết từ màn này tới `index.html` và `my-appointments.html` hiện
chưa có file đích; cần xử lý ở lượt tích hợp giao diện, không coi là luồng
ba màn đã hoàn thiện. CSS chung đã theo main mới; HTML màn 2 chưa được sửa
để đồng bộ font, kiểu trình bày và các quy tắc mới.

Tên file tích hợp vẫn dự kiến là `index.html`, `admin-scheduling.html`,
`my-appointments.html`, cùng CSS riêng tương ứng. Đây là tên dự kiến,
không phải danh sách file hiện có.

## Nền tảng dùng chung

Nạp `css/common.css` trước CSS riêng khi tạo trang. Các class hiện có:
`.container`, `.button`, `.button--secondary`, `.form-label`, `.form-control`
và `.text-muted`. Mọi thông số thiết kế lưu tại [DESIGN.md](DESIGN.md);
không duy trì bảng màu/font/kích thước thứ hai ở đây.

Mỗi thành viên tạo đặc tả riêng trong `docs/design/`, dùng chung nhận diện
và tự thiết kế bố cục, component đặc thù. Dây ảnh, máy ảnh và vé hẹn là phần
riêng màn lịch chụp. Header/footer của màn Admin đã có markup riêng;
chưa xác nhận đáp ứng toàn bộ quy ước thiết kế mới.

## Công nghệ và kiểm tra

HTML5 và CSS thuần, không framework/build/backend. Nội dung có sẵn trong
HTML, link và tài nguyên tương đối. JS tùy chọn chỉ nâng cấp tương tác;
khi tắt JS vẫn đọc nội dung chính và dùng điều hướng.

Khi có trang mới: mở trực tiếp từ thư mục, kiểm tra 360/768/1280 px,
zoom 200%, bàn phím, reduced motion, font tiếng Việt, tương phản và W3C
Nu checker (0 errors). Lưu minh chứng mới trong `screenshots/` và `checks/`.
Kiểm tra trực quan, responsive, tương phản và W3C của màn Admin sau khi
ghép CSS chung mới hiện là **NOT RUN**. Các kết quả màn 2 trước merge đã
lưu trong `docs/history/pre-redesign/`, không dùng để nghiệm thu bản ghép.
