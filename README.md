# PA02 GradStudio

Bài thực hành xây dựng ba màn hình của chủ đề GradStudio thành
các trang HTML/CSS tĩnh, hỗ trợ điện thoại, máy tính bảng và laptop.

Chủ đề GradStudio do giảng viên lựa chọn từ PA01.
Nhóm chúng tôi sử dụng tài liệu được cung cấp để triển khai PA02.
Tài liệu và thông tin tác giả nguồn được giữ trong docs/pa1/.

## Thành viên và phân công

| MSSV | Họ và tên | Công việc |
|---|---|---|
| 24120157 | Lê Thái Vinh | Trang dịch vụ và chat; CSS chung; quy tắc; tổng hợp brief; tích hợp |
| 24120394 | Nguyễn Đặng Khôi Nguyên | Trang Admin tư vấn và xử lý lịch |
| 24120136 | Trần Lê Xuân Tân | Trang lịch chụp; tổng hợp prototype, AI log và tự chấm |

## Phạm vi

Ba trang dự kiến:

1. index.html — Dịch vụ và chat của khách.
2. admin-scheduling.html — Admin tư vấn và xử lý lịch.
3. my-appointments.html — Lịch chụp của khách.

Dữ liệu được viết sẵn trong HTML. Không triển khai backend,
đăng nhập, chat hoặc thanh toán thật trong milestone này.

## Công nghệ và yêu cầu

- HTML5 và CSS thuần, không cần bước build.
- Hoạt động khi JavaScript bị tắt.
- Liên kết và tài nguyên sử dụng đường dẫn tương đối.
- Kiểm tra ở độ rộng 360, 768 và 1280 px.
- HTML đạt 0 errors trong W3C Nu checker.
- Quản lý phiên bản bằng GitHub Desktop.

## Trạng thái hiện tại

Đã chuẩn bị quy tắc dự án và tài liệu tham chiếu.
Đã bổ sung nền tảng `css/common.css`, `.gitignore` và prompt nhiệm vụ
trong `brief.md`. Ba trang HTML và CSS riêng đang chờ triển khai.
Chưa có HTML để kiểm tra responsive, điều hướng hoặc W3C.

Sau khi hoàn thành, mở trực tiếp index.html trong trình duyệt.
Hướng dẫn mở và nhu cầu kết nối mạng sẽ được cập nhật theo bản cuối.

## CSS dùng chung cho ba thành viên

Nạp `css/common.css` trước CSS riêng, bằng hai thẻ
`link rel="stylesheet"` trong `head`. Đường dẫn CSS riêng theo trang:

| Trang dự kiến | File nạp đầu | File nạp sau |
|---|---|---|
| `index.html` | `css/common.css` | `css/services.css` |
| `admin-scheduling.html` | `css/common.css` | `css/admin-scheduling.css` |
| `my-appointments.html` | `css/common.css` | `css/my-appointments.css` |

Các file HTML/CSS riêng trong bảng chưa được tạo. Khi triển khai,
chỉ nạp file riêng đã tồn tại. Thứ tự nạp giúp CSS riêng ghi đè khi
các quy tắc có cùng mức ưu tiên; không thay thế quy tắc specificity.
Class riêng dùng tiền tố `services-`, `admin-`, `appointments-`.
Thay đổi file chung cần thông báo cả nhóm và kiểm tra lại ba trang.

### Tokens và nền tảng

- `--color-*`: dùng bảng màu đã thống nhất ở phần bên dưới và mục 7
  của AGENTS.md; đây là lựa chọn thiết kế PA02, không phải bộ màu
  trích chính xác từ PA01.
- `--font-body`: font hệ thống; `--font-heading`: Georgia/Times/serif.
  Không tải font ngoài, không thêm dependency. Font thực tế có thể
  khác giữa các máy, cần kiểm tra xuống dòng khi đã có HTML.
- `--font-size-body: 1rem`, line-height nội dung `1.6`.
  Root giữ `100%`: tương đương 16 px với cài đặt mặc định 16 px;
  giữ khả năng người dùng tăng cỡ chữ trong trình duyệt.
- `--space-1` đến `--space-8`: lần lượt 4, 8, 12, 16, 24, 32, 48,
  64 px tại root 16 px. Dùng `var(--space-...)` cho padding, margin,
  gap; kích thước border, chữ và điều khiển có tokens riêng.
- Box sizing áp dụng cả pseudo-elements; ảnh/video giữ tỉ lệ và
  không rộng hơn vùng chứa. Nội dung dài được phép xuống dòng.
- Chưa thêm bố cục hero, chat, lịch, cột hoặc vị trí nổi.

### Bảng màu và cách sử dụng

Định hướng kem–nâu ấm nhằm gợi sự gần gũi, kỷ niệm và chỉn chu.
Ảnh chụp vẫn là nội dung nổi bật; màu giao diện hỗ trợ phân cấp và
thao tác. Đây là chủ đích thiết kế cần kiểm chứng với người xem.

| Vai trò | Token | Màu |
|---|---|---|
| Nền chính | `--color-background` | `#FAF7F2` |
| Thẻ, form, booking | `--color-surface` | `#FFFFFF` |
| Chữ chính | `--color-text` | `#30291F` |
| Chữ phụ | `--color-text-muted` | `#655A4E` |
| Nút chính, liên kết | `--color-brand` | `#82551F` |
| Hover nút chính, liên kết | `--color-brand-hover` | `#684318` |
| Trang trí tùy chọn | `--color-accent` | `#C6A267` |
| Đã đặt lịch | `--color-success` | `#166534` |
| Chờ cọc | `--color-warning` | `#92400E` |
| Trùng lịch, lỗi | `--color-danger` | `#B42318` |
| Focus bàn phím | `--color-focus` | `#005FCC` |

