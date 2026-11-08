# AI-LOG.md — PA02 GradStudio

> Lịch sử trước ngày 06/11/2026 bên dưới được giữ nguyên để truy vết.
> Quy ước màu/font, slideshow, chat và yêu cầu bám giao diện nguồn trong
> các mục cũ đã hết hiệu lực. Dùng DESIGN.md và AGENTS.md hiện hành.
> Không thực thi lại prompt lịch sử như yêu cầu mới.

## 2026-11-04 — Chuẩn bị quy tắc và tài liệu dự án
Tool Codex.
Asked for Chuẩn bị quy tắc và tài liệu tham chiếu để nhóm
triển khai PA02 theo chủ đề GradStudio.
Kept AGENTS.md, tài liệu nghiệp vụ, hướng dẫn prototype và
các ảnh PA01 trong docs/pa1/.
Changed Ghi thông tin nhóm PA02 hiện tại trong README;
giữ thông tin nhóm cung cấp chủ đề trong tài liệu nguồn.
Rejected Không ghi nhận đề xuất AI bị loại bỏ.


## 2026-11-04 — Chuẩn bị CSS chung
Tool Codex.
Asked for Tạo nền tảng CSS dùng chung cho ba trang theo
mục 7 của AGENTS.md, chưa viết bố cục riêng từng màn.
Kept Design tokens, typography, container linh hoạt,
class button, form-label, form-control và trạng thái tương tác.
Changed Không ghi nhận chỉnh sửa thêm trong lượt này.
Assistant kiểm tra biến CSS, spacing, tương phản các cặp màu
nền trơn và phạm vi sửa file. Lúc này chưa có HTML nên
chưa kiểm tra responsive hoặc W3C.
Rejected Thay đổi bảng màu so với bảng màu do AI cung cấp.


## 2026-11-04 — Thống nhất quy định màu
Tool Codex.
Asked for Cập nhật các file quy định theo bảng màu đã thống nhất.
Kept Bảng kem–nâu, màu chữ chính/phụ, nút, focus và trạng thái.
Changed Bổ sung vai trò và giới hạn sử dụng màu vào AGENTS.md,
README.md và tokens CSS chung. Vàng đồng nhạt chỉ dùng trang trí;
màu trạng thái phải kèm chữ hoặc dấu hiệu khác.
Rejected Không ghi nhận.


## 2026-11-05 — Chuẩn bị assets và ảnh tham chiếu màn 1
Tool none.
Asked for Cách chuẩn bị ảnh cục bộ và nguồn đối chiếu để dựng
đầy đủ màn Dịch vụ và chat.
Kept Năm ảnh hero, ảnh dịch vụ, gallery, avatar và ảnh chụp
bổ sung trong docs/pa1/reference/screen-1/.
Changed Chốt giữ slideshow năm ảnh bằng HTML/CSS thuần
thay cho phương án chỉ hiển thị một ảnh hero.
Rejected Không ghi nhận đề xuất khác bị loại bỏ.


## 2026-11-05 — Dựng cấu trúc HTML màn 1
Tool Codex.
Asked for Dựng index.html semantic theo tài liệu và ảnh nguồn,
chỉ nạp common.css, chưa viết CSS riêng hoặc JavaScript.
Kept Header, hero, ba gói dịch vụ, gallery, quy trình,
các phần giới thiệu, chat mẫu, footer và điều hướng demo.
Changed Chuyển chat thành hội thoại mẫu hiển thị sẵn,
ghi rõ gửi tin nhắn chưa kết nối; dùng anchor đến nhóm gallery
và chuẩn bị năm radio cho slideshow.
Assistant kiểm tra h1, cấp heading, label, alt, ID, anchor
và đường dẫn ảnh. Hai link liên trang lúc này chờ tích hợp.
Rejected Không ghi nhận.


## 2026-11-05 — Hoàn thiện CSS riêng và kiểm tra màn 1
Tool Codex.
Asked for Hoàn thiện bố cục mobile first, slideshow radio/CSS,
focus bàn phím, kích thước chữ, vùng bấm và tương phản hero.
Kept services.css, tokens chung, nội dung HTML và slideshow
chọn ảnh thủ công, không JavaScript.
Changed Khi xem ảnh chụp trong Chrome, assistant phát hiện
Georgia hiển thị dấu tiếng Việt không nhất quán do font fallback.
Assistant ưu tiên Times New Roman cho tiêu đề riêng của màn 1
và kiểm tra lại 360, 768, 1280 px.
Với bản trước khi đổi chat nổi, assistant báo không cuộn ngang,
không phát hiện chữ dưới 16 px hoặc vùng bấm đứng riêng dưới 44 px.
Năm label chọn đúng slide; phím mũi tên đổi radio; focus,
skip link và anchor hoạt động khi JavaScript tắt.
Tương phản chữ trắng trên năm ảnh sau lớp phủ lần lượt là
6,67; 6,67; 6,73; 6,66; 6,80:1.
W3C Nu API trả messages: []; git diff --check đạt.
Rejected Sau lượt này, tôi yêu cầu thay phương án chat nằm
trong luồng ở mọi kích thước để giữ cách trình bày gần prototype hơn, thay đổi "Thư viện ảnh" từ cột dọc thành hàng ngang cho từng nội dung.
## 2026-11-06 — Tách thiết kế chung và gỡ giao diện cũ

