# Thiết kế riêng — Lịch chụp của tôi

## GradStudio Màn 3 theo phong cách nhật ký ảnh phim

Phiên bản 1.2 ngày 06/11/2026. Đã đưa vào cấu trúc tài liệu thiết kế chung của nhóm. Phạm vi triển khai: màn Lịch chụp của tôi của người 3. Đây là đặc tả thiết kế mới để Codex viết lại HTML/CSS màn 3, kèm tương tác mô phỏng. Bản 1.1 bổ sung góc studio với dây treo ảnh, ảnh có thể kéo/thả và máy ảnh tạo Polaroid minh họa.

## Quan hệ với thiết kế chung

Đọc [DESIGN.md chung](../../DESIGN.md) và [AGENTS.md](../../AGENTS.md) trước.
File này chỉ đặc tả màn 3; palette, font và kích thước chung lấy từ DESIGN.md.
Đường dẫn triển khai viết trong nội dung được tính từ gốc repo, trừ các link
Markdown. Prompt ở mục 15 là mẫu cho nhiệm vụ màn 3 trong tương lai, không
phải yêu cầu tự triển khai khi chỉ đọc hoặc di chuyển tài liệu này.

## 1 Quyết định thiết kế và nguồn tham khảo

Yêu cầu mới của người dùng: làm giao diện riêng theo phong cách hoài niệm nhẹ, có nhiều tương tác hữu ích; dựng lại hoàn toàn màn 3. Repo GradStudio ban đầu chỉ cung cấp chức năng, vai trò và câu chuyện nghiệp vụ. Không lấy bố cục, màu, font, thẻ lịch, cách trang trí hoặc ảnh chụp giao diện của bản mẫu làm chuẩn cần sao chép.

| Nội dung | Quy định mới |
| --- | --- |
| Hướng thẩm mỹ | Nhật ký ảnh phim với giấy ngà, mực xanh rêu, dấu đỏ rượu, khung Polaroid, dây treo ảnh, máy ảnh cổ và vé hẹn chụp |
| Mức độ hoài niệm | Vừa phải; dễ đọc và dễ dùng; chi tiết giấy, đường may và ảnh tạo không khí |
| Cấu trúc chính | Hero biên tập, bộ lọc gọn, vé hẹn ngang, nhật ký buổi chụp, ảnh tham khảo và góc chuẩn bị |
| Trọng tâm | Khách nhận ra ngay lịch của mình, giờ cần có mặt, trạng thái và số tiền cần cọc |
| Mức thay đổi | Thiết kế lại cấu trúc DOM, bố cục và component màn 3; không chỉ đổi màu giao diện cũ |
| Phạm vi nhóm | Dùng tokens, font và component chung trong DESIGN.md ở gốc repo; tài liệu này chỉ triển khai màn 3 |
| Nguồn chức năng | docs/pa1/PROPOSAL.md và docs/pa1/LINK.md; ảnh PA#1 chỉ giúp kiểm kê thông tin có trong màn |

Ba hướng đã cân nhắc: phòng tối ảnh phim phù hợp portfolio nhưng quá tối cho trang lịch; bảng quản trị retro dễ tra cứu nhưng ít cảm giác cá nhân; nhật ký ảnh phim giữ được sự ấm áp và kết hợp được lịch hẹn với ảnh. Đặc tả này chọn hướng nhật ký ảnh phim.

Cả nhóm dùng thiết kế chung trong DESIGN.md ở gốc repo và tự quyết bố cục từng màn. Giữ các yêu cầu kỹ thuật PA#2: HTML có sẵn nội dung, đường dẫn tương đối, responsive, HTML hợp lệ và xem được khi tắt JavaScript. Nhiệm vụ màn 3 không tự sửa quy tắc hoặc trang của thành viên khác.

## 2 Những việc khách cần thực hiện

1. Tìm lịch chụp theo trạng thái và ngày.
2. Xem đúng các mốc makeup, chụp, người phụ trách và khoản tiền.
3. Thử đủ hai nhánh Hủy và Thành công của thanh toán mô phỏng.
4. Xem ảnh gợi ý phong cách, mở các chi tiết buổi chụp và đánh dấu việc cần chuẩn bị.
5. In phiếu hẹn và khôi phục demo để kiểm tra lại.

Ảnh tham khảo, checklist và in phiếu là bổ sung UX được đề xuất theo yêu cầu tương tác của người dùng; không phải chức năng bắt buộc được suy ra từ PA#1. Không đưa chọn ảnh hậu kỳ, nhận file, đổi/hủy booking, đăng nhập hay thanh toán thật vào phạm vi này.

## 3 Ngôn ngữ thị giác

| Thành phần | Đặc tả | Giới hạn |
| --- | --- | --- |
| Nền | Giấy ngà; chấm hạt rất nhẹ bằng CSS hoặc SVG tĩnh | Độ mờ tối đa 0.03; không ảnh hưởng tương phản chữ |
| Chữ | Serif cho tiêu đề, sans serif cho thông tin và thao tác | Không dùng font viết tay cho dữ liệu, giá hoặc hướng dẫn |
| Vé hẹn | Khổ ngang, mép vé hoặc đường xé, phần ngày tách bằng đường đứt | Phần chữ và vùng bấm không bị khoét/cắt theo trang trí |
| Trạng thái | Dấu đóng kiểu con dấu, chữ Chờ cọc hoặc Đã đặt lịch kèm biểu tượng | Màu không phải dấu hiệu phân biệt duy nhất |
| Ảnh | Khung Polaroid, đáy ảnh có chú thích, một ít ảnh nghiêng 1–2 độ lúc nghỉ | Không nghiêng chữ đọc chính; không vượt viewport; ảnh trong góc studio tuân theo mục 3.1 |
| Đường nét | Viền mảnh, đường kẻ sổ và perforation ở vị trí có chủ đích | Không biến mọi khối thành hộp viền dày |
| Bóng | Nhẹ như giấy đặt trên bàn | Một mức bóng thường, một mức nổi; không nhiều bóng lồng nhau |
| Icon | SVG nét mảnh đồng nhất, nét khoảng 1.75 px | Không dùng emoji làm icon giao diện |
| Chuyển động | Ngoài góc studio: hover nhấc nhẹ tối đa 2 px, đổi màu và mở chi tiết. Góc studio có đung đưa, thả ảnh và máy ảnh theo mục 3.1 | Không autoplay slideshow hoặc parallax toàn trang. Chuyển động lặp chỉ nằm trong góc studio, có nút tắt và dừng khi reduced motion |

