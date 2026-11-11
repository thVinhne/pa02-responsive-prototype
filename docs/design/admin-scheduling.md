# Thiết kế riêng — Màn 2 Admin tư vấn và xử lý lịch

Đặc tả ghi lại màn Admin sau lượt tích hợp ngày 11/11/2026. Màn
này nối yêu cầu tư vấn của Linh ở màn Dịch vụ với booking mẫu ở màn Lịch
chụp. Quy ước dùng chung nằm trong [DESIGN.md](../../DESIGN.md). Nghiệp vụ
nguồn và hình tham chiếu nằm trong [tài liệu PA01](../pa1/LINK.md) và
[ảnh màn 2](../pa1/02-admin-scheduling.png).

## Bố cục và phân cấp

| Vùng | Nội dung hiện tại |
| --- | --- |
| Đầu trang | Logo GradStudio dẫn về Dịch vụ, nhãn vai trò Studio · Admin và thông tin Thảo, quản lý studio. Liên kết bỏ qua điều hướng trỏ đến nội dung chính. |
| Danh sách hội thoại | Tiêu đề Khách đang chờ, tìm theo tên, bộ lọc trạng thái có số lượng và năm khách mẫu. Mỗi mục có avatar, tên, tin nhắn gần nhất và thời điểm. Tên dài xuống dòng. Dòng xem trước giữ dấu ba chấm, có nội dung đầy đủ trong nhãn truy cập khi bật JS. |
| Hội thoại | Tên, avatar, gói và trạng thái của khách đang mở. Tin khách nằm bên trái, tin studio nằm bên phải. Hội thoại Linh có ghi chú về khung giờ đã thống nhất. Ô soạn và nút Gửi nằm cuối vùng chat. |
| Lịch booking | Bảng ngày 24/10/2026 có hai cột thời gian và tài nguyên/trạng thái. Mai bận makeup 08:00–12:00. Các hàng makeup Mai và chụp Tuấn/Phòng B ghi Dự kiến, Đề xuất, Đã thống nhất, Đã từ chối hoặc Chờ cọc theo bước demo. Khung khác ghi Chưa có dữ liệu. |
| Thẻ booking | Nằm dưới lịch, hiển thị form hoặc bản tóm tắt booking của Linh. Form gồm loại buổi chụp, gói, ngày, giờ, dịch vụ, phân công, giá và thao tác mô phỏng. Khách khác có thông báo thiếu dữ liệu booking. |
| Chân trang | Liên kết sang Dịch vụ và Lịch chụp, mục Admin hiện tại và phần Thông tin bản mẫu có thể mở rộng. |

