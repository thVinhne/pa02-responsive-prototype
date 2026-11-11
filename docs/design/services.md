# Thiết kế riêng — Màn 1: Dịch vụ và tư vấn

Ngày 08/11/2026 · **ĐÃ CHỐT THIẾT KẾ**.

## 1. Mục đích và trạng thái

Tạo một trang dịch vụ cùng phong cách nhật ký ảnh phim với màn 3 để khách
khám phá ảnh, chọn gói và bắt đầu cuộc tư vấn. Đây là đặc tả riêng màn 1,
không thay thế [DESIGN.md chung](../../DESIGN.md).

Người dùng đã chốt bố cục và tương tác sau các vòng xem thử. Màn dịch vụ
chính thức mở từ [index.html](../../index.html).

## 2. Cơ sở tham chiếu

- Nhận diện, palette, typography, spacing và nguyên tắc chung: DESIGN.md.
- Cấu trúc màn 3 do người dùng chỉ định: `my-appointments.html` trong thư
  mục PA#02, bên ngoài repo; đọc để tham khảo, không sửa hoặc di chuyển.
- HTML đó hiện tham chiếu CSS/JS chưa có ở cùng vị trí; chưa thể đối chiếu
  giao diện đã render. Phong cách ở bản này dựa vào HTML và đặc tả màn 3:
  chữ serif, giấy ngà, xanh rêu, đỏ rượu, ảnh Polaroid, đường kẻ mảnh.
- Chức năng và hành vi chuyển màn: `docs/pa1/LINK.md`, `PROPOSAL.md`.
  Không giữ bố cục, slideshow hoặc vị trí chat theo giao diện cũ.