### 3.1 Góc studio có dây treo ảnh và máy ảnh

Đây là bổ sung theo yêu cầu trực tiếp của người dùng ngày 06/11/2026. Mục đích là khi nhìn vào đầu trang, người xem nhận ra một studio ảnh có chất hoài niệm, đồng thời có thể chạm và chơi với các đạo cụ. Cảnh này là giao diện HTML/SVG/CSS có tương tác, không phải một ảnh nền hoặc GIF giả có vùng bấm vô hình.

#### Thành phần và vị trí

| Thành phần | Hình thức bắt buộc | Vị trí và vai trò |
| --- | --- | --- |
| Dây treo ảnh | Dây hơi võng bằng đường cong SVG, 3 kẹp gỗ, 3 ảnh Polaroid có viền và bóng giấy | Ở phần trên của cảnh studio trong hero; ảnh đủ lớn để thấy chủ thể |
| Máy ảnh hoài niệm | Thân kem/xanh rêu, ống kính có các vòng rõ, nút chụp nổi, bộ phận flash và khe nhả ảnh | Dưới hoặc bên phải dây ảnh; là đạo cụ nhận diện chính và điều khiển thật |
| Mặt bàn và khay ảnh | Một vùng giấy/bàn nhỏ có chỗ cho ảnh rơi và ảnh vừa in | Nằm hoàn toàn trong cảnh, không đè lên tiêu đề hoặc vé hẹn |
| Đạo cụ phụ | Một nét đèn softbox/reflector, cuộn phim hoặc dải phim ở nền | Chỉ 1–2 chi tiết nhẹ bằng SVG, aria-hidden; không cạnh tranh với máy ảnh và nội dung |
| Thanh điều khiển nhỏ | Chuyển động Bật/Tắt, Sắp lại góc studio, lựa chọn màu ảnh nếu có | Tách khỏi các ảnh di chuyển, vùng bấm ít nhất 44 px, không bị ảnh rơi che |

Dựng máy ảnh đủ chi tiết để nhận ra thân máy, ống kính, nút chụp và khe nhả ảnh; không thay bằng một emoji hoặc icon camera nhỏ đặt cạnh chữ. Dùng SVG riêng/inline hoặc HTML/CSS; không thêm thư viện 3D, framework, canvas engine hay video nền. Bảng màu, font và stroke của trang vẫn giữ như mục 3–5.

Cảnh studio là một vùng tương tác phụ trong hero, trên desktop nằm bên phải phần chữ. Dự trù khoảng 340–400 px chiều cao trên desktop và khoảng 280–340 px trên mobile; chọn kích thước phù hợp để toàn bộ hình và điều khiển vừa khung. Giữ kích thước vùng ổn định trong lúc ảnh rơi hoặc máy ảnh nhả ảnh để không làm nội dung bên dưới nhảy vị trí. Trên 360 px, dùng ảnh và máy nhỏ hơn, xếp lại đạo cụ trong cảnh; không ép cả trang phải cuộn ngang.

#### Dây ảnh và thao tác thả ảnh

- Lúc đầu có 3 ảnh treo ở 3 vị trí kẹp; độ nghiêng tĩnh khoảng 1–2 độ. Khi chuyển động được bật, ảnh đung đưa chậm biên độ thêm tối đa khoảng 1.5 độ, chu kỳ 4–6 giây và lệch pha nhẹ. Ảnh đang được kéo hoặc vừa rơi không tiếp tục animation đung đưa.
- Mỗi kẹp có một button thật với tên như Thả ảnh tốt nghiệp. Bấm kẹp làm đúng ảnh đó tuột khỏi dây, rơi xuống vị trí đã dành trên mặt bàn, nghiêng nhẹ và dừng. Thời gian rơi khoảng 550–700ms, tăng tốc tự nhiên; chỉ một nhịp nảy rất nhỏ nếu cần. Không rơi ra khỏi cảnh, không rơi vô tận hoặc che CTA.
- Người xem có thể kéo ảnh bằng một tay nắm rõ ràng. Bắt đầu drag sau ngưỡng khoảng 6 CSS px, dùng Pointer Events và pointer capture; không kích hoạt mở ảnh sau một lần kéo. Không chặn thao tác cuộn toàn trang; touch-action chỉ áp dụng trên tay nắm cần kéo.
- Kéo lên gần đúng vị trí kẹp thì ảnh khớp lại dây; thả ở chỗ khác thì ảnh về một vị trí rơi hợp lệ trên bàn. Dùng tọa độ giới hạn theo kích thước cảnh, tính cả độ nghiêng, và tính lại khi resize. Không dùng overflow-x:hidden để giấu ảnh đã nằm ngoài viewport.
- Kéo không phải cách duy nhất: luôn có button Thả ảnh/Treo lại cho từng ảnh. Bàn phím và thao tác chạm một lần phải thực hiện được cùng trạng thái treo hoặc rơi. Escape hoặc pointercancel trong lúc kéo trả ảnh về vị trí ổn định trước đó.
- Vùng mở ảnh lớn và nút kẹp/tay nắm là các phần tử riêng, không lồng button vào link. Click ảnh khi không kéo vẫn mở lightbox như I05; focus không bị di chuyển theo từng frame animation.

#### Máy ảnh nhả Polaroid

