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
| Lịch booking | Bảng ngày 24/10/2026 có hai cột Thời gian và Booking. Khung 08:00–12:00 ghi Đã có lịch. Các khung còn lại phân biệt Chưa có dữ liệu và Chưa có booking. |
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
| Dưới 48rem, gồm 360 px | Một cột theo thứ tự danh sách, chat, lịch và booking. Trạng thái hội thoại nằm dưới thông tin khách. Các trường ngày và giờ xếp dọc. |
| Từ 48rem đến dưới 64rem, gồm 768 px | Danh sách nằm ở cột trái rộng 15rem. Chat và cụm lịch/booking xếp dọc ở cột phải. Ngày và giờ nằm cạnh nhau trong form. |
| Từ 64rem, gồm 1280 px | Ba cột trong khung cao bằng viewport. Danh sách khách, tin nhắn và thẻ booking có vùng cuộn riêng. Lịch nằm phía trên thẻ booking, hai phần chia đều chiều cao mặc định. |
| Từ 64rem và viewport cao tối đa 46rem | Lịch lấy chiều cao tự nhiên. Thẻ booking dùng phần chiều cao còn lại. |

## Dữ liệu ban đầu

- Admin đang mở hội thoại **Nguyễn Thùy Linh**. Trạng thái hội thoại là
  **Đang tư vấn**. Tin nhắn mẫu cho thấy Linh đã đồng ý giờ chụp **14:00**.
- Yêu cầu **09:00 ngày 24/10/2026** vướng lịch makeup của Mai từ
  **08:00 đến 12:00**. Phương án đang chọn là makeup **13:00–14:00** với Mai
  và chụp **14:00–16:00** với Tuấn tại **Phòng B**.
- Booking mẫu **GS-1024** dùng gói **Tốt nghiệp Premium**, loại buổi chụp
  **Tốt nghiệp cá nhân**, thời lượng **2 giờ**, **30 ảnh**. Tổng giá
  **1.800.000đ**, cọc **540.000đ**, còn **1.260.000đ** sau buổi chụp.
- Thẻ ban đầu hiển thị **Lịch đã thống nhất** và **Đã đồng ý giờ · Chưa tạo
  booking**. Makeup đã bao gồm. Thuê áo cử nhân bị khóa vì chưa có báo giá.

## Tương tác trong bản hiện tại

| Thao tác | Kết quả |
| --- | --- |
| Tìm, lọc và chọn khách | Tìm tên có dấu hoặc không dấu và kết hợp với bộ lọc trạng thái. Nút chọn khách dùng được bằng chuột và bàn phím. Khi chuyển khách, mỗi hội thoại giữ tin nhắn, bản nháp, trạng thái và vị trí cuộn trong phiên xem. |
| Đổi trạng thái hoặc gửi tin | Dropdown áp dụng cho khách đang mở. Bốn nhãn hiện tại là Chưa trả lời, Đang tư vấn, Đã xác nhận và Hoàn thành. Gửi tin thêm nội dung vào hội thoại mẫu. Trả lời khách Chưa trả lời chuyển hội thoại sang Đang tư vấn. |
| Đổi ngày hoặc giờ chụp | Đưa booking về bản nháp. Ngày có dữ liệu là 24/10/2026, với lựa chọn 14:00 và 15:00. Makeup bắt đầu trước giờ chụp một tiếng. |
| Gửi đề xuất và mô phỏng phản hồi | Đề xuất thêm lịch và giá vào chat. Linh đồng ý thì bật Tạo booking và chuyển trạng thái hội thoại sang Đã xác nhận. Từ chối khóa Tạo booking và đưa hội thoại về Đang tư vấn. |
| Tạo booking hoặc chỉnh lại lịch | Tạo booking hiển thị tóm tắt GS-1024 và cập nhật hai khung liên quan thành Chờ cọc. Chỉnh lại lịch mở lại form và yêu cầu chốt giờ mới. |

Các thao tác trên chạy trong phiên xem. Tin nhắn và booking mất khi tải
lại trang. Liên kết ở chân trang và trong kết quả tạo booking mở được
[Lịch chụp của khách](../../my-appointments.html). Tạo booking cập nhật
thẻ và lịch ở màn Admin. Trang Lịch chụp mở dữ liệu mẫu riêng.

Khi tắt JavaScript, HTML vẫn hiển thị danh sách, bốn tin nhắn của Linh,
lịch, form và liên kết. Tìm kiếm, lọc, chọn khách, đổi trạng thái, gửi tin
và tạo booking cần JS. Ghi chú trong `noscript` giải thích phạm vi này.

## Điểm đối chiếu với brief PA02

- Brief dùng nhãn **Đã chốt lịch** cho hội thoại đã đồng ý. Màn hiện tại
  mở ở **Đang tư vấn** và dùng **Đã xác nhận** khi mô phỏng đồng ý hoặc tạo booking.
- Chân trang vẫn có nhãn **Màn 1/2/3** và form vẫn có nhóm **Mô phỏng phản hồi
  của Linh**. Nút **Tạo booking** cần JS. Ghi chú chân trang và phản hồi
  sau khi tạo booking giải thích phạm vi mô phỏng của từng màn.
- Brief yêu cầu đọc toàn bộ chat và form bằng cuộn trang. Bản hiện tại
  dùng vùng cuộn riêng như mô tả ở bảng responsive.

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
