/**
 * BÀI TẬP 02 - PHẦN 02: Ứng dụng Node.js sử dụng module http
 * Yêu cầu: Tạo ứng dụng Node.js sử dụng module http. Server chạy tại cổng 3000.
 *         Khi truy cập trang chủ, trả về HTML có họ tên và mã sinh viên.
 *         Nộp liên kết GitHub và mô tả cách chạy.
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa Công nghệ Thông tin - Trường CĐ Kỹ thuật Công nghệ Nha Trang
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';
const START_TIME = Date.now();

const server = http.createServer((req, res) => {
    // Phân tích đường dẫn yêu cầu
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = requestUrl.pathname;

    // 1. API endpoint trả về dữ liệu JSON của sinh viên
    if (pathname === '/api/student') {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        const studentData = {
            status: 'success',
            author: 'Trần Huỳnh Vũ',
            mssv: 'CD-CNTT18B33',
            class: 'CĐ-CNTT18B',
            school: 'Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang',
            serverTime: new Date().toISOString(),
            uptimeSeconds: Math.floor((Date.now() - START_TIME) / 1000)
        };
        return res.end(JSON.stringify(studentData, null, 2));
    }

    // 2. Trang chủ hiển thị giao diện HTML với đầy đủ Họ tên và Mã sinh viên
    if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Powered-By': 'Node.js Core HTTP Module'
        });

        const userAgent = req.headers['user-agent'] || 'Trình duyệt Web Tiêu chuẩn';
        const clientIp = req.socket.remoteAddress || '127.0.0.1';

        const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 02 - Phần 02 | Hồ Sơ Sinh Viên - Trần Huỳnh Vũ (CD-CNTT18B33)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-body: #060913;
            --surface-panel: rgba(15, 23, 42, 0.75);
            --border-panel: rgba(56, 189, 248, 0.2);
            --accent-cyan: #0ea5e9;
            --accent-glow: #38bdf8;
            --accent-emerald: #10b981;
            --accent-amber: #f59e0b;
            --text-main: #f8fafc;
            --text-sub: #94a3b8;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
            min-height: 100vh;
            background-color: var(--bg-body);
            background-image: 
                radial-gradient(ellipse at 20% 0%, rgba(14, 165, 233, 0.18) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 100%, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 16px;
        }

        .bento-container {
            width: 100%;
            max-width: 860px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Header Navigation */
        .header-bar {
            background: var(--surface-panel);
            border: 1px solid var(--border-panel);
            border-radius: 18px;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            flex-wrap: wrap;
            gap: 12px;
        }

        .header-title {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 700;
            color: #e2e8f0;
            letter-spacing: 0.5px;
        }

        .header-status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(16, 185, 129, 0.12);
            color: var(--accent-emerald);
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-pulse {
            width: 8px;
            height: 8px;
            background: var(--accent-emerald);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--accent-emerald);
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.8); }
        }

        /* Bento Grid */
        .bento-grid {
            display: grid;
            grid-template-columns: 1.25fr 1fr;
            gap: 20px;
        }

        .bento-card {
            background: var(--surface-panel);
            border: 1px solid var(--border-panel);
            border-radius: 22px;
            padding: 28px;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
            position: relative;
            overflow: hidden;
        }

        /* Left Card: Student Profile Identity */
        .card-profile {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .profile-badge {
            display: inline-block;
            background: rgba(14, 165, 233, 0.15);
            color: var(--accent-glow);
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            padding: 6px 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid rgba(14, 165, 233, 0.3);
        }

        .profile-header-group {
            margin-bottom: 24px;
        }

        .student-title-label {
            font-size: 13px;
            color: var(--text-sub);
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 4px;
            font-weight: 600;
        }

        .student-full-name {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.5px;
            margin-bottom: 12px;
            text-shadow: 0 0 25px rgba(56, 189, 248, 0.35);
        }

        .mssv-card-tag {
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.15));
            border: 1px solid rgba(56, 189, 248, 0.4);
            border-radius: 12px;
            padding: 12px 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .mssv-tag-label {
            font-size: 12px;
            color: #bae6fd;
            font-weight: 600;
            text-transform: uppercase;
        }

        .mssv-tag-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 20px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 1px;
        }

        .details-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 14px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 10px;
            font-size: 13px;
            border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .detail-item .lbl {
            color: var(--text-sub);
        }

        .detail-item .val {
            font-weight: 600;
            color: #e2e8f0;
            text-align: right;
        }

        /* Right Column: Telemetry & Inspector */
        .right-column {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .inspector-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: var(--accent-glow);
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .metrics-subgrid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 16px;
        }

        .metric-box {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 12px;
            padding: 12px 14px;
        }

        .metric-box-title {
            font-size: 11px;
            color: var(--text-sub);
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .metric-box-val {
            font-family: 'JetBrains Mono', monospace;
            font-size: 15px;
            font-weight: 700;
            color: #ffffff;
        }

        .client-info-box {
            background: #020617;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 14px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #38bdf8;
            line-height: 1.6;
            margin-bottom: 18px;
            word-break: break-all;
        }

        .action-links {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .btn-portal {
            flex: 1;
            text-align: center;
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            color: #ffffff;
            text-decoration: none;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: 0 6px 18px rgba(14, 165, 233, 0.35);
            transition: all 0.2s ease;
        }

        .btn-portal:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(14, 165, 233, 0.5);
        }

        .btn-outline {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #e2e8f0;
            text-decoration: none;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .btn-outline:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }

        /* Footer */
        .footer-bar {
            text-align: center;
            font-size: 12px;
            color: var(--text-sub);
            padding: 8px 0;
        }

        .footer-bar b {
            color: #e2e8f0;
        }

        @media (max-width: 768px) {
            .bento-grid { grid-template-columns: 1fr; }
            .student-full-name { font-size: 26px; }
            .header-bar { flex-direction: column; align-items: flex-start; }
        }
    </style>
</head>
<body>
    <div class="bento-container">
        <!-- Top Header Bar -->
        <div class="header-bar">
            <div class="header-title">
                <span>🎓 KHOA CÔNG NGHỆ THÔNG TIN</span>
                <span style="color: var(--text-sub);">|</span>
                <span style="color: var(--accent-glow);">TRƯỜNG CĐ KỸ THUẬT CÔNG NGHỆ NHA TRANG</span>
            </div>
            <div class="header-status">
                <span class="status-pulse"></span>
                <span>HTTP MODULE 200 OK</span>
            </div>
        </div>

        <!-- Bento Grid Main Content -->
        <div class="bento-grid">
            <!-- Left Card: Profile & Credentials -->
            <div class="bento-card card-profile">
                <div>
                    <span class="profile-badge">BÀI TẬP 02 - PHẦN 02</span>
                    
                    <div class="profile-header-group">
                        <div class="student-title-label">Họ và tên sinh viên thực hiện</div>
                        <h1 class="student-full-name">TRẦN HUỲNH VŨ</h1>
                    </div>

                    <div class="mssv-card-tag">
                        <span class="mssv-tag-label">Mã sinh viên (MSSV)</span>
                        <span class="mssv-tag-value">CD-CNTT18B33</span>
                    </div>

                    <div class="details-list">
                        <div class="detail-item">
                            <span class="lbl">🏫 Lớp quản lý:</span>
                            <span class="val">CĐ-CNTT18B</span>
                        </div>
                        <div class="detail-item">
                            <span class="lbl">💻 Khóa đào tạo:</span>
                            <span class="val">Cao đẳng CNTT K18 (2024 - 2027)</span>
                        </div>
                        <div class="detail-item">
                            <span class="lbl">🏢 Đơn vị:</span>
                            <span class="val">Trường CĐ Kỹ thuật Công nghệ Nha Trang</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: var(--text-sub);">
                    * Dữ liệu sinh viên được phản hồi trực tiếp từ máy chủ Node.js qua module <code>http</code>.
                </div>
            </div>

            <!-- Right Column: Live Telemetry & Inspector -->
            <div class="right-column">
                <div class="bento-card">
                    <div class="inspector-title">
                        <span>⚡ THÔNG SỐ HOẠT ĐỘNG SERVER</span>
                    </div>

                    <div class="metrics-subgrid">
                        <div class="metric-box">
                            <div class="metric-box-title">Cổng mạng (PORT)</div>
                            <div class="metric-box-val" style="color: var(--accent-emerald);">3000</div>
                        </div>
                        <div class="metric-box">
                            <div class="metric-box-title">Node Version</div>
                            <div class="metric-box-val">${process.version}</div>
                        </div>
                        <div class="metric-box">
                            <div class="metric-box-title">Giao thức mạng</div>
                            <div class="metric-box-val">HTTP/${req.httpVersion}</div>
                        </div>
                        <div class="metric-box">
                            <div class="metric-box-title">Phương thức</div>
                            <div class="metric-box-val" style="color: var(--accent-glow);">${req.method} /</div>
                        </div>
                    </div>

                    <div class="inspector-title" style="margin-top: 8px;">
                        <span>🌐 THÔNG TIN TRUY CẬP CLIENT</span>
                    </div>

                    <div class="client-info-box">
                        <div>> CLIENT_IP : ${clientIp}</div>
                        <div>> USER_AGENT: ${userAgent.length > 55 ? userAgent.substring(0, 55) + '...' : userAgent}</div>
                        <div>> TIMESTAMP : <span id="clockLive">Đang tải...</span></div>
                    </div>

                    <div class="action-links">
                        <a href="https://github.com/TranHuynhVu/Node.js" target="_blank" class="btn-portal">
                            <span>📦 Xem Repo GitHub</span>
                        </a>
                        <a href="/api/student" target="_blank" class="btn-outline">
                            <span>{ } Xem API JSON</span>
                        </a>
                        <a href="/test-404" class="btn-outline">
                            <span>🧪 Test 404</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Footer -->
        <div class="footer-bar">
            Dự án môn học Node.js | Sinh viên: <b>Trần Huỳnh Vũ (MSSV: CD-CNTT18B33)</b> | Lớp: <b>CĐ-CNTT18B</b>
        </div>
    </div>

    <script>
        function updateClock() {
            const now = new Date();
            document.getElementById('clockLive').textContent = now.toLocaleTimeString('vi-VN') + ' ' + now.toLocaleDateString('vi-VN');
        }
        setInterval(updateClock, 1000);
        updateClock();
    </script>
</body>
</html>`;

        return res.end(html);
    }

    // 3. Xử lý đường dẫn không hợp lệ (Route 404 Not Found)
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>404 - Không tìm thấy trang</title>
    <style>
        body {
            background: #060913;
            color: #f8fafc;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .box-404 {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 20px;
            padding: 40px;
            max-width: 480px;
        }
        h1 { font-size: 64px; color: #ef4444; margin: 0; }
        p { color: #94a3b8; margin: 16px 0 24px; }
        a {
            background: #0ea5e9;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 700;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="box-404">
        <h1>404</h1>
        <h2>Đường dẫn không tồn tại</h2>
        <p>Đường dẫn <code>${pathname}</code> không được tìm thấy trên máy chủ HTTP cổng 3000.</p>
        <a href="/">← Quay lại Trang Chủ Hồ Sơ</a>
    </div>
</body>
</html>`);
});

server.listen(PORT, HOST, () => {
    console.log(`====================================================`);
    console.log(`[Bài 02 - Phần 02] Ứng dụng Node.js module http đang chạy!`);
    console.log(`Truy cập máy chủ tại : http://${HOST}:${PORT}`);
    console.log(`Xem API JSON tại     : http://${HOST}:${PORT}/api/student`);
    console.log(`Họ và tên            : Trần Huỳnh Vũ`);
    console.log(`MSSV                 : CD-CNTT18B33`);
    console.log(`Lớp                  : CĐ-CNTT18B`);
    console.log(`====================================================`);
});
