/**
 * ============================================================================
 * BÀI TẬP 02: TẠO WEB SERVER VỚI NODE.JS (NÂNG CẤP GIAO DIỆN BENTO TECH)
 * Môn học: NodeJS (Bài 3 — Module, File System và cơ sở dữ liệu)
 * 
 * Sinh viên thực hiện : TRẦN HUỲNH VŨ
 * Mã sinh viên (MSSV) : CD-CNTT18B33
 * Lớp                 : CĐ-CNTT18B
 * Đơn vị đào tạo      : Khoa CNTT - Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang
 * ============================================================================
 * YÊU CẦU ĐỀ BÀI:
 * 1. Sử dụng module http tạo Web Server tại cổng 3000.
 * 2. Khi truy cập /, hiển thị lời chào và mã sinh viên.
 * 3. Khi truy cập /about, hiển thị thông tin giới thiệu bản thân.
 * 4. Khi truy cập đường dẫn không tồn tại, trả về mã trạng thái HTTP 404.
 * ============================================================================
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';
const START_TIME = Date.now();

// CSS dùng chung phong cách Glassmorphism / Bento Dark Mode
const SHARED_CSS = `
    :root {
        --bg-body: #0a0e17;
        --card-bg: rgba(17, 24, 39, 0.75);
        --card-border: rgba(56, 189, 248, 0.2);
        --primary: #0ea5e9;
        --primary-glow: rgba(14, 165, 233, 0.35);
        --accent: #10b981;
        --accent-glow: rgba(16, 185, 129, 0.3);
        --text-main: #f8fafc;
        --text-sub: #94a3b8;
        --font-stack: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        min-height: 100vh;
        background-color: var(--bg-body);
        background-image: 
            radial-gradient(ellipse at top left, rgba(14, 165, 233, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(99, 102, 241, 0.12) 0%, transparent 60%);
        color: var(--text-main);
        font-family: var(--font-stack);
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .wrapper {
        width: 100%;
        max-width: 900px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        animation: fadeIn 0.5s ease-out;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .nav-bar {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 16px;
        padding: 14px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(16px);
        flex-wrap: wrap;
        gap: 12px;
    }
    .nav-brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 15px;
        color: var(--text-main);
    }
    .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #10b981;
        box-shadow: 0 0 10px #10b981;
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.2); }
    }
    .nav-links {
        display: flex;
        gap: 10px;
    }
    .nav-pill {
        text-decoration: none;
        color: var(--text-sub);
        font-size: 13px;
        font-weight: 600;
        padding: 8px 16px;
        border-radius: 10px;
        border: 1px solid transparent;
        transition: all 0.25s ease;
    }
    .nav-pill:hover, .nav-pill.active {
        color: #ffffff;
        background: rgba(14, 165, 233, 0.15);
        border-color: rgba(56, 189, 248, 0.4);
    }
    .card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 20px;
        padding: 35px;
        backdrop-filter: blur(16px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 20px;
    }
    .col-12 { grid-column: span 12; }
    .col-8 { grid-column: span 8; }
    .col-4 { grid-column: span 4; }
    .col-6 { grid-column: span 6; }
    @media (max-width: 768px) {
        .col-8, .col-4, .col-6 { grid-column: span 12; }
    }
    .hero-title {
        font-size: 32px;
        font-weight: 800;
        line-height: 1.25;
        background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 12px;
    }
    .greeting-text {
        font-size: 18px;
        color: #e2e8f0;
        margin-bottom: 24px;
        line-height: 1.6;
    }
    .mssv-badge-box {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        background: rgba(14, 165, 233, 0.12);
        border: 1px solid rgba(56, 189, 248, 0.4);
        padding: 12px 24px;
        border-radius: 14px;
        margin-bottom: 25px;
    }
    .mssv-tag {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--primary);
        font-weight: 700;
    }
    .mssv-val {
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
        font-family: 'JetBrains Mono', monospace, sans-serif;
        text-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
    }
    .info-tile {
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(148, 163, 184, 0.15);
        border-radius: 14px;
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .info-label {
        font-size: 12px;
        text-transform: uppercase;
        color: var(--text-sub);
        font-weight: 600;
    }
    .info-val {
        font-size: 16px;
        font-weight: 700;
        color: var(--text-main);
    }
    .btn-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 26px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        transition: all 0.3s ease;
    }
    .btn-primary {
        background: linear-gradient(135deg, #0ea5e9, #0284c7);
        color: #ffffff;
        box-shadow: 0 4px 20px var(--primary-glow);
    }
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(14, 165, 233, 0.5);
    }
    .btn-secondary {
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(148, 163, 184, 0.25);
        color: #cbd5e1;
    }
    .btn-secondary:hover {
        background: rgba(51, 65, 85, 0.9);
        color: #ffffff;
        transform: translateY(-2px);
    }
    .btn-danger {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.4);
        color: #fca5a5;
    }
    .btn-danger:hover {
        background: rgba(239, 68, 68, 0.25);
        color: #ffffff;
        transform: translateY(-2px);
    }
    .footer {
        text-align: center;
        font-size: 13px;
        color: #64748b;
        padding: 10px 0;
    }
`;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
    const pathname = parsedUrl.pathname;
    const uptimeSec = Math.floor((Date.now() - START_TIME) / 1000);

    console.log(`[${new Date().toLocaleTimeString('vi-VN')}] [HTTP/${req.httpVersion}] ${req.method} ${pathname}`);

    // Thiết lập Header UTF-8
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // =========================================================================
    // 1. ROUTE "/" - HIỂN THỊ LỜI CHÀO VÀ MÃ SINH VIÊN
    // =========================================================================
    if (pathname === '/' || pathname === '/index.html') {
        res.statusCode = 200;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Chủ | Web Server Node.js - Trần Huỳnh Vũ (CD-CNTT18B33)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
    <style>${SHARED_CSS}</style>
</head>
<body>
    <div class="wrapper">
        <!-- Thanh điều hướng Header -->
        <nav class="nav-bar">
            <div class="nav-brand">
                <div class="status-dot"></div>
                <span>Web Server Node.js (Module <code>http</code>)</span>
            </div>
            <div class="nav-links">
                <a href="/" class="nav-pill active">Trang Chủ (/)</a>
                <a href="/about" class="nav-pill">Giới Thiệu (/about)</a>
                <a href="/test-404-check" class="nav-pill">Thử lỗi 404</a>
            </div>
        </nav>

        <!-- Thẻ chính Bento -->
        <div class="card">
            <div class="hero-title">Xin Chào Quý Thầy Cô & Các Bạn! 👋</div>
            <p class="greeting-text">
                Chào mừng bạn đến với ứng dụng <strong>Web Server Node.js</strong> chạy trên cổng <strong>3000</strong>. 
                Ứng dụng được xây dựng hoàn toàn bằng core module <code>http</code> thuần, không phụ thuộc framework bên ngoài.
            </p>

            <!-- Khung nổi bật Mã sinh viên theo đúng yêu cầu đề bài -->
            <div class="mssv-badge-box">
                <div>
                    <div class="mssv-tag">MÃ SINH VIÊN (MSSV)</div>
                    <div class="mssv-val">CD-CNTT18B33</div>
                </div>
            </div>

            <!-- Bento Subgrid: Thông tin sinh viên & Trạng thái máy chủ -->
            <div class="bento-grid">
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Sinh viên thực hiện</span>
                        <span class="info-val" style="color: #38bdf8;">Trần Huỳnh Vũ</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Lớp học phần</span>
                        <span class="info-val">CĐ-CNTT18B</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Khoa đào tạo</span>
                        <span class="info-val">Công nghệ Thông tin</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Đơn vị trường</span>
                        <span class="info-val">CĐ Kỹ thuật Công nghệ Nha Trang</span>
                    </div>
                </div>

                <div class="col-12" style="margin-top: 10px;">
                    <div class="info-tile" style="background: rgba(14, 165, 233, 0.08); border-color: rgba(56, 189, 248, 0.3);">
                        <span class="info-label">⚙ Thông số hoạt động hệ thống</span>
                        <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 6px; font-size: 14px;">
                            <div>• Cổng: <strong style="color: #38bdf8;">3000</strong></div>
                            <div>• HTTP Status: <strong style="color: #10b981;">200 OK</strong></div>
                            <div>• Node.js: <strong>${process.version}</strong></div>
                            <div>• Uptime: <strong>${uptimeSec} giây</strong></div>
                            <div>• Thời gian: <strong id="clockLive">Đang tải...</strong></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Nút bấm hành động -->
            <div style="display: flex; gap: 14px; margin-top: 30px; flex-wrap: wrap;">
                <a href="/about" class="btn-action btn-primary">👉 Xem Trang Giới Thiệu Bản Thân (/about)</a>
                <a href="/test-404-check" class="btn-action btn-danger">🧪 Kiểm Tra Đường Dẫn Lỗi 404</a>
            </div>
        </div>

        <footer class="footer">
            Bài 2: Tạo Web Server với Node.js | Sinh viên: Trần Huỳnh Vũ - MSSV: CD-CNTT18B33
        </footer>
    </div>

    <script>
        function updateClock() {
            const now = new Date();
            document.getElementById('clockLive').textContent = now.toLocaleTimeString('vi-VN');
        }
        setInterval(updateClock, 1000);
        updateClock();
    </script>
</body>
</html>`);
    }

    // =========================================================================
    // 2. ROUTE "/about" - HIỂN THỊ THÔNG TIN GIỚI THIỆU BẢN THÂN
    // =========================================================================
    else if (pathname === '/about') {
        res.statusCode = 200;
        res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giới Thiệu Bản Thân | Trần Huỳnh Vũ (CD-CNTT18B33)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
    <style>${SHARED_CSS}</style>
</head>
<body>
    <div class="wrapper">
        <nav class="nav-bar">
            <div class="nav-brand">
                <div class="status-dot"></div>
                <span>Hồ Sơ Cá Nhân Sinh Viên</span>
            </div>
            <div class="nav-links">
                <a href="/" class="nav-pill">Trang Chủ (/)</a>
                <a href="/about" class="nav-pill active">Giới Thiệu (/about)</a>
                <a href="/test-404-check" class="nav-pill">Thử lỗi 404</a>
            </div>
        </nav>

        <div class="card">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px; margin-bottom: 25px;">
                <div>
                    <span style="font-size: 13px; font-weight: 700; color: #10b981; letter-spacing: 1px; text-transform: uppercase;">
                        ĐƯỜNG DẪN: /about
                    </span>
                    <h1 style="font-size: 30px; font-weight: 800; color: #ffffff; margin-top: 4px;">
                        THÔNG TIN GIỚI THIỆU BẢN THÂN
                    </h1>
                </div>
                <div class="mssv-badge-box" style="margin-bottom: 0; padding: 8px 18px;">
                    <div>
                        <div class="mssv-tag">MSSV</div>
                        <div class="mssv-val" style="font-size: 18px;">CD-CNTT18B33</div>
                    </div>
                </div>
            </div>

            <!-- Bento Subgrid Hồ sơ -->
            <div class="bento-grid">
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Họ và tên đầy đủ</span>
                        <span class="info-val" style="color: #38bdf8; font-size: 18px;">Trần Huỳnh Vũ</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Mã số sinh viên</span>
                        <span class="info-val" style="color: #10b981; font-size: 18px;">CD-CNTT18B33</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Lớp sinh hoạt</span>
                        <span class="info-val">CĐ-CNTT18B</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="info-tile">
                        <span class="info-label">Chuyên ngành đào tạo</span>
                        <span class="info-val">Công nghệ Thông tin</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="info-tile">
                        <span class="info-label">Cơ sở giáo dục</span>
                        <span class="info-val">Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang</span>
                    </div>
                </div>
            </div>

            <!-- Khối Kỹ năng & Mục tiêu -->
            <div style="margin-top: 25px; display: flex; flex-direction: column; gap: 16px;">
                <div class="info-tile" style="border-left: 4px solid #0ea5e9;">
                    <span class="info-label" style="color: #38bdf8;">🚀 Kiến thức & Kỹ năng môn học Node.js</span>
                    <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6; margin-top: 4px;">
                        • Lập trình JavaScript hiện đại chuẩn <strong>ES6+</strong>: Class, Constructor, Arrow Functions, Array Methods (filter, map, reduce).<br>
                        • Nắm vững kiến trúc mạng hướng sự kiện <strong>Event-driven</strong> và cơ chế <strong>Non-blocking I/O</strong> trong Node.js.<br>
                        • Xây dựng Web Server và RESTful API với module core <code>http</code>.<br>
                        • Thao tác đọc/ghi/nối tệp tin an toàn với module <code>fs</code> (File System).
                    </p>
                </div>

                <div class="info-tile" style="border-left: 4px solid #10b981;">
                    <span class="info-label" style="color: #34d399;">🎯 Mục tiêu & Định hướng phát triển</span>
                    <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6; margin-top: 4px;">
                        Mục tiêu của em là trở thành một <strong>Fullstack Web Developer</strong> chuyên nghiệp, có năng lực thiết kế và triển khai các ứng dụng mạng có khả năng mở rộng cao, an toàn và tối ưu trải nghiệm người dùng.
                    </p>
                </div>
            </div>

            <!-- Nút quay về -->
            <div style="margin-top: 30px;">
                <a href="/" class="btn-action btn-secondary">⬅ Quay lại Trang Chủ (/)</a>
            </div>
        </div>

        <footer class="footer">
            Bài 2: Tạo Web Server với Node.js | Sinh viên: Trần Huỳnh Vũ (CD-CNTT18B33)
        </footer>
    </div>
</body>
</html>`);
    }

    // =========================================================================
    // 3. ROUTE KHÔNG TỒN TẠI - TRẢ VỀ HTTP STATUS 404
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
    <style>${SHARED_CSS}</style>
</head>
<body>
    <div class="wrapper" style="max-width: 600px;">
        <div class="card" style="text-align: center; border-color: rgba(239, 68, 68, 0.4); box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15);">
            <div style="font-size: 90px; font-weight: 900; color: #ef4444; font-family: 'JetBrains Mono', monospace; line-height: 1; text-shadow: 0 0 25px rgba(239, 68, 68, 0.5);">
                404
            </div>
            <h2 style="font-size: 22px; color: #ffffff; margin: 15px 0 10px;">
                MÃ TRẠNG THÁI HTTP 404: NOT FOUND
            </h2>
            <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                Đường dẫn <code style="background: rgba(239, 68, 68, 0.15); color: #fca5a5; padding: 4px 8px; border-radius: 6px; font-family: monospace;">${pathname}</code> 
                không tồn tại trên hệ thống Web Server Node.js của Trần Huỳnh Vũ.
            </p>

            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="/" class="btn-action btn-primary">⬅ Về Trang Chủ (/)</a>
                <a href="/about" class="btn-action btn-secondary">👉 Xem Trang Giới Thiệu (/about)</a>
            </div>
        </div>

        <footer class="footer">
            Mã phản hồi HTTP: 404 Not Found | Web Server Node.js Cổng 3000
        </footer>
    </div>
</body>
</html>`);
    }
});

server.listen(PORT, HOST, () => {
    console.log("\n=====================================================================================");
    console.log("            BÀI TẬP 02: TẠO WEB SERVER VỚI NODE.JS (CỔNG 3000)                       ");
    console.log("   Sinh viên thực hiện : TRẦN HUỲNH VŨ                                               ");
    console.log("   Mã số sinh viên     : CD-CNTT18B33                                                ");
    console.log("   Lớp                 : CĐ-CNTT18B                                                  ");
    console.log("   Trường              : Trường Cao đẳng Kỹ thuật Công nghệ Nha Trang                ");
    console.log("=====================================================================================");
    console.log(`>>> Máy chủ Web Server đang lắng nghe tại : http://${HOST}:${PORT}`);
    console.log(`>>> [1] Trang chủ (Lời chào + MSSV)      : http://${HOST}:${PORT}/`);
    console.log(`>>> [2] Giới thiệu bản thân               : http://${HOST}:${PORT}/about`);
    console.log(`>>> [3] Kiểm tra lỗi HTTP 404             : http://${HOST}:${PORT}/kiem-tra-loi-404`);
    console.log("=====================================================================================");
    console.log("Nhấn Ctrl + C trên bàn phím để dừng máy chủ khi hoàn thành.\n");
});