# Thiết kế chung — GradStudio PA02

Phiên bản 1.0, ngày 06/11/2026. Áp dụng cho cả ba màn hình.
Được tổng hợp từ thiết kế màn Lịch chụp của tôi do thành viên nhóm cung cấp.

## 1. Phạm vi và nguồn quy ước

- File này lưu các quyết định thiết kế dùng chung: nhận diện, màu,
  typography, khoảng cách, thành phần tái sử dụng và nguyên tắc tương tác.
- `AGENTS.md` lưu công nghệ, dữ liệu xuyên suốt, phân công và cách kiểm tra.
- `docs/design/<page>.md` lưu bố cục, nội dung và tương tác riêng từng màn.
  Đặc tả màn 3 nằm tại [my-appointments.md](docs/design/my-appointments.md).
- `css/common.css` thực hiện nền tảng chung; CSS riêng triển khai từng trang.
- Yêu cầu hiện hành của người dùng và yêu cầu kỹ thuật của đề bài được ưu tiên.
  Đặc tả trang tuân theo phần chung; thay phần chung cần cập nhật file này
  và CSS tương ứng, rồi kiểm tra các trang bị ảnh hưởng.

Nhóm tự thiết kế giao diện. `docs/pa1/` cung cấp chức năng, vai trò và
câu chuyện nghiệp vụ; bố cục, màu, font và hiệu ứng trong đó không phải
quy chuẩn giao diện PA02. Prompt/log trước ngày đổi hướng chỉ ghi lịch sử,
không dùng để khôi phục quy ước đã thay thế.

## 2. Hướng thị giác chung và quyền tự thiết kế

Nhật ký ảnh phim hoài niệm nhẹ: giấy ngà, mực xanh rêu, đỏ rượu cho ghi chú
và trạng thái, ảnh có chú thích, đường nét mảnh. Ưu tiên đọc thông tin,
nhận biết thao tác và hoàn thành công việc.

| Dùng chung | Thành viên tự quyết trong từng trang |
| --- | --- |
| Logo chữ GradStudio, bảng màu, hai họ font | Bố cục hero và thứ tự các khối |
| Kiểu nút, input, focus, cách thể hiện trạng thái | Component riêng: gói dịch vụ, lịch tài nguyên, vé hẹn |
| Khung nội dung, spacing, ngôn ngữ icon | Ảnh, minh họa, trang trí và cách bố trí |
| Tên menu và đường dẫn nhất quán theo vai trò | Tương tác riêng, trạng thái và bố cục responsive |

Dây treo ảnh, kéo/thả Polaroid, máy ảnh nhả ảnh, vé hẹn và nhật ký buổi
chụp thuộc màn 3; không bắt buộc xuất hiện ở các màn khác. Màn Admin có
thể dùng bố cục nhiều dữ liệu, nhưng giữ nhận diện và thành phần chung.

## 3. Bảng màu và design tokens

Định nghĩa trong `:root` của `css/common.css`. CSS riêng dùng `var(...)`,
không chép mã màu hoặc tự thay palette cho từng trang.

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| `--color-background` | `#F5F0E6` | Nền giấy |
| `--color-surface` | `#FFFCF5` | Thẻ, form, popup |
| `--color-surface-soft` | `var(--color-background)` | Bề mặt phụ trên thẻ |
| `--color-text` | `#262B28` | Chữ chính |
| `--color-text-muted` | `#62655B` | Chữ phụ trên nền sáng |
| `--color-brand` | `#284C3F` | Nút chính, liên kết, mục được chọn |
| `--color-brand-hover` | `#1B392F` | Hover thao tác chính |
| `--color-on-brand` | `var(--color-surface)` | Chữ trên nền brand |
| `--color-wine` | `#7A3734` | Đỏ rượu cho ghi chú, dấu trạng thái |
| `--color-accent` | `#B59157` | Vàng trang trí |
| `--color-border` | `#D3C9B9` | Viền và đường kẻ trang trí |
| `--color-control-border` | `#8A8171` | Viền input và điều khiển |
| `--color-focus` | `#175E92` | Focus bàn phím |
| `--color-success` | `var(--color-brand)` | Đã đặt lịch, thành công |
| `--color-warning` | `var(--color-wine)` | Chờ cọc, cần chú ý |
| `--color-danger` | `var(--color-wine)` | Lỗi, trùng lịch; kèm chữ/icon riêng |
| `--color-disabled-background` | `var(--color-border)` | Nền điều khiển bị khóa |
| `--color-disabled-text` | `var(--color-text)` | Chữ điều khiển bị khóa |

