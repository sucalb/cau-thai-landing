# Landing page – Cau Thái Trái Dài

Landing page bán cây giống cau Thái trái dài, thiết kế cho điện thoại (trên máy tính hiển thị một cột ở giữa): giới thiệu, bảng giá combo, đếm ngược ưu đãi, form đặt hàng, hỏi đáp. Một file HTML tĩnh, không cần build.

## Chạy thử

```bash
python3 -m http.server 5173
```

Mở http://localhost:5173.

## Cần thay trước khi chạy quảng cáo

- Tên vườn, số điện thoại, Zalo, địa chỉ, email (đang là "Vườn Cau Việt", 0900.000.000).
- Ảnh trong `images/` và video `video/vuon-cau.mp4` là của khách gửi. Video đã nén còn khoảng 15MB (540×960) để tải nhanh trên điện thoại.
- Video có hotline 0368.555.616: nếu đúng là số của vườn thì thay luôn số mẫu trên trang.
- Đánh giá khách hàng và số liệu (12.000+ khách, 63 tỉnh) là nội dung mẫu.
- Form đặt hàng chưa gửi đi đâu: nối vào Google Sheet / Telegram / backend ở chỗ `TODO` trong `index.html`.