1. Nhãn thao tác là Thử máy ảnh hoặc Tạo ảnh lưu niệm, kèm chú thích ngắn Ảnh minh họa. Dùng ảnh cục bộ đã có làm nguồn; đây không phải thao tác truy cập webcam hoặc chụp ảnh thật của người xem.
2. Khi bấm nút, nút chụp lún nhẹ, màn trập/ống kính đóng mở khoảng 100–160ms; chỉ tạo điểm sáng nhẹ trong bộ phận flash. Không chớp trắng toàn màn hình hoặc phát âm thanh tự động.
3. Một tấm Polaroid từ từ trượt ra từ khe máy trong khoảng 450–650ms, rồi nằm vào khay với độ nghiêng nhỏ. Màu ảnh có thể hiện dần trong 250–400ms tiếp theo. Trên ảnh có chú thích GradStudio và Ảnh tham khảo, không thể hiện đây là ảnh buổi chụp đã diễn ra của Linh.
4. Có thể thêm ba radio Gốc / Hoài niệm / Đen trắng để thay cách hiển thị ảnh minh họa. Bộ lọc chỉ tác động ảnh trong góc studio, không phủ filter lên chữ, vé hẹn hoặc cả trang. Đổi bộ lọc không gọi API hoặc giả tạo file ảnh mới.
5. Chỉ có một ảnh vừa in trong khay. Mỗi lần chụp tiếp thay ảnh ở vị trí đó bằng ảnh nguồn tiếp theo; không thêm vô hạn DOM, không tạo booking hoặc thay trạng thái cọc. Bấm ảnh vừa in có thể mở ảnh lớn với mô tả đúng.
6. Trong lúc đang chạy chuỗi in, khóa nút chụp để không tạo nhiều chuỗi chồng nhau, mở lại khi hoàn tất. Sắp lại góc studio phải hủy được chuỗi đang chạy và trả về trạng thái nghỉ. Không để timer/animation cũ tiếp tục ghi vào DOM sau reset.

#### Trạng thái chuyển động và cách khôi phục

Lưu trạng thái đạo cụ riêng với trạng thái booking: ảnh nào đang treo/rơi, ảnh đang kéo, ảnh vừa in, lựa chọn màu và camera đang bận. Sắp lại góc studio chỉ khôi phục đạo cụ, không làm mất trạng thái thanh toán, bộ lọc booking hoặc checklist. Đặt lại demo toàn trang I09 khôi phục cả hai nhóm trạng thái. Cả hai thao tác reset đều giữ lựa chọn tắt chuyển động của người xem và tuân theo reduced motion, không tự bật lại hiệu ứng.

Nút Chuyển động dùng trạng thái rõ ràng Bật/Tắt và aria-pressed tương ứng. Khi không có yêu cầu reduced motion, có thể bật đung đưa nhẹ mặc định nhưng nút tắt phải luôn hiện; dừng đung đưa nền khi người xem hover/focus trong cảnh. Hiệu ứng do người xem trực tiếp bấm hoặc kéo vẫn chạy nếu họ đang bật chuyển động. Dừng toàn bộ animation khi cảnh ra ngoài viewport, tab bị ẩn hoặc dialog đang mở; hoàn tất an toàn hoặc hủy chuỗi đang chạy để không kẹt nút chụp. Chỉ tiếp tục chuyển động nền khi vẫn được người xem cho phép. Khi prefers-reduced-motion là reduce, mặc định không đung đưa, không rơi hoặc trượt dài; thao tác vẫn đổi ngay sang trạng thái kết thúc đọc được. Tắt chuyển động không làm mất chức năng thả, treo lại hoặc tạo ảnh.

Khi tắt JS, cảnh hiện như một minh họa studio hoàn chỉnh gồm dây, ảnh và máy ảnh; ảnh vẫn có link thật để mở lớn. Các nút chỉ chạy được với JS được ẩn cho tới khi gắn handler. Không để ảnh ban đầu ở opacity:0 hoặc ngoài khung rồi chờ JS kéo vào. CSS print ẩn toàn bộ cảnh đạo cụ để phiếu hẹn vẫn gọn.

CTA chính duy nhất trong trạng thái chờ cọc là Thanh toán cọc 30%. Các thao tác xem, in, mở ảnh dùng kiểu thứ cấp; không đặt cả trang thành một dãy nút cùng độ nổi bật.

## 4 Màu dùng chung và alias riêng

Bảng màu chính thức nằm trong DESIGN.md ở gốc repo và được định nghĩa ở
`:root` trong `css/common.css`. Không duy trì một palette độc lập cho màn 3.
Nếu giữ tên `--ap-*` cho component riêng, ánh xạ trong `body.appointments-page`:

| Alias màn 3 | Token chung |
| --- | --- |
| `--ap-paper` | `var(--color-background)` |
| `--ap-card` | `var(--color-surface)` |
| `--ap-ink` | `var(--color-text)` |
| `--ap-muted` | `var(--color-text-muted)` |
| `--ap-forest` | `var(--color-brand)` |
| `--ap-forest-hover` | `var(--color-brand-hover)` |
| `--ap-wine` | `var(--color-wine)` |
| `--ap-gold` | `var(--color-accent)` |
| `--ap-line` | `var(--color-border)` |
| `--ap-control-border` | `var(--color-control-border)` |
| `--ap-focus` | `var(--color-focus)` |

Không khai báo lại mã hex hoặc ghi đè token chung để tạo palette riêng.
Kiểm tra tương phản trên giao diện thực tế, kể cả hover và chữ trên ảnh.

## 5 Typography và tiếng Việt trên màn 3

Dùng Merriweather và Be Vietnam Pro theo mục Typography của DESIGN.md chung.
Font tải một lần vào `assets/fonts/shared/`, kèm OFL; `@font-face` trong
`css/common.css` dùng tên GS Merriweather và GS Be Vietnam. CSS màn 3 dùng
`var(--font-heading)` và `var(--font-body)`, không có bản font AP riêng.

Ngày lớn trên vé là biến thể riêng: Merriweather 500, 48–72 px trên desktop,
line-height 1.05; thu nhỏ trên mobile để không cắt chữ hoặc mất dấu.

Chuỗi kiểm tra: Lịch chụp của tôi; Nguyễn Thùy Linh; Chụp ảnh tốt nghiệp;
Đã thống nhất lịch; Thứ Bảy ngày 24 tháng 10; 13:00–14:00; 1.800.000đ.
Kiểm tra Rendered Fonts và ảnh trên Windows, không chỉ đọc font-family.
Nếu font chưa có hoặc chưa nạp được qua file://, báo rõ dùng fallback;
không nhận typography hoàn chỉnh. Không thay bảo mật trình duyệt.

