/**
 * ============================================================================
 * BÀI TẬP 04: THÊM VÀ HIỂN THỊ DỮ LIỆU MONGODB
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa CNTT - Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * ============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * Tạo tập tin bai04.js thực hiện:
 * - Kết nối MongoDB đang chạy trên máy.
 * - Sử dụng database qlsinhvien, collection students.
 * - Thêm ít nhất 3 sinh viên bằng insertMany(), mỗi sinh viên gồm masv, hoten, tuoi, diem.
 * - Sử dụng find() hiển thị danh sách sinh viên và đóng kết nối sau khi hoàn thành.
 * ============================================================================
 */

const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

// Cấu hình URI kết nối MongoDB mặc định trên máy cục bộ
const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'qlsinhvien';
const COLLECTION_NAME = 'students';

// Hàm hỗ trợ vẽ bảng dữ liệu chuẩn ASCII (chống vỡ khung trên mọi Terminal)
function inBangSinhVien(tieuDe, danhSach) {
    const line = "+-----+----------------+----------------------+------+------+--------------------------+";
    console.log(line);
    console.log(`| ${tieuDe.padEnd(86)} |`);
    console.log(line);
    console.log("| STT | Mã Sinh Viên   | Họ và Tên            | Tuổi | Điểm | MongoDB _id              |");
    console.log(line);

    danhSach.forEach((sv, idx) => {
        const stt = String(idx + 1).padStart(2);
        const ma = (sv.masv || '').padEnd(14);
        const ten = (sv.hoten || '').padEnd(20);
        const tuoi = String(sv.tuoi || '').padStart(3);
        const diem = (Number(sv.diem) || 0).toFixed(1).padStart(4);
        const idStr = String(sv._id || '').substring(0, 24).padEnd(24);
        console.log(`|  ${stt} | ${ma} | ${ten} |  ${tuoi} | ${diem} | ${idStr} |`);
    });

    console.log(line);
}

// Hàm khởi tạo kết nối MongoDB linh hoạt (tự động hỗ trợ engine cục bộ nếu service máy chưa bật)
async function connectToMongo() {
    let client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 1500 });
    let embeddedServer = null;

    try {
        await client.connect();
        console.log(`[KẾT NỐI] Đã kết nối thành công tới dịch vụ MongoDB tại: ${MONGO_URI}`);
    } catch (err) {
        console.log(`[THÔNG BÁO] Chưa phát hiện dịch vụ MongoDB bên ngoài. Đang tự động kích hoạt Engine MongoDB lưu trữ cục bộ...`);
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const dbPath = path.resolve(__dirname, '../data/db');
        if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true });

        embeddedServer = await MongoMemoryServer.create({
            instance: { port: 27017, dbPath: dbPath }
        });
        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log(`[KẾT NỐI] Đã kích hoạt và kết nối thành công Engine MongoDB tại: ${MONGO_URI}`);
    }

    return { client, embeddedServer };
}

async function main() {
    console.log("\n=========================================================================================");
    console.log("             BÀI TẬP 04: THÊM VÀ HIỂN THỊ DỮ LIỆU MONGODB (NODE.JS)                      ");
    console.log("   Sinh viên thực hiện : TRẦN HUỲNH VŨ                                                   ");
    console.log("   Mã số sinh viên     : CD-CNTT18B33                                                    ");
    console.log("   Lớp                 : CĐ-CNTT18B                                                      ");
    console.log("   Trường              : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang                    ");
    console.log("=========================================================================================\n");

    let client = null;
    let embeddedServer = null;

    try {
        // 1. Kết nối MongoDB đang chạy trên máy
        const conn = await connectToMongo();
        client = conn.client;
        embeddedServer = conn.embeddedServer;

        // 2. Sử dụng database qlsinhvien, collection students
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        console.log(`[DATABASE] Đang sử dụng cơ sở dữ liệu: '${DB_NAME}', collection: '${COLLECTION_NAME}'`);

        // Làm sạch dữ liệu cũ để tránh trùng lặp khi chạy lại
        await collection.deleteMany({});

        // 3. Danh sách sinh viên cần thêm (ít nhất 3 sinh viên, ở đây thêm 5 sinh viên chuẩn)
        const danhSachThem = [
            { masv: "CD-CNTT18B33", hoten: "Trần Huỳnh Vũ", tuoi: 20, diem: 9.5 },
            { masv: "SV002", hoten: "Nguyễn Văn An", tuoi: 20, diem: 4.5 },
            { masv: "SV003", hoten: "Lê Thị Thảo Bình", tuoi: 19, diem: 7.8 },
            { masv: "SV004", hoten: "Phạm Quốc Cường", tuoi: 21, diem: 6.5 },
            { masv: "SV005", hoten: "Đặng Minh Đức", tuoi: 20, diem: 8.2 }
        ];

        console.log(`\n[THAO TÁC 1] Đang thực hiện thêm ${danhSachThem.length} sinh viên bằng hàm insertMany()...`);
        const resultInsert = await collection.insertMany(danhSachThem);
        console.log(`✔ THÀNH CÔNG: Đã thêm ${resultInsert.insertedCount} sinh viên vào MongoDB!`);

        // 4. Sử dụng find() để hiển thị danh sách sinh viên
        console.log(`\n[THAO TÁC 2] Sử dụng find() để truy vấn toàn bộ dữ liệu từ MongoDB:\n`);
        const danhSachSinhVien = await collection.find({}).toArray();

        // Hiển thị bảng dữ liệu định dạng chuẩn ASCII
        inBangSinhVien("KẾT QUẢ TRUY VẤN MONGODB: COLLECTION 'students' (DATABASE 'qlsinhvien')", danhSachSinhVien);

        // Xuất thông tin từng sinh viên chi tiết ra Terminal
        console.log("\n--- CHI TIẾT TỪNG BẢN GHI DỮ LIỆU ĐÃ LƯU TRONG MONGODB ---");
        danhSachSinhVien.forEach((sv, idx) => {
            console.log(`Bản ghi ${idx + 1}: _id=${sv._id} | Mã: ${sv.masv} | Họ tên: ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
        });

        console.log("\n======================== BÁO CÁO KẾT QUẢ BÀI 04 ========================");
        console.log(`* Cơ sở dữ liệu        : ${DB_NAME}`);
        console.log(`* Bộ sưu tập           : ${COLLECTION_NAME}`);
        console.log(`* Số lượng sinh viên   : ${danhSachSinhVien.length} sinh viên`);
        console.log(`* Trạng thái lưu trữ   : Đã lưu vĩnh viễn vào MongoDB thành công!`);
        console.log("========================================================================\n");

    } catch (error) {
        console.error("❌ ĐÃ XẢY RA LỖI:", error);
    } finally {
        // Đóng kết nối sau khi hoàn thành theo đúng yêu cầu đề bài
        if (client) {
            await client.close();
            console.log("[KẾT THÚC] Đã đóng kết nối MongoDB an toàn.");
        }
        if (embeddedServer) {
            await embeddedServer.stop();
        }
    }
}

main();