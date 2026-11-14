/**
 * ============================================================================
 * BÀI TẬP 04: THÊM VÀ HIỂN THỊ DỮ LIỆU MONGODB (PHIÊN BẢN PRO CLI)
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa CNTT - Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * ============================================================================
 */

const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'qlsinhvien';
const COLLECTION_NAME = 'students';

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

async function connectToMongo() {
    let client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 1500 });
    let embeddedServer = null;

    try {
        await client.connect();
        console.log(`[✓ KẾT NỐI] Đã kết nối thành công tới dịch vụ MongoDB tại: ${MONGO_URI}`);
    } catch (err) {
        console.log(`[⚡ TỰ ĐỘNG] Kích hoạt Engine MongoDB lưu trữ cục bộ tại cổng 27017...`);
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const dbPath = path.resolve(__dirname, '../data/db');
        if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true });

        embeddedServer = await MongoMemoryServer.create({
            instance: { port: 27017, dbPath: dbPath }
        });
        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log(`[✓ KẾT NỐI] Đã kích hoạt và kết nối Engine MongoDB cục bộ: ${MONGO_URI}`);
    }

    return { client, embeddedServer };
}

async function main() {
    const timeStart = Date.now();
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
        const conn = await connectToMongo();
        client = conn.client;
        embeddedServer = conn.embeddedServer;

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        console.log(`[DATABASE] Đang sử dụng cơ sở dữ liệu: '${DB_NAME}', collection: '${COLLECTION_NAME}'`);

        // Làm sạch collection trước khi thêm dữ liệu mới
        await collection.deleteMany({});

        // Danh sách sinh viên thêm mới
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

        // Sử dụng find() để hiển thị danh sách sinh viên
        console.log(`\n[THAO TÁC 2] Sử dụng find() để truy vấn toàn bộ dữ liệu từ MongoDB:\n`);
        const danhSachSinhVien = await collection.find({}).toArray();

        inBangSinhVien("KẾT QUẢ TRUY VẤN MONGODB: COLLECTION 'students' (DATABASE 'qlsinhvien')", danhSachSinhVien);

        console.log("\n--- CHI TIẾT TỪNG BẢN GHI DỮ LIỆU ĐÃ LƯU TRONG MONGODB ---");
        danhSachSinhVien.forEach((sv, idx) => {
            console.log(`Bản ghi ${idx + 1}: _id=${sv._id} | Mã: ${sv.masv} | Họ tên: ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
        });

        const totalTime = Date.now() - timeStart;
        console.log("\n======================== BÁO CÁO KẾT QUẢ BÀI 04 ========================");
        console.log(`* Cơ sở dữ liệu        : ${DB_NAME}`);
        console.log(`* Bộ sưu tập           : ${COLLECTION_NAME}`);
        console.log(`* Số lượng sinh viên   : ${danhSachSinhVien.length} sinh viên`);
        console.log(`* Thời gian xử lý      : ${totalTime} ms`);
        console.log(`* Trạng thái lưu trữ   : Đã lưu vĩnh viễn vào MongoDB thành công!`);
        console.log("========================================================================\n");

    } catch (error) {
        console.error("❌ ĐÃ XẢY RA LỖI:", error);
    } finally {
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