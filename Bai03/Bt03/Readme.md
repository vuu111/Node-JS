# BÀI TẬP 03: THAO TÁC TẬP TIN BẰNG FILE SYSTEM (FS)

## 📌 THÔNG TIN SINH VIÊN THỰC HIỆN
* **Họ và tên:** **Trần Huỳnh Vũ**
* **Mã sinh viên (MSSV):** **CD-CNTT18B33**
* **Lớp:** **CĐ-CNTT18B**
* **Khoa:** Công nghệ Thông tin
* **Trường:** Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
* **Repository GitHub:** [https://github.com/vuu111/Node-JS](https://github.com/vuu111/Node-JS)

---

## 🎯 YÊU CẦU BÀI THỰC HÀNH
Tạo tập tin `bai03.js` sử dụng module `fs` thực hiện:
1. Tạo tập tin `thongtin.txt` chứa **họ tên** và **mã sinh viên**.
2. Đọc và hiển thị nội dung tập tin lên Terminal.
3. Ghi nối thêm **tên lớp** vào cuối tập tin bằng hàm `appendFile()`.
4. Đọc lại tập tin để chứng minh nội dung đã được cập nhật.
5. Chạy: `node bai03.js`
6. Kết quả: Tập tin được tạo, cập nhật và Terminal hiển thị đầy đủ nội dung sau cập nhật.

---

## 💻 CÁC LỆNH THỰC HIỆN TRÊN MÁY TÍNH
Mở terminal tại thư mục bài tập và thực thi:

```powershell
# 1. Di chuyển vào thư mục bài tập Bt03
cd "C:\vu 1111\Bai03\Bt03"

# 2. Chạy chương trình thao tác tập tin bai03.js
node bai03.js

# 3. Kiểm tra trực tiếp nội dung tập tin thongtin.txt
Get-Content .\thongtin.txt
```

---

## 📷 HÌNH ẢNH CHẠY CÁC BƯỚC VÀ KẾT QUẢ THỰC TẾ

### Bước 1: Thực thi chương trình `node bai03.js`
Chương trình lần lượt thực hiện 4 bước tuần tự: tạo file, đọc lần 1, ghi nối `appendFile()` và đọc lần 2:

![Bước 1: Chạy chương trình node bai03.js](buoc-1-chay-bai03.png)

---

### Bước 2: Kiểm tra nội dung tệp tin `thongtin.txt` sau khi cập nhật
Tập tin `thongtin.txt` được lưu trữ trên ổ đĩa chứa đầy đủ 3 thông tin: Họ tên, MSSV và Lớp:

![Bước 2: Kiểm tra nội dung thongtin.txt](buoc-2-noi-dung-thongtin.png)

---

## 📊 KẾT QUẢ CUỐI CÙNG TRÊN TERMINAL

```text
==================================================================
       BÀI TẬP 03: THAO TÁC TẬP TIN BẰNG FILE SYSTEM (FS)         
   Sinh viên thực hiện : Trần Huỳnh Vũ                           
   Mã số sinh viên     : CD-CNTT18B33                            
   Lớp                 : CĐ-CNTT18B                              
==================================================================

[BƯỚC 1] Đang khởi tạo tập tin thongtin.txt với họ tên và mã sinh viên...
✔ Khởi tạo tập tin thongtin.txt thành công!

[BƯỚC 2] Đọc và hiển thị nội dung tập tin lên Terminal (Lần 1):
------------------------------------------------------------------
Họ và tên: Trần Huỳnh Vũ
Mã sinh viên: CD-CNTT18B33
------------------------------------------------------------------

[BƯỚC 3] Đang ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()...
✔ Ghi nối thêm 'Lớp: CĐ-CNTT18B' vào tập tin thành công!

[BƯỚC 4] Đọc lại tập tin để chứng minh nội dung đã được cập nhật (Lần 2):
==================================================================
Họ và tên: Trần Huỳnh Vũ
Mã sinh viên: CD-CNTT18B33
Lớp: CĐ-CNTT18B
==================================================================
🎉 KẾT QUẢ: Tập tin thongtin.txt đã được tạo và cập nhật thành công!
Nội dung hoàn chỉnh bao gồm đầy đủ: Họ tên, Mã sinh viên và Lớp.
==================================================================
```

---

## 🔍 PHÂN TÍCH KỸ THUẬT MODULE `fs`
* **Hàm `fs.writeFile(file, data, 'utf-8', callback)`:** Tạo tệp tin mới (hoặc ghi đè) với encoding `utf-8` để bảo toàn dấu tiếng Việt của họ và tên sinh viên.
* **Hàm `fs.readFile(file, 'utf-8', callback)`:** Đọc dữ liệu từ file dạng chuỗi văn bản không bị lỗi nhị phân/buffer, in kết quả trực tiếp ra Terminal.
* **Hàm `fs.appendFile(file, data, 'utf-8', callback)`:** Ghi nối tiếp nội dung `Lớp: CĐ-CNTT18B` vào cuối tệp tin mà không làm mất hoặc ghi đè nội dung họ tên và MSSV đã có trước đó.
* **Xử lý bất đồng bộ (Asynchronous Callback Pattern):** Các thao tác được lồng ghép tuần tự (Write -> Read 1 -> Append -> Read 2) đảm bảo tính toàn vẹn dữ liệu trước khi đọc lại để chứng minh cập nhật thành công.