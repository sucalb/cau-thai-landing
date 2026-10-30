# Cửa hàng cây giống – landing page

Trang bán cây giống nhiều loại: danh mục, xem chi tiết cây, chọn mua lẻ hoặc theo gói, giỏ hàng, đặt hàng (thanh toán khi nhận). Tối ưu cho điện thoại, mở trên máy tính thì ra bố cục nhiều cột. Trang tĩnh, không cần build, chạy trên GitHub Pages.

- Trang bán hàng: `index.html`
- Trang quản trị (demo): `admin.html`
- Toàn bộ nội dung và sản phẩm: `config.js`

## Trang quản trị (bản demo)

Đăng nhập: tài khoản `admin`, mật khẩu `demo123` (kiểm tra ngay trên trình duyệt, chỉ để demo).

Sửa được:
- **Sản phẩm:** thêm/xoá/sắp xếp cây; tên, danh mục, giá bán, giá gốc, đơn vị, nhãn, ảnh chính/phụ, mô tả, thông số, các gói ưu đãi (giá gói, có miễn ship không).
- **Danh mục**, **phí ship** (phí mỗi đơn, miễn ship từ bao nhiêu).
- **Nội dung:** thông tin cửa hàng (tên, hotline, Zalo, địa chỉ…), khuyến mãi và đếm ngược, đầu trang, video, số liệu, cam kết, đánh giá, hỏi đáp.

Bấm **Lưu thay đổi**: bản nháp lưu trong trình duyệt của máy đó. **Xem trước** mở trang bán hàng (`?preview=1`) với nội dung vừa sửa; khách thật không thấy bản nháp. **Khôi phục mặc định** xoá bản nháp. Bản demo chưa tải video lên được.

Khi làm bản chính cần thêm chỗ lưu thật (máy chủ hoặc dịch vụ như Firebase) và đăng nhập thật.

## Giỏ hàng và phí ship

Giỏ hàng lưu trên máy khách. Phí ship = `shipping.fee`, miễn phí khi tạm tính ≥ `shipping.freeFrom` hoặc trong giỏ có gói đánh dấu miễn ship.

## Chạy thử trên máy

```bash
python3 -m http.server 5173
```

Mở http://localhost:5173.

## Cần thay trước khi chạy quảng cáo

- Tên cửa hàng, hotline, Zalo, địa chỉ, email (đang là dữ liệu mẫu).
- Ảnh `images/sp-*.jpg` là ảnh minh hoạ từ Wikimedia Commons (xem `CREDITS.md`), nên thay bằng ảnh thật của vườn. Giá và mô tả các cây ngoài cau là mẫu.
- Đánh giá và số liệu là nội dung mẫu.
- Đơn hàng chưa gửi đi đâu: nối vào Google Sheet / Telegram / backend ở chỗ `TODO` trong `index.html`.
- Sau khi sửa `config.js`, tăng số `?v=` trong thẻ `<script src="config.js?v=…">` để trình duyệt khách không dùng bản cũ.
