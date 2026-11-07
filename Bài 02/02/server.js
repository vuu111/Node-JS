/**
 * BÀI 02 - PHẦN 02: Ứng dụng Node.js sử dụng module http
 * Yêu cầu: Tạo ứng dụng Node.js sử dụng module http. Server chạy tại cổng 3000.
 *         Khi truy cập trang chủ, trả về HTML có họ tên và mã sinh viên.
 *         Nộp liên kết GitHub và mô tả cách chạy.
 * 
 * Sinh viên thực hiện: Trần Huỳnh Vũ
 * Mã sinh viên (MSSV): CD-CNTT18B33
 * Lớp: CĐ-CNTT18B
 * Trường: Cao đẳng Kỹ thuật Công nghệ Nha Trang
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    // Phân tích đường dẫn yêu cầu (URL pathname)
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = requestUrl.pathname;

    // Xử lý khi truy cập trang chủ (Route '/')
    if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Powered-By': 'Node.js HTTP Module'
        });

        const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 02 - Phần 02 | Hồ Sơ Sinh Viên - Node.js HTTP</title>
    <style>
        :root {
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --bg-color: #0b0f19;
            --card-bg: rgba(17, 24, 39, 0.85);
            --card-border: rgba(99, 102, 241, 0.25);
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
            --accent-green: #10b981;
            --accent-cyan: #06b6d4;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            background-color: var(--bg-color);
            background-image: 
                radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.2) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.2) 0px, transparent 50%);
            color: var(--text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 16px;
        }

        .main-card {
            width: 100%;
            max-width: 720px;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 28px;
            box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            overflow: hidden;
            animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .card-header {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%);
            padding: 28px 36px;
            border-bottom: 1px solid var(--card-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
        }

        .server-status {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 600;
            color: var(--accent-green);
            background: rgba(16, 185, 129, 0.12);
            padding: 6px 14px;
            border-radius: 9999px;
            border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .status-dot {
            width: 9px;
            height: 9px;
            background-color: var(--accent-green);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--accent-green);
        }

        .repo-badge {
            background: rgba(255, 255, 255, 0.08);
            color: #d1d5db;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 13px;
            font-family: monospace;
            border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .card-body {
            padding: 40px 36px;
        }

        .hero-section {
            text-align: center;
            margin-bottom: 36px;
        }

        .avatar-circle {
            width: 92px;
            height: 92px;
            margin: 0 auto 18px;
            background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            box-shadow: 0 12px 30px rgba(99, 102, 241, 0.4);
            border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .badge-category {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #818cf8;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .app-title {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }

        .app-subtitle {
            font-size: 15px;
            color: var(--text-secondary);
        }

        /* Highlight Profile Box */
        .profile-box {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%);
            border: 1px solid rgba(99, 102, 241, 0.35);
            border-radius: 20px;
            padding: 28px 24px;
            margin-bottom: 30px;
        }

        .info-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 15px;
            color: var(--text-secondary);
        }

        .info-value {
            font-size: 17px;
            font-weight: 700;
            color: #ffffff;
            text-align: right;
        }

        .info-value.mssv {
            background: linear-gradient(135deg, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 20px;
            font-family: monospace;
            font-weight: 800;
        }

        .info-value.fullname {
            font-size: 22px;
            color: #38bdf8;
        }

        /* Server Metrics Grid */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 28px;
        }

        .metric-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 16px;
            text-align: center;
        }

        .metric-title {
            font-size: 12px;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }

        .metric-value {
            font-size: 15px;
            font-weight: 600;
            color: #e5e7eb;
        }

        .github-link-box {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }

        .github-label {
            font-size: 14px;
            color: var(--text-secondary);
        }

        .github-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #2563eb;
            color: #ffffff;
            text-decoration: none;
            padding: 8px 18px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .github-btn:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
        }

        .card-footer {
            background: rgba(0, 0, 0, 0.25);
            padding: 20px 36px;
            border-top: 1px solid var(--card-border);
            text-align: center;
            font-size: 13px;
            color: var(--text-secondary);
        }

        .card-footer strong {
            color: #e5e7eb;
        }

        @media (max-width: 600px) {
            .card-body, .card-header, .card-footer { padding: 24px 20px; }
            .metrics-grid { grid-template-columns: 1fr; }
            .info-row { flex-direction: column; align-items: flex-start; gap: 4px; }
            .info-value { text-align: left; }
        }
    </style>