## 6 Kích thước và responsive

Container, spacing, lề, bo góc, vùng bấm và breakpoint dùng DESIGN.md chung.
Bảng sau chỉ mô tả cách các khối của màn 3 đổi bố cục:

| Vùng | 360 px | 768 px | 1280 px |
| --- | --- | --- | --- |
| Header | Logo và tài khoản gọn; nav xuống hàng nếu cần | Nav đọc rõ và không ép chật | Header nằm ngang |
| Hero | H1 và cảnh studio xếp dọc; dây ảnh, máy ảnh thu gọn và điều khiển chạm được | Chữ và cảnh studio cân bằng, không che nhau | Bố cục 7/5 hoặc 8/4; cảnh dây treo ảnh và máy ảnh ở bên phải |
| Bộ lọc và ngày | Xuống dòng, không cắt nhãn hoặc tràn ngang | Có thể hai hàng | Một hàng hoặc hai hàng cân đối |
| Vé hẹn | Ngày, thông tin, tiền và CTA xếp dọc | Ngày + nội dung; phần tiền xuống dưới nếu cần | Một vé ngang với ba vùng ngày / thông tin / tiền và CTA |
| Nhật ký và góc chuẩn bị | Một cột | Ưu tiên một cột nếu hai cột làm khó đọc | Nội dung buổi chụp rộng hơn góc chuẩn bị, khoảng 7/5 |
| Ảnh tham khảo | Một hoặc hai cột, mỗi ảnh bấm được | Ba ảnh gọn | Ba Polaroid trong một hàng |
| Dialog | Rộng vừa viewport trừ lề, cuộn nội dung khi thấp | Giới hạn chiều rộng | Khoảng 30–34rem; không vượt chiều cao màn hình |

Không cố định chiều rộng toàn trang, không dùng overflow-x:hidden để che lỗi. Thành phần grid/flex co được bằng minmax(0, ...) hoặc min-inline-size:0. Ảnh nghiêng và texture phải nằm trong giới hạn trang; không cắt nội dung thật. Không cố ép chiều cao các thẻ bằng khoảng trắng lớn.

## 7 Bố cục màn 3 từ trên xuống

| Thứ tự | Khối | Nội dung | Điểm khác biệt thị giác |
| --- | --- | --- | --- |
| 1 | Header | GradStudio; Dịch vụ; Lịch chụp của tôi; avatar và tên Linh | Dải đầu trang như gáy album, đường kẻ mảnh |
| 2 | Hero nhật ký | Nhãn Nhật ký chụp ảnh; H1 Lịch chụp của tôi; lời chào ngắn; góc studio mục 3.1 | Chữ serif lớn, dây treo Polaroid và máy ảnh có thể thao tác; không dùng hero nền ảnh toàn màn hình |
| 3 | Điều khiển danh sách | Bộ lọc trạng thái kèm số lượng; dải ngày 19–25/10/2026 | Như nhãn phân trang trong sổ, ngày 24 có chấm chỉ lịch |
| 4 | Vé hẹn của Linh | Ngày lớn 24 TH10; GS-1024; gói, giờ, trạng thái; tiền và thao tác cọc | Vé ngang, đường xé và dấu trạng thái; là điểm nhấn chính |
| 5 | Nhật ký buổi chụp | Đến 12:50; makeup 13:00–14:00 với Mai; chụp 14:00–16:00 với Tuấn tại Phòng B | Các mốc như trang ghi chú; giờ là phần dễ quét bằng mắt nhất |
| 6 | Góc chuẩn bị | Ba checkbox cần chuẩn bị, phần studio và thông tin phụ | Một mảnh giấy ghi chú, checkbox thật, không giống form quản trị |
| 7 | Ảnh gợi ý và giải đáp | Ba ảnh gợi ý phong cách; FAQ về giờ đến, khoản cọc và tiền còn lại | Khung ảnh có chú thích; FAQ như những dòng ghi chú mở được |
| 8 | Chân trang | Điều hướng hợp lệ; phần Điều khiển demo có Đặt lại demo | Tách thao tác demo khỏi hành động của khách |

Không dựng lại cặp khối lịch tuần cao bên trái và booking nhỏ bên phải của ảnh gốc. Giờ 09:00 không khả dụng được ghi gọn trong phần Lịch sử thống nhất giờ; không chiếm một nửa trang hoặc làm lẫn với giờ hiện tại.

Giữ các thông tin bắt buộc như ngày, giờ, trạng thái và tiền luôn hiện trên vé/nhật ký. Chi tiết mở rộng chỉ chứa thông tin phụ. Không bắt người xem mở nhiều accordion mới biết lúc nào phải đến hoặc cần trả bao nhiêu.

## 8 Dữ liệu mẫu và trạng thái

| Trường | Giá trị |
| --- | --- |
| Khách hàng | Nguyễn Thùy Linh, tên hiển thị Linh |
| Booking | GS-1024 |
| Ngày | Thứ Bảy 24/10/2026; đây là ngày mẫu, không tự đổi theo hôm nay |
| Gói | Tốt nghiệp Premium; makeup và 2 giờ chụp |
| Makeup | Mai, 13:00–14:00 |
| Chụp | Tuấn, 14:00–16:00, Phòng B |
| Có mặt | 12:50, suy ra từ yêu cầu đến sớm 10 phút trước makeup |
| Lịch sử | Yêu cầu 09:00 không phù hợp vì Mai bận 08:00–12:00 |
| Tổng giá | 1.800.000đ |
| Cọc 30 phần trăm | 540.000đ |
| Còn lại | 1.260.000đ, thanh toán sau buổi chụp |

Dữ liệu ngày mẫu không được tự chuyển thành đã quá hạn, đã hoàn thành hoặc hủy chỉ vì đồng hồ máy đang ở tháng 11. Không tự thêm booking khác để lấp chỗ trống.

