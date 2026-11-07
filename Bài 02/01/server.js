/**
 * BÀI TẬP 02 - PHẦN 01: HTTP Server bằng Node.js thuần
 * Yêu cầu: Tạo HTTP server bằng Node.js thuần; truy cập localhost:3000 và trả về trang HTML chứa tên sinh viên.
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa Công nghệ Thông tin - Trường CĐ Kỹ thuật Công nghệ Nha Trang
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    // Trả về header chuẩn HTML5 và mã hóa ký tự UTF-8
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Powered-By': 'Node.js Native HTTP Core'
    });

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 02 - Phần 01 | HTTP Server Node.js - Trần Huỳnh Vũ</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #080c14;
            --surface-card: #0f172a;
            --surface-elevated: #1e293b;
            --border-color: rgba(16, 185, 129, 0.25);
            --primary-emerald: #10b981;
            --primary-mint: #34d399;
            --text-heading: #f8fafc;
            --text-body: #cbd5e1;
            --text-muted: #64748b;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
            min-height: 100vh;
            background-color: var(--bg-dark);
            background-image: 
                radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 85% 80%, rgba(14, 165, 233, 0.10) 0%, transparent 45%),
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 100% 100%, 100% 100%, 32px 32px, 32px 32px;
            color: var(--text-body);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .dashboard-wrapper {
            width: 100%;
            max-width: 760px;
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(16, 185, 129, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 36px 40px;
            animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
        }

        /* Top Bar */
        .top-navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 12px;
        }

        .institution-badge {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: var(--primary-mint);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .live-tag {
            background: rgba(16, 185, 129, 0.15);
            color: var(--primary-emerald);
            border: 1px solid rgba(16, 185, 129, 0.35);
            padding: 5px 14px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .pulse-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--primary-emerald);
            box-shadow: 0 0 10px var(--primary-emerald);
            animation: pulseWave 1.8s infinite;
        }

        @keyframes pulseWave {
            0% { transform: scale(0.9); opacity: 0.9; }
            50% { transform: scale(1.4); opacity: 1; }
            100% { transform: scale(0.9); opacity: 0.9; }
        }

        /* Hero Profile Box */
        .hero-banner {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 165, 233, 0.08) 100%);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 20px;
            padding: 32px 28px;
            text-align: center;
            margin-bottom: 28px;
            position: relative;
            overflow: hidden;
        }

        .hero-banner::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary-mint), transparent);
        }

        .avatar-emblem {
            width: 76px;
            height: 76px;
            margin: 0 auto 16px;
            border-radius: 20px;
            background: linear-gradient(135deg, #059669, #10b981);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .avatar-emblem svg {
            width: 40px;
            height: 40px;
            fill: #ffffff;
        }

        .role-caption {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            color: var(--text-muted);
            font-weight: 700;
            margin-bottom: 8px;
        }

        .student-display-name {
            font-size: 34px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #ffffff;
            margin-bottom: 14px;
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .meta-pills {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
        }

        .pill-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #e2e8f0;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
        }

        .pill-chip strong {
            color: var(--primary-mint);
        }

        /* 4-Tile Diagnostics Grid */
        .diagnostics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 28px;
        }

        .diag-card {
            background: rgba(255, 255, 255, 0.025);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 14px;
            padding: 18px 20px;
            transition: all 0.25s ease;
        }

        .diag-card:hover {
            border-color: rgba(16, 185, 129, 0.4);
            background: rgba(16, 185, 129, 0.03);
            transform: translateY(-2px);
        }

        .diag-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            font-weight: 700;
            margin-bottom: 6px;
        }

        .diag-content {
            font-size: 15px;
            font-weight: 600;
            color: var(--text-heading);
            font-family: 'JetBrains Mono', monospace;
        }

        /* Action Buttons */
        .actions-panel {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 28px;
            flex-wrap: wrap;
        }

        .btn-modern {
            background: linear-gradient(135deg, #10b981, #059669);
            color: #ffffff;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-modern:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(16, 185, 129, 0.45);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.06);
            color: #e2e8f0;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }

        /* Bottom Footer */
        .panel-footer {
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 20px;
            text-align: center;
            font-size: 13px;
            color: var(--text-muted);
        }

        .panel-footer strong {
            color: #e2e8f0;
        }

        @media (max-width: 600px) {
            .dashboard-wrapper { padding: 24px 18px; }
            .diagnostics-grid { grid-template-columns: 1fr; }
            .student-display-name { font-size: 26px; }
            .top-navbar { flex-direction: column; align-items: flex-start; }
        }
    </style>
</head>
<body>
    <div class="dashboard-wrapper">
        <div class="top-navbar">
            <div class="institution-badge">
                <span>🏛️ TRƯỜNG CĐ KỸ THUẬT CÔNG NGHỆ NHA TRANG</span>
            </div>
            <div class="live-tag">
                <span class="pulse-indicator"></span>
                <span>ONLINE : PORT 3000</span>
            </div>
        </div>

        <div class="hero-banner">
            <div class="avatar-emblem">
                <svg viewBox="0 0 24 24">
                    <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 12l-8-3.64V17c0 3.31 3.58 6 8 6s8-2.69 8-6v-6.64L12 14z"/>
                </svg>
            </div>
            <div class="role-caption">BÀI TẬP 02 - PHẦN 01 | HTTP SERVER NODE.JS THUẦN</div>
            <div class="student-display-name">TRẦN HUỲNH VŨ</div>
            <div class="meta-pills">
                <div class="pill-chip">MSSV: <strong>CD-CNTT18B33</strong></div>
                <div class="pill-chip">Lớp: <strong>CĐ-CNTT18B</strong></div>
                <div class="pill-chip">Chuyên ngành: <strong>Công nghệ Thông tin</strong></div>
            </div>
        </div>

        <div class="diagnostics-grid">
            <div class="diag-card">
                <div class="diag-title">Cốt lõi xử lý</div>
                <div class="diag-content">Node.js Native http Core</div>
            </div>
            <div class="diag-card">
                <div class="diag-title">Phiên bản Runtime</div>
                <div class="diag-content">${process.version} (${process.platform})</div>
            </div>
            <div class="diag-card">
                <div class="diag-title">Mã trạng thái phản hồi</div>
                <div class="diag-content" style="color: var(--primary-mint);">200 OK • Success</div>
            </div>
            <div class="diag-card">
                <div class="diag-title">Tiêu đề nội dung</div>
                <div class="diag-content">text/html; charset=utf-8</div>
            </div>
        </div>

        <div class="actions-panel">
            <button class="btn-modern" onclick="triggerPing()">
                <span>⚡ Kiểm tra phản hồi server</span>
            </button>
            <button class="btn-secondary" onclick="copyInfo()">
                <span>📋 Sao chép thông tin</span>
            </button>
        </div>

        <div class="panel-footer">
            Mã nguồn đã nộp lên kho lưu trữ GitHub | Tác giả: <strong>Trần Huỳnh Vũ</strong>
        </div>
    </div>

    <script>
        function triggerPing() {
            const start = Date.now();
            fetch(window.location.href)
                .then(() => {
                    const lat = Date.now() - start;
                    alert('Kết nối máy chủ ổn định! Thời gian phản hồi: ' + lat + ' ms');
                })
                .catch(() => alert('Không thể kiểm tra phản hồi.'));
        }

        function copyInfo() {
            const info = "Họ và tên: Trần Huỳnh Vũ\\nMSSV: CD-CNTT18B33\\nLớp: CĐ-CNTT18B\\nTrường: CĐ Kỹ thuật Công nghệ Nha Trang";
            navigator.clipboard.writeText(info).then(() => {
                alert('Đã sao chép thông tin sinh viên vào bộ nhớ tạm!');
            });
        }
    </script>
</body>
</html>`;

    res.end(html);
});

server.listen(PORT, HOST, () => {
    console.log(`====================================================`);
    console.log(`[Bài 02 - Phần 01] HTTP Server đang chạy thành công!`);
    console.log(`Truy cập máy chủ tại: http://${HOST}:${PORT}`);
    console.log(`Sinh viên: Trần Huỳnh Vũ - CD-CNTT18B33`);
    console.log(`====================================================`);
});
