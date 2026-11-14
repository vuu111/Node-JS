/**
 * ============================================================================
 * BÀI TẬP 01: QUẢN LÝ THÔNG TIN SINH VIÊN BẰNG JAVASCRIPT ES6
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa CNTT - Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * ============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * 1. Khai báo danh sách 5 sinh viên, mỗi sinh viên gồm mã, họ tên, tuổi và điểm.
 * 2. Sử dụng class, constructor để biểu diễn sinh viên.
 * 3. Sử dụng hàm mũi tên (arrow function) để lọc sinh viên có điểm từ 5 trở lên.
 * 4. Hiển thị danh sách sinh viên đạt yêu cầu bằng console.log().
 * ============================================================================
 */

// 1. Sử dụng class, constructor để biểu diễn sinh viên
class SinhVien {
    constructor(ma, hoTen, tuoi, diem) {
        this.ma = ma;
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.diem = diem;
    }

    // Phương thức xếp loại học lực
    xepLoai() {
        if (this.diem >= 9.0) return "Xuất sắc";
        if (this.diem >= 8.0) return "Giỏi";
        if (this.diem >= 6.5) return "Khá";
        if (this.diem >= 5.0) return "Trung bình";
        return "Chưa đạt (Yếu)";
    }

    // Phương thức kiểm tra đạt yêu cầu (điểm >= 5)
    kiemTraDat() {
        return this.diem >= 5.0;
    }

    // Định dạng chuỗi thông tin chi tiết
    thongTin() {
        return `[${this.ma}] ${this.hoTen} | ${this.tuoi} tuổi | Điểm: ${this.diem.toFixed(1)} | Xếp loại: ${this.xepLoai()}`;
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

// Hàm hỗ trợ in bảng ASCII chuẩn (không dùng ký tự Unicode đặc biệt để chống lỗi font trên mọi Terminal)
function inBangSinhVien(tieuDe, danhSach) {
    const duongKe = "+-----+----------------+----------------------+------+------+-------------+------------+";
    console.log(duongKe);
    console.log(`| ${tieuDe.padEnd(81)} |`);
    console.log(duongKe);
    console.log("| STT | Mã Sinh Viên   | Họ và Tên            | Tuổi | Điểm | Xếp Loại    | Trạng Thái |");
    console.log(duongKe);

    danhSach.forEach((sv, idx) => {
        const stt = String(idx + 1).padStart(2);
        const ma = sv.ma.padEnd(14);
        const ten = sv.hoTen.padEnd(20);
        const tuoi = String(sv.tuoi).padStart(3);
        const diem = sv.diem.toFixed(1).padStart(4);
        const xepLoai = sv.xepLoai().padEnd(11);
        const trangThai = sv.kiemTraDat() ? " ĐẠT (>= 5) " : " CHƯA ĐẠT  ";
        console.log(`|  ${stt} | ${ma} | ${ten} |  ${tuoi} | ${diem} | ${xepLoai} | ${trangThai}|`);
    });

    console.log(duongKe);
}

// =================== BẮT ĐẦU HIỂN THỊ KẾT QUẢ ===================
console.log("\n=====================================================================================");
console.log("       BÀI TẬP 01: QUẢN LÝ THÔNG TIN SINH VIÊN BẰNG JAVASCRIPT ES6 (NODE.JS)         ");
console.log("   Sinh viên thực hiện : Trần Huỳnh Vũ                                               ");
console.log("   Mã số sinh viên     : CD-CNTT18B33                                                ");
console.log("   Lớp                 : CĐ-CNTT18B                                                  ");
console.log("   Trường              : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang                ");
console.log("=====================================================================================\n");

// Hiển thị danh sách 5 sinh viên ban đầu
inBangSinhVien("DANH SÁCH TOÀN BỘ 5 SINH VIÊN BAN ĐẦU", danhSachSinhVien);

// 3. Sử dụng hàm mũi tên (arrow function) để lọc sinh viên có điểm từ 5 trở lên
const sinhVienDat = danhSachSinhVien.filter(sinhVien => sinhVien.diem >= 5);

// 4. Hiển thị danh sách sinh viên đạt yêu cầu bằng console.log()
console.log("\n>>> KẾT QUẢ LỌC BẰNG ARROW FUNCTION (sinhVien => sinhVien.diem >= 5):");
console.log(`>>> Tổng số sinh viên đạt yêu cầu: ${sinhVienDat.length} / ${danhSachSinhVien.length} sinh viên\n`);

inBangSinhVien("DANH SÁCH SINH VIÊN ĐẠT YÊU CẦU (ĐIỂM TỪ 5.0 TRỞ LÊN)", sinhVienDat);

console.log("\n--- CHI TIẾT TỪNG SINH VIÊN ĐẠT YÊU CẦU (XUẤT BẰNG console.log) ---");
sinhVienDat.forEach((sv, index) => {
    console.log(`[ĐẠT] Sinh viên ${index + 1}: ${sv.thongTin()}`);
});

// Thống kê chi tiết
const tongDiem = danhSachSinhVien.reduce((sum, sv) => sum + sv.diem, 0);
const diemTB = (tongDiem / danhSachSinhVien.length).toFixed(2);
const diemCaoNhat = Math.max(...danhSachSinhVien.map(sv => sv.diem));

console.log("\n======================== THỐNG KÊ KẾT QUẢ ĐÁNH GIÁ ========================");
console.log(`* Tổng số sinh viên quản lý   : ${danhSachSinhVien.length} sinh viên`);
console.log(`* Số lượng sinh viên ĐẠT      : ${sinhVienDat.length} sinh viên (${(sinhVienDat.length / danhSachSinhVien.length * 100).toFixed(0)}%)`);
console.log(`* Số lượng sinh viên CHƯA ĐẠT : ${danhSachSinhVien.length - sinhVienDat.length} sinh viên`);
console.log(`* Điểm trung bình cả lớp      : ${diemTB} điểm`);
console.log(`* Điểm số cao nhất            : ${diemCaoNhat} điểm (${danhSachSinhVien.find(s => s.diem === diemCaoNhat).hoTen})`);
console.log("===========================================================================\n");