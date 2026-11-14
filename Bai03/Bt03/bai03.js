/**
 * BÀI TẬP 03: Thao tác tập tin bằng File System
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * 
 * YÊU CẦU:
 * Tạo tập tin bai03.js sử dụng module fs:
 * - Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên.
 * - Đọc và hiển thị nội dung tập tin lên Terminal.
 * - Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile().
 * - Đọc lại tập tin để chứng minh nội dung đã được cập nhật.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'thongtin.txt');

console.log("==================================================================");
console.log("       BÀI TẬP 03: THAO TÁC TẬP TIN BẰNG FILE SYSTEM (FS)         ");
console.log("   Sinh viên thực hiện : Trần Huỳnh Vũ                           ");
console.log("   Mã số sinh viên     : CD-CNTT18B33                            ");
console.log("   Lớp                 : CĐ-CNTT18B                              ");
console.log("==================================================================");

// BƯỚC 1: Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên
const thongTinBanDau = `Họ và tên: Trần Huỳnh Vũ\nMã sinh viên: CD-CNTT18B33\n`;

console.log("\n[BƯỚC 1] Đang khởi tạo tập tin thongtin.txt với họ tên và mã sinh viên...");
fs.writeFile(filePath, thongTinBanDau, 'utf-8', (err) => {
    if (err) {
        console.error("❌ Lỗi khi tạo tập tin:", err);
        return;
    }
    console.log("✔ Khởi tạo tập tin thongtin.txt thành công!");

    // BƯỚC 2: Đọc và hiển thị nội dung tập tin lên Terminal
    console.log("\n[BƯỚC 2] Đọc và hiển thị nội dung tập tin lên Terminal (Lần 1):");
    console.log("------------------------------------------------------------------");
    fs.readFile(filePath, 'utf-8', (err, dataLan1) => {
        if (err) {
            console.error("❌ Lỗi khi đọc tập tin lần 1:", err);
            return;
        }
        // Hiển thị nội dung ra Terminal
        console.log(dataLan1.trim());
        console.log("------------------------------------------------------------------");

        // BƯỚC 3: Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()
        const dongThemLop = `Lớp: CĐ-CNTT18B\n`;
        console.log("\n[BƯỚC 3] Đang ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()...");
        fs.appendFile(filePath, dongThemLop, 'utf-8', (err) => {
            if (err) {
                console.error("❌ Lỗi khi ghi nối tập tin:", err);
                return;
            }
            console.log("✔ Ghi nối thêm 'Lớp: CĐ-CNTT18B' vào tập tin thành công!");

            // BƯỚC 4: Đọc lại tập tin để chứng minh nội dung đã được cập nhật
            console.log("\n[BƯỚC 4] Đọc lại tập tin để chứng minh nội dung đã được cập nhật (Lần 2):");
            console.log("==================================================================");
            fs.readFile(filePath, 'utf-8', (err, dataLan2) => {
                if (err) {
                    console.error("❌ Lỗi khi đọc tập tin lần 2:", err);
                    return;
                }
                // Hiển thị nội dung đầy đủ sau khi đã cập nhật
                console.log(dataLan2.trim());
                console.log("==================================================================");
                console.log("🎉 KẾT QUẢ: Tập tin thongtin.txt đã được tạo và cập nhật thành công!");
                console.log("Nội dung hoàn chỉnh bao gồm đầy đủ: Họ tên, Mã sinh viên và Lớp.");
                console.log("==================================================================");
            });
        });
    });
});