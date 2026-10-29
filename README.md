# Landing page – Cau Thái Trái Dài

Landing page bán cây giống cau Thái trái dài, tối ưu cho điện thoại, mở trên máy tính thì ra bố cục nhiều cột riêng. Trang tĩnh, không cần build, chạy trên GitHub Pages.

- Trang bán hàng: `index.html`
- Trang quản trị: `admin.html` (vd: https://sucalb.github.io/cau-thai-landing/admin.html)
- Nội dung sửa được (giá, gói, chữ, ảnh, video): `config.js`

## Trang quản trị

Khách tự sửa giá, các gói combo, giá mua số lượng lớn, sản phẩm mua kèm, chữ khuyến mãi, tiêu đề, đánh giá, hỏi đáp, ảnh và video, rồi bấm **Lưu thay đổi**. Trang quản trị ghi `config.js` (và ảnh/video mới) thẳng vào repo này; GitHub Pages tự cập nhật trang bán hàng sau khoảng 1–10 phút.

Đăng nhập bằng token GitHub:

1. Mở https://github.com/settings/personal-access-tokens/new (tài khoản có quyền ghi vào repo).
2. Repository access: **Only select repositories**, chọn repo này.
3. Repository permissions → **Contents: Read and write**.
4. Generate token, dán vào trang quản trị. Ai có token này đều sửa được trang, không gửi cho người khác.

Ảnh tải lên được tự thu nhỏ về tối đa 1600px. Video nên nén dưới 20MB trước khi tải lên (tối đa 50MB).

Trang quản trị không quản lý đơn hàng và không sửa hotline/Zalo/địa chỉ (đang cố định trong `index.html`).

## Chạy thử trên máy

```bash
python3 -m http.server 5173
```

Mở http://localhost:5173.

## Cần thay trước khi chạy quảng cáo

- Tên vườn, số điện thoại, Zalo, địa chỉ, email trong `index.html` (đang là "Vườn Cau Việt", 0900.000.000). Video có hotline 0368.555.616: nếu đúng là số của vườn thì thay luôn.
- Đánh giá khách hàng và số liệu (12.000+ khách…) là nội dung mẫu, sửa trong trang quản trị.
- Form đặt hàng chưa gửi đi đâu: nối vào Google Sheet / Telegram / backend ở chỗ `TODO` trong `index.html`.
