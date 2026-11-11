import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import contactHandler from './api/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Route Vercel Serverless API: /api/contact
  if (url.pathname === '/api/contact') {
    let rawBody = '';
    for await (const chunk of req) {
      rawBody += chunk;
    }
    try {
      req.body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      req.body = rawBody;
    }

    // Add Express/Vercel-like helpers to res
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (data) => {
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      res.end(JSON.stringify(data));
      return res;
    };

    return contactHandler(req, res);
  }

  // Static file serving
  let filePath = path.join(__dirname, decodeURIComponent(url.pathname === '/' ? 'index.html' : url.pathname));

  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  // Support cleanUrls (like vercel.json)
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n✨ AjmerFoodie Local Server running at: http://localhost:${PORT}`);
  console.log(`📡 Serverless API endpoint active at:   http://localhost:${PORT}/api/contact\n`);
});