| Trạng thái demo | Thông tin trên vé | Các số lượng khi chọn ngày 24 |
| --- | --- | --- |
| Chờ cọc mặc định | Dấu Chờ cọc 30%; số tiền phải cọc 540.000đ; CTA Thanh toán cọc 30% | Tất cả 1, Chờ cọc 1, Đã đặt lịch 0, Hoàn thành 0 |
| Đang mở hộp thanh toán | Vé vẫn Chờ cọc; hộp Mô phỏng thanh toán có thông tin và hai lựa chọn | Chưa thay đổi |
| Hủy hoặc Escape | Đóng hộp, trả focus về nút mở; vé chưa đổi | Chưa thay đổi |
| Mô phỏng thành công | Dấu Đã đặt lịch; Đã cọc 540.000đ trong demo; nhắc đến lúc 13:00; còn lại vẫn 1.260.000đ | Tất cả 1, Chờ cọc 0, Đã đặt lịch 1, Hoàn thành 0 |

Model UI có một booking và một nguồn trạng thái trong bộ nhớ. Các số lượng và nội dung được đồng bộ từ cùng nguồn này. Không lưu localStorage, không đồng bộ server; reload hoặc Đặt lại demo khôi phục trạng thái ban đầu.

## 9 Bảng tương tác bắt buộc

| ID | Người xem thao tác | Kết quả phải có | Khi tắt JavaScript |
| --- | --- | --- | --- |
| I01 | Chọn bộ lọc Tất cả / Chờ cọc / Đã đặt lịch / Hoàn thành | Lọc theo trạng thái hiện tại, không đổi trạng thái booking | Radio + CSS lọc được trên dữ liệu Chờ cọc ban đầu; label liên kết đúng input |
| I02 | Chọn ngày trong dải 19–25 | Ngày 24 có booking, ngày khác hiện danh sách trống; quay lại 24 khôi phục view đúng | Dải ngày là lịch tĩnh có đánh dấu 24; ẩn các nút chỉ hoạt động nhờ JS, không để nút chết |
| I03 | Mở Chi tiết gói hoặc Lịch sử thống nhất giờ | Mở/đóng bằng details/summary, core thông tin vẫn hiện | Hoạt động như khi bật JS |
| I04 | Thanh toán cọc 30% | Mở dialog mô phỏng; xem rõ GS-1024 và 540.000đ; Hủy/Escape giữ nguyên; Thành công đổi trạng thái đúng bảng | Link hoặc details HTML mở được thông tin cọc và giải thích ngắn về mô phỏng; không có nút thành công không hoạt động |
| I05 | Bấm ảnh gợi ý | Mở ảnh lớn trong dialog; đóng bằng nút hoặc Escape; trả focus đúng thumbnail | Thumbnail là link thật đến file ảnh cục bộ |
| I06 | Đánh dấu việc chuẩn bị | Checkbox có label, đánh dấu được; tiến độ 0/3 đến 3/3 nếu JS có | Checkbox native vẫn dùng được; ẩn số đếm động nếu không cập nhật |
| I07 | In phiếu hẹn | Mở hộp in trình duyệt; CSS print chỉ in thông tin lịch, trạng thái, người và tiền; có ghi rõ trạng thái demo | Nút JS chỉ xuất hiện sau khi gắn handler; vẫn in được bằng lệnh in của trình duyệt |
| I08 | Mở thông tin studio hoặc FAQ | Nội dung mở/đóng tại chỗ; các câu trả lời đúng dữ liệu đã có | details/summary hoạt động |
| I09 | Đặt lại demo | Đóng dialog; ngày 24, Tất cả; booking Chờ cọc; số lượng, checklist và góc studio về ban đầu | Nút mô phỏng được ẩn nếu không có JS; reload khôi phục trang ban đầu |
| I10 | Bấm kẹp ảnh hoặc Thả ảnh/Treo lại | Ảnh tuột xuống bàn hoặc trở lại đúng vị trí kẹp, dừng trong khung; không ảnh hưởng booking | Dây và ảnh vẫn hiện; ẩn các nút cần JS |
| I11 | Kéo ảnh bằng tay nắm | Di chuyển trong cảnh, thả gần kẹp thì gắn lại, thả chỗ khác thì về vị trí bàn hợp lệ; không mở nhầm lightbox sau drag | Link mở ảnh thật vẫn hoạt động; không có tay nắm kéo chết |
| I12 | Thử máy ảnh và chọn màu ảnh | Máy ảnh có phản hồi, Polaroid trượt ra, khay chỉ giữ một ảnh mới; ảnh và lựa chọn màu không đổi dữ liệu lịch | Hình máy ảnh và ảnh mẫu vẫn hiện; radio màu có thể dùng CSS; ẩn nút chụp cần JS |
| I13 | Sắp lại góc studio | 3 ảnh về kẹp, khay ảnh trống, máy ảnh nghỉ và lựa chọn màu về mặc định; booking/checklist giữ nguyên | Cảnh mặc định đã sẵn bằng HTML; ẩn nút reset đạo cụ cần JS |
| I14 | Bật/Tắt chuyển động hoặc dùng reduced motion | Có thể dừng đung đưa; khi tắt vẫn thả/treo/tạo ảnh bằng đổi trạng thái tức thời, không ép xem animation | Không có chuyển động phụ thuộc JS; minh họa tĩnh vẫn đầy đủ |

Các số lượng bộ lọc phản ánh tập booking của ngày đang chọn, trước khi áp dụng bộ lọc trạng thái: chọn ngày khác 24 thì cả bốn số đều bằng 0. Kết quả danh sách là giao của ngày và trạng thái đang chọn. Hero, góc chuẩn bị và ảnh tham khảo vẫn hiện, nhưng vé và nhật ký của booking bị ẩn khi không khớp; không để lịch chi tiết của booking khác tồn tại dưới một danh sách đang báo trống.

Thanh toán từ bộ lọc Chờ cọc thành công sẽ giữ lựa chọn bộ lọc: danh sách Chờ cọc trở thành trống. Thông báo ngắn trong aria-live xác nhận trạng thái demo và gợi ý chọn Đã đặt lịch. Không tự nhảy sang Hoàn thành. Nếu trả cọc khi đang xem Tất cả, vé vẫn hiện với trạng thái mới.

Ảnh gợi ý phải có chú thích rõ là ảnh tham khảo phong cách, không phải ảnh sau buổi chụp của Linh. Checklist chỉ hỗ trợ chuẩn bị, không sửa booking hoặc được coi là đã lưu trên tài khoản.

