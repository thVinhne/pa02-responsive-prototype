# Prompt thực sự đã gửi assistant

## 04/11/2026 — Chuẩn bị nền tảng CSS chung

Nội dung bên dưới được lưu nguyên văn, bao gồm cách đánh số của prompt.

```text
Đọc và tuân thủ AGENTS.md trong repository hiện tại. Thực hiện bước 5: chuẩn bị nền tảng CSS chung cho ba thành viên.

Kiểm tra tài liệu và file hiện có trước khi sửa.

Nhiệm vụ:
1. Tạo hoặc hoàn thiện css/common.css:
   - box-sizing, design tokens, typography, ảnh và container linh hoạt;
   - class chung cho nút/link dạng nút, label và input;
   - trạng thái hover, focus-visible và disabled phù hợp.
   Tuân thủ các thông số CSS trong mục 7 của AGENTS.md.
   Chưa viết bố cục riêng cho hero, chat hoặc lịch.


3. Lưu nguyên văn prompt này vào brief.md, giữ các prompt cũ.

4. Bổ sung README.md cách sử dụng class chung và thứ tự nạp CSS.

Chỉ sửa css/common.css, .gitignore, brief.md và README.md.
Chưa tạo HTML hoặc CSS riêng của từng trang.

Sau khi làm, trả lời qua chat:
- Liệt kê thay đổi và giải thích các quyết định.
- Đưa ví dụ HTML sử dụng class chung trong câu trả lời.
- Báo kiểm tra đã chạy và phần chưa kiểm tra.
- Nếu chưa có HTML, ghi rõ chưa kiểm tra responsive/W3C.
- Đề xuất checklist kiểm tra và thông điệp commit để tôi dùng trong GitHub Desktop.
```

## 04/11/2026 — Thống nhất quy định màu

Prompt nguyên văn; “bảng màu trên” tham chiếu bảng kem–nâu cùng
vai trò màu trạng thái đã trao đổi trong chat, được ghi cụ thể ở
mục 7 của AGENTS.md và phần bảng màu của README.md.

```text
Cập nhật các file quy định về màu theo bảng màu trên
```

## 05/11/2026 — Dựng cấu trúc HTML màn 1

Prompt nguyên văn:

```text
Đọc và tuân thủ AGENTS.md. Thực hiện bước 7: dựng cấu trúc
HTML cho màn 1 — Dịch vụ và chat.

Trước khi sửa, đọc README.md, docs/pa1/PROPOSAL.md,
docs/pa1/LINK.md; xem ảnh chính màn 1 và các ảnh bổ sung trong
docs/pa1/reference/screen-1/. Kiểm tra assets/images/ hiện có.

Yêu cầu:
1. Tạo index.html ở gốc repository, đủ các phần của màn nguồn:
   header, hero, gói dịch vụ, gallery, quy trình, chat và footer.
   Đối chiếu tài liệu để xác định nội dung; nêu rõ nếu nguồn thiếu.

2. Giữ slideshow hero, dùng hero-01.avif đến hero-05.avif.
   Chuẩn bị cấu trúc HTML để triển khai bằng CSS thuần ở bước 8.
   Lượt này chưa cần hiệu ứng chuyển ảnh.

3. Dùng HTML semantic: doctype, lang="vi", UTF-8, viewport,
   một h1, heading đúng cấp, landmark phù hợp, label hiển thị
   cho input và alt phù hợp cho ảnh.

4. Nạp css/common.css và sử dụng các class chung trong README.
   Chưa tạo hoặc nạp css/services.css; chưa viết CSS inline,
   thẻ style hoặc JavaScript.

5. Thực hiện hành vi tĩnh theo mục Chuẩn bị màn 1 trong README:
   #packages, #chat, my-appointments.html và
   admin-scheduling.html. Ghi rõ chuyển sang góc nhìn Admin.
   Chat mẫu hiển thị sẵn; gửi tin nhắn thật chưa kết nối.

6. Dữ liệu viết trực tiếp trong HTML; có nội dung dài để kiểm tra
   xuống dòng. Giữ nội dung quan trọng của PA01.

7. Lưu nguyên văn prompt này vào cuối brief.md, giữ prompt cũ.

Chỉ tạo/sửa index.html và brief.md.
Không tạo trang của thành viên khác hoặc sửa CSS chung.

Sau khi làm, báo nội dung đã dựng, phần nguồn còn thiếu,
kiểm tra đã chạy và phần chưa kiểm tra.
Không tuyên bố đạt responsive hoặc W3C nếu chưa kiểm tra.
```
