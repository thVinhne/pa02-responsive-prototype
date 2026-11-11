# Prototype GradStudio

## Team

| MSSV | Họ và tên | Phụ trách |
| --- | --- | --- |
| 24120136 | Trần Lê Xuân Tân | Lịch chụp và tổng hợp báo cáo |
| 24120157 | Lê Thái Vinh | Dịch vụ, CSS chung và tích hợp |
| 24120394 | Nguyễn Đặng Khôi Nguyên | Admin tư vấn và xử lý lịch |

## How to open it

Giải nén và mở [index.html](index.html) trực tiếp trong trình duyệt. Các
trang, ảnh, video và font dùng đường dẫn tương đối. Có thể xem nội dung
và đi qua ba màn bằng `file://`, khi không có mạng và khi tắt JavaScript.

Để nghiệm thu PA#2, tắt JavaScript trong DevTools, tải lại từng trang và
đặt chiều rộng 360, 768 hoặc 1280 CSS px. Bật lại JavaScript và tải lại
trang để thử các tương tác mô phỏng. Trạng thái demo của từng trang trở
về mẫu ban đầu khi tải lại.

## Screens

| Trang PA#2 | Ảnh nguồn GradStudio PA#1 | Việc người xem làm | Đích điều hướng |
| --- | --- | --- | --- |
| [index.html](index.html) | [01 — Dịch vụ và chat](docs/pa1/01-customer-services-chat.png) | Xem gói, album ảnh và câu hỏi mẫu của Linh về khung 09:00 ngày 24/10/2026. | “Nhân viên studio: Mở hội thoại” chuyển vai sang [Admin](admin-scheduling.html). “Lịch chụp của tôi” ở menu, khối tư vấn và chân trang mở [Lịch chụp](my-appointments.html). Các link gói, album và chat đi tới mục tương ứng trong trang. |
| [admin-scheduling.html](admin-scheduling.html) | [02 — Admin](docs/pa1/02-admin-scheduling.png) | Đọc hội thoại và bảng giờ. Mai bận 08:00–12:00. Khi bật JS, thử đề xuất, phản hồi của Linh và tạo GS-1024 Chờ cọc. | Logo và “Màn 1 · Góc nhìn khách” về [Dịch vụ](index.html). “Màn 3 · Lịch chụp của khách” ở chân trang và link trong kết quả tạo booking mở [Lịch chụp](my-appointments.html). |
| [my-appointments.html](my-appointments.html) | [03 — Lịch chụp và cọc](docs/pa1/03-customer-appointment.png) | Xem GS-1024, có mặt 12:50, makeup với Mai 13:00–14:00 và chụp với Tuấn tại Phòng B 14:00–16:00. Xem tổng 1.800.000đ, cọc 540.000đ và còn lại 1.260.000đ. | Logo và link Dịch vụ ở đầu và cuối trang về [Dịch vụ](index.html). Link trên dải mục lục nhảy tới lịch, nhật ký và góc chuẩn bị. Link ảnh mở ảnh cục bộ khi tắt JS. |

## Changed since PA#1