## 10 Chi tiết hộp thoại và chuyển động

- Dùng dialog HTML nguyên bản khi JS hoạt động. Tên hộp qua aria-labelledby; có nút Hủy/Đóng rõ ràng; focus đặt hợp lý. Hủy/Escape trả focus về nút mở. Sau thành công, nếu nút trả cọc đã được thay đi, đưa focus tới thông báo hoặc tiêu đề xác nhận có tabindex=-1; không focus vào nút đang ẩn. Đóng ảnh trả focus về thumbnail.
- Thanh toán có đúng hai lựa chọn Hủy và Thanh toán thành công. Trong hộp ghi ngắn Đây là thao tác mô phỏng, không phát sinh giao dịch thật. Không thêm thông tin thẻ ngân hàng, QR hoặc cổng thanh toán giả.
- Mở hộp không đổi trạng thái. Thành công không tạo thêm booking. Sau thành công, CTA trả cọc được thay bằng xác nhận demo, không để trả cọc lặp lại.
- Chỉ một dialog mở tại một thời điểm. Không chồng dialog ảnh lên dialog thanh toán. Hộp vừa viewport trừ lề, có max-height và cuộn nội dung khi cần.
- Hover/nhấn của UI chính dùng 120–220ms cho màu hoặc transform nhẹ; mở popup tối đa khoảng 180ms. Chuyển động đạo cụ có thời gian riêng theo mục 3.1. Không trì hoãn cập nhật trạng thái booking bằng bộ đếm hoặc loading giả.
- Tôn trọng prefers-reduced-motion: bỏ chuyển động vị trí và cuộn mượt; nội dung không phụ thuộc animation để xuất hiện.

## 11 Nội dung và phần bổ sung UX

| Vùng | Nội dung gợi ý |
| --- | --- |
| Hero | H1 Lịch chụp của tôi; mô tả Xem lại cuộc hẹn và chuẩn bị cho buổi chụp của bạn. |
| Vé | Cuộc hẹn của Linh; GS-1024; thứ Bảy 24 tháng 10; các giờ và số tiền chuẩn |
| Lời nhắc | Có mặt lúc 12:50 để chuẩn bị trước giờ makeup. |
| Checklist | Kiểm tra lại các mốc giờ; chuẩn bị trang phục đã thống nhất; lên kế hoạch đến trước 10 phút |
| Danh sách trống | Chưa có lịch chụp nào ở mục này. Có nút về ngày 24 hoặc Tất cả khi phù hợp và handler đã sẵn sàng. |
| FAQ | Khi nào tôi cần có mặt; tôi cần cọc bao nhiêu; khoản còn lại thanh toán lúc nào |
| Studio | Thông tin vị trí theo dữ liệu đã cung cấp; chưa có địa chỉ thật thì không bịa địa chỉ hoặc mở chỉ đường đến một nơi ngẫu nhiên |

Không đưa chú thích kỹ thuật như HTML/CSS tĩnh, chưa có backend hoặc câu hướng dẫn lập trình lên các khối chính. Thông báo mô phỏng đặt tại hộp thanh toán và khu điều khiển demo. Các chức năng chưa kết nối được mô tả trong tài liệu; giao diện thể hiện trạng thái trung thực.

## 12 Tài nguyên và cách tách CSS

| File | Quyền thay đổi |
| --- | --- |
| docs/design/my-appointments.md | Đặc tả riêng màn 3; DESIGN.md ở gốc repo là thiết kế chung |
| my-appointments.html | Được viết lại hoàn toàn phần màn 3; giữ đường dẫn tích hợp |
| css/my-appointments.css | Được viết lại hoàn toàn; class appointments- và token --ap- |
| js/my-appointments.js | Controller nhỏ cho trạng thái, dialog, ngày, ảnh, checklist, in và reset |
| assets/icons/appointments/ | SVG máy ảnh, dây, kẹp, cuộn phim hoặc softbox nếu không dùng SVG inline; chỉ tạo file thực sự được dùng |
| assets/fonts/shared/ | Đọc font dùng chung; nếu thiếu, phối hợp Người 1 nhập font và OFL theo DESIGN.md |
| assets/images/appointments/ | Chỉ tạo nếu cần ảnh riêng; ghi nguồn |
| assets/images/ đang có | Ảnh minh họa và avatar có nguồn trong PROTOTYPE.md |
| css/common.css và CSS/HTML trang 1, 2 | Chỉ đọc để tích hợp; không viết lại |
| DESIGN.md, AGENTS.md và tài liệu nhóm | Đọc để tuân theo phần chung; thay đổi phần chung phối hợp với Người 1 |

Nạp common.css trước, my-appointments.css sau. Body màn 3 mang class appointments-page. Nếu cần alias --ap-, ánh xạ tới token chung theo mục 4; không ghi đè palette hoặc font chung. Class riêng có tiền tố appointments-. Font và @font-face được quản lý trong common.css theo DESIGN.md chung.