Màn Admin lấy màu và điều khiển nền từ CSS chung. Các thành phần riêng dùng
tiền tố `admin-`. Tiêu đề khu vực và logo dùng Merriweather. Tên khách
trong đầu vùng chat dùng Be Vietnam Pro. Mục hội thoại có avatar 52 px,
padding theo `--space-2` và cao theo nội dung. Avatar chữ **G** và **L** dùng
[SVG của nhóm](../../PROTOTYPE.md#nguồn-ảnh-và-video).
Các khách còn lại dùng chữ viết tắt trong HTML.

## Responsive

| Điều kiện | Bố cục |
| --- | --- |
| Dưới 48rem, gồm 360 px | Một cột, cuộn trang theo thứ tự danh sách, chat, lịch và booking. Trạng thái nằm dưới khách. Ngày/giờ xếp dọc. |
| Từ 48rem đến dưới 64rem, gồm 768 px | Danh sách ở cột trái 15rem, chat và lịch/booking xếp dọc bên phải. Các vùng có chiều cao tự nhiên, dùng cuộn trang. Ngày/giờ cạnh nhau. |
| Từ 64rem, gồm 1280 px | Ba cột cao theo nội dung. Danh sách, chat và booking dùng cuộn trang, kể cả 1280 × 900. |
| Cửa sổ thấp, zoom hoặc nội dung dài | Toàn bộ nội dung và nút được tiếp cận bằng cuộn trang ở mọi độ rộng. |

## Dữ liệu ban đầu

- Admin mở hội thoại **Nguyễn Thùy Linh**, trạng thái **Đã chốt lịch**.
  Bốn tin cũ thuộc ngày **23/10/2026**, chốt giờ chụp **14:00 ngày 24/10**.
  Tin mới được gắn nhãn mô phỏng và giờ thao tác, tách nghĩa với lịch sử.
- Yêu cầu **09:00 ngày 24/10/2026** vướng lịch makeup của Mai từ
  **08:00 đến 12:00**. Phương án đang chọn là makeup **13:00–14:00** với Mai
  và chụp **14:00–16:00** với Tuấn tại **Phòng B**.
- Booking mẫu **GS-1024** dùng gói **Tốt nghiệp Premium**, loại buổi chụp
  **Tốt nghiệp cá nhân**, thời lượng **2 giờ**, **30 ảnh**. Tổng giá
  **1.800.000đ**, cọc **540.000đ**, còn **1.260.000đ** sau buổi chụp.
- Bản tĩnh và bản bật JS cùng bắt đầu ở **Đã chốt lịch · Chưa tạo booking**.
  Form hiện trong HTML. Khi tắt JS, Tạo booking là liên kết thật tới
  my-appointments.html, có ghi chú mở booking mẫu GS-1024 Chờ cọc. Khi bật
  JS, liên kết này nhường chỗ cho nút submit tạo booking trong phiên.
  Makeup đã bao gồm. Thuê áo cử nhân bị khóa vì chưa có báo giá.

## Tương tác trong bản hiện tại

| Thao tác | Kết quả |
| --- | --- |
| Tìm, lọc và chọn khách | Tìm tên có dấu hoặc không dấu và kết hợp với bộ lọc trạng thái. Nút chọn khách dùng được bằng chuột và bàn phím. Khi chuyển khách, mỗi hội thoại giữ tin nhắn, bản nháp, trạng thái và vị trí cuộn trong phiên xem. |
| Đổi trạng thái hoặc gửi tin | Dropdown áp dụng cho khách đang mở. Bốn nhãn hiện tại là Chưa trả lời, Đang tư vấn, Đã chốt lịch và Hoàn thành. Gửi tin thêm nội dung vào hội thoại mẫu. Trả lời khách Chưa trả lời chuyển hội thoại sang Đang tư vấn. |
| Đổi ngày hoặc giờ chụp | Đưa booking về bản nháp. Ngày có dữ liệu là 24/10/2026, với lựa chọn 14:00 và 15:00. Makeup bắt đầu trước giờ chụp một tiếng. |
| Gửi đề xuất và mô phỏng phản hồi | Đề xuất thêm lịch và giá vào chat. Linh đồng ý thì bật Tạo booking và chuyển trạng thái hội thoại sang Đã chốt lịch. Từ chối khóa Tạo booking và đưa hội thoại về Đang tư vấn. |
| Tạo booking hoặc chỉnh lại lịch | Tạo booking hiển thị tóm tắt GS-1024 và cập nhật hai khung liên quan thành Chờ cọc. Chỉnh lại lịch mở lại form và yêu cầu chốt giờ mới. |

Các thao tác trên chạy trong phiên xem. Tin nhắn và booking mất khi tải
lại trang. Liên kết ở chân trang và trong kết quả tạo booking mở được
[Lịch chụp của khách](../../my-appointments.html). Tạo booking cập nhật
thẻ và lịch ở màn Admin. Trang Lịch chụp mở dữ liệu mẫu riêng.

Khi tắt JavaScript, HTML hiển thị danh sách, bốn tin nhắn của Linh,
lịch, form và liên kết Tạo booking, đủ phân công và tiền. Liên kết mở
Lịch chụp với GS-1024 Chờ cọc trong bộ dữ liệu mẫu riêng. Trong Admin,
phần kết quả Chờ cọc chỉ hiện sau hành động tạo khi bật JS.
Các trường thay đổi lịch và nút xử lý được mở khóa sau khi gắn handler.
Bản tương tác bắt đầu từ giờ 14:00 Linh đã đồng ý trong hội thoại.
Đổi ngày/giờ cần gửi đề xuất và đồng ý lại. Submit lặp sau khi tạo bị chặn.

Ba mẫu tin soạn sẵn của Linh được chọn bằng select và nút Điền mẫu.
Mẫu 1 ghi nhận yêu cầu 09:00 và Mai bận, mẫu 2 đề xuất giờ 14:00, mẫu 3
hướng dẫn cọc. Điền mẫu nối vào bản nháp rồi bấm Gửi. Thao tác này giữ
nguyên trạng thái booking. Gửi đề xuất và Đồng ý lịch trong form thực
hiện bước xác nhận. Mẫu tin chỉ hiện khi đang mở Linh.

## Điểm đối chiếu với brief PA02

- Dùng nhãn **Đã chốt lịch** cho hội thoại đã đồng ý ở dropdown, bộ lọc
  và nhãn truy cập. Trạng thái booking Chờ cọc hiện sau bước Tạo booking.
- Chân trang dùng tên Dịch vụ, Tư vấn và Lịch chụp, ghi rõ vai trò. Nhóm
  **Phản hồi của Linh** giữ Đồng ý/Từ chối và có chú thích mô phỏng tại form.
  Gửi tin của Admin tiếp tục hoạt động khi bật JS theo yêu cầu trước.
  Tạo booking dùng link khi tắt JS và submit khi bật JS.
- Bản hiện tại dùng cuộn trang ở mọi độ rộng theo yêu cầu ngày 11/11/2026,
  gồm trường hợp 1280 × 900.

## Tệp triển khai và minh chứng

- [admin-scheduling.html](../../admin-scheduling.html) chứa nội dung và dữ
  liệu mẫu. Mở trực tiếp tệp này từ thư mục repo.
- [admin-scheduling.css](../../css/admin-scheduling.css) nạp sau
  [common.css](../../css/common.css).
- [admin-scheduling.js](../../js/admin-scheduling.js) là script thường,
  nạp qua đường dẫn tương đối với `defer`.
- Ảnh toàn trang khi tắt JS ở
  [360 px](../../screenshots/admin-scheduling-360.png),
  [768 px](../../screenshots/admin-scheduling-768.png) và
  [1280 px](../../screenshots/admin-scheduling-1280.png).
- [Báo cáo W3C Nu](../../checks/validator-admin-scheduling.txt) lưu
  kết quả kiểm tra HTML và mã SHA-256 của tệp đã gửi.
