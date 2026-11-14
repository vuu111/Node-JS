/**
 * BÀI TẬP 02: Tạo Web Server với Node.js
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * 
 * YÊU CẦU:
 * - Sử dụng module http tạo Web Server tại cổng 3000.
 * - Khi truy cập /, hiển thị lời chào và mã sinh viên.
 * - Khi truy cập /about, hiển thị thông tin giới thiệu bản thân.
 * - Khi truy cập đường dẫn không tồn tại, trả về mã trạng thái HTTP 404.
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    // Lấy URL và loại bỏ query string nếu có
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
    const pathname = parsedUrl.pathname;

    console.log(`[${new Date().toLocaleTimeString('vi-VN')}] Nhận yêu cầu: ${req.method} ${pathname}`);

    // Thiết lập header mặc định với UTF-8 để hiển thị tiếng Việt có dấu chuẩn
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // 1. Khi truy cập "/", hiển thị lời chào và mã sinh viên
    if (pathname === '/' || pathname === '/index.html') {
        res.statusCode = 200;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Chủ - Web Server Node.js | Trần Huỳnh Vũ</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .card {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(14, 165, 233, 0.2);
            max-width: 650px;
            width: 100%;
            padding: 40px;
            text-align: center;
            backdrop-filter: blur(12px);
        }
        .badge {
            display: inline-block;
            background: #0284c7;
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 50px;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 32px;
            font-weight: 800;
            color: #38bdf8;
            margin-bottom: 12px;
            line-height: 1.3;
        }
        .greeting {
            font-size: 20px;
            color: #e2e8f0;
            margin-bottom: 25px;
        }
        .student-box {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .student-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dashed rgba(148, 163, 184, 0.2);
            font-size: 16px;
        }
        .student-item:last-child { border-bottom: none; }
        .label { color: #94a3b8; font-weight: 500; }
        .value { color: #f1f5f9; font-weight: 700; }
        .mssv-highlight { color: #38bdf8; font-size: 18px; }
        .btn-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            display: inline-block;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
        }
        .btn-primary {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: white;
            box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(2, 132, 199, 0.6);
        }
        .btn-secondary {
            background: rgba(51, 65, 85, 0.8);
            color: #cbd5e1;
            border: 1px solid rgba(148, 163, 184, 0.3);
        }
        .btn-secondary:hover {
            background: rgba(71, 85, 105, 0.9);
            color: white;
            transform: translateY(-2px);
        }
        footer {
            margin-top: 30px;
            font-size: 13px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="card">
        <span class="badge">Node.js HTTP Server - Cổng 3000</span>
        <h1>Xin Chào! Chào Mừng Bạn Đến Với Web Server Node.js</h1>
        <p class="greeting">Ứng dụng máy chủ được xây dựng bằng module <code>http</code> thuần của Node.js</p>
        
        <div class="student-box">
            <div class="student-item">
                <span class="label">Lời chào:</span>
                <span class="value" style="color: #4ade80;">Xin chào quý thầy cô và các bạn! 👋</span>
            </div>
            <div class="student-item">
                <span class="label">Mã sinh viên (MSSV):</span>
                <span class="value mssv-highlight">CD-CNTT18B33</span>
            </div>
            <div class="student-item">
                <span class="label">Họ và tên:</span>
                <span class="value">Trần Huỳnh Vũ</span>
            </div>
            <div class="student-item">
                <span class="label">Lớp:</span>
                <span class="value">CĐ-CNTT18B</span>
            </div>
            <div class="student-item">
                <span class="label">Mã trạng thái HTTP:</span>
                <span class="value" style="color: #4ade80;">200 OK</span>
            </div>
        </div>

        <div class="btn-group">
            <a href="/about" class="btn btn-primary">👉 Xem Thông Tin Giới Thiệu (/about)</a>
            <a href="/trang-khong-ton-tai" class="btn btn-secondary">🧪 Kiểm tra lỗi 404</a>
        </div>

        <footer>
            Bài 2: Tạo Web Server với Node.js | Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
        </footer>
    </div>
</body>
</html>`);
    }

    // 2. Khi truy cập "/about", hiển thị thông tin giới thiệu bản thân
    else if (pathname === '/about') {
        res.statusCode = 200;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giới Thiệu Bản Thân - Trần Huỳnh Vũ</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .card {
            background: rgba(30, 41, 59, 0.85);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.2);
            max-width: 680px;
            width: 100%;
            padding: 40px;
            backdrop-filter: blur(12px);
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
        }
        .badge {
            display: inline-block;
            background: #059669;
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 50px;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 15px;
        }
        h1 {
            font-size: 28px;
            font-weight: 800;
            color: #34d399;
            margin-bottom: 8px;
        }
        .subtitle {
            color: #94a3b8;
            font-size: 15px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }
        @media (max-width: 600px) {
            .info-grid { grid-template-columns: 1fr; }
        }
        .info-item {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            padding: 16px;
        }
        .info-item .label {
            font-size: 12px;
            text-transform: uppercase;
            color: #94a3b8;
            font-weight: 600;
            margin-bottom: 6px;
        }
        .info-item .val {
            font-size: 16px;
            font-weight: 700;
            color: #f1f5f9;
        }
        .highlight { color: #34d399 !important; }
        .bio-box {
            background: rgba(15, 23, 42, 0.6);
            border-left: 4px solid #10b981;
            border-radius: 8px;
            padding: 18px;
            margin-bottom: 25px;
            line-height: 1.6;
            color: #cbd5e1;
            font-size: 15px;
        }
        .btn-group {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .btn {
            display: inline-block;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
        }
        .btn-back {
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }
        .btn-back:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
        }
        footer {
            margin-top: 25px;
            text-align: center;
            font-size: 13px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <span class="badge">Đường dẫn: /about</span>
            <h1>THÔNG TIN GIỚI THIỆU BẢN THÂN</h1>
            <p class="subtitle">Hồ sơ sinh viên học phần Lập trình NodeJS</p>
        </div>

        <div class="info-grid">
            <div class="info-item">
                <div class="label">Họ và tên</div>
                <div class="val highlight">Trần Huỳnh Vũ</div>
            </div>
            <div class="info-item">
                <div class="label">Mã sinh viên (MSSV)</div>
                <div class="val highlight">CD-CNTT18B33</div>
            </div>
            <div class="info-item">
                <div class="label">Lớp sinh hoạt</div>
                <div class="val">CĐ-CNTT18B</div>
            </div>
            <div class="info-item">
                <div class="label">Khoa đào tạo</div>
                <div class="val">Công nghệ Thông tin</div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
                <div class="label">Trường đào tạo</div>
                <div class="val">Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang</div>
            </div>
        </div>

        <div class="bio-box">
            <strong>Mục tiêu học tập & Định hướng:</strong><br>
            Em là sinh viên đam mê công nghệ phần mềm và lập trình mạng. Trong môn học Node.js, em mong muốn nắm vững kiến trúc Non-blocking I/O, mô hình Event Loop, thao tác tệp tin qua File System module, và xây dựng hệ thống API, Web Server hiệu năng cao.
        </div>

        <div class="btn-group">
            <a href="/" class="btn btn-back">⬅ Quay lại Trang Chủ (/)</a>
        </div>

        <footer>
            Bài 2: Tạo Web Server với Node.js | Cổng 3000
        </footer>
    </div>
</body>
</html>`);
    }

    // 3. Khi truy cập đường dẫn không tồn tại, trả về mã trạng thái HTTP 404
    else {
        res.statusCode = 404;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found - Không Tìm Thấy Trang</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
            min-height: 100vh;
            background: #0b0f19;
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.15);
            max-width: 550px;
            width: 100%;
            padding: 40px;
            text-align: center;
        }
        .error-code {
            font-size: 84px;
            font-weight: 900;
            color: #ef4444;
            line-height: 1;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
        }
        h2 {
            font-size: 24px;
            color: #fca5a5;
            margin-bottom: 15px;
        }
        p {
            color: #94a3b8;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        .path-badge {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #f87171;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 15px;
        }
        .btn-home {
            display: inline-block;
            text-decoration: none;
            background: #ef4444;
            color: white;
            padding: 12px 28px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
        }
        .btn-home:hover {
            background: #dc2626;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="error-code">404</div>
        <h2>MÃ TRẠNG THÁI HTTP 404: NOT FOUND</h2>
        <p>Đường dẫn yêu cầu <span class="path-badge">${pathname}</span> không tồn tại trên hệ thống Web Server Node.js!</p>
        <a href="/" class="btn-home">⬅ Quay Lại Trang Chủ (/)</a>
    </div>
</body>
</html>`);
    }
});

server.listen(PORT, HOST, () => {
    console.log("==================================================================");
    console.log("             BÀI TẬP 02: TẠO WEB SERVER VỚI NODE.JS               ");
    console.log("   Sinh viên thực hiện : Trần Huỳnh Vũ                           ");
    console.log("   Mã số sinh viên     : CD-CNTT18B33                            ");
    console.log("   Lớp                 : CĐ-CNTT18B                              ");
    console.log("==================================================================");
    console.log(`>>> Máy chủ Web Server đang chạy tại : http://${HOST}:${PORT}`);
    console.log(`>>> [1] Trang chủ (lời chào & MSSV)  : http://${HOST}:${PORT}/`);
    console.log(`>>> [2] Giới thiệu bản thân          : http://${HOST}:${PORT}/about`);
    console.log(`>>> [3] Kiểm tra lỗi 404             : http://${HOST}:${PORT}/khong-ton-tai`);
    console.log("==================================================================");
    console.log("Nhấn Ctrl + C trên bàn phím để dừng máy chủ khi hoàn thành.");
});