Ba ảnh trên thuộc bộ tham chiếu GradStudio lưu trong [docs/pa1](docs/pa1/README.md).
Phần “Nhóm thực hiện” của [tài liệu nguồn](docs/pa1/PROPOSAL.md#nhóm-thực-hiện)
ghi nhóm tác giả có MSSV khác danh sách nhóm PA#2 ở mục Team. Xác nhận
cho phép dùng bộ ảnh GradStudio để đối chiếu PA#1 chưa có trong repo.

- **Dịch vụ.** Nhóm thiết kế lại hero, xếp gói chụp và ảnh thành thẻ và
  album theo hướng nhật ký ảnh phim. Khung chat có bản xem trước trong
  luồng đọc và mở được bằng `details/summary` để dùng bằng bàn phím khi
  tắt JS. Khung khởi đầu thu gọn để phần giới thiệu luôn đọc được khi
  mở trang. Nút gửi tin ở màn khách bị khóa theo brief. Ở 360 px, ảnh hero
  nằm dưới chữ và các gói xếp dọc. Ở desktop, ảnh xem nhanh nằm cạnh các gói.
- **Admin.** Form từng nằm dưới hội thoại trong ảnh nguồn được chuyển
  xuống dưới lịch ở cột phải để dành cột giữa cho cuộc tư vấn. Bảng lịch
  rút còn thời gian và booking để dễ đọc trên màn nhỏ. Tên khách dài
  xuống dòng, còn dòng xem trước giữ dấu ba chấm. Màn nhỏ xếp một cột,
  tablet chia hai và desktop có ba vùng làm việc. Bảng chỉ đánh dấu
  các khung có dữ liệu minh họa.
- **Lịch chụp.** Lịch tuần và thông tin cọc của bản nguồn được bố trí lại
  thành dải ngày, vé hẹn GS-1024 và nhật ký. Mốc có mặt, makeup, chụp
  và tiền cọc được nhóm lại để đọc nhanh. Checklist, ảnh gợi ý, bản in
  và góc studio bổ sung việc chuẩn bị. Góc studio hiện ảnh và máy ảnh
  tĩnh khi tắt JS. Khi bật JS, người xem có thể tạo, lật và treo ảnh
  minh họa có sẵn trong repo.
- **Chuyển vai.** Link ở chân trang tách thao tác đổi vai khỏi chat và
  thao tác tạo booking. Màn Lịch chụp có sẵn GS-1024 Chờ cọc để đi qua
  luồng với JS tắt. Khi bật JS, Hủy hoặc Escape giữ Chờ cọc. Xác nhận
  cọc mô phỏng chuyển vé sang Đã đặt lịch.

Đặc tả từng màn ghi bố cục và phạm vi chi tiết.
[Dịch vụ](docs/design/services.md) · [Admin](docs/design/admin-scheduling.md) ·
[Lịch chụp](docs/design/my-appointments.md).

## Not wired yet

- Ô nhập và nút gửi tin của khách bị khóa, có ghi chú ngay trong khung chat.
  Tìm khách, trả lời và thay đổi booking trong Admin dùng dữ liệu mẫu trong
  phiên xem. Tạo booking trong Admin không cập nhật vé ở trang khách.
- Thanh toán cọc là mô phỏng trong trang Lịch chụp. Tài nguyên studio,
  lịch trống, đăng nhập, thông báo và giao dịch thật nằm ngoài bản PA#2.
- Sổ thông tin studio ghi Phòng B và giờ chụp. Địa chỉ và chỉ đường chưa
  được kết nối. Các ảnh trong góc studio và album là ảnh tham khảo.

## CSS

Ba trang dùng HTML5 và CSS thuần. [css/common.css](css/common.css) nạp trước
CSS từng trang. Màu, font Merriweather và Be Vietnam Pro, thang khoảng cách
4/8/12/16/24/32/48/64/96 px và vùng bấm dùng token chung theo
[DESIGN.md](DESIGN.md). CSS riêng đặt dưới các tiền tố `services-`,
`admin-` và `appointments-`. Góc ảnh, bìa album, rãnh vé và kích thước
đạo cụ dùng kích thước riêng cho hình học của thành phần.

Bố cục mobile first. Hai mốc chính là 48rem và 64rem. CSS từng màn có
điều kiện bổ sung cho chat nổi, vùng cuộn Admin ở cửa sổ thấp, dải ngày
và góc studio. Minh chứng cuối nằm trong [screenshots](screenshots/) và
[checks](checks/).

## Nguồn ảnh và video

Các ảnh dưới đây là ảnh minh họa cho dịch vụ và bối cảnh chụp. Ảnh được cắt khung và nén WebP để dùng trong prototype.

| Bộ ảnh | Tệp | Tác giả | Ảnh gốc | Giấy phép |
| --- | --- | --- | --- | --- |
| Tốt nghiệp | [`pexels-15005450.webp`](assets/images/pexels-15005450.webp) | Prabin basnet | [Khoảnh khắc nâng mũ](https://www.pexels.com/photo/backview-of-a-female-graduate-in-academic-dress-holding-a-graduation-cap-15005450/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-1205651.webp`](assets/images/pexels-1205651.webp) | Emily Ranquist | [Mũ bay ngày tốt nghiệp](https://www.pexels.com/photo/photography-of-people-graduating-1205651/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-19501563.webp`](assets/images/pexels-19501563.webp) | Safari Consoler | [Cùng dự lễ tốt nghiệp](https://www.pexels.com/photo/back-view-of-woman-and-people-in-academic-hats-19501563/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-16479971.webp`](assets/images/pexels-16479971.webp) | krar hb | [Bó hoa ngày nhận bằng](https://www.pexels.com/photo/back-view-of-graduate-in-gown-and-academic-hat-16479971/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-16132529.webp`](assets/images/pexels-16132529.webp) | Thayná Barsan | [Bước đi ngày nhận bằng](https://www.pexels.com/photo/back-view-of-a-woman-in-a-graduation-gown-16132529/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-7944064.webp`](assets/images/pexels-7944064.webp) | Pavel Danilyuk | [Tấm bằng thắt nơ đỏ](https://www.pexels.com/photo/photo-of-person-holding-graduation-cap-and-diploma-7944064/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-12794087.webp`](assets/images/pexels-12794087.webp) | Feyza Tuğba | [Mũ và bằng tốt nghiệp](https://www.pexels.com/photo/close-up-shot-of-square-academic-cap-and-diploma-on-concrete-surface-12794087/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-26987551.webp`](assets/images/pexels-26987551.webp) | Berna | [Khoảnh khắc ngoài trời](https://www.pexels.com/photo/a-woman-in-a-graduation-gown-and-cap-is-holding-her-graduation-hat-26987551/) | [Pexels License](https://www.pexels.com/license/) |
| Tốt nghiệp | [`pexels-7944061.webp`](assets/images/pexels-7944061.webp) | Pavel Danilyuk | [Cận cảnh lễ phục](https://www.pexels.com/photo/photo-of-person-holding-black-academic-hat-7944061/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-5905436.webp`](assets/images/pexels-5905436.webp) | Katerina Holmes | [Bàn học và ba lô](https://www.pexels.com/photo/school-desk-with-stationery-and-backpacks-on-chairs-5905436/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-30520306.webp`](assets/images/pexels-30520306.webp) | Pew Nguyen | [Hành lang giờ tan lớp](https://www.pexels.com/photo/empty-school-corridor-with-natural-light-30520306/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-35656174.webp`](assets/images/pexels-35656174.webp) | Yeşim Çolak | [Ánh sáng bên cửa sổ](https://www.pexels.com/photo/empty-classroom-with-large-windows-and-desks-35656174/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-5588404.webp`](assets/images/pexels-5588404.webp) | Tony Schnagl | [Một buổi tự học](https://www.pexels.com/photo/student-studying-on-a-wooden-table-5588404/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-9258380.webp`](assets/images/pexels-9258380.webp) | Erik Mclean | [Dãy bàn gỗ](https://www.pexels.com/photo/vintage-classroom-with-rows-of-wooden-desks-and-chairs-9258380/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-5905618.webp`](assets/images/pexels-5905618.webp) | Katerina Holmes | [Góc bàn và bảng trắng](https://www.pexels.com/photo/empty-desk-with-supplies-in-classroom-5905618/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-6981007.webp`](assets/images/pexels-6981007.webp) | Mikhail Nilov | [Phòng học và kệ sách](https://www.pexels.com/photo/an-empty-classroom-6981007/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-36650153.webp`](assets/images/pexels-36650153.webp) | Valentin Ivantsov | [Bảng xanh cuối lớp](https://www.pexels.com/photo/empty-classroom-with-wooden-desks-and-chalkboard-36650153/) | [Pexels License](https://www.pexels.com/license/) |
| Kỷ yếu lớp | [`pexels-6207367.webp`](assets/images/pexels-6207367.webp) | Skylar Kang | [Trang vở trên bàn](https://www.pexels.com/photo/papers-with-pen-on-table-in-classroom-6207367/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-20239591.webp`](assets/images/pexels-20239591.webp) | alirezamani wedding team | [Chỉnh cà vạt trước khi chụp](https://www.pexels.com/photo/close-up-of-a-man-fixing-his-tie-20239591/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-16495457.webp`](assets/images/pexels-16495457.webp) | Margarita | [Ánh vàng trong studio](https://www.pexels.com/photo/an-empty-photography-studio-16495457/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-33365000.webp`](assets/images/pexels-33365000.webp) | Darcy Lis &#124; Photography & travels | [Chuẩn bị ánh sáng](https://www.pexels.com/photo/professional-photography-studio-setup-with-equipment-33365000/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-20479949.webp`](assets/images/pexels-20479949.webp) | Alexander Mass | [Chi tiết vest màu be](https://www.pexels.com/photo/close-up-of-groom-in-suit-20479949/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-26800055.webp`](assets/images/pexels-26800055.webp) | Eduardo Gorghetto | [Ống kính trên bàn](https://www.pexels.com/photo/camera-lens-on-table-26800055/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-18981183.webp`](assets/images/pexels-18981183.webp) | Olena Bohovyk | [Máy ảnh dưới đèn vàng](https://www.pexels.com/photo/vintage-camera-on-table-18981183/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-10942081.webp`](assets/images/pexels-10942081.webp) | Son Pham | [Máy ảnh và cuộn phim](https://www.pexels.com/photo/close-up-shot-of-a-camera-placed-on-a-wooden-table-10942081/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-4771446.webp`](assets/images/pexels-4771446.webp) | Dương Nhân | [Bộ ống kính](https://www.pexels.com/photo/camera-lenses-on-table-4771446/) | [Pexels License](https://www.pexels.com/license/) |
| Chân dung / CV | [`pexels-30359448.webp`](assets/images/pexels-30359448.webp) | Sema Nur | [Dụng cụ chụp ảnh](https://www.pexels.com/photo/vintage-camera-and-accessories-on-wooden-table-30359448/) | [Pexels License](https://www.pexels.com/license/) |

- **Avatar** dùng hai SVG do nhóm tạo. Chữ [L](assets/images/linh-initial.svg) đại diện cho Linh và chữ [G](assets/images/gradstudio-initial.svg) đại diện cho GradStudio.
- **Video nền và poster** dùng bảy ảnh trong bảng. Từ trên xuống bên trái là 1205651, 15005450, 16495457, 5588404. Từ trên xuống bên phải là 20239591, 9258380, 5905436. Video giữ bố cục và chuyển động của bản nền cũ. Poster lấy từ khung hình đầu của video mới.
- Tài nguyên cũ được lưu tại [docs/pa1/archived-media](docs/pa1/archived-media/).
