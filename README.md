# Landing page – Cau Thái Trái Dài

Landing page bán cây giống cau Thái trái dài, tối ưu cho điện thoại, mở trên máy tính thì ra bố cục nhiều cột riêng. Trang tĩnh, không cần build, chạy trên GitHub Pages.

- Trang bán hàng: `index.html`
- Trang quản trị: `admin.html` (vd: https://sucalb.github.io/cau-thai-landing/admin.html)
- Nội dung sửa được (giá, gói, chữ, ảnh, video): `config.js`

## Trang quản trị

Khách tự sửa giá, các gói combo, giá mua số lượng lớn, sản phẩm mua kèm, chữ khuyến mãi, tiêu đề, đánh giá, hỏi đáp, ảnh và video, rồi bấm **Lưu thay đổi**. Trang quản trị ghi `config.js` (và ảnh/video mới) thẳng vào repo này; GitHub Pages tự cập nhật trang bán hàng sau khoảng 1–10 phút.

Đăng nhập bằng tài khoản + mật khẩu. Phía sau, trang quản trị dùng một token GitHub đã được mã hoá bằng mật khẩu và lưu trong `admin-auth.json`; khách không cần biết gì về GitHub.

Cài (hoặc đổi) tài khoản, chỉ người làm trang làm một lần:

1. Tạo token tại https://github.com/settings/personal-access-tokens/new: Repository access **Only select repositories** → chọn repo này; Repository permissions → **Contents: Read and write**. Nên đặt hạn dùng dài (vd 1 năm) và ghi nhớ ngày hết hạn.
2. Chạy và dán token khi được hỏi:
   ```bash
   node tools/tao-tai-khoan.mjs admin "mật-khẩu-mới"
   ```
3. Commit và push `admin-auth.json`.

Mật khẩu nên dài (ít nhất 12 ký tự, script bắt buộc) vì file mã hoá nằm công khai trong repo. Đổi mật khẩu hoặc khi token hết hạn: chạy lại bước 1–3.

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