Tool Codex.
Asked for Di chuyển my-appointments.md từ Downloads vào repo, tạo DESIGN.md
chung dựa trên file đó, bỏ quy ước giao diện cũ và xóa index.html/CSS riêng.
Kept Nghiệp vụ, dữ liệu xuyên suốt, yêu cầu kỹ thuật, assets ảnh và lịch sử
prompt/log. Tài liệu PA01 được ghi rõ là tham chiếu nghiệp vụ, không là chuẩn UI.
Changed Di chuyển file nguồn vào docs/design/my-appointments.md; cập nhật
tham chiếu, alias màu/font chung và prompt mẫu cho vị trí tài liệu mới.
Tạo DESIGN.md theo hướng giấy ngà, xanh rêu, đỏ rượu, Merriweather và
Be Vietnam Pro; đồng bộ nền tảng common.css, AGENTS.md và README.md.
Xóa index.html và css/services.css. Chuyển 5 ảnh kiểm tra cũ từ checks/
sang docs/history/pre-redesign/checks/, giữ nguyên SHA256 từng file.
Rejected Các quy ước bám bố cục nguồn, kem–nâu, font hệ thống là lựa chọn
chính, slideshow/chat cố định theo bản nguồn không còn áp dụng.
Không thực thi prompt triển khai nằm trong file được nhập.
Font cục bộ chưa nhập; common.css có fallback và chưa có @font-face.
Kiểm tra trang mới: NOT RUN (chưa có HTML). Không dùng kết quả W3C hoặc
responsive cũ làm minh chứng cho giao diện mới.
Kiểm tra tài liệu/nền tảng: 18 token màu khớp DESIGN.md và common.css;
9 mức spacing, kích thước chung và tham chiếu biến CSS nhất quán;
35 liên kết Markdown nội bộ có đích. Đặc tả màn 3 giữ đủ I01–I14 và
A01–A21. Không còn mã màu palette cũ trong tài liệu hiện hành/CSS chung.
Đã đối chiếu Git HEAD: giữ nguyên nội dung gốc của 5 tài liệu PA01,
các mục prompt/log lịch sử và SHA256 của 5 ảnh đã lưu trữ.

## 2026-11-07 — Tổng hợp duyệt và triển khai màn 1
Tool Codex.
Asked for Dựng và kiểm tra màn Dịch vụ và chat theo bố cục nhật ký ảnh phim
đã duyệt qua các lượt 07–08/11, được tổng hợp trong `brief.md`.
Kept Hero đủ khung nhìn, video nền, slideshow Polaroid, ba thẻ gói, album
lật quanh gáy, chat thu gọn và lối chuyển vai ở chân trang. Giữ ảnh, nguồn
ảnh, video, poster và font cục bộ.
Changed Đưa bản duyệt vào `index.html`, `css/services.css` và
`js/services.js`, sửa đường dẫn tương đối và ghi chờ tích hợp vì chưa có
HTML của màn 2 và 3. Ở 360 px, chia đều hai cột khi còn hai bìa album.
Chrome đo mỗi bìa 136 × 175 px ở 360 × 751 và 360 × 900. Sau phản hồi về
chiều cao trang ảnh, giữ chỗ theo lượt cao nhất để cụm nút đứng yên khi
lật. Chrome đo nút video và hai nút lật chỉ 14 px trên màn nhỏ, nên bỏ
cỡ chữ ghi đè để dùng mức chung 16 px. Đo lại ở 360 × 751, chữ vừa nút,
vùng bấm đạt và trang không cuộn ngang.
Chrome kiểm tra qua `file://` ở 360, 768 và 1280 px với JavaScript bật
và tắt. Đã thử link xem gói, chat, album và các thao tác mô phỏng của bản
lúc đó. Khi tắt JavaScript, chín lượt ảnh và 27 link ảnh vẫn có sẵn.
Đã rà 118 đường dẫn và anchor, chạy `node --check` và `git diff --check`.
W3C Nu của bản lúc đó trả 0 lỗi và 0 cảnh báo. Đã lưu ba ảnh toàn trang
và báo cáo W3C. Zoom 200% và nghiệm thu liên trang **NOT RUN**.
Rejected Sổ ý tưởng, nhãn xem thử, dòng Mở album trên điện thoại và link
tư vấn dưới album Tốt nghiệp theo phản hồi khi duyệt. Dọn các bản xem
thử sau khi chuyển sang trang chính.


## 2026-11-08 — Rà checklist màn 1 và chuẩn bị tài nguyên PA02
Tool Codex.
Asked for Chỉnh khung chat, rà màn 1 theo mục Fix these, xóa ảnh trong archive
PA01 và đề xuất tên commit cho ảnh, video PA02.
Kept Hai tin nhắn mẫu ở cuối phần tư vấn, khung chat thu gọn ở 390 px trở xuống
và khung rộng 328 px trên mốc này. Tên commit đề xuất là
`chore(assets): add PA02 images and hero video`.
Changed Cân lại khoảng cách và vùng cuộn trong khung chat. Bản đầu vẫn cho bấm
Gửi mẫu. Khi đối chiếu brief, bài kiểm tra Chrome xác nhận nút còn hoạt động,
nên khóa ô nhập và nút gửi ngay trong HTML, kèm ghi chú PA#2. Kiểm tra lại
bằng Chrome và Playwright ở 360 px với JavaScript bật và tắt. Cả hai lần đều
thấy hội thoại, nút bị khóa và ghi chú. `node --check` đạt. W3C Nu cho bản
sau sửa **NOT RUN**. Xóa 49 tệp ảnh trong archive PA01 bằng PowerShell, rồi
kiểm tra thư mục còn một video MP4 và hai tệp Markdown.
Rejected Cách gửi tin mẫu bằng JavaScript vì mục Fix these yêu cầu nút gửi
bị vô hiệu hóa và có ghi chú nhìn thấy được.
