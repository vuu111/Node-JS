/**
 * ============================================================================
 * BÀI TẬP 03: THAO TÁC TẬP TIN BẰNG FILE SYSTEM (FS MODULE)
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa CNTT - Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * ============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Tạo tập tin bai03.js sử dụng module fs:
 * - Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên.
 * - Đọc và hiển thị nội dung tập tin lên Terminal.
 * - Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile().
 * - Đọc lại tập tin để chứng minh nội dung đã được cập nhật.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'thongtin.txt');

console.log("\n=====================================================================================");
console.log("       BÀI TẬP 03: THAO TÁC TẬP TIN VỚI FILE SYSTEM (FS MODULE NODE.JS)              ");
console.log("   Sinh viên thực hiện : TRẦN HUỲNH VŨ                                               ");
console.log("   Mã số sinh viên     : CD-CNTT18B33                                                ");
console.log("   Lớp                 : CĐ-CNTT18B                                                  ");
console.log("   Trường              : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang                ");
console.log("=====================================================================================\n");

// ----------------------------------------------------------------------------
// BƯỚC 1: Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên
// ----------------------------------------------------------------------------
const noiDungKhoiTao = "Họ và tên: Trần Huỳnh Vũ\r\nMã sinh viên: CD-CNTT18B33\r\n";

console.log("[BƯỚC 1] Đang khởi tạo tập tin thongtin.txt bằng fs.writeFile()...");

fs.writeFile(filePath, noiDungKhoiTao, 'utf-8', (err) => {
    if (err) {
        console.error(" [LỖI] Không thể tạo tập tin:", err);
        return;
    }
    console.log(" [THÀNH CÔNG] Tập tin thongtin.txt đã được tạo thành công!");
    console.log(` Đường dẫn lưu trữ: ${filePath}`);

    // ------------------------------------------------------------------------
    // BƯỚC 2: Đọc và hiển thị nội dung tập tin lên Terminal (Lần 1)
    // ------------------------------------------------------------------------
    console.log("\n[BƯỚC 2] Đọc và hiển thị nội dung tập tin lên Terminal lần 1 bằng fs.readFile():");
    console.log("+-----------------------------------------------------------------------------------+");
    console.log("| NỘI DUNG TẬP TIN BAN ĐẦU (CHƯA CẬP NHẬT TÊN LỚP)                                  |");
    console.log("+-----------------------------------------------------------------------------------+");

    fs.readFile(filePath, 'utf-8', (err, dataLan1) => {
        if (err) {
            console.error(" [LỖI] Không thể đọc tập tin lần 1:", err);
            return;
        }

        // Xuất từng dòng nội dung
        dataLan1.trim().split(/\r?\n/).forEach(line => {
            console.log(`| >> ${line.padEnd(76)} |`);
        });
        console.log("+-----------------------------------------------------------------------------------+");

        // --------------------------------------------------------------------
        // BƯỚC 3: Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()
        // --------------------------------------------------------------------
        const dongThemLop = "Lớp: CĐ-CNTT18B\r\n";
        console.log("\n[BƯỚC 3] Đang ghi nối thêm tên lớp bằng fs.appendFile()...");

        fs.appendFile(filePath, dongThemLop, 'utf-8', (err) => {
            if (err) {
                console.error(" [LỖI] Không thể ghi nối vào tập tin:", err);
                return;
            }
            console.log(" [THÀNH CÔNG] Đã ghi nối thêm 'Lớp: CĐ-CNTT18B' vào cuối tập tin!");

            // ----------------------------------------------------------------
            // BƯỚC 4: Đọc lại tập tin để chứng minh nội dung đã được cập nhật
            // ----------------------------------------------------------------
            console.log("\n[BƯỚC 4] Đọc lại tập tin để chứng minh nội dung đã được cập nhật thành công:");
            console.log("+===================================================================================+");
            console.log("| NỘI DUNG TẬP TIN HOÀN CHỈNH SAU KHI CẬP NHẬT (ĐÃ NỐI THÊM TÊN LỚP)                |");
            console.log("+===================================================================================+");

            fs.readFile(filePath, 'utf-8', (err, dataLan2) => {
                if (err) {
                    console.error(" [LỖI] Không thể đọc lại tập tin lần 2:", err);
                    return;
                }

                dataLan2.trim().split(/\r?\n/).forEach(line => {
                    console.log(`| ✔ ${line.padEnd(77)} |`);
                });
                console.log("+===================================================================================+");

                // Thống kê kết quả chứng minh
                const stats = fs.statSync(filePath);
                console.log("\n======================== BÁO CÁO KẾT QUẢ THỰC HIỆN ========================");
                console.log(`* Trạng thái cập nhật : HOÀN THÀNH XUẤT SẮC`);
                console.log(`* Tệp tin kết quả     : thongtin.txt`);
                console.log(`* Dung lượng tệp tin  : ${stats.size} bytes`);
                console.log(`* Số dòng thông tin   : 3 dòng (Họ tên, Mã sinh viên, Lớp)`);
                console.log(`* Chứng minh          : Nội dung tên lớp đã được nối vào cuối tệp tin an toàn.`);
                console.log("===========================================================================\n");
            });
        });
    });
});