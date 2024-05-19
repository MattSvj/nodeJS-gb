const http = require('http');

let views = {
    '/': 0,
    '/about': 0
};

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        views['/']++;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Home Page</h1><p>Views: ${views['/']}</p><a href="/about">Go to About Page</a>`);
        res.end();
    } else if (req.url === '/about') {
        views['/about']++;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>About Page</h1><p>Views: ${views['/about']}</p><a href="/">Go to Home Page</a>`);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});