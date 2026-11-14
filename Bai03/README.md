# BÀI THỰC HÀNH 03 — MODULE, FILE SYSTEM VÀ CƠ SỞ DỮ LIỆU

## 📌 THÔNG TIN SINH VIÊN
* **Họ và tên:** **Trần Huỳnh Vũ**
* **Mã sinh viên (MSSV):** **CD-CNTT18B33**
* **Lớp:** **CĐ-CNTT18B**
* **Khoa:** Công nghệ Thông tin
* **Trường:** Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
* **Repository GitHub:** [https://github.com/vuu111/Node-JS](https://github.com/vuu111/Node-JS)

---

## 📂 CẤU TRÚC THƯ MỤC BÀI TẬP (BAI03)

```text
Bai03/
├── README.md                      # Báo cáo tổng quan Bài 3
├── Bt01/                          # Bài 1: Quản lý thông tin sinh viên ES6
│   ├── bai01.js                   # Mã nguồn bài 1
│   ├── Readme.md                  # Hướng dẫn chi tiết & ảnh minh chứng
│   └── buoc-1-chay-bai01.png      # Ảnh chạy thực tế trên Terminal
├── Bt02/                          # Bài 2: Tạo Web Server với Node.js
│   ├── bai02.js                   # Mã nguồn bài 2 (HTTP module, cổng 3000)
│   ├── Readme.md                  # Hướng dẫn chi tiết & ảnh minh chứng
│   ├── buoc-1-khoi-dong-server.png# Ảnh khởi động server trên Terminal
│   ├── buoc-2-trang-chu.png       # Ảnh giao diện trang chủ / (Lời chào + MSSV)
│   ├── buoc-3-trang-about.png     # Ảnh giao diện trang /about (Hồ sơ bản thân)
│   └── buoc-4-trang-404.png       # Ảnh giao diện lỗi HTTP 404
└── Bt03/                          # Bài 3: Thao tác tập tin bằng File System
    ├── bai03.js                   # Mã nguồn bài 3 (fs module, appendFile)
    ├── thongtin.txt               # Tập tin dữ liệu được tạo & nối thêm lớp
    ├── Readme.md                  # Hướng dẫn chi tiết & ảnh minh chứng
    ├── buoc-1-chay-bai03.png      # Ảnh chạy tuần tự 4 bước trên Terminal
    └── buoc-2-noi-dung-thongtin.png# Ảnh kiểm tra nội dung thongtin.txt
```

---

## 📋 TỔNG HỢP CÁC BÀI TẬP TRONG BÀI 03

### 1. [Bài 1 (Bt01): Quản lý thông tin sinh viên bằng JavaScript ES6](./Bt01/Readme.md)
* **Mục tiêu:** Sử dụng cú pháp ES6 (`class`, `constructor`, `arrow function`, `filter`) để quản lý danh sách sinh viên.
* **Tệp tin:** `Bt01/bai01.js`
* **Lệnh chạy:**
  ```powershell
  cd Bt01
  node bai01.js
  ```
* **Chi tiết & Minh chứng:** [Xem tại Bt01/Readme.md](./Bt01/Readme.md)

---

### 2. [Bài 2 (Bt02): Tạo Web Server với Node.js](./Bt02/Readme.md)
* **Mục tiêu:** Sử dụng module `http` thuần tạo Web Server tại cổng 3000:
  - Route `/`: Hiển thị lời chào và mã sinh viên (CD-CNTT18B33).
  - Route `/about`: Hiển thị thông tin giới thiệu bản thân.
  - Route không tồn tại: Trả về HTTP Status 404 Not Found.
* **Tệp tin:** `Bt02/bai02.js`
* **Lệnh chạy:**
  ```powershell
  cd Bt02
  node bai02.js
  ```
* **Địa chỉ truy cập:** `http://localhost:3000` | `http://localhost:3000/about`
* **Chi tiết & Minh chứng:** [Xem tại Bt02/Readme.md](./Bt02/Readme.md)

---

### 3. [Bài 3 (Bt03): Thao tác tập tin bằng File System](./Bt03/Readme.md)
* **Mục tiêu:** Sử dụng module `fs` để:
  - Tạo tệp tin `thongtin.txt` lưu trữ Họ tên và MSSV.
  - Đọc và in nội dung ra Terminal lần 1.
  - Ghi nối thêm tên lớp (`CĐ-CNTT18B`) bằng `fs.appendFile()`.
  - Đọc lại tệp tin để chứng minh nội dung đã được cập nhật thành công.
* **Tệp tin:** `Bt03/bai03.js`, `Bt03/thongtin.txt`
* **Lệnh chạy:**
  ```powershell
  cd Bt03
  node bai03.js
  ```
* **Chi tiết & Minh chứng:** [Xem tại Bt03/Readme.md](./Bt03/Readme.md)