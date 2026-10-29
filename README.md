# Landing page – Cau Thái Trái Dài

Landing page bán cây giống cau Thái trái dài: giới thiệu, bảng giá combo, đếm ngược ưu đãi, form đặt hàng, hỏi đáp. Một file HTML tĩnh, không cần build.

## Chạy thử

```bash
python3 -m http.server 5173
```

Mở http://localhost:5173.

## Cần thay trước khi chạy quảng cáo

- Tên vườn, số điện thoại, Zalo, địa chỉ, email (đang là "Vườn Cau Việt", 0900.000.000).
- Ảnh trong `images/` là ảnh vườn do khách gửi. Video tại vườn vẫn chưa có (khung video đang dùng ảnh làm nền).
- Đánh giá khách hàng và số liệu (12.000+ khách, 63 tỉnh) là nội dung mẫu.
- Form đặt hàng chưa gửi đi đâu: nối vào Google Sheet / Telegram / backend ở chỗ `TODO` trong `index.html`.