Các vai trò success/warning/danger được ánh xạ từ palette màn 3 để dùng
toàn website. Trạng thái luôn kèm chữ, có thể thêm icon; không phân biệt
chờ cọc và lỗi chỉ bằng màu. Màu trạng thái dùng làm chữ/icon trên nền
sáng; không tự đổi thành màu nền khi chưa kiểm tra.

Vàng và viền trang trí không dùng làm chữ nhỏ, focus hoặc dấu hiệu duy
nhất nhận biết input. Chữ nội dung/nút cần tương phản 4.5:1 trên nền thực
tế, kể cả hover và chữ trên ảnh. Kiểm tra cặp token không thay thế kiểm
tra giao diện đã triển khai.

## 4. Typography và tài nguyên font

| Vai trò | Font / weight | Kích thước | Line-height |
| --- | --- | --- | --- |
| H1 | Merriweather 400 hoặc 500 | 32–56 px, dùng clamp | 1.18 |
| H2 | Merriweather 400 hoặc 500 | 24–32 px | 1.25 |
| Tiêu đề cấp dưới | Merriweather 400 hoặc 500 | Theo nội dung, phân cấp rõ | 1.25 |
| Nội dung, label, chú thích | Be Vietnam Pro 400 | Tối thiểu 16 px | 1.6 |
| Nút, giá, thông tin nhấn mạnh | Be Vietnam Pro 600 | Tối thiểu 16 px | 1.4–1.6 |

Tối đa hai họ font; không font viết tay cho dữ liệu, giá hoặc hướng dẫn.
HTML UTF-8, `lang="vi"`; không tách dấu tiếng Việt thành span hoặc dùng
chiều cao cố định làm mất dấu. Nhãn trang trí in hoa có letter-spacing
tối đa 0.06em; không dùng letter-spacing âm cho đoạn tiếng Việt.

Font dùng chung lưu một lần trong `assets/fonts/shared/`:

- `Merriweather-Variable.ttf`: đầy đủ tiếng Việt, đúng range weight.
- `BeVietnamPro-Regular.ttf`: weight 400.
- `BeVietnamPro-SemiBold.ttf`: weight 600.
- `Merriweather-OFL.txt` và `BeVietnamPro-OFL.txt`: giấy phép đi kèm.

