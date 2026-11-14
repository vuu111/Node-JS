# BÀI TẬP 02: TẠO WEB SERVER VỚI NODE.JS

## 📌 THÔNG TIN SINH VIÊN THỰC HIỆN
* **Họ và tên:** **Trần Huỳnh Vũ**
* **Mã sinh viên (MSSV):** **CD-CNTT18B33**
* **Lớp:** **CĐ-CNTT18B**
* **Khoa:** Công nghệ Thông tin
* **Trường:** Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
* **Repository GitHub:** [https://github.com/vuu111/Node-JS](https://github.com/vuu111/Node-JS)

---

## 🎯 YÊU CẦU BÀI THỰC HÀNH
Tạo tập tin `bai02.js` thực hiện:
1. Sử dụng module `http` tạo Web Server tại cổng 3000 (`PORT = 3000`).
2. Khi truy cập `/`, hiển thị **lời chào** và **mã sinh viên**.
3. Khi truy cập `/about`, hiển thị **thông tin giới thiệu bản thân**.
4. Khi truy cập đường dẫn không tồn tại, trả về **mã trạng thái HTTP 404**.
5. Chạy: `node bai02.js`
6. Kết quả: Trình duyệt hiển thị đúng nội dung tại `http://localhost:3000` và `http://localhost:3000/about`.

---

## 💻 CÁC LỆNH THỰC HIỆN TRÊN MÁY TÍNH
Mở terminal tại thư mục bài tập và thực thi:

```powershell
# 1. Di chuyển vào thư mục bài tập Bt02
cd "C:\vu 1111\Bai03\Bt02"

# 2. Khởi động Web Server
node bai02.js
```

Sau khi máy chủ khởi động, mở trình duyệt Web (Google Chrome / Edge) và truy cập các địa chỉ:
* Trang chủ: `http://localhost:3000/`
* Giới thiệu bản thân: `http://localhost:3000/about`
* Kiểm tra route không tồn tại: `http://localhost:3000/khong-ton-tai`

---

## 📷 HÌNH ẢNH CHẠY CÁC BƯỚC VÀ KẾT QUẢ THỰC TẾ

### Bước 1: Khởi động Web Server trên PowerShell
Máy chủ Node.js lắng nghe tại cổng 3000 và hiển thị sẵn sàng nhận kết nối:

![Bước 1: Khởi động Web Server](buoc-1-khoi-dong-server.png)

---

### Bước 2: Truy cập trang chủ `http://localhost:3000/`
Trình duyệt hiển thị lời chào trân trọng và nổi bật Mã sinh viên: **CD-CNTT18B33**:

![Bước 2: Trang chủ với Lời chào và Mã sinh viên](buoc-2-trang-chu.png)

---

### Bước 3: Truy cập trang giới thiệu bản thân `http://localhost:3000/about`
Trình duyệt hiển thị hồ sơ cá nhân đầy đủ: Họ tên, MSSV, Lớp, Khoa, Trường và định hướng học tập:

![Bước 3: Trang giới thiệu bản thân](buoc-3-trang-about.png)

---

### Bước 4: Truy cập đường dẫn không tồn tại (Lỗi HTTP 404)
Máy chủ trả về tiêu đề HTTP trạng thái **404 Not Found** và giao diện thông báo lỗi trực quan:

![Bước 4: Trang báo lỗi 404 Not Found](buoc-4-trang-404.png)

---

## 🔍 PHÂN TÍCH KỸ THUẬT MODULE `http`
* **Hàm `http.createServer((req, res) => { ... })`:** Khởi tạo dịch vụ HTTP Server thuần của Node.js không cần cài đặt thêm thư viện ngoài.
* **Điều hướng URL (Routing):** Sử dụng đối tượng `URL` để bóc tách `req.url`, phân luồng xử lý:
  - Route `/` (hoặc `/index.html`): Phản hồi mã `200 OK`, xuất HTML lời chào và MSSV.
  - Route `/about`: Phản hồi mã `200 OK`, xuất HTML giới thiệu thông tin bản thân.
  - Tuyến đường khác: Phản hồi mã `404 Not Found` theo chuẩn giao thức HTTP.
* **Cấu hình Tiêu đề Phản hồi (`res.setHeader`):** Thiết lập `Content-Type: text/html; charset=utf-8` để hiển thị tiếng Việt có dấu chuẩn đẹp trên mọi trình duyệt.
* **Lắng nghe cổng mạng (`server.listen(3000)`):** Mở cổng mạng 3000 trên máy tính cục bộ để tiếp nhận và phản hồi các request từ Client.