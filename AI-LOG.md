# AI-LOG.md — PA02 GradStudio

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