- Ảnh minh họa và avatar nằm trong `assets/images/`. Nguồn ảnh, video nền và poster xem [PROTOTYPE.md](../../PROTOTYPE.md#nguồn-ảnh-và-video).

## 3. Hướng bố cục đã chốt

**Album ảnh mở**. Sau hero là slideshow phong cách và gói chụp, tiếp theo
là kệ album đầy đủ rồi phần tư vấn. Chat thu gọn ở góc dưới bên phải.

## 4. Bố cục từ trên xuống

| Vùng | Nội dung và hình thức |
| --- | --- |
| Header | Logo chữ GradStudio kèm biểu tượng máy ảnh/mũ tốt nghiệp theo HTML màn 3. Thanh điều hướng gồm Dịch vụ, Ảnh tham khảo, Lịch chụp của tôi và Chat với studio. Tài khoản Linh nằm cạnh thanh điều hướng |
| Hero | H1 “Giữ một thời, nhớ một đời.”, mô tả và hai CTA ở giữa. Video nền có ảnh GradStudio chuyển động nhẹ ở hai mép và vùng giấy sáng ở giữa. Thanh điều hướng và hero tạo thành khối mở đầu cao tối thiểu bằng khung nhìn. Phần gói dịch vụ bắt đầu sau khối này |
| Slideshow phong cách | Khối “Những ngày đáng nhớ” nằm bên trái các gói từ 1024 px, xếp phía trên ở màn hình hẹp hơn. Hai ảnh Polaroid đổi cùng chủ đề, có dải ảnh thu nhỏ và nút “Xem bộ ảnh” |
| Gói dịch vụ | Tiêu đề “Mỗi kỷ niệm, một cách giữ.” căn giữa phía trên cả cụm, dùng chữ serif cỡ 36–64 px theo độ rộng màn hình. Căn mép trên của ba thẻ với slideshow khi hiển thị hai cột. Ba thẻ cùng kích cỡ, khung ảnh 4:3 và nút tư vấn ở cuối thẻ. Tốt nghiệp Premium hiển thị quyền lợi và giá 1.800.000đ. Hai gói còn lại hiển thị “Liên hệ tư vấn” |
| Ảnh tham khảo | Tiêu đề “Chuyện kể qua khung hình.” căn giữa, cùng cỡ chữ với tiêu đề gói dịch vụ. Kệ ba album Tốt nghiệp, Kỷ yếu lớp và Chân dung. Từ 1024 px, kệ, bìa, trang và ảnh dùng kích cỡ lớn hơn. Mỗi album có một ảnh mở đầu lớn và hai lượt trang đôi kế tiếp. Album Kỷ yếu lớp và Chân dung có link tư vấn theo gói |
| Tư vấn | Lời mời trò chuyện và ba bước chuẩn bị cho buổi chụp |
| Footer / luồng demo | Tên studio và điều hướng cuối trang. Khối “Tiếp tục câu chuyện mẫu” nằm dưới điều hướng và có link chuyển vai sang Admin. |
| Khung chat | Khi thu gọn, nút nổi ở góc dưới bên phải chỉ hiển thị biểu tượng ở mọi độ rộng và có tên truy cập “Chat với studio”. Mục Chat với studio trên thanh điều hướng, nút nổi và CTA tư vấn mở cùng một khung chat |

Màn 1 dùng ảnh và lựa chọn dịch vụ làm trọng tâm. Vé hẹn, lịch tài nguyên,
thanh toán cọc và đạo cụ kéo/thả thuộc màn khác, không đưa vào phạm vi này.

## 5. Dữ liệu và nội dung

- Khách mẫu: Linh. Đối thoại nguồn: “Gói tốt nghiệp có makeup còn lịch
  24/10 lúc 09:00 không?” → “Để mình kiểm tra lịch cho bạn nhé”.
- Gói Tốt nghiệp Premium: có makeup, 2 giờ chụp, 30 ảnh chỉnh;
  giá 1.800.000đ. Chọn gói không tạo booking hoặc chốt tài nguyên.
- Kỷ yếu lớp và Chân dung/CV là danh mục đã có trong tài liệu nguồn;
  giá/chính sách chi tiết chưa có dữ liệu xác nhận, hiển thị Liên hệ tư vấn.
- Ảnh được ghi rõ là tham khảo. Không bịa studio thật, địa chỉ, đánh giá,
  số khách hoặc cam kết giao ảnh.

## 6. Hành vi phải giữ

| ID | Hành động | Kết quả trên màn 1 | Điều kiện và giới hạn |
| --- | --- | --- | --- |
| S01 | Xem gói chụp | Dưới 768 px, nhảy thẳng đến ba thẻ tại `#package-list`. Từ 768 px, đến đầu phần gói tại `#packages` | Dùng liên kết cùng trang, hoạt động khi tắt JavaScript |
| S02 | Tư vấn gói này | Mở khung chat tại chỗ và đổi nhãn gói đang hỏi khi JS bật | Giữ ngữ cảnh gói, không tạo booking |
| S03 | Chat với studio | Mở khung tại vị trí đang xem. Nút “Thu gọn” hoặc phím Escape trong khung thu gọn hội thoại | Giữ hội thoại và ngữ cảnh gói khi mở lại |
| S04 | Nhập và gửi tin | Ô nhập và nút Gửi tin nhắn bị vô hiệu hóa. Ghi chú giải thích tính năng chưa có trong PA#2 | Hội thoại mẫu có sẵn khi mở trang |
| S05 | Lịch chụp của tôi | Mở `my-appointments.html` từ menu, khối tư vấn hoặc chân trang | Dùng liên kết tương đối, hoạt động khi tắt JavaScript |
| S06 | Tiếp tục luồng demo với vai Admin | “Nhân viên studio: Mở hội thoại” mở `admin-scheduling.html` | Link chuyển vai riêng ở chân trang, hoạt động khi tắt JavaScript |
| S07 | Xem ảnh tham khảo | Bấm ảnh để mở hộp xem lớn, đóng bằng nút Đóng hoặc Escape và trở lại ảnh | Giữ link thật tới ảnh cục bộ để xem khi tắt JS |
| S08 | Đổi slide phong cách | Nút trước/sau, ảnh thu nhỏ và phím mũi tên khi focus trong bộ điều khiển | Hai ảnh đổi cùng chủ đề tốt nghiệp, kỷ yếu lớp hoặc chân dung |
| S09 | Lật Polaroid nhỏ | Mặt sau hiện gợi ý trang phục, bối cảnh hoặc cách chụp theo chủ đề. Nút “Tư vấn phong cách này” mở chat với gói tương ứng | Mũi tên ↶ ở góc trên bên trái và Escape đưa về mặt ảnh và trả focus. Đổi slide cũng đưa thẻ về mặt ảnh |
| S10 | Xem bộ ảnh theo slide | “Xem bộ ảnh” đưa tới thư viện và mở album cùng chủ đề. Bấm bìa để chuyển album | Link tư vấn dưới album Kỷ yếu lớp và Chân dung mở chat theo gói tương ứng |
| S11 | Lật album | Lượt đầu có tên album và một ảnh lớn. Hai lượt sau, mỗi trang có hai ảnh. Ảnh ngang xếp trên dưới. Cặp ảnh dọc hoặc vuông đặt cạnh nhau, cùng chiều cao và giữ tỉ lệ gốc. Bìa cứng lộ quanh hai trang, có nếp gáy, mép giấy nhiều lớp và góc gài ảnh. Một tờ hai mặt nhấc về phía người xem và xoay 180° quanh gáy. Trang sau đi từ phải sang trái, Trang trước đi chiều ngược lại. Với hai trang xếp dọc, Trang sau lật từ dưới lên và Trang trước lật từ trên xuống | Cụm lật nằm giữa dưới sách. Dưới 768 px, số trang nằm trên hai nút và cụm chừa chỗ cho nút chat nổi. Hai trang bằng kích thước. Khung sách lấy chiều cao của lượt cao nhất trong album để cụm lật không dịch chuyển. Chế độ giảm chuyển động đổi trang ngay. Khi tắt JS, các album và mọi lượt trang hiện tuần tự |
| S12 | Lấy album khỏi kệ | Chọn bìa để nhấc cuốn lên khỏi kệ. Bìa trước xoay 180° quanh gáy tại vị trí cuộn hiện tại, để lộ trang ảnh đầu tiên nằm yên bên dưới. Các cuốn còn lại dồn sang trái theo thứ tự số tăng dần. Khi đóng hoặc đổi album, cuốn đang xem trở về kệ theo đúng thứ tự. Nếu chọn liên tiếp, mở cuốn sau cùng | Mở ngay khi bật giảm chuyển động. Khi tắt JS, cả ba bìa vẫn là liên kết tới album tương ứng |
| S13 | Phát và tạm dừng video nền | Video 10 giây phát lặp không tiếng khi phần hình ở trong viewport. Nút “Tạm dừng video nền” giữ lựa chọn khi cuộn. Video vẫn phát khi mở chat và tạm dừng khi tab ẩn hoặc hộp xem ảnh mở | Hiện khung hình tĩnh khi giảm chuyển động, tắt JS hoặc video lỗi |

Khung dùng `details/summary` để mở và thu gọn bằng bàn phím hoặc khi tắt
JS. Khung khởi đầu thu gọn ở mọi độ rộng, còn hai tin nhắn mẫu nằm trong
phần tư vấn. CTA giữ link `#chat` tới hội thoại. Khi JS bật, CTA mở khung
tại chỗ và chuyển focus tới nút thu gọn. Ô nhập và nút Gửi bị khóa trong
PA#2. Từ 768 px, nút video nằm bên trái để tách khỏi nút chat bên phải.

## 7. Responsive và tính dễ dùng

| Độ rộng | Bố cục |
| --- | --- |
| 360 px | Header xuống dòng. Video nằm dưới chữ trong hero. Slideshow nằm trên ba thẻ gói xếp dọc. Khi mở một album, hai bìa còn lại chia đều hai cột trên kệ. Bìa bấm được qua ảnh và tên album. Hai trang sách xếp dọc. Hai tin nhắn mẫu nằm dưới phần tư vấn. Mở khung chat bằng nút nổi hoặc liên kết “Chat với studio”. Trên 390 px, khung mở rộng tối đa 328 px và cao khoảng 450 px, tự thấp hơn khi viewport thấp. |
| 768 px | Hero đặt nội dung trên nền video. Slideshow nằm trên phần gói. Ba thẻ gói và ba bìa album đều nằm cùng hàng trong phần tương ứng. Hai trang sách đặt cạnh nhau |
| Từ 1024 px | Hero có nền video phủ ngang. Tiêu đề và nút lớn dần theo viewport. Khung hai cột và thư viện rộng tối đa 100 rem. Từ 1280 px, riêng khung hai cột rộng tối đa 112 rem. Slideshow ở trái, ba thẻ gói ở phải. Khung chat neo góc dưới bên phải |

Từ 1024 px, header, phần tư vấn, dải chuyển màn và footer căn lề theo
khung thư viện rộng tối đa 100 rem. Ở cỡ chữ gốc 16 px, menu và nội
dung tư vấn dùng 18 px, tiêu đề tư vấn dùng 40–44 px và nút chat cao
ít nhất 52 px. Liên kết ở dải chuyển màn và footer dùng 17 px.

Dùng palette, token và quy ước typography từ DESIGN.md chung. Trang
nạp `css/common.css` trước CSS riêng để dùng Merriweather cho tiêu đề
và Be Vietnam Pro cho nội dung. Các file font và giấy phép OFL nằm tại
`assets/fonts/shared/`.

Ảnh nghiêng nhẹ nhưng chữ chính thẳng, không tràn viewport. Focus rõ,
link/nút đứng riêng tối thiểu 44 px; không hover làm đường truy cập duy nhất.
Chế độ giảm chuyển động dùng khung hình tĩnh ở hero và bỏ cuộn mượt.
Hai ảnh chuyển mờ nhẹ khi đổi slide. Thẻ ghi chú có hiệu ứng lật. Khi
tắt JS, hero có ảnh nền tĩnh và slideshow hiển thị cặp ảnh tốt nghiệp.
Các bìa vẫn dẫn tới từng album, với 27 ảnh có sẵn trong HTML.
Nội dung khung chat cuộn riêng khi viewport thấp để nút thu gọn luôn ở
trong tầm thao tác.

## 8. File triển khai

- [index.html](../../index.html) chứa nội dung chính và các đích điều hướng.
- [services.css](../../css/services.css) xử lý bố cục và hình ảnh của màn 1.
- [services.js](../../js/services.js) nâng cấp video, album và chat mẫu.
- Ảnh nằm trong `assets/images/`. Video nền và poster nằm trong `assets/videos/`.