Ảnh minh họa của màn lịch chụp dùng cùng bộ ảnh với màn dịch vụ. Avatar Linh dùng `linh-initial.svg`. Nguồn ảnh xem [PROTOTYPE.md](../../PROTOTYPE.md#nguồn-ảnh-và-video).

Nguồn font, file đích và giấy phép xem DESIGN.md chung; không tạo bản sao trong assets/fonts/appointments/. Ảnh trong HTML dùng assets/images/... tương đối. Không hotlink hoặc phụ thuộc Google Fonts CDN.

## 13 Yêu cầu kỹ thuật và khả năng truy cập

- HTML5, CSS thuần; không framework, package manager, build hoặc backend.
- Toàn bộ văn bản, booking, timeline, ảnh và thông tin cọc được viết sẵn trong HTML. JS chỉ thao tác trên DOM có sẵn; không dựng trang bằng innerHTML, không fetch dữ liệu.
- Dùng script thường có defer và src tương đối; không dùng module gây vấn đề khi mở file://. Liên kết liên trang là a href tới file thật, không phụ thuộc JS.
- Không giấu toàn bộ trang rồi chờ JS bật class mới cho hiện. Chỉ các điều khiển nâng cấp cần JS mới được hiện sau khi handler đã gắn xong.
- Một h1, heading đúng cấp; header/nav/main/footer dùng đúng; input có label; ảnh có alt; ảnh trùng mang tính trang trí dùng alt rỗng; SVG trang trí aria-hidden.
- Radio là radio, checkbox là checkbox, mở rộng là details/summary; không gắn role tabs nếu không làm đầy đủ mô hình tabs. Nút thao tác có type=button; liên kết dùng a.
- Dùng aria-live ngắn cho thông báo thay đổi trạng thái; không lặp lại mọi lần người xem đổi ngày hoặc tick một mục nếu gây ồn.
- Focus nhìn thấy 3px, đủ lề không bị cắt; bàn phím dùng được toàn bộ tương tác. Không dùng hover làm cách duy nhất để mở hoặc đọc thông tin.
- Kéo ảnh có nút Thả/Treo lại tương đương; chỉ tay nắm dùng xử lý pointer riêng, không chiếm thao tác cuộn trang. Gắn và gỡ pointer capture/handler đúng vòng đời; xử lý pointercancel, resize, reset và ảnh đang in. Cảnh dừng được bằng điều khiển hiện rõ.
- Chữ nội dung/nút tối thiểu 16px, tương phản 4.5:1; vùng bấm ít nhất 44px. Không !important hoặc overflow-x:hidden.
- W3C File upload của trang đạt 0 errors; không tự ghi PASS trước khi chạy kiểm tra thực tế.

## 14 Bảng nghiệm thu

| ID | Tình huống | Kết quả cần đạt |
| --- | --- | --- |
| A01 | Đối chiếu đặc tả màn 3 và DESIGN.md chung | Có hero biên tập, vé ngang, nhật ký và moodboard; nhận diện, font và component tuân theo thiết kế chung |
| A02 | Mở trực tiếp my-appointments.html | Font, ảnh, CSS và nội dung nạp từ repo; không cần server hay mạng để xem sau khi tài nguyên đã lưu |
| A03 | JS tắt tại 360, 768, 1280 | Đủ nội dung chính, không tràn/cắt/chồng; radio, checkbox, details và link thực vẫn dùng được |
| A04 | JS bật tại ba chiều rộng | Nâng cấp tương tác hoạt động, không làm đổi cấu trúc hoặc mất nội dung |
| A05 | Ngày 24 + Tất cả | Một vé Chờ cọc, thời gian và tiền đúng |
| A06 | Ngày khác + quay lại 24 | Trống đúng ngày, counts đều 0 khi không có lịch; quay về hiện đúng booking và trạng thái đang có |
| A07 | Mở thanh toán rồi Hủy/Escape | Đóng hộp; chưa thay trạng thái hoặc counts; focus trở lại đúng chỗ |
| A08 | Mô phỏng thành công từ Tất cả | Đã đặt lịch 1, Chờ cọc 0; vé còn lại, cọc được đánh dấu demo; không nhân đôi booking |
| A09 | Lọc sau thành công | Chờ cọc trống, Đã đặt lịch hiện đúng GS-1024, Hoàn thành trống |
| A10 | Thành công khi đang lọc Chờ cọc | Giữ filter; danh sách trở thành trống, thông báo gợi ý chọn Đã đặt lịch |
| A11 | Ảnh, checklist, FAQ và in | Đều có kết quả thực; ảnh mở/đóng, tiến độ phản ánh checkbox, FAQ mở được, phiếu in đọc được |
| A12 | Đặt lại demo hoặc reload | Ngày 24, Tất cả, trạng thái Chờ cọc, counts ban đầu, checklist chưa tick và không còn dialog |
| A13 | Font và tên/gói tiếng Việt dài | Không rơi dấu, trộn glyph bất thường, cắt chữ hoặc kéo rộng trang |
| A14 | Bàn phím, 200% zoom và reduced motion | Đọc và thao tác được, focus không bị che, không có chuyển động bắt buộc |
| A15 | W3C, screenshot và tích hợp | W3C 0 errors; ba screenshot toàn trang khi JS tắt; links thật; không sửa trang của bạn khác |
| A16 | Xem cảnh studio khi bật/tắt JS | Nhận ra dây ảnh có kẹp, Polaroid và máy ảnh có ống kính/khe nhả ảnh; không phải emoji hoặc ảnh nền giả có vùng bấm |
| A17 | Thả/treo từng ảnh và thao tác bàn phím | Chỉ đúng ảnh di chuyển; dừng trong cảnh; nút thay thế kéo dùng được; booking và số lượng cọc không đổi |
| A18 | Kéo ở 360/768/1280, thả gần kẹp, pointercancel và resize | Không ra ngoài viewport, không mở nhầm lightbox hoặc khóa cuộn toàn trang; hủy kéo trả vị trí an toàn |
| A19 | Bấm máy ảnh liên tục rồi Sắp lại góc studio khi đang in | Một chuỗi tại một thời điểm, chỉ một ảnh mới trong khay; reset hủy hiệu ứng cũ, không có DOM/timer tăng vô hạn |
| A20 | Tắt chuyển động, reduced motion, tab ẩn và dialog mở | Không còn đung đưa khi phải dừng; thao tác vẫn đổi được trạng thái; không chớp toàn màn hình hoặc phát âm thanh tự động |
| A21 | Thanh toán thành công rồi Sắp lại góc studio, sau đó Đặt lại demo | Reset đạo cụ giữ booking Đã đặt lịch; reset toàn trang trả booking về Chờ cọc và khôi phục cả cảnh |

Tên ảnh cuối: screenshots/my-appointments-360.png, screenshots/my-appointments-768.png, screenshots/my-appointments-1280.png. Kết quả HTML: checks/validator-my-appointments.png hoặc .txt. Chưa chạy ghi NOT RUN. Thay đổi thiết kế này và chức năng bổ sung phải được mô tả trung thực trong PROTOTYPE.md khi tổng hợp.

## 15 Prompt giao cho Codex

Giữ đặc tả này tại docs/design/my-appointments.md. Prompt mẫu dưới đây chỉ dùng khi giao nhiệm vụ triển khai màn 3; không sao chép đè DESIGN.md chung:

```text
Tôi là người 3. Tôi đổi định hướng: repo GradStudio ban đầu chỉ tham khảo CHỨC NĂNG, KHÔNG phải mẫu giao diện để sao chép. Tôi yêu cầu viết lại hoàn toàn màn 3 theo docs/design/my-appointments.md và DESIGN.md chung, phong cách nhật ký ảnh phim hoài niệm nhẹ. Cả nhóm dùng phần nhận diện chung; tôi phụ trách bố cục và tương tác riêng màn 3.

Đọc AGENTS.md, DESIGN.md chung, docs/design/my-appointments.md, README.md và code màn 3 thực tế (nếu đã có). Đọc docs/pa1/PROPOSAL.md và LINK.md để giữ nghiệp vụ; không lấy ảnh PA#1 hoặc trang 1 hiện tại làm chuẩn bố cục. Kiểm tra tài nguyên và mã hiện có trước khi sửa.

Thực hiện đúng phạm vi mục 12 của docs/design/my-appointments.md: my-appointments.html, css/my-appointments.css, js/my-appointments.js và tài nguyên riêng cần thiết. Được viết lại DOM/CSS màn 3; giữ nội dung mẫu, tên file và đường dẫn tích hợp. Không sửa common.css, DESIGN.md chung, trang/CSS người khác, AGENTS.md hoặc xóa dữ liệu .git; nếu thiếu font chung, báo để Người 1 phối hợp. Không tự commit, push, merge hay đổi nhánh.

Xây bố cục mới theo mục 7 của docs/design/my-appointments.md: hero kiểu biên tập, bộ lọc và ngày, vé hẹn nằm ngang, nhật ký buổi chụp, góc chuẩn bị, ảnh tham khảo mở lớn và FAQ. Không chỉ đổi màu giao diện cũ. Dùng giấy ngà, xanh rêu, đỏ rượu, khung Polaroid, đường xé vé theo tokens; tránh thêm khối văn bản cho dài trang.

Bổ sung góc studio mục 3.1 của docs/design/my-appointments.md: dây ảnh có kẹp, 3 Polaroid đung đưa nhẹ, thả ảnh xuống bàn và treo lại, tay nắm kéo trong khung, máy ảnh hoài niệm có nút chụp và khe nhả ảnh. Bấm máy ảnh tạo một Polaroid minh họa từ ảnh cục bộ; không dùng webcam, âm thanh tự động hoặc chớp toàn màn hình. Có Bật/Tắt chuyển động và Sắp lại góc studio, hỗ trợ reduced motion, bàn phím và thao tác chạm thay cho kéo. Đạo cụ không che lịch/cọc và không thay trạng thái booking. Dựng bằng HTML/CSS/SVG và JS nhỏ, không thêm engine/framework.

Typography dùng font chung Merriweather và Be Vietnam Pro theo DESIGN.md, đủ tiếng Việt, đúng weight và giấy phép tại assets/fonts/shared/. Dùng var(--font-heading)/var(--font-body), scope CSS appointments-page/appointments-; alias --ap- ánh xạ token chung, không tạo palette/font riêng. Nếu chưa tải hoặc kiểm tra được font, báo rõ, không tự nhận đã hoàn thành typography.

Hoàn thiện tương tác I01–I14 và các trạng thái mục 8–9 của đặc tả màn 3: lọc thật, chọn ngày, mở chi tiết, dialog Hủy/Thành công, counts đúng, ảnh mở lớn, checklist, in phiếu, Đặt lại demo và góc studio. Chỉ một booking, không thanh toán thật hoặc thay đổi nghiệp vụ ngoài phạm vi. Nội dung mô phỏng được ghi rõ đúng chỗ.

HTML phải có sẵn toàn bộ nội dung chính; JS chỉ nâng cấp các DOM đã có, không render toàn trang hoặc điều hướng liên trang. Dùng script thường defer, không module/framework/build/backend. Khi JS tắt, vẫn đọc đủ lịch, tiền, ảnh, thông tin cọc; các control native và đường dẫn tương đối vẫn dùng được; không để nút chết hoặc lớp phủ che trang.

Triển khai mobile first và kiểm tra 360/768/1280, keyboard, 200% zoom, reduced motion; không tràn/cắt/chồng, không !important hoặc overflow-x:hidden. Dùng bảng nghiệm thu A01–A21 làm tiêu chí. Nếu công cụ không chạy được trình duyệt/W3C, ghi NOT RUN và chỉ rõ thao tác tôi cần làm; không tạo screenshot hoặc kết quả giả.

Cuối cùng báo file đã đổi, đối chiếu từng I01–I14, các kiểm tra thật, rủi ro còn lại và ghi chú khác biệt để tổng hợp PROTOTYPE.md. Không chấm điểm hoặc nhận đã hoàn thành trước khi kiểm tra.
```

## Nguồn và ghi chú

- Bản 1.1 do thành viên cung cấp định hướng thẩm mỹ và tương tác màn 3; ngày 06/11/2026 người dùng yêu cầu nhập file này và tổng hợp thành DESIGN.md chung. Bản 1.2 đồng bộ đường dẫn, token và font với tài liệu chung.
- Chức năng: https://github.com/NhatVy177/gradstudio/blob/main/PROPOSAL.md và prototype/LINK.md; bản sao trong docs/pa1/ của repo nhóm.
- Repo tích hợp: https://github.com/thVinhne/pa02-responsive-prototype. Không thay thế code người 1 hoặc người 2 trong nhiệm vụ này.
- Rubric PA2-rubric-responsive-prototype.pdf do người dùng cung cấp quyết định yêu cầu responsive, HTML, mở trực tiếp và JS tắt.
- Font Merriweather: https://github.com/google/fonts/tree/main/ofl/merriweather ; metadata có Vietnamese và giấy phép OFL.
- Font Be Vietnam Pro: https://github.com/google/fonts/tree/main/ofl/bevietnampro ; metadata có Vietnamese và giấy phép OFL.
- Đây là đặc tả để triển khai, không phải báo cáo đã sửa code local, tải font hoặc kiểm thử trình duyệt thành công.

