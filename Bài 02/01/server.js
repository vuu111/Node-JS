/**
 * BÀI 02 - PHẦN 01: HTTP Server bằng Node.js thuần
 * Yêu cầu: Tạo HTTP server bằng Node.js thuần; truy cập localhost:3000 và trả về trang HTML chứa tên sinh viên.
 * 
 * Sinh viên thực hiện: Trần Huỳnh Vũ
 * Lớp: CĐ-CNTT18B
 * MSSV: CD-CNTT18B33
 * Trường: Cao đẳng Kỹ thuật Công nghệ Nha Trang
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    // Thiết lập Header HTTP trả về định dạng HTML với chuẩn mã hóa UTF-8
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Powered-By': 'Node.js Pure HTTP Server'
    });

    const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 02 - Phần 01 | HTTP Server Node.js thuần</title>
    <style>
        :root {
            --primary: #4361ee;
            --primary-gradient: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1e38 50%, #172554 100%);
            --card-bg: rgba(255, 255, 255, 0.08);
            --card-border: rgba(255, 255, 255, 0.16);
            --text-main: #f8fafc;
            --text-sub: #94a3b8;
            --accent: #10b981;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            background: var(--bg-gradient);
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .container {
            width: 100%;
            max-width: 680px;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 24px;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            padding: 44px 40px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(67, 97, 238, 0.15);
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .badge-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 12px;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(16, 185, 129, 0.15);
            color: var(--accent);
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .pulse-dot {
            width: 8px;
            height: 8px;
            background: var(--accent);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--accent);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.3); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.8; }
        }

        .port-badge {
            background: rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 13px;
            font-family: monospace;
        }

        .header {
            text-align: center;
            margin-bottom: 32px;
        }

        .title {
            font-size: 26px;
            font-weight: 700;
            color: #e2e8f0;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }

        .subtitle {
            font-size: 15px;
            color: var(--text-sub);
        }

        .student-card {
            background: linear-gradient(135deg, rgba(67, 97, 238, 0.18) 0%, rgba(58, 12, 163, 0.28) 100%);
            border: 1px solid rgba(67, 97, 238, 0.4);
            border-radius: 18px;
            padding: 30px;
            text-align: center;
            margin-bottom: 28px;
            position: relative;
            overflow: hidden;
        }

        .student-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%);
            pointer-events: none;
        }

        .avatar-wrap {
            width: 80px;
            height: 80px;
            margin: 0 auto 16px;
            background: var(--primary-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            box-shadow: 0 10px 25px rgba(67, 97, 238, 0.4);
        }

        .student-label {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #93c5fd;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .student-name {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .server-info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 24px;
        }

        .info-item {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 16px 20px;
        }

        .info-item .label {
            font-size: 12px;
            color: var(--text-sub);
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .info-item .value {
            font-size: 15px;
            font-weight: 600;
            color: #f1f5f9;
        }

        .footer {
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 20px;
            font-size: 13px;
            color: var(--text-sub);
        }

        .footer b {
            color: #e2e8f0;
        }

        @media (max-width: 540px) {
            .container { padding: 28px 20px; }
            .server-info-grid { grid-template-columns: 1fr; }
            .student-name { font-size: 26px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="badge-bar">
            <div class="status-badge">
                <span class="pulse-dot"></span>
                <span>HTTP Server Active</span>
            </div>
            <div class="port-badge">PORT: 3000</div>
        </div>

        <div class="header">
            <h1 class="title">BÀI TẬP 02 - PHẦN 01</h1>
            <p class="subtitle">Khởi tạo HTTP Server với Node.js thuần (Built-in http module)</p>
        </div>

        <div class="student-card">
            <div class="avatar-wrap">👨‍💻</div>
            <div class="student-label">Tên Sinh Viên</div>
            <div class="student-name">Trần Huỳnh Vũ</div>
        </div>

        <div class="server-info-grid">
            <div class="info-item">
                <div class="label">Môi trường máy chủ</div>
                <div class="value">Node.js thuần (${process.version})</div>
            </div>
            <div class="info-item">
                <div class="label">Địa chỉ truy cập</div>
                <div class="value">http://${HOST}:${PORT}</div>
            </div>
            <div class="info-item">
                <div class="label">HTTP Status Code</div>
                <div class="value">200 OK</div>
            </div>
            <div class="info-item">
                <div class="label">Content-Type</div>
                <div class="value">text/html; charset=utf-8</div>
            </div>
        </div>

        <div class="footer">
            Mã nguồn đã được tải lên GitHub Repository: <b>Node.js</b> | Sinh viên thực hiện: <b>Trần Huỳnh Vũ</b>
        </div>
    </div>
</body>
</html>`;

    res.end(htmlContent);
});

server.listen(PORT, HOST, () => {
    console.log(`====================================================`);
    console.log(`[Bài 02 - Phần 01] HTTP Server đang chạy thành công!`);
    console.log(`Truy cập máy chủ tại: http://${HOST}:${PORT}`);
    console.log(`Sinh viên: Trần Huỳnh Vũ`);
    console.log(`====================================================`);
});
