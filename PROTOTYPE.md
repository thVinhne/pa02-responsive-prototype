# Prototype GradStudio

## Trạng thái sau tích hợp main ngày 06/11/2026

Quy tắc hiện hành lấy từ `AGENTS.md` và `DESIGN.md` trên main. Các mô tả
màn 2 dưới đây ghi lại bản HTML từ nhánh `prototype/screen2`; không phải
quy chuẩn thiết kế chung. HTML chưa được sửa trong lượt resolve tài liệu.
CSS chung đã đổi theo main, nên các ảnh/kết quả kiểm tra cũ được lưu lịch
sử; responsive, font, tương phản và W3C sau merge là **NOT RUN**.

Ở lần tích hợp ngày 06/11, `index.html` cũ đã được gỡ và CSS vẫn dùng font
dự phòng vì chưa nhập font cục bộ mới.

Bản trên `main` đã có `index.html` mới cho màn Dịch vụ và chat. Màn Admin
nằm ở `admin-scheduling.html` trên nhánh `prototype/screen2`. Tệp
`my-appointments.html` chưa có trên hai nhánh của PR này. Cần kiểm tra lại
điều hướng giữa các trang sau khi tích hợp. Trạng thái mô phỏng của mỗi
trang được xử lý riêng.

## Màn 2 — Admin tư vấn và xử lý lịch (06/11/2026)

Phần này ghi lại bản triển khai màn 2.