</head>
<body>
    <div class="main-card">
        <div class="card-header">
            <div class="server-status">
                <span class="status-dot"></span>
                <span>Máy chủ HTTP đang hoạt động</span>
            </div>
            <div class="repo-badge">PORT: 3000</div>
        </div>

        <div class="card-body">
            <div class="hero-section">
                <div class="avatar-circle">🎓</div>
                <div class="badge-category">BÀI TẬP 02 - YÊU CẦU 02</div>
                <h1 class="app-title">Thông Tin Sinh Viên & Ứng Dụng HTTP</h1>
                <p class="app-subtitle">Ứng dụng Node.js sử dụng module http tích hợp chạy tại cổng 3000</p>
            </div>

            <div class="profile-box">
                <div class="info-row">
                    <span class="info-label">👤 Họ và tên:</span>
                    <span class="info-value fullname">Trần Huỳnh Vũ</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🆔 Mã sinh viên (MSSV):</span>
                    <span class="info-value mssv">CD-CNTT18B33</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🏫 Lớp học:</span>
                    <span class="info-value">CĐ-CNTT18B</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🏢 Đơn vị đào tạo:</span>
                    <span class="info-value">Trường CĐ Kỹ thuật Công nghệ Nha Trang</span>
                </div>
            </div>

            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-title">Cổng Server (PORT)</div>
                    <div class="metric-value">3000</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Phiên bản Node.js</div>
                    <div class="metric-value">${process.version}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Mã trạng thái HTTP</div>
                    <div class="metric-value" style="color: var(--accent-green);">200 OK</div>
                </div>
            </div>

            <div class="github-link-box">
                <div class="github-label">
                    📦 Liên kết lưu trữ mã nguồn dự án:
                </div>
                <a href="https://github.com/TranHuynhVu/Node.js" target="_blank" class="github-btn">
                    <span>Xem trên GitHub</span> ↗
                </a>
            </div>
        </div>

        <div class="card-footer">
            Mã nguồn bài tập Node.js module http | Sinh viên: <strong>Trần Huỳnh Vũ (CD-CNTT18B33)</strong>
        </div>
    </div>
</body>
</html>`;

        res.end(htmlContent);
    } else {
        // Xử lý các đường dẫn không tồn tại (Route 404 Not Found)
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>404 - Không tìm thấy trang</title>
    <style>
        body {
            background: #0f172a;
            color: #f8fafc;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .box {
            background: rgba(255, 255, 255, 0.05);
            padding: 40px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        h1 { font-size: 60px; color: #ef4444; margin: 0; }
        p { color: #94a3b8; margin: 15px 0 25px; }
        a {
            background: #6366f1;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="box">
        <h1>404</h1>
        <h2>Trang không tồn tại</h2>
        <p>Đường dẫn <code>${pathname}</code> không tìm thấy trên hệ thống.</p>
        <a href="/">← Quay lại Trang Chủ</a>
    </div>
</body>
</html>`);
    }
});

// Bắt đầu lắng nghe tại cổng 3000
server.listen(PORT, HOST, () => {
    console.log(`====================================================`);
    console.log(`[Bài 02 - Phần 02] Ứng dụng Node.js module http đang chạy!`);
    console.log(`Truy cập máy chủ tại: http://${HOST}:${PORT}`);
    console.log(`Họ và tên: Trần Huỳnh Vũ`);
    console.log(`MSSV     : CD-CNTT18B33`);
    console.log(`Lớp      : CĐ-CNTT18B`);
    console.log(`Trường   : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang`);
    console.log(`====================================================`);
});