Nguồn: [Merriweather](https://github.com/google/fonts/tree/main/ofl/merriweather)
và [Be Vietnam Pro](https://github.com/google/fonts/tree/main/ofl/bevietnampro).
Không tải font từ CDN khi mở trang. Sau khi có file thực, khai báo
`@font-face` trong `css/common.css`, tên `GS Merriweather` và `GS Be Vietnam`,
`font-display: swap`; không nhân bản font theo màn.

Biến font dùng stack `"GS Merriweather", "Times New Roman", serif` và
`"GS Be Vietnam", "Segoe UI", Arial, sans-serif`. Ba file font cục bộ đã
được khai báo trong `css/common.css`. Khi triển khai phải kiểm tra font
thật nạp qua `file://`,
Rendered Fonts, dấu tiếng Việt và xuống dòng trên Windows. Không đổi bảo mật
trình duyệt để làm kiểm tra có vẻ đạt.

## 5. Khung trang, khoảng cách và responsive

| Thuộc tính | Quy ước chung |
| --- | --- |
| Spacing `--space-1` đến `--space-9` | 4, 8, 12, 16, 24, 32, 48, 64, 96 px ở root 16 px |
| Container | Linh hoạt, tối đa 74rem tính cả padding, căn giữa |
| Lề ngang | 16 px mặc định; 24 px từ 48rem; 48 px từ 64rem |
| Khoảng giữa khối chính | 24–32 px mobile; 32–64 px desktop |
| Bo góc | 6 px ảnh; 10 px điều khiển; 16 px thẻ; component vé có thể 18 px |
| Vùng bấm | Tối thiểu 44 px; nút chính tối thiểu 48 px |
| Breakpoint khởi đầu | Mobile first, 48rem và 64rem; bố cục riêng theo nội dung |
| Độ rộng kiểm tra | 360, 768, 1280 px; thêm zoom 200% |

Root giữ `100%` để tôn trọng cỡ chữ người xem. Nội dung dài xuống dòng,
ảnh giữ tỉ lệ, grid/flex cho phép co bằng `minmax(0, ...)` hoặc
`min-inline-size: 0`. Không cuộn ngang toàn trang, cắt chữ hoặc dùng
`overflow-x: hidden` để che lỗi. Bảng rộng có thể cuộn trong wrapper riêng.

## 6. Thành phần dùng chung

| Thành phần | Quy ước |
| --- | --- |
| Header / nav | Logo chữ GradStudio nhất quán; trang hiện tại có `aria-current="page"`; nav xuống dòng khi cần |
| Vai trò | Màn khách có Dịch vụ và Lịch chụp của tôi; lối demo sang Admin ghi rõ chuyển vai trò; Admin có nav phù hợp công việc |
| Footer | Cùng tên studio và cách trình bày thông tin; link có đích thật; không bịa địa chỉ |
| `.container` | Khung nội dung theo mục 5 |
| `.button` | Nền xanh rêu, chữ surface, Be Vietnam Pro 600, bo góc 10 px, cao tối thiểu 48 px |
| `.button.button--secondary` | Nền surface, viền và chữ xanh rêu; không nổi ngang CTA chính |
| `.form-label` / `.form-control` | Label hiện rõ; input dùng viền control-border, cao tối thiểu 44 px; checkbox/radio native |
| Trạng thái | Nhãn chữ rõ, màu theo vai trò; có thể kiểu con dấu, không nghiêng chữ đọc chính |
| Dialog | Tên rõ, Đóng/Hủy, Escape, quản lý focus; một dialog mỗi lúc; vừa viewport và cuộn nội dung khi cần |
| Focus / disabled | Outline 3 px có khoảng cách; dùng `disabled` thật; `aria-disabled` không tự chặn link |

Giữ tên và đích liên kết thống nhất; không bắt màn khách và Admin có cùng
toàn bộ menu. Header/footer là quy ước cần thực hiện khi xây trang, chưa
có component HTML dùng chung trong lần cập nhật nền tảng này.

## 7. Ảnh, icon và chuyển động

- Ảnh có chú thích đúng ngữ cảnh; ảnh tham khảo không trình bày như ảnh
  đã chụp của khách. Dùng ảnh cục bộ, ghi nguồn; không dùng screenshot UI
  làm nền hoặc component.
- Có thể dùng khung Polaroid, ảnh nghiêng tĩnh 1–2 độ, viền mảnh và bóng
  giấy nhẹ. Không nghiêng nội dung chính hoặc để ảnh vượt viewport.
- Texture tùy chọn, độ mờ tối đa 0.03. Hai mức bóng: thường và nổi.
- Icon SVG thống nhất nét khoảng 1.75 px; không dùng emoji làm icon UI.
- Hover/nhấn 120–220 ms, nhấc tối đa 2 px; mở popup tối đa khoảng 180 ms.
  Không autoplay slideshow hoặc parallax toàn trang.
- Chuyển động lặp nếu có nằm trong vùng phụ được đặc tả riêng, có nút
  dừng; dừng khi tab ẩn, vùng ra ngoài viewport hoặc dialog mở.
- Tôn trọng `prefers-reduced-motion`; thao tác vẫn dùng được bằng thay
  đổi trạng thái tức thời. Không tự phát âm thanh hoặc chớp trắng màn hình.

## 8. CSS, tương tác và tích hợp

Nạp `css/common.css` trước CSS riêng. Component chung dùng token toàn cục;
biến riêng dành cho hình học/trang trí đặc thù. Nếu cần `--ap-*` ở màn 3,
ánh xạ tới token chung, không định nghĩa lại palette.

Class riêng scope theo body và tiền tố `services-`, `admin-`, `appointments-`.
Không `!important`, không sửa selector chung để giải quyết riêng một màn.
Tài nguyên dùng chung đặt trong thư mục chung; assets riêng chia theo màn
khi thực sự cần.

HTML có sẵn nội dung chính. JS chỉ nâng cấp DOM có sẵn; điều hướng dùng
`a href` tương đối, không phụ thuộc JS. Dùng native radio, checkbox,
`details/summary` khi phù hợp. Điều khiển cần JS hiện sau khi gắn handler;
khi tắt JS vẫn đọc nội dung và dùng link thật. Kéo/thả có nút thay thế;
chức năng mô phỏng ghi rõ tại đúng nơi.

Đặc tả từng trang ghi bố cục, nội dung, trạng thái, hành vi bật/tắt JS,
responsive và nghiệm thu. Không sao chép bảng màu/font chung thành bộ quy
định độc lập. Thay phần chung cần cập nhật tài liệu, CSS và kiểm tra tích hợp.