- Mở trực tiếp `admin-scheduling.html`. Trang nạp `css/common.css` trước khối CSS riêng trong HTML, theo yêu cầu chỉ tạo một HTML. Không sửa CSS chung, không cần build. Người dùng đã cho phép JavaScript thuần ở lượt cập nhật sau; script nằm trong HTML, không dùng framework/dependency.
- So với PA01, form booking chuyển từ dưới chat sang nửa dưới cột phải. Nửa trên là lịch booking rút gọn cố định; không còn cột tài nguyên hoặc gợi ý giờ. Thẻ tóm tắt lịch bên trái đã bỏ. “Booking mới”, “Lịch đã thống nhất” và booking “Chờ cọc” là các trạng thái của cùng thẻ bên phải.
- Từ 64rem, trang dùng chiều cao viewport: chỉ danh sách khách bên trái, vùng tin nhắn giữa và form booking bên phải cuộn dọc. Tiêu đề/tìm kiếm/bộ lọc bên trái và lịch phía trên bên phải nằm ngoài các vùng cuộn. Cột phải chia hai phần bằng nhau ở chiều cao thông thường; cửa sổ thấp tối đa 46rem cho lịch lấy chiều cao tự nhiên để tránh chồng lên form. Ở màn nhỏ, các cột xuống dòng theo responsive; danh sách và booking vẫn có vùng cuộn riêng.
- Prompt nói bốn trạng thái nhưng nêu ba tên. “Hoàn thành” được lấy từ ảnh nguồn làm trạng thái thứ tư. Bộ lọc dùng dropdown một hàng với nhãn “Lọc”; dropdown trạng thái của Linh nằm cạnh thông tin hội thoại trên desktop, xuống hàng nếu thiếu chỗ. Đổi trạng thái hội thoại không xác nhận cọc của booking.
- Có thể chọn cả năm hội thoại bằng nút gốc, dùng chuột hoặc Enter/Space. Dữ liệu đầu của bốn khách khác lấy từ tin nhắn xem trước đã có trong HTML, không tự dựng thêm nội dung tư vấn. Mỗi khách giữ riêng lịch sử, bản nháp, vị trí cuộn và trạng thái trong phiên xem. Quay lại Linh giữ nguyên tiến trình booking.
- Mỗi mục danh sách có avatar 52px, hai dòng nội dung: tên ở trên cùng; đoạn chat và thời gian cùng hàng bên dưới. Đoạn chat dùng ellipsis, không xuống dòng; tên dài cũng rút gọn trong box nhỏ và có tooltip chứa đủ tên. Padding cuối là 10px theo chỉnh sửa trực tiếp và xác nhận mới nhất của người dùng, nên mục cao 72px. Không còn badge trạng thái làm tăng chiều cao từng mục; trạng thái có trong dropdown, bộ lọc, tooltip và nhãn truy cập của nút.
- Nội dung mẫu: Linh hỏi 09:00 ngày 24/10/2026, Mai bận 08:00–12:00; Linh đồng ý makeup 13:00–14:00 với Mai và chụp 14:00–16:00 với Tuấn tại Phòng B. Hội thoại vẫn “Đang tư vấn”; đồng ý giờ chưa đồng nghĩa đã cọc hoặc đã đặt lịch.
- Bản nháp GS-1024, Tốt nghiệp Premium, giá 1.800.000đ, cọc 540.000đ, còn lại 1.260.000đ. Khoản còn lại thanh toán sau buổi chụp.
- Với JavaScript: tìm kiếm tên có/không dấu kết hợp bộ lọc trạng thái, trạng thái rỗng và số lượng kết quả. Dropdown trạng thái đổi đúng khách đang mở và cập nhật số lượng bộ lọc. Trả lời khách “Chưa trả lời” tự chuyển hội thoại đó sang “Đang tư vấn”.
- Tin nhắn được thêm vào hội thoại bằng textContent (không diễn giải HTML người dùng nhập). Gửi đề xuất 14:00 hoặc 15:00 sẽ chờ phản hồi mô phỏng của Linh. Đồng ý cho phép tạo booking; từ chối chuyển về tư vấn và khóa tạo booking. Đổi ngày/giờ hoặc chỉnh lại booking đã tạo đều yêu cầu chốt lại. Ngày ngoài 24/10/2026 chưa có dữ liệu nên khóa gửi đề xuất/tạo booking.
- Tạo booking chỉ đổi trạng thái trong thẻ hiện tại sang Chờ cọc 30%, có tóm tắt thời gian và giá. Không gửi tới khách, không giữ tài nguyên, không thanh toán, không lưu qua reload và không gọi mạng/storage. Các thông báo thành công đều ghi rõ phạm vi mô phỏng.
- Giá và phân công cố định theo gói mẫu; makeup là dịch vụ đã bao gồm và khóa chỉnh. Thuê áo cử nhân chưa có báo giá nên chưa cho chọn. Không tự suy đoán giá hoặc tính thêm phí.
- Khi tắt JavaScript: danh sách khách mẫu, nội dung chat Linh, form, lịch và liên kết vẫn đọc/điều hướng được. Các nút chọn hội thoại, tìm kiếm, lọc, trạng thái và xử lý mô phỏng bị disabled, có noscript giải thích. Không cam kết tương tác động hoạt động khi JavaScript tắt.
- Lịch chỉ có cột thời gian và booking: khung 08:00–12:00 đã có lịch; các khung mẫu của Linh chưa tạo booking ban đầu. Các khoảng khác ghi “Chưa có dữ liệu” thay vì khẳng định trống. Tạo GS-1024 cập nhật đúng khung thành “Chờ cọc”, không coi là giữ lịch chính thức. Không hiển thị nhân sự/phòng trong lịch rút gọn; phân công vẫn ở form Linh. Giờ 15:00 vẫn có trong select của form theo PA01, không còn thẻ gợi ý riêng.
- Khi mở khách khác, thẻ booking ghi rõ chưa có dữ liệu của khách đó; không hiện form hoặc booking của Linh cho họ. Chưa tự suy đoán gói/giá/lịch của bốn khách khác từ tin nhắn ngắn.
- Luồng nghiệp vụ dự kiến sau tạo booking là sang `my-appointments.html` ở trạng thái Chờ cọc. Màn 3 chưa có trong repository: hiện tạo booking chỉ cập nhật thẻ trong màn 2, không tự điều hướng tới file thiếu. Liên kết demo màn 3 vẫn có ghi chú chờ tích hợp trong “Thông tin bản mẫu”.
- Có link quay lại `index.html` và link ghi rõ góc nhìn Admin. Không thay hành động gửi chat của khách thành điều hướng quản trị.

Lần triển khai màn 2 chưa đối chiếu rubric PA02. Nhật ký kiểm tra nằm trong [AI-LOG.md](AI-LOG.md) và minh chứng của bản trước khi đổi thiết kế được lưu tại [docs/history/pre-redesign/checks/](docs/history/pre-redesign/checks/).

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
