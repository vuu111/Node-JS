/**
 * ============================================================================
 * BÀI TẬP 02: TẠO WEB SERVER VỚI NODE.JS (PHIÊN BẢN NÂNG CẤP SIÊU ĐẸP BENTO PRO)
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa CNTT - Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * ============================================================================
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';
const START_TIME = Date.now();

// SVG Icons chuẩn Vector sắc nét
const ICONS = {
    server: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
    user: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    badge: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`,
    cpu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`,
    clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    alert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
};

const CSS_THEME = `
    :root {
        --bg-main: #060913;
        --card-bg: rgba(15, 23, 42, 0.78);
        --card-border: rgba(56, 189, 248, 0.22);
        --cyan-glow: #0ea5e9;
        --cyan-light: #38bdf8;
        --emerald-glow: #10b981;
        --purple-glow: #818cf8;
        --text-white: #f8fafc;
        --text-dim: #94a3b8;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        min-height: 100vh;
        background-color: var(--bg-main);
        background-image: 
            radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.18) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(129, 140, 248, 0.15) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 50%);
        color: var(--text-white);
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        padding: 30px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .container {
        width: 100%;
        max-width: 960px;
        display: flex;
        flex-direction: column;
        gap: 22px;
        animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .header-nav {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 18px;
        padding: 14px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(20px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        flex-wrap: wrap;
        gap: 12px;
    }
    .brand-group {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 800;
        font-size: 15px;
        letter-spacing: 0.5px;
    }
    .live-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--emerald-glow);
        box-shadow: 0 0 12px var(--emerald-glow);
        animation: pulseLive 2s infinite;
    }
    @keyframes pulseLive {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.25); }
    }
    .nav-tabs {
        display: flex;
        gap: 8px;
    }
    .nav-link {
        text-decoration: none;
        color: var(--text-dim);
        font-size: 13px;
        font-weight: 700;
        padding: 8px 18px;
        border-radius: 12px;
        border: 1px solid transparent;
        transition: all 0.25s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
    .nav-link:hover, .nav-link.active {
        color: #ffffff;
        background: rgba(14, 165, 233, 0.16);
        border-color: rgba(56, 189, 248, 0.4);
        box-shadow: 0 0 15px rgba(14, 165, 233, 0.2);
    }
    .bento-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 24px;
        padding: 35px;
        backdrop-filter: blur(20px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    }
    .hero-banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
        border-bottom: 1px solid rgba(148, 163, 184, 0.15);
        padding-bottom: 25px;
        margin-bottom: 25px;
    }
    .title-gradient {
        font-size: 34px;
        font-weight: 800;
        background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.25;
        margin-bottom: 8px;
    }
    .mssv-tag-mega {
        background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(99, 102, 241, 0.2));
        border: 1px solid rgba(56, 189, 248, 0.45);
        border-radius: 18px;
        padding: 12px 24px;
        text-align: right;
    }
    .mssv-label {
        font-size: 11px;
        font-weight: 800;
        color: var(--cyan-light);
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }
    .mssv-value {
        font-size: 26px;
        font-weight: 800;
        color: #ffffff;
        font-family: 'JetBrains Mono', monospace;
        letter-spacing: 1px;
    }
    .grid-layout {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 18px;
    }
    .span-4 { grid-column: span 4; }
    .span-6 { grid-column: span 6; }
    .span-8 { grid-column: span 8; }
    .span-12 { grid-column: span 12; }
    @media (max-width: 768px) {
        .span-4, .span-6, .span-8 { grid-column: span 12; }
    }
    .widget-box {
        background: rgba(15, 23, 42, 0.65);
        border: 1px solid rgba(148, 163, 184, 0.18);
        border-radius: 16px;
        padding: 20px;
        transition: all 0.3s ease;
    }
    .widget-box:hover {
        border-color: rgba(56, 189, 248, 0.4);
        transform: translateY(-2px);
    }
    .widget-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 700;
        color: var(--text-dim);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
    }
    .widget-main-text {
        font-size: 18px;
        font-weight: 800;
        color: var(--text-white);
    }
    .pill-status {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 700;
        background: rgba(16, 185, 129, 0.15);
        color: #34d399;
        border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .btn-cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 26px;
        border-radius: 14px;
        font-weight: 700;
        font-size: 14px;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    .btn-gradient {
        background: linear-gradient(135deg, #0ea5e9, #6366f1);
        color: #ffffff;
        box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
    }
    .btn-gradient:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(14, 165, 233, 0.6);
    }
    .btn-outline {
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid rgba(148, 163, 184, 0.25);
        color: var(--text-dim);
    }
    .btn-outline:hover {
        color: #ffffff;
        border-color: rgba(56, 189, 248, 0.4);
        background: rgba(51, 65, 85, 0.8);
        transform: translateY(-2px);
    }
    .footer-bar {
        text-align: center;
        font-size: 13px;
        color: #64748b;
        padding: 12px 0;
    }
`;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
    const pathname = parsedUrl.pathname;
    const uptime = Math.floor((Date.now() - START_TIME) / 1000);
    const memoryUsedMb = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);

    console.log(`[${new Date().toLocaleTimeString('vi-VN')}] [${req.method}] ${pathname} - HTTP/${req.httpVersion}`);

    // Endpoint API JSON
    if (pathname === '/api/student') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
            status: "success",
            sinhVien: {
                hoTen: "Trần Huỳnh Vũ",
                mssv: "CD-CNTT18B33",
                lop: "CĐ-CNTT18B",
                khoa: "Khoa Công nghệ Thông tin",
                truong: "Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang"
            },
            server: {
                port: PORT,
                nodeVersion: process.version,
                platform: process.platform,
                uptimeSeconds: uptime,
                heapMemoryMB: memoryUsedMb,
                serverTime: new Date().toISOString()
            }
        }, null, 2));
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // =========================================================================
    // TRANG CHỦ (/) - LỜI CHÀO & MÃ SINH VIÊN
    // =========================================================================
    if (pathname === '/' || pathname === '/index.html') {
        res.statusCode = 200;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Chủ | Web Server Node.js - Trần Huỳnh Vũ</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
    <style>${CSS_THEME}</style>
</head>
<body>
    <div class="container">
        <!-- Header Navigation Bar -->
        <header class="header-nav">
            <div class="brand-group">
                <div class="live-dot"></div>
                <span>NODE.JS HTTP SERVER</span>
                <span class="pill-status">${ICONS.server} PORT 3000 • ONLINE</span>
            </div>
            <nav class="nav-tabs">
                <a href="/" class="nav-link active">Trang Chủ (/)</a>
                <a href="/about" class="nav-link">Giới Thiệu (/about)</a>
                <a href="/api/student" target="_blank" class="nav-link">{ } API JSON</a>
                <a href="/kiem-tra-404" class="nav-link">🧪 Test 404</a>
            </nav>
        </header>

        <!-- Main Bento Dashboard -->
        <main class="bento-card">
            <div class="hero-banner">
                <div>
                    <h1 class="title-gradient">Xin Chào Quý Thầy Cô & Các Bạn! 👋</h1>
                    <p style="color: var(--text-dim); font-size: 16px; line-height: 1.6;">
                        Chào mừng bạn đến với Web Server được xây dựng bằng <strong>Node.js Core HTTP Module</strong>.
                    </p>
                </div>
                <div class="mssv-tag-mega">
                    <div class="mssv-label">MÃ SINH VIÊN (MSSV)</div>
                    <div class="mssv-value">CD-CNTT18B33</div>
                </div>
            </div>

            <div class="grid-layout">
                <!-- Thông tin sinh viên -->
                <div class="span-6">
                    <div class="widget-box">
                        <div class="widget-header">${ICONS.user} HỌ VÀ TÊN SINH VIÊN</div>
                        <div class="widget-main-text" style="color: var(--cyan-light); font-size: 22px;">Trần Huỳnh Vũ</div>
                        <div style="color: var(--text-dim); font-size: 14px; margin-top: 6px;">
                            MSSV: <strong>CD-CNTT18B33</strong> • Lớp: <strong>CĐ-CNTT18B</strong>
                        </div>
                    </div>
                </div>

                <div class="span-6">
                    <div class="widget-box">
                        <div class="widget-header">${ICONS.badge} ĐƠN VỊ ĐÀO TẠO</div>
                        <div class="widget-main-text" style="font-size: 17px;">CĐ Kỹ thuật Công nghệ Nha Trang</div>
                        <div style="color: var(--text-dim); font-size: 14px; margin-top: 6px;">
                            Khoa: <strong>Công nghệ Thông tin</strong>
                        </div>
                    </div>
                </div>

                <!-- Thông số Server -->
                <div class="span-4">
                    <div class="widget-box">
                        <div class="widget-header">${ICONS.clock} THỜI GIAN HOẠT ĐỘNG</div>
                        <div class="widget-main-text" id="liveUptime">${uptime} giây</div>
                        <div style="color: #34d399; font-size: 13px; margin-top: 4px;">Máy chủ đang ổn định</div>
                    </div>
                </div>

                <div class="span-4">
                    <div class="widget-box">
                        <div class="widget-header">${ICONS.cpu} MÔI TRƯỜNG RUNTIME</div>
                        <div class="widget-main-text" style="font-family: 'JetBrains Mono', monospace;">Node ${process.version}</div>
                        <div style="color: var(--text-dim); font-size: 13px; margin-top: 4px;">Nền tảng: ${process.platform} (${process.arch})</div>
                    </div>
                </div>

                <div class="span-4">
                    <div class="widget-box">
                        <div class="widget-header">${ICONS.code} TRẠNG THÁI HTTP</div>
                        <div class="widget-main-text" style="color: #34d399;">200 OK</div>
                        <div style="color: var(--text-dim); font-size: 13px; margin-top: 4px;">RAM Heap: ${memoryUsedMb} MB</div>
                    </div>
                </div>

                <!-- Nút điều hướng nhanh -->
                <div class="span-12" style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 10px;">
                    <a href="/about" class="btn-cta btn-gradient">👉 Xem Trang Giới Thiệu Bản Thân (/about)</a>
                    <a href="/api/student" target="_blank" class="btn-cta btn-outline">Xem Dữ Liệu API JSON</a>
                    <a href="/kiem-tra-404" class="btn-cta btn-outline" style="color: #f87171; border-color: rgba(239, 68, 68, 0.3);">🧪 Kiểm Tra Lỗi 404</a>
                </div>
            </div>
        </main>

        <footer class="footer-bar">
            Bài 2: Tạo Web Server với Node.js | Sinh viên: <strong>Trần Huỳnh Vũ (CD-CNTT18B33)</strong> - Lớp: <strong>CĐ-CNTT18B</strong>
        </footer>
    </div>

    <script>
        let sec = ${uptime};
        setInterval(() => {
            sec++;
            document.getElementById('liveUptime').textContent = sec + ' giây';
        }, 1000);
    </script>
</body>
</html>`);
    }

    // =========================================================================
    // TRANG GIỚI THIỆU BẢN THÂN (/about)
    // =========================================================================
    else if (pathname === '/about') {
        res.statusCode = 200;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giới Thiệu Bản Thân | Trần Huỳnh Vũ</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
    <style>${CSS_THEME}</style>
</head>
<body>
    <div class="container">
        <header class="header-nav">
            <div class="brand-group">
                <div class="live-dot"></div>
                <span>HỒ SƠ CÁ NHÂN SINH VIÊN</span>
            </div>
            <nav class="nav-tabs">
                <a href="/" class="nav-link">Trang Chủ (/)</a>
                <a href="/about" class="nav-link active">Giới Thiệu (/about)</a>
                <a href="/api/student" target="_blank" class="nav-link">{ } API JSON</a>
                <a href="/kiem-tra-404" class="nav-link">🧪 Test 404</a>
            </nav>
        </header>

        <main class="bento-card">
            <div class="hero-banner">
                <div>
                    <span style="color: #34d399; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
                        ĐƯỜNG DẪN: /about
                    </span>
                    <h1 class="title-gradient">THÔNG TIN GIỚI THIỆU BẢN THÂN</h1>
                    <p style="color: var(--text-dim); font-size: 15px;">Hồ sơ năng lực sinh viên ngành Công nghệ Thông tin</p>
                </div>
                <div class="mssv-tag-mega">
                    <div class="mssv-label">MSSV</div>
                    <div class="mssv-value">CD-CNTT18B33</div>
                </div>
            </div>

            <div class="grid-layout">
                <div class="span-6">
                    <div class="widget-box">
                        <div class="widget-header">HỌ VÀ TÊN</div>
                        <div class="widget-main-text" style="color: var(--cyan-light);">Trần Huỳnh Vũ</div>
                    </div>
                </div>

                <div class="span-6">
                    <div class="widget-box">
                        <div class="widget-header">LỚP SINH HOẠT</div>
                        <div class="widget-main-text">CĐ-CNTT18B</div>
                    </div>
                </div>

                <div class="span-6">
                    <div class="widget-box">
                        <div class="widget-header">KHOA ĐÀO TẠO</div>
                        <div class="widget-main-text">Công nghệ Thông tin</div>
                    </div>
                </div>

                <div class="span-6">
                    <div class="widget-box">
                        <div class="widget-header">TRƯỜNG ĐÀO TẠO</div>
                        <div class="widget-main-text" style="font-size: 16px;">CĐ Kỹ thuật Công nghệ Nha Trang</div>
                    </div>
                </div>

                <div class="span-12">
                    <div class="widget-box" style="border-left: 4px solid var(--cyan-glow);">
                        <div class="widget-header" style="color: var(--cyan-light);">🚀 KỸ NĂNG & KIẾN THỨC MÔN HỌC NODE.JS</div>
                        <div style="color: #cbd5e1; font-size: 15px; line-height: 1.7; margin-top: 6px;">
                            • <strong>JavaScript ES6+:</strong> Class, Constructor, Arrow Function, Array Methods (filter, map, reduce).<br>
                            • <strong>Kiến trúc Node.js:</strong> Cơ chế Non-blocking I/O, Event Loop, xây dựng HTTP Server bằng module <code>http</code>.<br>
                            • <strong>File System (fs):</strong> Đọc, ghi và nối tệp tin bất đồng bộ với <code>fs.appendFile()</code>, <code>fs.readFile()</code>.<br>
                            • <strong>Cơ sở dữ liệu MongoDB:</strong> Thực hiện các thao tác CRUD (insertMany, find, $gte, sort, updateOne, $set).
                        </div>
                    </div>
                </div>

                <div class="span-12">
                    <div class="widget-box" style="border-left: 4px solid var(--emerald-glow);">
                        <div class="widget-header" style="color: #34d399;">🎯 MỤC TIÊU & ĐỊNH HƯỚNG PHÁT TRIỂN</div>
                        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.7; margin-top: 6px;">
                            Mục tiêu của em là hoàn thành xuất sắc học phần NodeJS, xây dựng nền tảng vững chắc về lập trình Backend 
                            và hướng tới trở thành một <strong>Fullstack Web Developer</strong> chuyên nghiệp, thành thạo công nghệ Web hiện đại.
                        </p>
                    </div>
                </div>

                <div class="span-12" style="margin-top: 10px;">
                    <a href="/" class="btn-cta btn-outline">⬅ Quay lại Trang Chủ (/)</a>
                </div>
            </div>
        </main>

        <footer class="footer-bar">
            Bài 2: Tạo Web Server với Node.js | Sinh viên: <strong>Trần Huỳnh Vũ (CD-CNTT18B33)</strong>
        </footer>
    </div>
</body>
</html>`);
    }

    // =========================================================================
    // TRANG LỖI 404 (NOT FOUND)
    // =========================================================================
    else {
        res.statusCode = 404;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found | Không Tìm Thấy Trang</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
    <style>${CSS_THEME}</style>
</head>
<body>
    <div class="container" style="max-width: 640px;">
        <main class="bento-card" style="text-align: center; border-color: rgba(239, 68, 68, 0.4); box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15);">
            <div style="font-size: 96px; font-weight: 900; color: #ef4444; font-family: 'JetBrains Mono', monospace; line-height: 1; text-shadow: 0 0 30px rgba(239, 68, 68, 0.6);">
                404
            </div>
            <h2 style="font-size: 22px; color: #ffffff; margin: 16px 0 10px;">
                MÃ TRẠNG THÁI HTTP 404: NOT FOUND
            </h2>
            <p style="color: var(--text-dim); font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                Đường dẫn <code style="background: rgba(239, 68, 68, 0.15); color: #fca5a5; padding: 4px 10px; border-radius: 6px; font-family: monospace;">${pathname}</code> 
                không tồn tại trên hệ thống Web Server Node.js của Trần Huỳnh Vũ.
            </p>

            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="/" class="btn-cta btn-gradient">⬅ Quay Lại Trang Chủ (/)</a>
                <a href="/about" class="btn-cta btn-outline">Xem Giới Thiệu (/about)</a>
            </div>
        </main>
        <footer class="footer-bar">
            HTTP Status: 404 Not Found • Web Server Node.js Cổng 3000
        </footer>
    </div>
</body>
</html>`);
    }
});

server.listen(PORT, HOST, () => {
    console.log("\n\x1b[1m\x1b[36m=====================================================================================\x1b[0m");
    console.log("\x1b[1m\x1b[32m            BÀI TẬP 02: TẠO WEB SERVER VỚI NODE.JS (CỔNG 3000) - BENTO PRO            \x1b[0m");
    console.log("   Sinh viên thực hiện : \x1b[1m\x1b[33mTRẦN HUỲNH VŨ\x1b[0m");
    console.log("   Mã số sinh viên     : \x1b[1m\x1b[36mCD-CNTT18B33\x1b[0m");
    console.log("   Lớp                 : \x1b[1mCĐ-CNTT18B\x1b[0m");
    console.log("   Trường              : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang");
    console.log("\x1b[1m\x1b[36m=====================================================================================\x1b[0m");
    console.log(`\x1b[32m>>> Máy chủ Web Server đang lắng nghe tại : \x1b[4mhttp://${HOST}:${PORT}\x1b[0m`);
    console.log(`>>> [1] Trang chủ (Lời chào + MSSV)      : http://${HOST}:${PORT}/`);
    console.log(`>>> [2] Giới thiệu bản thân               : http://${HOST}:${PORT}/about`);
    console.log(`>>> [3] Endpoint API JSON                 : http://${HOST}:${PORT}/api/student`);
    console.log(`>>> [4] Kiểm tra lỗi HTTP 404             : http://${HOST}:${PORT}/kiem-tra-404`);
    console.log("\x1b[1m\x1b[36m=====================================================================================\x1b[0m");
    console.log("Nhấn Ctrl + C trên bàn phím để dừng máy chủ khi hoàn thành.\n");
});