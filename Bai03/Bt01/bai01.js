/**
 * BÀI TẬP 01: Quản lý thông tin sinh viên bằng JavaScript ES6
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * 
 * YÊU CẦU:
 * - Khai báo danh sách 5 sinh viên, mỗi sinh viên gồm mã, họ tên, tuổi và điểm.
 * - Sử dụng class, constructor để biểu diễn sinh viên.
 * - Sử dụng hàm mũi tên arrow function để lọc sinh viên có điểm từ 5 trở lên.
 * - Hiển thị danh sách sinh viên đạt yêu cầu bằng console.log().
 */

// 1. Sử dụng class, constructor để biểu diễn sinh viên
class SinhVien {
    constructor(ma, hoTen, tuoi, diem) {
        this.ma = ma;
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.diem = diem;
    }

    // Phương thức trả về chuỗi thông tin định dạng đẹp
    thongTinChiTiet() {
        return `[${this.ma}] ${this.hoTen} - Tuổi: ${this.tuoi} - Điểm: ${this.diem}`;
    }
}

// 2. Khai báo danh sách 5 sinh viên
const danhSachSinhVien = [
    new SinhVien("CD-CNTT18B33", "Trần Huỳnh Vũ", 20, 9.5),
    new SinhVien("SV002", "Nguyễn Văn An", 20, 4.5),
    new SinhVien("SV003", "Lê Thị Thảo Bình", 19, 7.8),
    new SinhVien("SV004", "Phạm Quốc Cường", 21, 3.5),
    new SinhVien("SV005", "Đặng Minh Đức", 20, 8.2)
];

console.log("==================================================================");
console.log("       BÀI TẬP 01: QUẢN LÝ THÔNG TIN SINH VIÊN (JAVASCRIPT ES6)   ");
console.log("   Sinh viên thực hiện : Trần Huỳnh Vũ                           ");
console.log("   Mã số sinh viên     : CD-CNTT18B33                            ");
console.log("   Lớp                 : CĐ-CNTT18B                              ");
console.log("==================================================================");

console.log("\n>>> DANH SÁCH TOÀN BỘ 5 SINH VIÊN BAN ĐẦU:");
console.table(danhSachSinhVien);

// 3. Sử dụng hàm mũi tên (arrow function) để lọc sinh viên có điểm từ 5 trở lên
const sinhVienDat = danhSachSinhVien.filter(sinhVien => sinhVien.diem >= 5);

// 4. Hiển thị danh sách sinh viên đạt yêu cầu bằng console.log()
console.log("==================================================================");
console.log(">>> KẾT QUẢ: DANH SÁCH SINH VIÊN ĐẠT YÊU CẦU (ĐIỂM TỪ 5 TRỞ LÊN):");
console.log(`>>> Tổng số sinh viên đạt: ${sinhVienDat.length} / ${danhSachSinhVien.length} sinh viên`);
console.log("------------------------------------------------------------------");

sinhVienDat.forEach((sv, index) => {
    console.log(` ${index + 1}. Mã SV: ${sv.ma.padEnd(14)} | Họ tên: ${sv.hoTen.padEnd(20)} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem} => ĐẠT`);
});

console.log("------------------------------------------------------------------");
console.log("\n>>> BẢNG TỔNG HỢP SINH VIÊN ĐẠT YÊU CẦU:");
console.table(sinhVienDat);
console.log("==================================================================");