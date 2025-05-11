const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
};

// Add logging function
const log = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
};

const server = http.createServer((req, res) => {
    // Log request
    log(`Request: ${req.method} ${req.url}`);
    
    // Default to index.html for the root path
    let filePath = req.url === '/' ? './src/index.html' : './src' + req.url;
    log(`Serving file: ${filePath}`);
    
    // Get the file extension
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'text/plain';
    
    if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
    
    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                log(`File not found: ${filePath}`);
                res.writeHead(404);
                res.end('File not found');
            } else {
                log(`Server error: ${error.code} for ${filePath}`);
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            log(`Serving ${filePath} (${content.length} bytes)`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    log(`Server running at http://localhost:${PORT}/`);
}); 