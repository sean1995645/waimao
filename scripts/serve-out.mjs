import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'out');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const safePath = path.normalize(clean).replace(/^(\.\.(\/|\\|$))+/, '');
  const candidates =
    safePath === '/'
      ? [path.join(OUT_DIR, 'index.html')]
      : [
          path.join(OUT_DIR, safePath),
          path.join(OUT_DIR, `${safePath}.html`),
          path.join(OUT_DIR, safePath, 'index.html'),
        ];

  for (const file of candidates) {
    if (!file.startsWith(OUT_DIR)) continue;
    try {
      const stat = fs.statSync(file);
      if (stat.isFile()) return file;
    } catch {}
  }
  return null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);

  if (url.pathname === '/api/inquiry') {
    res.writeHead(503, { 'content-type': 'application/json; charset=utf-8' });
    res.end(
      JSON.stringify({
        ok: false,
        error: 'Inquiry delivery is not configured. No inquiry has been sent.',
      }),
    );
    return;
  }

  const file = resolveFile(url.pathname);
  if (file) {
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
    return;
  }

  const notFound = path.join(OUT_DIR, '404.html');
  res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
  if (fs.existsSync(notFound)) {
    fs.createReadStream(notFound).pipe(res);
  } else {
    res.end('404 Not Found');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Heatnexis static preview listening on http://${HOST}:${PORT}`);
});
