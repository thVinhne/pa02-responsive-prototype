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
- [Thiết kế màn 1](docs/design/services.md): bố cục và hành vi đã chốt.
- [Thiết kế màn 3](docs/design/my-appointments.md): bố cục, trạng thái và tương tác riêng.
- [Nghiệp vụ nguồn](docs/pa1/README.md): chức năng và tác giả nguồn;
  không dùng giao diện trong đó làm chuẩn để sao chép.
- [brief.md](brief.md), [AI-LOG.md](AI-LOG.md): prompt và lịch sử làm việc.
- [Minh chứng trước đổi hướng](docs/history/pre-redesign/README.md): chỉ để tra cứu lịch sử.

## Trạng thái hiện tại

- Đã nhập `my-appointments.md` từ Downloads vào `docs/design/` và điều chỉnh
  tham chiếu để phân biệt đặc tả màn 3 với `DESIGN.md` chung.
- Đã thay nền tảng màu, typography dự kiến, spacing và control trong
  `css/common.css` theo thiết kế chung.
- Màn 1 đã chốt và triển khai. Mở trực tiếp [index.html](index.html) để xem
  dịch vụ, album và hội thoại mẫu. Trang dùng `css/services.css` và
  `js/services.js`. Bản mới thay cho giao diện cũ đã gỡ trong lần đổi thiết kế.
- Màn 2 có bản Admin tại [admin-scheduling.html](admin-scheduling.html) từ
  nhánh `prototype/screen2`. Trang mở trực tiếp, có CSS và JavaScript nhúng
  trong HTML. Bản này được dựng trước khi đổi thiết kế chung và chưa được
  nghiệm thu theo `DESIGN.md`.
- Màn 3 có đặc tả riêng. Tệp `my-appointments.html` chưa có trên hai nhánh
  đang ghép.
- Ngày 07/11/2026, đã nhập Merriweather và Be Vietnam Pro kèm giấy phép
  OFL vào `assets/fonts/shared/` và khai báo font trong `css/common.css`.
- Minh chứng cũ đã chuyển sang khu lịch sử, không dùng cho giao diện mới.

Cần kiểm tra lại các liên kết từ màn Admin đến màn Dịch vụ và màn Lịch chụp
khi tích hợp luồng ba màn.

## Nền tảng dùng chung

Nạp `css/common.css` trước CSS riêng khi tạo trang. Các class hiện có:
`.container`, `.button`, `.button--secondary`, `.form-label`, `.form-control`
và `.text-muted`. Mọi thông số thiết kế lưu tại [DESIGN.md](DESIGN.md);
không duy trì bảng màu/font/kích thước thứ hai ở đây.

Mỗi thành viên tạo đặc tả riêng trong `docs/design/`, dùng chung nhận diện
và tự thiết kế bố cục, component đặc thù. Dây ảnh, máy ảnh và vé hẹn là phần
riêng màn lịch chụp. Header/footer của màn Admin dùng markup riêng.
Màn Admin chưa được đối chiếu đầy đủ với quy ước thiết kế mới.

## Công nghệ và kiểm tra

HTML5 và CSS thuần, không framework/build/backend. Nội dung có sẵn trong
HTML, link và tài nguyên tương đối. JS tùy chọn chỉ nâng cấp tương tác;
khi tắt JS vẫn đọc nội dung chính và dùng điều hướng.

Khi có trang mới: mở trực tiếp từ thư mục, kiểm tra 360/768/1280 px,
zoom 200%, bàn phím, reduced motion, font tiếng Việt, tương phản và W3C
Nu checker (0 errors). Lưu minh chứng mới trong `screenshots/` và `checks/`.
Màn 1 đã được kiểm tra trên Chrome ở 360, 768 và 1280 px khi bật và tắt
JavaScript. Ảnh toàn trang khi tắt JS nằm trong [screenshots](screenshots/).
Báo cáo [W3C Nu](checks/validator-index.txt) ghi 0 lỗi và 0 cảnh báo cho bản
đã kiểm tra. Mã SHA-256 trong báo cáo khác với mã của `index.html` hiện có
trong Git, nên cần chạy lại W3C Nu cho bản ghép.

Kiểm tra trực quan, responsive, tương phản và W3C của màn Admin với CSS
chung mới là **NOT RUN**. Kết quả trước đổi thiết kế được lưu trong
`docs/history/pre-redesign/`. Kiểm tra zoom 200% và nghiệm thu luồng giữa
ba màn vẫn đang chờ.
