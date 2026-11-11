# Self-assessment — PA#2 GradStudio

| MSSV | Thành viên |
| --- | --- |
| 24120136 | Trần Lê Xuân Tân |
| 24120157 | Lê Thái Vinh |
| 24120394 | Nguyễn Đặng Khôi Nguyên |

## Trạng thái tự đánh giá ngày 11/11/2026

Mức 100/100 trong bản trước cần nhóm xác nhận lại sau lượt kiểm chứng này.
Điểm hiện tại chưa chốt. Rubric PDF chưa có trong repository hoặc tệp đính
kèm của phiên kiểm tra. Bảng dưới giữ tên tiêu chí và điểm tối đa từ báo
cáo trước để nhóm đối chiếu, các ô tự chấm chờ nhóm quyết định.

| Criterion | Max theo báo cáo trước | I claim | Evidence hiện tại |
| --- | ---: | --- | --- |
| Three linked screens that trace back to PA#1 | 20 | Chưa chốt | PASS mở file:// và dùng Enter từ Dịch vụ qua Admin, Lịch chụp rồi về Dịch vụ khi tắt JS. PROTOTYPE.md đối chiếu ba ảnh PA#1 và ghi nguồn tác giả khác. Xác nhận của giảng viên về nguồn PA#1 còn thiếu. |
| Responsive at 360, 768 and 1280 px | 25 | Chưa chốt | PASS 18 lượt Chrome 157.0.8103.50 ở 360/768/1280 với JS bật/tắt, viewport cao 900, DPR 1. clientWidth bằng scrollWidth trong từng lượt, ảnh hiển thị tải đủ. Chín PNG mới trong screenshots/ và hash nằm trong checks/browser-review-2026-11-11.json. PASS zoom thực tế 200% với JS bật/tắt, outerWidth 1280, innerWidth 628 và DPR 2. PASS tên dài và cuộn độc lập Admin trong cửa sổ thấp. |
| Semantic, valid HTML | 20 | Chưa chốt | PASS một h1, ID duy nhất, alt, label tường minh hoặc bao input, type cho button và 189 tham chiếu cục bộ. Accessibility tree của hai trang sửa có banner/navigation/main/contentinfo. Hai HTML sửa gửi lại W3C Nu 26.11.10 đạt 0 errors, 0 warnings. Báo cáo index.html khớp hash nguyên byte của HTML hiện tại. Ba hash đầy đủ nằm trong checks/validator-*.txt và checks/static-review-2026-11-11.json. |
| Design you can check | 10 | Chưa chốt | Giữ DESIGN.md và common.css. PASS font Merriweather và Be Vietnam Pro cục bộ qua CDP Platform Fonts, reduced motion, focus skip link ở 18 lượt. Đo bề mặt render của chat/note/nút cọc đạt 5,23–9,33 phần 1. PASS mẫu tin 1/2/3, Enter gửi, đổi lịch cần đồng ý mới, submit lặp, Hủy/Escape/Thành công cọc, lọc và reset. Toàn bộ khung hình video, in phiếu và thao tác kéo studio chưa chạy lại trong lượt này. |
| The brief and the rules file | 10 | Chưa chốt | brief.md giữ lịch sử, lưu nguyên văn prompt đính kèm một lần và câu trả lời chọn ba mẫu tin. AGENTS.md quy định nội dung HTML, file://, JS nâng cấp, focus, responsive và minh chứng. Đặc tả Admin và PROTOTYPE.md cập nhật theo code mới. |
| AI-LOG.md | 10 | Chưa chốt | Giữ các phần thành viên và lịch sử. Năm mục mới ở phần tích hợp chung ghi Tool, Asked for, Kept, Changed, Rejected, kết quả thực và giới hạn. Ghi rõ ngày tư vấn 23/10 do assistant chọn và lỗi ở bộ kiểm thử đã điều chỉnh. |
| Commit history | 5 | Chưa chốt | Đã đọc git log và trạng thái. HEAD hiện là 7ffe30b. Các thay đổi của lượt kiểm chứng đang ở working tree để nhóm xem và commit bằng GitHub Desktop. Lượt này chưa tạo commit. |

## What I did not manage


- Hồ sơ PA#1 cục bộ mang MSSV nhóm có tên WordLoop. Bộ GradStudio trong
  docs/pa1/ ghi nhóm tác giả khác. Nhóm cần xác nhận nguồn này với giảng viên.
- Tên ZIP dùng MSSV và ngày kiểm chứng. Quy tắc tên chính thức cần đối chiếu
  rubric khi có tệp. Bản ZIP cũ trong submission/ có 223 entry thuộc .git.
  Bản mới được kiểm riêng theo báo cáo đóng gói.

## What I would do differently

Nhóm sẽ bổ sung rubric và xác nhận nguồn PA#1 trước khi chốt điểm, rồi mở
bản giải nén trên thiết bị thật. 
