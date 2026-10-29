# Landing page – Cau Thái Trái Dài

Landing page bán cây giống cau Thái trái dài, tối ưu cho điện thoại, mở trên máy tính thì ra bố cục nhiều cột riêng. Trang tĩnh, không cần build, chạy trên GitHub Pages.

- Trang bán hàng: `index.html`
- Trang quản trị (demo): `admin.html` (vd: https://sucalb.github.io/cau-thai-landing/admin.html)
- Nội dung sửa được (giá, gói, chữ, ảnh, video): `config.js`

## Trang quản trị (bản demo)

`admin.html` hiện là **bản demo, chưa lưu lên trang thật**. Đăng nhập: tài khoản `admin`, mật khẩu `demo123` (kiểm tra ngay trên trình duyệt, chỉ để demo).

Khách sửa giá, các gói, giá mua số lượng lớn, sản phẩm mua kèm, chữ khuyến mãi, tiêu đề, đánh giá, hỏi đáp, ảnh rồi bấm **Lưu thay đổi**: bản nháp được lưu trong trình duyệt của máy đó. Bấm **Xem trước** để mở trang bán hàng (`?preview=1`) với nội dung vừa sửa. Khách thật vào trang không thấy bản nháp. **Khôi phục mặc định** xoá bản nháp.

Bản demo chưa hỗ trợ tải video. Khi làm bản chính cần thêm chỗ lưu thật (máy chủ hoặc dịch vụ như Firebase) và đăng nhập thật.

## Chạy thử trên máy

```bash
python3 -m http.server 5173
```

Mở http://localhost:5173.

## Cần thay trước khi chạy quảng cáo

- Tên vườn, số điện thoại, Zalo, địa chỉ, email trong `index.html` (đang là "Vườn Cau Việt", 0900.000.000). Video có hotline 0368.555.616: nếu đúng là số của vườn thì thay luôn.
- Đánh giá khách hàng và số liệu (12.000+ khách…) là nội dung mẫu, sửa trong `config.js`.
- Form đặt hàng chưa gửi đi đâu: nối vào Google Sheet / Telegram / backend ở chỗ `TODO` trong `index.html`.
