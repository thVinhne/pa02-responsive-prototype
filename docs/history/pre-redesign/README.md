# Minh chứng trước đổi hướng thiết kế

Ngày 06/11/2026, người dùng yêu cầu gỡ trang dịch vụ và CSS riêng của giao
diện cũ, chuyển sang thiết kế chung trong `DESIGN.md` ở gốc repo.

Các ảnh dưới đây chuyển nguyên bản từ `checks/`, chỉ lưu lịch sử:

- `checks/index-360.png`, `checks/index-768.png`, `checks/index-1280.png`.
- `checks/validator-index.png`, `checks/validator-index-after-css.png`.

Khi tích hợp nhánh màn 2, giữ thêm minh chứng trước khi áp dụng CSS chung mới:

- `checks/admin-scheduling-browser.json`, `checks/admin-scheduling-keyboard.json`,
  `checks/admin-scheduling-static.json`, `checks/validator-admin-scheduling.txt`.
- `screenshots/admin-scheduling-360.png`, `screenshots/admin-scheduling-768.png`,
  `screenshots/admin-scheduling-1280.png` và các bản `-interactive`, `-booking`.

Đường dẫn trong danh sách trên tính từ thư mục lịch sử này. Các file màn 2
được giữ nguyên nội dung; đường dẫn nhúng trong JSON/log phản ánh vị trí lúc
chạy kiểm tra, không phải đích nghiệm thu hiện hành. Validator màn 2 cuối
trước merge ghi HTTP 403, không phải kết quả đạt W3C. Sau khi đổi CSS chung,
chưa chạy kiểm tra mới cho màn 2 (**NOT RUN**).

Chúng không chứng minh responsive hoặc HTML của thiết kế mới. Không chuyển
lại vào thư mục minh chứng hiện hành để dùng cho bài nộp mới.
Prompt và log gốc giữ trong `brief.md`, `AI-LOG.md`; quy ước giao diện ghi
trong lịch sử đã hết hiệu lực.
