# BÀI TẬP 01: QUẢN LÝ THÔNG TIN SINH VIÊN BẰNG JAVASCRIPT ES6

## 📌 THÔNG TIN SINH VIÊN THỰC HIỆN
* **Họ và tên:** **Trần Huỳnh Vũ**
* **Mã sinh viên (MSSV):** **CD-CNTT18B33**
* **Lớp:** **CĐ-CNTT18B**
* **Khoa:** Công nghệ Thông tin
* **Trường:** Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
* **Repository GitHub:** [https://github.com/vuu111/Node-JS](https://github.com/vuu111/Node-JS)

---

## 🎯 YÊU CẦU BÀI THỰC HÀNH
Tạo tập tin `bai01.js` thực hiện:
1. Khai báo danh sách 5 sinh viên, mỗi sinh viên gồm `mã`, `họ tên`, `tuổi` và `điểm`.
2. Sử dụng `class`, `constructor` để biểu diễn sinh viên.
3. Sử dụng hàm mũi tên (arrow function) để lọc sinh viên có điểm từ 5 trở lên (`diem >= 5`).
4. Hiển thị danh sách sinh viên đạt yêu cầu bằng `console.log()`.
5. Chạy: `node bai01.js`
6. Kết quả: Terminal hiển thị đúng danh sách sinh viên đạt yêu cầu.

---

## 💻 CÁC LỆNH THỰC HIỆN TRÊN MÁY TÍNH
Mở terminal (PowerShell hoặc Command Prompt) tại thư mục bài tập và thực thi các lệnh:

```powershell
# 1. Di chuyển vào thư mục bài tập Bt01
cd "C:\vu 1111\Bai03\Bt01"

# 2. Kiểm tra phiên bản Node.js môi trường
node -v

# 3. Chạy chương trình bai01.js
node bai01.js
```

---

## 📷 HÌNH ẢNH CHẠY CÁC BƯỚC VÀ KẾT QUẢ THỰC TẾ

### Bước 1: Thực thi chương trình `node bai01.js` trên PowerShell
Terminal in ra bảng 5 sinh viên ban đầu, thực hiện lọc bằng arrow function và xuất danh sách sinh viên đạt yêu cầu:

![Kết quả chạy node bai01.js](buoc-1-chay-bai01.png)

---

## 📊 KẾT QUẢ CUỐI CÙNG TRÊN TERMINAL

```text
==================================================================
       BÀI TẬP 01: QUẢN LÝ THÔNG TIN SINH VIÊN (JAVASCRIPT ES6)   
   Sinh viên thực hiện : Trần Huỳnh Vũ                           
   Mã số sinh viên     : CD-CNTT18B33                            
   Lớp                 : CĐ-CNTT18B                              
==================================================================

>>> DANH SÁCH TOÀN BỘ 5 SINH VIÊN BAN ĐẦU:
┌─────────┬────────────────┬────────────────────┬──────┬──────┐
│ (index) │ ma             │ hoTen              │ tuoi │ diem │
├─────────┼────────────────┼────────────────────┼──────┼──────┤
│ 0       │ 'CD-CNTT18B33' │ 'Trần Huỳnh Vũ'    │ 20   │ 9.5  │
│ 1       │ 'SV002'        │ 'Nguyễn Văn An'    │ 20   │ 4.5  │
│ 2       │ 'SV003'        │ 'Lê Thị Thảo Bình' │ 19   │ 7.8  │
│ 3       │ 'SV004'        │ 'Phạm Quốc Cường'  │ 21   │ 3.5  │
│ 4       │ 'SV005'        │ 'Đặng Minh Đức'    │ 20   │ 8.2  │
└─────────┴────────────────┴────────────────────┴──────┴──────┘
==================================================================
>>> KẾT QUẢ: DANH SÁCH SINH VIÊN ĐẠT YÊU CẦU (ĐIỂM TỪ 5 TRỞ LÊN):
>>> Tổng số sinh viên đạt: 3 / 5 sinh viên
------------------------------------------------------------------
 1. Mã SV: CD-CNTT18B33   | Họ tên: Trần Huỳnh Vũ        | Tuổi: 20 | Điểm: 9.5 => ĐẠT
 2. Mã SV: SV003          | Họ tên: Lê Thị Thảo Bình     | Tuổi: 19 | Điểm: 7.8 => ĐẠT
 3. Mã SV: SV005          | Họ tên: Đặng Minh Đức        | Tuổi: 20 | Điểm: 8.2 => ĐẠT
------------------------------------------------------------------

>>> BẢNG TỔNG HỢP SINH VIÊN ĐẠT YÊU CẦU:
┌─────────┬────────────────┬────────────────────┬──────┬──────┐
│ (index) │ ma             │ hoTen              │ tuoi │ diem │
├─────────┼────────────────┼────────────────────┼──────┼──────┤
│ 0       │ 'CD-CNTT18B33' │ 'Trần Huỳnh Vũ'    │ 20   │ 9.5  │
│ 1       │ 'SV003'        │ 'Lê Thị Thảo Bình' │ 19   │ 7.8  │
│ 2       │ 'SV005'        │ 'Đặng Minh Đức'    │ 20   │ 8.2  │
└─────────┴────────────────┴────────────────────┴──────┴──────┘
==================================================================
```

---

## 🔍 GIẢI THÍCH MÃ NGUỒN KỸ THUẬT ES6
* **Cú pháp Class & Constructor (ES6):**
  Lớp `SinhVien` đóng gói các thuộc tính `ma`, `hoTen`, `tuoi`, `diem` một cách trực quan, theo đúng chuẩn hướng đối tượng hiện đại trong ES6.
* **Hàm mũi tên (Arrow Function `=>`):**
  Phương thức `filter()` kết hợp arrow function `sinhVien => sinhVien.diem >= 5` giúp mã nguồn ngắn gọn, tối ưu và chuẩn xác.
* **Xuất kết quả:**
  Sử dụng vòng lặp `forEach()` kết hợp `console.log()` và `console.table()` để định dạng dữ liệu rõ ràng, dễ chấm điểm và theo dõi.