Dùng `var(--color-...)` trong CSS riêng thay vì chép mã hex.
Vàng đồng nhạt chỉ dành cho đường kẻ/hoa văn trang trí không mang
thông tin; không dùng cho chữ nhỏ hoặc dấu hiệu tương tác trên nền sáng.
Màu trạng thái là màu chữ/biểu tượng trên nền sáng, luôn kèm tên
trạng thái; chưa có class trạng thái hay bố cục riêng trong common.css.
Ba mã trạng thái cụ thể được chọn để triển khai các vai trò xanh,
hổ phách, đỏ; chúng không được đo từ ảnh PA01.

Giữ các token phụ đã có: nền phụ `--color-surface-soft`, viền
`--color-border`, chữ trên nút `--color-on-brand` và cặp màu disabled.
Không dùng màu thương hiệu thay focus hoặc màu trạng thái.
Thay màu, đổi nền hay phối chữ trên ảnh đều cần đo tương phản lại.
Trang dịch vụ dành trọng tâm cho ảnh; Admin dành trọng tâm cho dữ
liệu; trang lịch chụp làm rõ giờ, trạng thái và thao tác đặt cọc.

### Các class có thể sử dụng

| Class | Cách dùng |
|---|---|
| `.container` | Khung nội dung rộng linh hoạt, tối đa 75rem tính cả padding; căn giữa |
| `.button` | Dùng với `button` cho hành động hoặc `a href` cho điều hướng; kiểu chính nền nâu |
| `.button.button--secondary` | Thêm modifier vào `.button` để có nút nền trắng, viền nâu |
| `.form-label` | Gắn lên `label` hiển thị; `for` phải khớp `id` của trường nhập |
| `.form-control` | Gắn lên input dạng nhập chữ, select hoặc textarea; không dùng cho checkbox/radio |
| `.text-muted` | Chữ phụ trên các nền sáng do common.css cung cấp |

Container có padding mỗi bên 16 px ở màn nhỏ, 24 px từ `48rem`,
32 px từ `64rem`. Đây là mobile first; hai breakpoint chỉ đổi
padding chung, bố cục từng trang do CSS riêng quyết định.

Nút và form control có chiều cao tối thiểu `2.75rem` (44 px ở root
16 px), nút có thể xuống dòng. Link thường giữ gạch chân; nếu link
đứng riêng làm mục điều hướng, người làm trang phải thêm vùng bấm
tối thiểu 44 px trong CSS riêng hoặc dùng `.button` nếu phù hợp.
Không áp dụng 44 px cho mọi link trong câu văn.

### Trạng thái tương tác và khả năng truy cập

Nút/link và form control có hover trên thiết bị hỗ trợ hover.
`:focus-visible` hiển thị outline xanh 3 px; giữ outline mặc định
làm fallback, không bỏ focus toàn cục. Xem [MDN về focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible).

Dùng thuộc tính `disabled` thật trên button/input/select/textarea
khi cần vô hiệu hóa; màu chữ vẫn giữ rõ, không giảm opacity.
CSS có kiểu cho `.button[aria-disabled="true"]`, nhưng
`aria-disabled` chỉ mô tả trạng thái, không tự chặn thao tác.
Không gắn nó vào một `a href` còn điều hướng rồi coi link đã bị khóa.
Với chức năng chưa kết nối trong bản tĩnh, dùng mô tả hoặc button
disabled phù hợp và ghi vào PROTOTYPE.md sau này; luồng chính vẫn
phải có link hoạt động. Xem [MDN về aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled).

Màu chữ phải đi cùng nền tương ứng. Khi đặt trên ảnh, đổi màu nền,
ghi đè token hoặc đổi kiểu nút, kiểm tra lại tương phản; không suy
ra độ tương phản trên ảnh từ các cặp màu nền trơn. Mục tiêu chữ
nội dung/nút là 4.5:1 theo AGENTS.md và [cách tính tương phản của W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### Kiểm tra khi đã có HTML

- Mở trực tiếp từng HTML, tắt JavaScript và reload.
- Kiểm tra 360, 768, 1280 px: không cuộn ngang toàn trang, không cắt
  nội dung, tên dài xuống dòng và ảnh co đúng.
- Kiểm tra các nút/link đứng riêng cao ít nhất 44 px, chữ nội dung
  tối thiểu 16 px theo computed styles.
- Thử Tab/Shift+Tab, focus, label và trạng thái disabled thật.
- Kiểm tra màu bình thường/hover, chữ phụ, placeholder và nền thực tế.
- Upload từng HTML vào W3C Nu checker; lưu kết quả thật vào `checks/`
  và chụp đủ ảnh responsive khi tích hợp xong.

## Tài liệu tham chiếu

- [Quy tắc dự án](AGENTS.md)
- [Mục lục tài liệu nguồn](docs/pa1/README.md)
- [Mô tả sản phẩm](docs/pa1/PROPOSAL.md)
- [Luồng và prototype nguồn](docs/pa1/LINK.md)
- [Nguồn ảnh](docs/pa1/IMAGE_SOURCES.md)
