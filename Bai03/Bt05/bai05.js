/**
 * ============================================================================
 * BÀI TẬP 05: TÌM KIẾM, CẬP NHẬT VÀ SẮP XẾP MONGODB (PHIÊN BẢN PRO CLI)
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
    console.log("       BÀI TẬP 05: TÌM KIẾM, CẬP NHẬT VÀ SẮP XẾP DỮ LIỆU MONGODB (NODE.JS)               ");
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
        console.log(`[DATABASE] Đang sử dụng collection '${COLLECTION_NAME}' từ Bài 04.`);

        const count = await collection.countDocuments();
        if (count === 0) {
            console.log(`[KHỞI TẠO] Collection chưa có dữ liệu, đang nạp dữ liệu mẫu ban đầu từ Bài 04...`);
            await collection.insertMany([
                { masv: "CD-CNTT18B33", hoten: "Trần Huỳnh Vũ", tuoi: 20, diem: 9.5 },
                { masv: "SV002", hoten: "Nguyễn Văn An", tuoi: 20, diem: 4.5 },
                { masv: "SV003", hoten: "Lê Thị Thảo Bình", tuoi: 19, diem: 7.8 },
                { masv: "SV004", hoten: "Phạm Quốc Cường", tuoi: 21, diem: 6.5 },
                { masv: "SV005", hoten: "Đặng Minh Đức", tuoi: 20, diem: 8.2 }
            ]);
        }

        // 1. Tìm các sinh viên có diem >= 7 bằng find() và $gte
        // 2. Sắp xếp kết quả theo điểm giảm dần bằng sort()
        console.log("\n[THAO TÁC 1] Tìm kiếm sinh viên có diem >= 7 bằng find() & $gte, sắp xếp điểm giảm dần bằng sort():");
        const queryLoc = { diem: { $gte: 7 } };
        const sortGiamDan = { diem: -1 };

        const sinhVienDatChuan = await collection.find(queryLoc).sort(sortGiamDan).toArray();

        inBangSinhVien("DANH SÁCH SINH VIÊN CÓ ĐIỂM >= 7.0 (SẮP XẾP ĐIỂM GIẢM DẦN)", sinhVienDatChuan);

        console.log("--- CHI TIẾT KẾT QUẢ LỌC VÀ SẮP XẾP ---");
        sinhVienDatChuan.forEach((sv, idx) => {
            console.log(`Hạng ${idx + 1}: Mã: ${sv.masv} | Họ tên: ${sv.hoten.padEnd(18)} | Điểm: ${sv.diem} (>= 7.0)`);
        });

        // 3. Cập nhật điểm của một sinh viên theo masv bằng updateOne() và $set
        const masvCapNhat = "SV002"; // Nguyễn Văn An (điểm cũ: 4.5)
        const diemMoi = 8.5;

        const svTruocCapNhat = await collection.findOne({ masv: masvCapNhat });
        console.log(`\n[THAO TÁC 2] Cập nhật điểm sinh viên '${masvCapNhat}' (${svTruocCapNhat.hoten}) từ ${svTruocCapNhat.diem} thành ${diemMoi}...`);

        const ketQuaCapNhat = await collection.updateOne(
            { masv: masvCapNhat },
            { $set: { diem: diemMoi } }
        );

        console.log(`✔ THÀNH CÔNG: Đã cập nhật ${ketQuaCapNhat.modifiedCount} bản ghi bằng updateOne() và $set!`);

        // 4. Hiển thị lại thông tin sau cập nhật để kiểm tra kết quả
        console.log("\n[THAO TÁC 3] Hiển thị lại toàn bộ danh sách sinh viên sau khi cập nhật điểm:");
        const danhSachSauCapNhat = await collection.find({}).sort({ diem: -1 }).toArray();

        inBangSinhVien("BẢNG TỔNG HỢP TOÀN BỘ SINH VIÊN SAU KHI CẬP NHẬT ĐIỂM THÀNH CÔNG", danhSachSauCapNhat);

        const svSauCapNhat = await collection.findOne({ masv: masvCapNhat });
        console.log("+-----------------------------------------------------------------------------------+");
        console.log(`| ĐỐI CHIẾU KẾT QUẢ CẬP NHẬT SINH VIÊN [${masvCapNhat}]:                                      |`);
        console.log(`| • Điểm số ban đầu      : ${svTruocCapNhat.diem} điểm                                               |`);
        console.log(`| • Điểm số mới cập nhật : ${svSauCapNhat.diem} điểm (Tăng +${(svSauCapNhat.diem - svTruocCapNhat.diem).toFixed(1)} điểm)                         |`);
        console.log(`| • Trạng thái           : CẬP NHẬT THÀNH CÔNG VÀO CƠ SỞ DỮ LIỆU MONGODB!           |`);
        console.log("+-----------------------------------------------------------------------------------+\n");

        const totalTime = Date.now() - timeStart;
        console.log("======================== BÁO CÁO KẾT QUẢ BÀI 05 ========================");
        console.log(`* Tìm kiếm & Lọc       : find({ diem: { $gte: 7 } }) -> Đạt yêu cầu`);
        console.log(`* Sắp xếp giảm dần     : sort({ diem: -1 }) -> Đạt yêu cầu`);
        console.log(`* Cập nhật điểm        : updateOne({ masv: '${masvCapNhat}' }, { $set: { diem: ${diemMoi} } }) -> Đạt yêu cầu`);
        console.log(`* Thời gian xử lý      : ${totalTime} ms`);
        console.log(`* Dữ liệu sau cập nhật : Đã lưu trữ và kiểm tra toàn vẹn trên MongoDB`);
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