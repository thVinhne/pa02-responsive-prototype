# Font của màn 3

Nguồn: kho Google Fonts chính thức. Bổ sung Playfair Display ngày 06/11/2026
theo yêu cầu làm tên ứng dụng, tiêu đề và logo có nét nghệ thuật.
Các file là TTF đầy đủ, không cắt riêng Latin; không cần CDN khi mở trang.

| File cục bộ | Nguồn |
| --- | --- |
| PlayfairDisplay-Variable.ttf | https://github.com/google/fonts/blob/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf |
| PlayfairDisplay-Italic-Variable.ttf | https://github.com/google/fonts/blob/main/ofl/playfairdisplay/PlayfairDisplay-Italic%5Bwght%5D.ttf |
| PlayfairDisplay-OFL.txt | https://github.com/google/fonts/blob/main/ofl/playfairdisplay/OFL.txt |
| Merriweather-Variable.ttf | https://github.com/google/fonts/blob/main/ofl/merriweather/Merriweather%5Bopsz%2Cwdth%2Cwght%5D.ttf |
| Merriweather-OFL.txt | https://github.com/google/fonts/blob/main/ofl/merriweather/OFL.txt |
| BeVietnamPro-Regular.ttf | https://github.com/google/fonts/blob/main/ofl/bevietnampro/BeVietnamPro-Regular.ttf |
| BeVietnamPro-SemiBold.ttf | https://github.com/google/fonts/blob/main/ofl/bevietnampro/BeVietnamPro-SemiBold.ttf |
| BeVietnamPro-OFL.txt | https://github.com/google/fonts/blob/main/ofl/bevietnampro/OFL.txt |

Hai họ font hiện dùng: AP Playfair cho tên thương hiệu, tiêu đề và số lớn;
AP Be Vietnam cho thông tin, trạng thái, giá và điều khiển.
Playfair có trục wght 400–900 ở cả bản đứng và bản nghiêng; CSS đăng ký
hai face riêng, đúng style và range. Be Vietnam có face riêng 400 và 600.
Font dùng font-display: swap và tên AP riêng. File Merriweather từ phiên bản
trước được giữ trong repo, CSS hiện tại không nạp font này.

Đã đọc bảng cmap và fvar của hai TTF Playfair: không thiếu ký tự trong
các chuỗi tiếng Việt kiểm tra gồm tên trang, tiêu đề, thương hiệu,
tên Linh, gói, trạng thái, thời gian và số tiền. Đã xem mẫu chữ raster
từ TTF bằng Pillow/FreeType, gồm dấu và chữ nghiêng thật.
Các kiểm tra này không thay thế Rendered Fonts trong trình duyệt.
Việc nạp font bằng file:// và hiển thị thực tế trong trình duyệt
chưa được xác nhận; không coi thông tin nguồn này là kết quả đó.
