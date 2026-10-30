# Cây giống theo mùa – landing page

Mỗi mùa trang bán một giống cây (vd mùa này cau, mùa sau bơ). Đầu trang là mô hình 3D cây cau dựng bằng Three.js (`plant3d.js`, tự xoay, kéo để xoay), có thể đổi sang hình vẽ vector (`art.js`) hoặc ảnh tách nền, ảnh thật ở phần "Ảnh thực tế". Khách chọn mua lẻ hoặc theo gói rồi đặt hàng (thanh toán khi nhận). Tối ưu cho điện thoại, mở trên máy tính thì ra bố cục nhiều cột. Trang tĩnh, không cần build, chạy trên GitHub Pages.

- Trang bán hàng: `index.html`
- Trang quản trị (demo): `admin.html`
- Toàn bộ nội dung và sản phẩm: `config.js`

## Trang quản trị (bản demo)

Đăng nhập: tài khoản `admin`, mật khẩu `demo123` (kiểm tra ngay trên trình duyệt, chỉ để demo).

Sửa được:
- **Cây bán mùa này:** chọn một cây trong thư viện, cả trang đổi theo.
- **Thư viện cây:** mỗi cây có tên, nhãn mùa, tiêu đề lớn, hình đầu trang (vẽ sẵn cây cau / cây ăn quả với màu quả tuỳ chọn, hoặc ảnh tải lên), ghi chú viết tay, giá, ảnh thực tế, mô tả, thông số, các gói ưu đãi, video.
- **Phí ship**, **thông tin cửa hàng**, **khuyến mãi** và các phần nội dung chung (video, số liệu, cam kết, đánh giá, hỏi đáp).

Bấm **Lưu thay đổi**: bản nháp lưu trong trình duyệt của máy đó. **Xem trước** mở trang bán hàng (`?preview=1`) với nội dung vừa sửa; khách thật không thấy bản nháp. **Khôi phục mặc định** xoá bản nháp. Bản demo chưa tải video lên được.

Khi làm bản chính cần thêm chỗ lưu thật (máy chủ hoặc dịch vụ như Firebase) và đăng nhập thật.

## Phí ship

Phí ship = `shipping.fee`, miễn phí khi tạm tính ≥ `shipping.freeFrom` hoặc khách chọn gói đánh dấu miễn ship.

## Chạy thử trên máy

```bash
python3 -m http.server 5173
```

Mở http://localhost:5173.

## Cần thay trước khi chạy quảng cáo

- Tên cửa hàng, hotline, Zalo, địa chỉ, email (đang là dữ liệu mẫu).
- Bơ và sầu riêng trong thư viện là cây mẫu, ảnh `images/sp-*.jpg` lấy từ Wikimedia Commons (xem `CREDITS.md`).
- Đánh giá và số liệu là nội dung mẫu.
- Đơn hàng chưa gửi đi đâu: nối vào Google Sheet / Telegram / backend ở chỗ `TODO` trong `index.html`.
- Sau khi sửa `config.js` hoặc `art.js`, tăng số `?v=` trong các thẻ `<script>` của `index.html` để trình duyệt khách không dùng bản cũ.
